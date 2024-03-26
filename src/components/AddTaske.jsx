import React from "react";
import styles from "./AddTaske.module.css";
import Navigation from "./Navigation";
import Tasks from "./Tasks";
import { useMyContext } from "../context/MyContext";

const AddTaske = ({ state, days, months, numberDay, title }) => {
  const {
    task,
    setTask,
    setImportants,
    setCompleted,
    modal,
    setModal,
    indexDelete,
    editOn,
    setEditOn,
    currentValue,
    setCurrentValue,
    indexChange,
    tasksWhatever,
    setTasksWhatever,
  } = useMyContext();

  //add task part

  const addTask = (event, parameter) => {
    event.preventDefault();
    const jsonP = JSON.parse(localStorage.getItem("storage"));
    if (
      jsonP &&
      !JSON.parse(localStorage.getItem("storage")).includes(parameter) &&
      parameter.length
    ) {
      add(parameter);
    } else if (!jsonP && task.length) {
      add(parameter);
    }
  };

  const add = (taskParameter) => {
    const array = localStorage.getItem("storage")
      ? JSON.parse(localStorage.getItem("storage"))
      : [];
    array.push(taskParameter);
    const arrayTemp = [...array];
    const parsed = JSON.stringify(arrayTemp);
    localStorage.setItem("storage", parsed);
    setTasksWhatever(arrayTemp);
    setTask("");
    if (state) {
      const arrayim = localStorage.getItem("importantTask")
        ? JSON.parse(localStorage.getItem("importantTask"))
        : [];
      arrayim.push(taskParameter);
      const arrayImp = [...arrayim];
      const parsedImp = JSON.stringify(arrayImp);
      localStorage.setItem("importantTask", parsedImp);
      setTasksWhatever(arrayImp);
      setTask("");
    }
  };

  //delete task part

  const deleteTask = (task) => {
    const impLocal = JSON.parse(localStorage.getItem("importantTask"));
    const localSto = JSON.parse(localStorage.getItem("storage"));
    const completedSto = JSON.parse(localStorage.getItem("completed"));

    console.log(impLocal, localSto, completedSto);

    if (localSto && localSto.includes(task)) {
      const ars = [...localSto];
      const indexof = ars.indexOf(task);
      ars.splice(indexof, 1);
      const turningSto = JSON.stringify(ars);
      localStorage.setItem("storage", turningSto);
      setTasksWhatever(ars);
    } else {
      const indexToRemove = completedSto.indexOf(task);
      completedSto.splice(indexToRemove, 1);
      setCompleted(completedSto);
      const become = JSON.stringify(completedSto);
      localStorage.setItem("completed", become);
    }
    if (impLocal && impLocal.includes(task)) {
      const indexToRemove = impLocal.indexOf(task);
      impLocal.splice(indexToRemove, 1);
      setImportants(impLocal);
      const become = JSON.stringify(impLocal);
      localStorage.setItem("importantTask", become);
    }
  };

  //confirmation delete

  const confirmation = () => {
    setModal(false);
    deleteTask(indexDelete);
  };

  //cancel delete

  const cancel = () => {
    setModal(false);
    setEditOn(false);
  };

  //edit task

  const editing = () => {
    if (tasksWhatever[indexChange] !== currentValue && currentValue.length) {
      deleteTask(tasksWhatever[indexChange]); //only that is wrong
      add(currentValue);
      setEditOn(false);
      setCurrentValue("");
    } else {
      setEditOn(false);
      setCurrentValue("");
    }
  };

  //outside click modal of edit

  const outside = (event) => {
    if (event.target === event.currentTarget) {
      setEditOn(false);
    }
  };

  return (
    <section className={styles.containerGlobal}>
      {modal && (
        <div className={styles.modal}>
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
        <div onClick={outside} className={styles.editingTaskContainer}>
          <div className={styles.editingTask}>
            <input
              value={currentValue}
              className={styles.input}
              type="text"
              onChange={({ target }) => {
                setCurrentValue(target.value);
              }}
            />
            <button className={styles.button} onClick={editing}>
              Save
            </button>
            <button
              onClick={cancel}
              className={`${styles.button} ${styles.buttonCancel}`}
            >
              Cancel
            </button>
          </div>
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

        <Tasks />
        <form onSubmit={addTask} className={styles.forms}>
          <div className={styles.add}>
            <input
              placeholder="Add a task"
              value={task}
              className={styles.input}
              onChange={({ target }) => {
                setTask(target.value);
              }}
              type="text"
            />{" "}
            <button
              onClick={(event) => addTask(event, task)}
              className={styles.button}
            >
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
