import axios from "axios";
import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then(response => {
      setNotes(response.data);
    });
  }, []);

  const addNote = e => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObject).then(response => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = e => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = id => {
    // find the note we want to modify and assign it to the note variable
    const note = notes.find(n => n.id === id);
    // creating the new object, copies all the values using the spread operator
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote.data)));
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from the server`);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
