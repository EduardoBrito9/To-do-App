import React from "react";
import { useMyContext } from "../context/MyContext";
import styles from "./TaskComponent.module.css";
import Star from "../../images/Star.svg?react";

const TaskComponent = ({ task }) => {
  const {
    setImportants,
    setTasksWhatever,
    tasksWhatever,
    completed,
    setCompleted,
    setModal,
    setIndexDelete,
    editOn,
    setEditOn,
    setCurrentValue,
    setIndexChange,
  } = useMyContext();
  const [options, setOptions] = React.useState(false);
  const [optionsTask, setOptionsTask] = React.useState(null);
  const importantTask = JSON.parse(localStorage.getItem("importantTask"));
  const checkingCompleted = () => completed.includes(task);

  const starImportant = (event) => {
    const arrayImportant = importantTask ? importantTask : [];
    if (!importantTask || !arrayImportant.includes(task)) {
      arrayImportant.push(task);
      event.currentTarget.classList.add(`${styles.active}`);
    } else {
      const indexToRemove = arrayImportant.indexOf(task);
      if (indexToRemove !== -1) {
        arrayImportant.splice(indexToRemove, 1);
        event.currentTarget.classList.remove(`${styles.active}`);
      }
    }

    setImportants(arrayImportant);
    const arrayTurn = JSON.stringify(arrayImportant);
    localStorage.setItem("importantTask", arrayTurn);
  };

  const divOptions = (event) => {
    event.preventDefault();
    setOptions(!options);
    setOptionsTask(task);
  };

  const completingTasks = (event) => {
    const indexofcompleted = completed.indexOf(task);
    const indexofwhatever = tasksWhatever.indexOf(task);
    console.log(task, indexofcompleted, indexofwhatever);
    if (!completed.includes(task)) {
      setCompleted([...completed, task]);
      const newWhat = [...tasksWhatever];
      newWhat.splice(indexofwhatever, 1);
      setTasksWhatever(newWhat);
      const lsCompleted = localStorage.getItem("completed");
      const arrayCompleted = lsCompleted ? JSON.parse(lsCompleted) : [];
      arrayCompleted.push(task);
      localStorage.setItem("completed", JSON.stringify(arrayCompleted));
      event.target.checked = false;
    }
  };

  const verification = () => {
    setOptions(false);
    setModal(true);
    setIndexDelete(task);
  };

  const editing = () => {
    const indexof = tasksWhatever.indexOf(task);
    setEditOn(!editOn);
    setOptions(false);
    setIndexChange(indexof);
    setCurrentValue(tasksWhatever[indexof]);
  };

  const unmake = (event) => {
    const indof = completed.indexOf(task);
    const undo = [...completed];
    undo.splice(indof, 1);
    setCompleted(undo);
    setTasksWhatever([...tasksWhatever, task]);
    event.target.checked = true;
  };

  return (
    <div
      key={`${task}`}
      onContextMenu={(event) => {
        divOptions(event);
      }}
      className={styles.taskdid}
    >
      <input
        defaultChecked={checkingCompleted() ? true : false}
        onChange={
          checkingCompleted()
            ? (event) => {
                unmake(event);
              }
            : (event) => completingTasks(event)
        }
        className={styles.checking}
        type="checkbox"
        name="checking"
        id={`${task} important`}
      />{" "}
      <div className={checkingCompleted() ? styles.risk : ""}>
        {" "}
        <p>{task}</p>
      </div>
      <button
        onClick={(event) => starImportant(event)}
        className={`${styles.star} ${
          importantTask.includes(task) ? styles.active : ""
        }`}
      >
        <Star />
      </button>
      {options && completed.includes(task) && optionsTask === task && (
        <div className={styles.options}>
          <ul>
            <li
              onClick={() => {
                verification();
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
      {options && !completed.includes(task) && optionsTask === task && (
        <div className={styles.options}>
          <ul>
            <li>Remove from My Day</li>
            <li onClick={() => editing()}>Edit task</li>
            <li onClick={(event) => starImportant(event)}>Mark as important</li>
            <li
              onClick={() => {
                verification();
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskComponent;
