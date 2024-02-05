import React from "react";
import styles from "./addTaske.module.css";
import { json } from "react-router-dom";

const AddTaske = ({ task, setTask, setAllTask, allTask }) => {
  const [save, setSave] = React.useState([]);
  const [store, setStore] = React.useState([]);

  function addTask(event) {
    event.preventDefault();
    if (task.length) {
      const array = localStorage.getItem("storage")
        ? JSON.parse(localStorage.getItem("storage"))
        : [];
      array.push(task);
      setSave(array);
      console.log(array);
      const arrayTemp = [...array];
      const parsed = JSON.stringify(arrayTemp);
      localStorage.setItem("storage", parsed);
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem('storage')) {
      setAllTask(JSON.parse(localStorage.getItem('storage')));
    }
  }, [save, setAllTask]);

  return (
    <form onSubmit={addTask}>
      <div className={styles.add}>
        <input
          value={task}
          className={styles.input}
          onChange={({ target }) => {
            setTask(target.value);
          }}
          type="text"
        />{" "}
        <button onClick={addTask} className={styles.button}>
          add
        </button>
      </div>
    </form>
  );
};

export default AddTaske;

// )
