export interface DummyCard {
    id: number
    name: null | string
    image: null | string
    is_favorite: null | boolean
}
export interface CardType extends DummyCard {
    birth_year: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    films: string | string[]
}
export interface FilmType {
    title: string
    episode_id: number
}

export type DirectionType = 'prev' | 'next'
export type InputType = 'search' | 'email'
export type ActionToggleType = 'add' | 'delete'
export type AnimationType = 'forward' | 'reverse'
export type ButtonActionType = 'addToFav' | 'expand' | 'delFromFav'
export type FavoriteCard = Omit<DummyCard, "is_favorite">
export type StorageKeyType = 'cards'
export type SectionType = 'info' | 'extra'
