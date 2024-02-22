import React from "react";
import styles from "./addTaske.module.css";

import Navigation from "./Navigation";

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
  days,
  months,
  numberDay,
  title,
}) => {
  const [save, setSave] = React.useState([]);
  const [store, setStore] = React.useState([]);
  const jsonP = JSON.parse(localStorage.getItem("storage"));
  const [modal, setModal] = React.useState(false);
  const [sure, setSure] = React.useState(false);
  const [inx, setInx] = React.useState(null);
  const [editOn, setEditOn] = React.useState(false);
  const [actualValue, setActualValue] = React.useState("");
  const [indexChange, setIndexChange] = React.useState(null);

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
    deleteTask(indexChange)
    setEditOn(false)
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

  function confirmation() {
    setModal(false);
    deleteTask(inx);
  }

  function deleteTask(index) {
    const impLocal = JSON.parse(localStorage.getItem("importantTask"));
    const localSto = localStorage.getItem("storage");
    if (impLocal && impLocal.includes(allTask[index])) {
      const indexToRemove = impLocal.indexOf(allTask[index]);
      impLocal.splice(indexToRemove, 1);
      setImportants(impLocal);
      const become = JSON.stringify(impLocal);
      localStorage.setItem("importantTask", become);
    }

    if (localSto) {
      const ars = JSON.parse(localSto);
      ars.splice(index, 1);
      const turningSto = JSON.stringify(ars);
      localStorage.setItem("storage", turningSto);
      setAllTask(ars);
    }
  }

  function cancel() {
    setModal(false);
  }

  return (
    <section className={styles.containerGlobal}>
      {modal && (
        <div className={styles.modal} style={{ color: "white" }}>
          <div className={styles.question}>
            {" "}
            <h3>Delete task</h3>
            <span> will be permanently deleted.</span>
          </div>

          <div className={styles.buttons}>
            <button onClick={confirmation}>Delete</button>
            <button onClick={cancel} className={styles.cancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {editOn && (
        <div className={styles.editingTask}>
          <input
            value={actualValue}
            className={styles.input}
            type="text"
            onChange={({ target }) => {
              setTask(target.value);
              setActualValue(target.value);
            }}
          />
          <button onClick={add}>Save</button>
        </div>
      )}
      <Navigation />
      <div className={styles.todo}>
        <div className={styles.date}>
          <h1 className={days ? styles.myDay : styles.importantTitle}>
            {title}
          </h1>
          {days && (
            <span className={styles.day}>
              {days}, {months} {numberDay}
            </span>
          )}
        </div>

        <Tasks
          tasksWhatever={tasksWhatever}
          allTask={allTask}
          setImportants={setImportants}
          setAllTask={setAllTask}
          importants={importants}
          state={state}
          setModal={setModal}
          sure={sure}
          setInx={setInx}
          setEditOn={setEditOn}
          editOn={editOn}
          actualValue={actualValue}
          setActualValue={setActualValue}
          indexChange={indexChange}
          setIndexChange={setIndexChange}
        />
        <form onSubmit={addTask} className={styles.forms}>
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
    </section>
  );
};

export default AddTaske;

// )
