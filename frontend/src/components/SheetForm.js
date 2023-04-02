import { useState } from "react";
import {useSheetContext} from "../hooks/useSheetContext";
import {useAuthContext} from "../hooks/useAuthContext";

const SheetForm = () => {
    const {dispatch} = useSheetContext();
    const { user } = useAuthContext()

    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        setError('You must login in');
        return
    }
    const sheet = { title, content };
    const response = await fetch("/api/sheets", {
      method: "POST",
      body: JSON.stringify(sheet),
      headers: {
        "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("");
      setContent("");
      setError(null);
        setEmptyFields([])
      console.log("added sheet", json);
      dispatch({type:'CREATE_SHEET',payload: json})
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Blog 🥸</h3>
      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Content</label>
      <textarea
          id="textarea"
          rows="5"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className={emptyFields.includes('content') ? 'error' : ''}
      />
      <button>Send</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default SheetForm;
