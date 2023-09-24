import { defineStore } from 'pinia'
import axios from "axios";
import {ActionToggleType, CardType, DummyCard, FavoriteCard, FilmType, StorageKeyType} from "@/types";
import {computed, ref} from "vue";


export const useCardsStore = defineStore('CharCard', () => {
    let totalCharacters = 82
    const cardsPerPage = 4
    const API_PAGES = 9
    const visiblePages = 5
    const page = ref<InstanceType<number>>(1)
    const filmList = ref<InstanceType<FilmType[]|null>>(null)
    const failedCards = ref<InstanceType<number[]|[]>>([])
    const favoriteCards = ref<InstanceType<FavoriteCard[]|[]>>([])
    //заполним массив думми карточками, так как апи медленный. По каждому клику на страницу,а тем более поиску фетчиться данные
    //будут слишком долго, плохо с точки зрения UX. Массив данных небольшой, сразу отобразим скелетон лоадеры, как можно скорее загрузим
    //первую страницу персонажей и в фоне догрузится остальное, постепенно заменяя в думми массиве по индексам на настоящие карточки
    const cards = ref<InstanceType<(CardType|DummyCard)[]>>
    (Array.from({ length: totalCharacters }, (_, index) => ({id: index, name: null, image: null, is_favorite: null})))


    const totalPages = computed(() => Math.ceil(totalCharacters/cardsPerPage))
    const currentPageCards = computed(() => {
        const startIndex = (page.value - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        return cards.value.slice(startIndex, endIndex);
    })
    //Количество элементов(страниц) будет 7, вместо 8 на макете.
    //Потому что с точки зрения дизайна симметрия относительно центрального элемента выглядит красивее,
    //и соответствует логике пагинации, когда у нас текущая страница в центре
    const pageArray = computed(() => {
        const pageArr = []
        let startPage = Math.max(page.value - Math.floor(visiblePages / 2), 2)
        const endPage = Math.min(startPage + visiblePages - 2, totalPages.value - 1)

        if (startPage > 2) {
            pageArr.push('...')
            if(totalPages.value - startPage < visiblePages) {
                startPage = totalPages.value - visiblePages + 1
            } else  startPage++
        }
        for (let i = startPage; i <= endPage; i++) {
            pageArr.push(i)
        }
        if(totalPages.value - startPage < visiblePages ) {
            pageArr.push(endPage + 1)
        }
        if (endPage < totalPages.value - 1 && !(totalPages.value - startPage < visiblePages) ) {
            pageArr.push('...')
        }
        if (totalPages.value > 1) {
            pageArr.unshift(1)
            if(pageArr.length <= visiblePages + 1)
                pageArr.push(totalPages.value)
        }

        return pageArr
    })
    const favoritesCount = computed(() => favoriteCards.value.length)

    async function fetchCharacters(key: StorageKeyType) {
        const data = JSON.parse(localStorage.getItem(key))
        if(data) {
            cards.value = data.cards
            favoriteCards.value = data.favoriteCards

            return 'STORAGE_SUCCESS'
        }

        try {
            for(let i=0; i<API_PAGES; i++) {
                console.log(`start fetch page ${i+1}`)
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}people`, {
                    params: {
                        page: i + 1,
                    }
                })
                if(totalCharacters!==response.data.count)
                    totalCharacters = response.data.count

                response.data.results.forEach((card, j) => {
                    cards.value[i * 10 + j].name = card.name
                    cards.value[i * 10 + j].birth_year = card.birth_year
                    cards.value[i * 10 + j].height = card.height
                    cards.value[i * 10 + j].mass = card.mass
                    cards.value[i * 10 + j].hair_color = card.hair_color
                    cards.value[i * 10 + j].skin_color = card.skin_color
                    cards.value[i * 10 + j].eye_color = card.eye_color
                    cards.value[i * 10 + j].films = setFilms(card.films, i * 10 + j) || card.films
                    cards.value[i * 10 + j].image = `/characters/${ j < 9 && i===0 ? i : '' }${ i * 10 + j + 1 }.jpg`
                })
            }
            return 'FETCH_SUCCESS'
        } catch(e) {
            console.log('не удалось загрузить персонажей', e)
        }
    }
    async function fetchFilms(key: StorageKeyType) {
        //этот эндпоинт очень медленный, подпишемся на резолв этого экшена в хоум компоненте,
        //как только получим список фильмов, раскидаем их по картокам, которые не успели загрузить себе список фильмов
        const data = JSON.parse(localStorage.getItem(key))
        if(data) {
            filmList.value = data.filmList

            return 'STORAGE_SUCCESS'
        }

        try {
            console.log('fetch films')
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}films`)
            filmList.value = response.data.results

            return 'FETCH_SUCCESS'
        } catch(e) {
            console.log('не удалось загрузить фильмы', e)
        }
    }
    function setFilms(filmsArr: string[], cardId: number) {
        //Если списка фильмов еще не существует, значит они не успели загрузиться с сервера
        //Пометим эту карточку как несостоявшуюся и запишем в реф ее id
        //Далее проследим, когда список фильмов появится, пройдемся по несостоявшимся карточкам и дополним их фильмами
        //Много действий, но это максимально быстрый способ работы с таким плохим апи
        if(!filmList.value) {
            failedCards.value.push(cardId)
            return null
        }
        let filmsString = ''
        for(const film of filmsArr) {
            const filmId = +film.replace(/\D/g, "")
            for (let i = 0; i < filmList.value.length; i++) {
                if (filmList.value[i].episode_id === filmId) {
                    filmsString += filmList.value[i].title + ', '
                    break;
                }
            }
        }
        return filmsString.replace(/, $/, ".")
    }
    function toggleFavorites(card: CardType, action: ActionToggleType) {
        const { id, name, image } = card
        if(action==="delete") {
            favoriteCards.value = favoriteCards.value.filter(card => card.id !== id)
        } else {
            favoriteCards.value.push({ id, name, image, })
        }
        return "ADDED_TO_FAVORITES"
    }


    return {
        currentPageCards, cards, totalPages,
        page, pageArray, filmList, failedCards,
        favoriteCards, favoritesCount,
        fetchCharacters, fetchFilms, setFilms, toggleFavorites
    }
})





