import {useSheetContext} from "../hooks/useSheetContext";
import {formatDistanceToNow} from "date-fns";
import {useAuthContext} from "../hooks/useAuthContext";

const SheetDetails = ({ sheet }) => {
    const {dispatch} = useSheetContext()
    const { user } = useAuthContext()

    const handleClick=async ()=>{
        if(!user) return;

        const response = await fetch('/api/sheets/' + sheet._id, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if (response.ok){
            dispatch({type:'DELETE_SHEET', payload:json})
        }
    }
  return (
    <div className="workout-details">
      <h4>{sheet.title}</h4>
      <p>
        <strong>{sheet.content}</strong>
      </p>
      <p>{formatDistanceToNow(new Date(sheet.createdAt), {addSuffix:true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default SheetDetails;
