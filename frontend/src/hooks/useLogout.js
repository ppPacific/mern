import { useAuthContext } from './useAuthContext'
import { useSheetContext } from './useSheetContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: sheetDispatch } = useSheetContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        sheetDispatch({type: 'SET_SHEETS', payload: null})
    }

    return { logout }
}