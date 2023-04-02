import {useSheetContext} from "../hooks/useSheetContext";
import {formatDistanceToNow} from "date-fns";

const FirstSheet = ({ sheet }) => {
    const {dispatch} = useSheetContext()
    const handleClick=async ()=>{
        const response = await fetch('/api/sheets/' + sheet._id, {
            method: 'DELETE',

        })
        const json = await response.json();
        if (response.ok){
            dispatch({type:'DELETE_SHEET', payload:json})
        }
    }
    return (
        <div className="workout-first">
            <h4>{sheet.title}</h4>
            <p>
                {sheet.content}
            </p>
            <p>{formatDistanceToNow(new Date(sheet.createdAt), {addSuffix:true})}</p>
            <br/>
            {/*<span className="material-symbols-outlined" onClick={handleClick}>delete</span>*/}
        </div>
    );
};

export default FirstSheet;