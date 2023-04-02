import {createContext, useReducer} from "react";

export const SheetContext = createContext();
                                    //TYPE, payload
export const sheetReducer = (state, action)=>{
    switch (action.type) {
        case 'SET_SHEETS':
            return { //new state is
                sheets: action.payload
            }
        case 'CREATE_SHEET':
            return {
                sheets: [action.payload, ...state.sheets]
            }
        case 'DELETE_SHEET':
            return{
                sheets: state.sheets.filter(she => she._id !== action.payload._id)
            }
        default:
            return state;
    }
}


export const SheetContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(sheetReducer, {
        sheets: null
    })

    return(
        <SheetContext.Provider value={{...state, dispatch}}>
            {children}
        </SheetContext.Provider>
    )
}