import ReactDOM from "react-dom";
import App from "./App.js";
import axios from "axios";

const promise = axios.get("http://localhost:3001/persons").then((response) => {
  const notes = response.data;
  console.log(notes);
});
console.log(promise);


ReactDOM.render(<App />, document.getElementById("root"));
