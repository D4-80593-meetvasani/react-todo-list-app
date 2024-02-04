import React, { useEffect, useState } from "react";
import "./style.css";

// get local storage data

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //add item
  const addItem = () => {
    if (!inputdata) {
      alert("Please Enter Data !");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // delete the items

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElement) => {
      return curElement.id !== index;
    });

    setItems(updatedItems);
  };

  //remove all

  const removeAll = () => {
    setItems([]);
  };

  //local storage inclusion

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo logo" />
            <figcaption>Add your list here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              name=""
              placeholder="Add Items"
              className="form-control"
              value={inputdata}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show all items */}
          <div className="showItems">
            {items.map((curElement) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className="todo-button">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElement.id)}
                    ></i>

                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElement.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Todo;
