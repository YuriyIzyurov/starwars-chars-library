import axios from "axios";
import {computed, onMounted, ref, watch} from "vue";
import {CardType, DummyCard} from "@/types";


export function useCards() {
    const totalCharacters = 82
    const cardsPerPage = 4
    const visiblePages = 5

    //todo: разобраться с типизацией всей этой фигни, почему any, если в дженерике цифра
    const totalPages = ref<InstanceType<number>>(Math.ceil(totalCharacters/cardsPerPage))
    const page = ref<InstanceType<number>>(1)
    const cards = ref<InstanceType<(CardType|DummyCard)[]>>
    (Array.from({ length: totalCharacters }, (_, index) => ({id: index, name: null, image: null})))
    const isCardsLoading = ref<InstanceType<boolean>>(false)

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


    const fetching = async () => {
        try {
            isCardsLoading.value = true
        /*    for(let page=1; page <=9; page++) {
                const response = await axios.get('https://swapi.dev/api/people', {
                    params: {
                        page: page,
                    }
                })
                totalPages.value = Math.ceil(response.data.count/10)
                const cardsWithImage = response.data.results.map((card, index) => {
                    card.image = `/characters/${index < 9 ? page- 1 : ''}${index + 1}.jpg`
                    return card
                })
                console.log(`fetched from page ${page}`, cardsWithImage)
                cards.value.push(...cardsWithImage)
            }*/
        } catch(e) {
            alert('wtf')
        } finally {
            isCardsLoading.value = false
        }
    }
    watch(page, async () => {
       // await fetching()
        console.log(pageArray.value)
    })
    //onMounted(fetching)

    return {
        currentPageCards, cards, isCardsLoading, totalPages, page, pageArray
    }
}
