import React from "react";
import { useMyContext } from "../context/MyContext";
import styles from "./TaskComponent.module.css";
import Star from "../../images/Star.svg?react";

const TaskComponent = ({ task, index }) => {
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
  const checkingCompleted = (task) => completed.includes(task);

  const starImportant = (event, taskP) => {
    const arrayImportant = importantTask ? importantTask : [];
    if (!importantTask || !arrayImportant.includes(taskP)) {
      arrayImportant.push(taskP);
      event.currentTarget.classList.add(`${styles.active}`);
    } else {
      const indexToRemove = arrayImportant.indexOf(taskP);
      if (indexToRemove !== -1) {
        arrayImportant.splice(indexToRemove, 1);
        event.currentTarget.classList.remove(`${styles.active}`);
      }
    }

    setImportants(arrayImportant);
    const arrayTurn = JSON.stringify(arrayImportant);
    localStorage.setItem("importantTask", arrayTurn);
  };

  const divOptions = (event, task) => {
    event.preventDefault();
    setOptions(!options);
    setOptionsTask(task);
  };

  const completingTasks = (event, index) => {
    if (!completed.includes(tasksWhatever[index])) {
      setCompleted([...completed, tasksWhatever[index]]);
      const newWhat = [...tasksWhatever];
      newWhat.splice(index, 1);
      setTasksWhatever(newWhat);
      const lsCompleted = localStorage.getItem("completed");
      const arrayCompleted = lsCompleted ? JSON.parse(lsCompleted) : [];
      arrayCompleted.push(tasksWhatever[index]);
      localStorage.setItem("completed", JSON.stringify(arrayCompleted));
      event.target.checked = false;
    } else {
      uncompleted(completed.indexOf(tasksWhatever[index]));
    }
  };

  const verification = (task) => {
    setModal(true);
    setIndexDelete(task);
  };

  const editing = (index) => {
    setEditOn(!editOn);
    setIndexChange(index);
    setCurrentValue(tasksWhatever[index]);
  };

  const uncompleted = (index) => {
    let newArr = [...completed];
    newArr.splice(index, 1);
    setCompleted(newArr);
  };

  const unmake = (event, index) => {
    const undo = [...completed];
    undo.splice(index, 1);
    setCompleted(undo);
    setTasksWhatever([...tasksWhatever, completed[index]]);
    event.target.checked = true;
  };

  return (
    <div
      key={`${task} important`}
      onContextMenu={(event) => {
        divOptions(event, task);
      }}
      className={styles.taskdid}
    >
      {editOn && <input type="text" />}
      <input
        defaultChecked={checkingCompleted(task) ? true : false}
        onChange={
          checkingCompleted(task)
            ? (event) => {
                unmake(event, index);
              }
            : (event) => completingTasks(event, index)
        }
        className={styles.checking}
        type="checkbox"
        name="checking"
        id={`${task} important`}
      />{" "}
      <div className={checkingCompleted(task) ? styles.risk : ""}>
        {" "}
        <p>{task}</p>
      </div>
      <button
        onClick={(event) => starImportant(event, task)}
        className={`${styles.star} ${
          importantTask.includes(task) ? styles.active : ""
        }`}
      >
        <Star />
      </button>
      {options && optionsTask === task && (
        <div className={styles.options}>
          <ul>
            <li>Remove from My Day</li>
            <li onClick={() => editing(index)}>Edit task</li>
            <li onClick={(event) => starImportant(event, task)}>
              Mark as important
            </li>
            <li
              onClick={() => {
                verification(task);
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
