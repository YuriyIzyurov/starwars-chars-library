export const STORAGE_SUCCESS = 'STORAGE_SUCCESS'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const ADDED_TO_FAVORITES = 'ADDED_TO_FAVORITES'
export const DELETED_FROM_FAVORITES = 'DELETED_FROM_FAVORITES'
export const routesData = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/news',
        name: 'News',
    },
    {
        path: '/gallery',
        name: 'Gallery',
    },
    {
        path: '/forum',
        name: 'Forum',
    },
]
export function useDeterminateScreen(ratio) {
    //можно придумать лучше, но пока на глаз для простоты
    return  ratio > 1.8
        ? ['isTabletVertical', 2.5]
        : ratio > 1.65
            ? ['isMaxScreen', 2]
            : ratio > 1.5
                ? ['isTablet', 4]
                : ratio > 1.1
                    ? ['isMobile', 2.5]
                    : ratio > 0.9
                        ? ['isLargeTablet', 8] : ['isTablet', 5]
}
