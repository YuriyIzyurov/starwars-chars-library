export interface CardType {
    id: string
    name: string
    birth_year: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    films: any[]
    image: string
}
export interface DummyCard {
    name: null
    image: null
}
export type DirectionType = 'prev' | 'next'
export type InputType = 'search' | 'email'
