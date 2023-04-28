import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import "highlight.js/styles/atom-one-dark.css";
import "react-markdown-editor-lite/lib/index.css";
import Editor from "./components/Editor";
import Drawer from "./components/Drawer";
import cuid from "cuid";
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { useChromeStorage } from "./hooks/useChromeStorage";
import { useLocalStorage } from "./hooks/useLocalStorage";
function App() {
  const [notes, setNotes] = useChromeStorage("QUICK-NOTES", []);
  const [noteId, setNoteId] = useChromeStorage("QUICK-NOTE", null);
  // const [notes, setNotes] = useLocalStorage("QUICK-NOTES", []);
  // const [noteId, setNoteId] = useLocalStorage("QUICK-NOTE_ID", null);
  let titleRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (Boolean(noteId) && Boolean(titleRef)) {
      const note = notes[notes.findIndex((n) => n.id === noteId)];
      if (!note) setNoteId(null);
      titleRef.current.value = note?.title || "";
      setContent(note?.content || "");
    }
  }, [noteId]);

  const changeHandler = (newContent) => {
    if (
      newContent === content ||
      newContent === "" ||
      newContent === "<p><br></p>"
    )
      return;
    setContent(newContent);
    onUpdateNote(newContent);
  };

  function onUpdateNote(content) {
    if (!Boolean(noteId)) onNewNote(content);
    else
      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          if (note.id === noteId) {
            return { ...note, content: content, title: titleRef.current.value };
          } else {
            return note;
          }
        });
      });
  }

  function onDeleteNote(e, id) {
    e.stopPropagation();
    setNoteId(null);
    setContent("");
    titleRef.current.value = "Nouvelle note";
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  // const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  const onNewNote = (content) => {
    const newNoteObj = {
      id: cuid(),
      title:
        titleRef.current.value !== ""
          ? titleRef.current.value
          : "Nouvelle note",
      content: content,
    };
    setNoteId(newNoteObj.id);
    setNotes((prev) => [...prev, newNoteObj]);
  };
  const onNewNoteClick = () => {
    setNoteId(null);
    titleRef.current.value = "Nouvelle note";
    setContent("");
  };
  return (
    <div className="App">
      <Drawer
        notes={notes}
        setNoteId={setNoteId}
        onNewNoteClick={onNewNoteClick}
        onDeleteNote={onDeleteNote}
      >
        <div className="w-full flex flex-col">
          <input
            defaultValue="Nouvelle note"
            className="border-none truncate text-ellipsis text-4xl bg-transparent m-3 font-bold text-slate-800 focus:border-none focus:outline-none"
            ref={titleRef}
            placeholder="Title"
          />
          <Editor value={content} onChange={changeHandler} />
        </div>
      </Drawer>
    </div>
  );
}

export default App;
