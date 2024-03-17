import React, { useRef } from "react";
import styles from "./Tasks.module.css";
import EditPencil from "../../images/EditPencil.svg?react";
import "../App.css";
import Star from "../../images/Star.svg?react";

const Tasks = ({
  setImportants,
  allTask,
  tasksWhatever,
  setTasksWhatever,
  state,
  setModal,
  setInx,
  setEditOn,
  editOn,
  setActualValue,
  setIndexChange,
  completed,
  setCompleted,
}) => {
  const [save, setSave] = React.useState([]);
  const [options, setOptions] = React.useState(false);
  const [optionsTask, setOptionsTask] = React.useState(null);


  const filteredTasks = tasksWhatever.filter(
    (item) => !completed.includes(item),
  );

  function starImportant(event, index) {
    const importantTask = localStorage.getItem("importantTask");
    const arrayImportant = importantTask ? JSON.parse(importantTask) : [];
    if (!importantTask || !arrayImportant.includes(tasksWhatever[index])) {
      arrayImportant.push(tasksWhatever[index]);
      if (!save.includes(tasksWhatever[index])) {
        setSave(arrayImportant);
      }
      event.target.classList.add(`${styles.active}`);
    } else {
      const indexToRemove = arrayImportant.indexOf(tasksWhatever[index]);
      if (indexToRemove !== -1) {
        arrayImportant.splice(indexToRemove, 1);
        if (!save.includes(tasksWhatever[index])) {
          setSave(arrayImportant);
        }
        event.target.classList.remove(`${styles.active}`);
      }
    }

    setImportants(arrayImportant);
    const arrayTurn = JSON.stringify(arrayImportant);
    localStorage.setItem("importantTask", arrayTurn);
  }

  React.useEffect(() => {
    const storedTasks = localStorage.getItem("storage");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      const updatedTasks = [...parsedTasks, ...tasksWhatever];

      const cleanedArray = updatedTasks.filter(
        (item, index, array) =>
          array.indexOf(item) === index && !completed.includes(item),
      );

      localStorage.setItem("storage", JSON.stringify(cleanedArray));
    } else {
      localStorage.setItem("storage", JSON.stringify(tasksWhatever));
    }
  }, [tasksWhatever, completed]);

  React.useEffect(() => {
    const completedTasks = localStorage.getItem("completed");
    if (completedTasks) {
      const parsedTasks = JSON.parse(completedTasks);
      const updatedTasks = [...parsedTasks, ...completed];

      const cleanedArray = updatedTasks.filter(
        (item, index, array) =>
          array.indexOf(item) === index && !tasksWhatever.includes(item),
      );

      localStorage.setItem("completed", JSON.stringify(cleanedArray));
    } else {
      localStorage.setItem("completed", JSON.stringify(completed));
    }
  }, [completed, tasksWhatever]);

  function verification(task) {
    setModal(true);
    setInx(task);
  }

  function editing(index) {
    setEditOn(!editOn);
    setActualValue(allTask[index]);
    setIndexChange(index);
  }

  function completingTasks(event, index) {
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
  }

  function uncompleted(index) {
    let newArr = [...completed];
    newArr.splice(index, 1);
    setCompleted(newArr);
  }

  function unmake(event, index) {
    const undo = [...completed];
    undo.splice(index, 1);
    setCompleted(undo);
    setTasksWhatever([...tasksWhatever, completed[index]]);
    event.target.checked = true;
  }

  React.useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem("completed")));
  }, [setCompleted]);

  function divOptions(event, index, task) {
    event.preventDefault();
    setOptions(!options);
    setOptionsTask(task);
  }

  if (!filteredTasks) return <div>Any important task was found</div>;
  if (filteredTasks)
    return (
      <div className={styles.tasks}>
        {filteredTasks.map((task, index) => {
          if (
            localStorage.getItem("importantTask") &&
            JSON.parse(localStorage.getItem("importantTask")).includes(task)
          ) {
            return (
              <div
                onContextMenu={(event) => {
                  divOptions(event, index, task);
                }}
                key={`${index} taskImportant`}
                className={styles.taskdid}
              >
                {editOn && <input type="text" />}
                <input
                  onChange={(event) => {
                    completingTasks(event, index);
                  }}
                  className={styles.checking}
                  type="checkbox"
                  name="checking"
                  id="checking"
                />{" "}
                <p>{task}</p>
                <button
                  onClick={(event) => starImportant(event, index)}
                  className={`${styles.star} ${styles.active}`}
                >
                  <Star />
                </button>
                {options && optionsTask === task && (
                  <div className={styles.options}>
                    <ul>
                      <li>Remove from My Day</li>
                      <li onClick={() => editing(index)}>Edit task</li>
                      <li onClick={(event) => starImportant(event, index)}>
                        Mark as important
                      </li>
                      <li
                        onClick={() => {
                          verification(task);
                        }}
                      >
                        delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            );
          } else if (task) {
            return (
              <div
                onContextMenu={(event) => {
                  divOptions(event, index, task);
                }}
                key={`${index} taskNormal`}
                className={styles.taskdid}
              >
                <input
                  onChange={(event) => {
                    completingTasks(event, index);
                  }}
                  defaultChecked={false}
                  className={styles.checking}
                  type="checkbox"
                  name="checking"
                  id="checking"
                />{" "}
                <p>{task}</p>
                <button
                  onClick={(event) => starImportant(event, index)}
                  className={`${styles.star} ${state ? styles.active : ""} `}
                >
                  <Star />
                </button>
                {options && optionsTask === task && (
                  <div className={styles.options}>
                    <ul>
                      <li>Remove from My Day</li>
                      <li onClick={() => editing(index)}>Edit task</li>
                      <li onClick={(event) => starImportant(event, index)}>
                        Mark as important
                      </li>
                      <li
                        onClick={() => {
                          verification(task);
                        }}
                      >
                        delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            );
          }
        })}
        {completed.length > 0 && window.location.pathname !== "/important" && (
          <div className={styles.completed}>
            <button className={styles.openCompleted}>
              Completed {completed.length}
            </button>
            {completed.map((item, index) => {
              return (
                <div
                  onContextMenu={(event) => {
                    divOptions(event, index, item);
                  }}
                  key={`${index}taskCompleted`}
                  className={styles.taskdid}
                >
                  <input
                    defaultChecked={true}
                    onClick={(event) => {
                      unmake(event, index);
                    }}
                    className={styles.checking}
                    type="checkbox"
                    name="checking"
                    id="checking"
                  />{" "}
                  <div className={styles.risk}>
                    {" "}
                    <p>{item}</p>
                  </div>
                  <button
                    onClick={(event) => starImportant(event, index)}
                    className={`${styles.star} ${state ? styles.active : ""} `}
                  >
                    <Star />
                  </button>
                  {options && optionsTask === item && (
                    <div className={styles.options}>
                      <ul>
                        <li>Remove from My Day</li>
                        <li onClick={() => editing(index)}>Edit task</li>
                        <li onClick={(event) => starImportant(event, index)}>
                          Mark as important
                        </li>
                        <li
                          onClick={() => {
                            verification(item);
                          }}
                        >
                          delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
};

export default Tasks;
