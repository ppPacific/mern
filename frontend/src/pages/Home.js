import { useEffect, useState } from "react";
import SheetDetails from "../components/SheetDetails";
import SheetForm from "../components/SheetForm";
import {useSheetContext} from "../hooks/useSheetContext";
import FirstSheet from "../components/FirstSheet";
import {useAuthContext} from "../hooks/useAuthContext";

const Home = () => {
  //const [sheets, setSheets] = useState(null);
  const {sheets, dispatch} = useSheetContext()
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchSheets = async () => {
      const response = await fetch("/api/sheets", {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {//dispatch action, to reducer
        dispatch({type:'SET_SHEETS', payload:json})
      }
    };
    if (user) {
      fetchSheets();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      {sheets &&
          sheets.map((sheet, index) => {if (index === 0) return <FirstSheet key={sheet._id} sheet={sheet} />})

      }
      <SheetForm />
      <div className="workouts">
        {sheets &&
          sheets.map((sheet, index) => {if (index !== 0) return <SheetDetails key={sheet._id} sheet={sheet} />})}
      </div>
    </div>
  );
};
export default Home;
