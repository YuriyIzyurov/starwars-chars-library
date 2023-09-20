import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        cards: any[],
        isCardsLoading: boolean,
        searchQuery: string,
        page: number,
        limit: number,
        totalPages: number
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
