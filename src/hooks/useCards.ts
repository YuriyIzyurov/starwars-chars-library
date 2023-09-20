import axios from "axios";
import {onMounted, ref, watch} from "vue";
import {CardType} from "@/types";


export function useCards() {
    const cards = ref<CardType[]>([])
    const page = ref<number>(1)
    const totalPages = ref<number>(0)
    const isCardsLoading = ref<boolean>(true)

    const fetching = async () => {
        try {
            isCardsLoading.value = true
            const response = await axios.get('https://swapi.dev/api/people', {
                params: {
                    page: page.value,
                }
            })
            totalPages.value = Math.ceil(response.data.count/10)

            cards.value = response.data.results.map((card, index) => {
                card.image = `../assets/characters/${index < 9 ? page.value - 1 : ''}${index + 1}.jpg`
                return card
            })
        } catch(e) {
            alert('wtf')
        } finally {
            isCardsLoading.value = false
        }
    }
    watch(page, async () => {
        await fetching()
    })
    onMounted(fetching)

    return {
        cards, isCardsLoading, totalPages, page
    }
}
