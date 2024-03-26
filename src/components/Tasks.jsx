import React from "react";
import styles from "./Tasks.module.css";
import "../App.css";
import Star from "../../images/Star.svg?react";
import { useMyContext } from "../context/MyContext";

const Tasks = () => {
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

  const filteredTasks = tasksWhatever.filter(
    (item) => !completed.includes(item),
  );

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

  const verification = (task) => {
    setModal(true);
    setIndexDelete(task);
  };

  const editing = (index) => {
    setEditOn(!editOn);
    setIndexChange(index); //index correto
    setCurrentValue(tasksWhatever[index]); // task correta
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

  React.useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem("completed")));
  }, [setCompleted]);

  const divOptions = (event, task) => {
    event.preventDefault();
    setOptions(!options);
    setOptionsTask(task);
  };

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
                  divOptions(event, task);
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
                  onClick={(event) => starImportant(event, task)}
                  className={`${styles.star} ${styles.active}`}
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
                  divOptions(event, task);
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
                  onClick={(event) => starImportant(event, task)}
                  className={`${styles.star} ${
                    importantTask && importantTask.includes(task)
                      ? styles.active
                      : ""
                  }`}
                >
                  <Star />
                </button>
                {options && optionsTask === task && (
                  <div className={styles.options}>
                    <ul>
                      <li>Remove from My Day</li>
                      <li onClick={() => editing(index)}>Edit task</li>
                      <li onClick={() => starImportant(task)}>
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
                    divOptions(event, item);
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
                    onClick={(event) => starImportant(event, item)}
                    className={`${styles.star} ${
                      importantTask && importantTask.includes(item)
                        ? styles.active
                        : ""
                    }`}
                  >
                    <Star />
                  </button>
                  {options && optionsTask === item && (
                    <div className={styles.options}>
                      <ul>
                        <li>Remove from My Day</li>

                        <li onClick={(event) => starImportant(event, item)}>
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
