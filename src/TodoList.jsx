import { useEffect, useState } from "react";
import "./TodoList.css";
import Icone from "./assets/icon.jpg";

function TodoList() {
  const listStorage = localStorage.getItem("List");

  const [list, setList] = useState([
    listStorage ? JSON.parse(listStorage) : [],
  ]);
  const [newItem, setNewItem] = useState("");

  function addItem(form) {
    form.preventDefault();
    if (!newItem) {
      return;
    }
    setList([...list, { text: newItem, isCompleted: false }]);
    setNewItem("");
    document.getElementById("entrance-input").focus();
  }

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(list));
  }, [list]);

  function clicked(index) {
    const listAux = [...list];
    listAux[index].isCompleted = !listAux[index].isCompleted;
    setList(listAux);
  }

  function deleteAll() {
    setList([]);
  }

  function deleteTask(index) {
    const listAux = [...list];
    listAux.splice(index, 1);
    setList(listAux);
  }
  return (
    <div>
      <h1>Task List</h1>
      <form onSubmit={addItem}>
        <input
          id="entrance-input"
          type="text"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
          placeholder="Add a new Task"
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <div className="TaskList">
        <div style={{ textAlign: "center" }}>
          {list.length < 1 ? (
            <img className="icon-center" src={Icone} />
          ) : (
            list.map((item, index) => (
              <div
                key={index}
                className={item.isCompleted ? "item complete" : "item"}
              >
                <span
                  onClick={() => {
                    clicked(index);
                  }}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => {
                    deleteTask(index);
                  }}
                  className="del"
                >
                  Delete
                </button>
              </div>
            ))
          )}
          {list.length > 0 && (
            <button
              onClick={() => {
                deleteAll();
              }}
              className="deleteAll"
            >
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
