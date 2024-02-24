import React from "react";
import styles from "./Tasks.module.css";
import EditPencil from "../../images/EditPencil.svg?react";
import "../App.css";

const Tasks = ({
  setImportants,
  allTask,
  tasksWhatever,
  state,
  setModal,
  setInx,
  setEditOn,
  editOn,
  setActualValue,
  setIndexChange,
}) => {
  const [save, setSave] = React.useState([]);

  function starImportant(event, index) {
    const importantTask = localStorage.getItem("importantTask");
    const arrayImportant = importantTask ? JSON.parse(importantTask) : [];
    if (!importantTask || !arrayImportant.includes(tasksWhatever[index])) {
      arrayImportant.push(tasksWhatever[index]);
      if (!save.includes(tasksWhatever[index])) {
        setSave(arrayImportant);
      }
      event.target.classList.add(`active`);
    } else {
      const indexToRemove = arrayImportant.indexOf(tasksWhatever[index]);
      if (indexToRemove !== -1) {
        arrayImportant.splice(indexToRemove, 1);
        if (!save.includes(tasksWhatever[index])) {
          setSave(arrayImportant);
        }
        event.target.classList.remove(`active`);
      }
    }

    setImportants(arrayImportant);
    const arrayTurn = JSON.stringify(arrayImportant);
    localStorage.setItem("importantTask", arrayTurn);
  }

  React.useEffect(() => {
    console.log(save);
  }, [save]);

  function verification(index) {
    setModal(true);
    setInx(index);
  }

  function editing(event, index) {
    setEditOn(!editOn);
    setActualValue(allTask[index]);
    setIndexChange(index);
  }

  if (!tasksWhatever) return <div>Any important task was found</div>;
  if (tasksWhatever)
    return (
      <div className={styles.tasks}>
        {tasksWhatever.map((task, index) => {
          if (
            localStorage.getItem("importantTask") &&
            JSON.parse(localStorage.getItem("importantTask")).includes(task)
          ) {
            return (
              <div key={index} className={styles.taskdid}>
                {editOn && <input type="text" />}
                <input
                  className={styles.checking}
                  type="checkbox"
                  name="checking"
                  id="checking"
                />{" "}
                <p>{task}</p>
                <button className={styles.pencil}>
                  <EditPencil />
                </button>
                <button
                  onClick={(event) => starImportant(event, index)}
                  className={`${styles.star} active`}
                >
                  ✰
                </button>
                <button
                  onClick={() => verification(index)}
                  className={styles.delete}
                >
                  X
                </button>
              </div>
            );
          } else if (task) {
            return (
              <div key={index} className={styles.taskdid}>
                <input
                  className={styles.checking}
                  type="checkbox"
                  name="checking"
                  id="checking"
                />{" "}
                <p>{task}</p>
                <button
                  onClick={(event) => editing(event, index)}
                  className={styles.pencil}
                >
                  <EditPencil />
                </button>
                <button
                  onClick={(event) => starImportant(event, index)}
                  className={`${styles.star} ${state ? `active` : ""} `}
                >
                  ✰
                </button>
                <button
                  onClick={() => {
                    verification(index);
                  }}
                  className={styles.delete}
                >
                  X
                </button>
              </div>
            );
          }
        })}
      </div>
    );
};

export default Tasks;
