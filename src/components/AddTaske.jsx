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
  tasksWhatever,
  state,
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
    setTask("");
    if (state) {
      const arrayim = localStorage.getItem("importantTask")
        ? JSON.parse(localStorage.getItem("importantTask"))
        : [];
      arrayim.push(task);
      setSave(arrayim);
      const arrayImpTemp = [...arrayim];
      const parsedImp = JSON.stringify(arrayImpTemp);
      localStorage.setItem("importantTask", parsedImp);
      setTask("");
    }
  }

  React.useEffect(() => {
    if (
      localStorage.getItem("storage") ||
      localStorage.getItem("importantTask")
    ) {
      setImportants(JSON.parse(localStorage.getItem("importantTask")));
      setAllTask(JSON.parse(localStorage.getItem("storage")));
    }
  }, [save, setAllTask, setImportants]);

  return (
    <section className={styles2.containerGlobal}>
      <Navigation />
      <div className={styles2.todo}>
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
        <Tasks
          tasksWhatever={tasksWhatever}
          allTask={allTask}
          setImportants={setImportants}
          setAllTask={setAllTask}
          importants={importants}
          state={state}
        />
      </div>
    </section>
  );
};

export default AddTaske;

// )
