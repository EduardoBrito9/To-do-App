import React from "react";
import styles from "./addTaske.module.css";
import { json } from "react-router-dom";
import Navigation from "./Navigation";
import styles2 from "./ToDo.module.css";
import Tasks from "./Tasks";

const AddTaske = ({
  task,
  setTask,
  setAllTask,
  allTask,
  importants,
  setImportants,
  tasksWhatever
}) => {
  const [save, setSave] = React.useState([]);
  const [store, setStore] = React.useState([]);

  const jsonP = JSON.parse(localStorage.getItem("storage"));

  function addTask(event) {
    event.preventDefault();

    if (
      jsonP &&
      !JSON.parse(localStorage.getItem("storage")).includes(task) &&
      task.length
    ) {
      add();
    } else if (!jsonP && task.length) {
      add();
    }
  }

  function add() {
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

  React.useEffect(() => {
    if (localStorage.getItem("storage")) {
      setAllTask(JSON.parse(localStorage.getItem("storage")));
    }
  }, [save, setAllTask]);

  return (
    <section className={styles.containerGlobal}>
      <div className={styles2.todo}>
        <Navigation />
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
      </div>
      <Tasks
        tasksWhatever={tasksWhatever}
        allTask={allTask}
        setImportants={setImportants}
        setAllTask={setAllTask}
        importants={importants}
      />
    </section>
  );
};

export default AddTaske;

// )
