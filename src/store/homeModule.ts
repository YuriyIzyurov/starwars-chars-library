import axios from "axios";

export const homeModule = {
    state: () => ({
        cards: [],
        isCardsLoading: false,
        searchQuery: '',
        page: 1,
        limit: 4,
        totalPages: 0
    }),
    getters: {
        sortedCards(state) {
            return [...state.cards].sort((card1, card2) => card1['name']?.localeCompare(card2['name']))
        },
        sortedAndSearchedCards(state, getters) {
            return getters.sortedCards.filter(card => card.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setCards(state, cards) {
            state.cards = cards
        },
        setCardLoading(state, bool) {
            state.isCardsLoading = bool
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, total) {
            state.totalPages = total
        }
    },
    actions: {
        async fetchData({state, commit}) {
            try {
                commit('setCardLoading', true)
                const response = await axios.get('https://swapi.dev/api/people', {
                    params: {
                        page: state.page,
                        limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.data.count/10))
                commit('setCards', response.data.results)
            } catch(e) {
                alert('wtf')
            } finally {
                commit('setCardLoading', false)
            }
        },
    },
    namespaced: true
}
