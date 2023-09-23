import {computed, ref} from "vue";


export default function useSearch(cards) {
    const searchQuery = ref<string>('')

    /*const sortedCards = computed(() =>
        [...cards.value].sort((card1, card2) => card1['name']?.localeCompare(card2['name'])))*/
    const sortedAndSearchedCards = computed(() =>
        cards.value.filter(card => card.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    return {
        sortedAndSearchedCards, searchQuery
    }
}
