import React from "react";
import styles from "./Tasks.module.css";
import { array } from "prop-types";

const Tasks = ({
  importants,
  setImportants,
  allTask,
  setAllTask,
  tasksWhatever,
}) => {
  const [save, setSave] = React.useState([]);

  function starImportant(event, index) {
    const importantTask = localStorage.getItem("importantTask");
    const arrayImportant = importantTask ? JSON.parse(importantTask) : [];
    if (!importantTask || !JSON.parse(importantTask).includes(allTask[index])) {
      arrayImportant.push(allTask[index]);
      if (!save.includes(allTask[index])) {
        setSave(arrayImportant);
      }
      const arrayTurn = JSON.stringify(arrayImportant);
      localStorage.setItem("importantTask", arrayTurn);
    } else if (JSON.parse(importantTask).includes(allTask[index])) {
      arrayImportant.splice(allTask[index], 1);
      setImportants(arrayImportant);
      if (!save.includes(allTask[index])) {
        setSave(arrayImportant);
      }
      const arrayTurn = JSON.stringify(arrayImportant);
      localStorage.setItem("importantTask", arrayTurn);
    }
  }

  React.useEffect(() => {
    console.log("oi");
  }, [save]);

  function deleteTask(index) {
    const localSto = localStorage.getItem("storage");
    if (localSto) {
      const ars = JSON.parse(localSto);
      ars.splice(index, 1);
      const turningSto = JSON.stringify(ars);
      localStorage.setItem("storage", turningSto);
      setAllTask(ars);
    }
  }

  if (!tasksWhatever) return <div>Any important task was found</div>;
  if (tasksWhatever)
    return (
      <div className={styles.tasks}>
        {tasksWhatever.map((task, index) => (
          <div className={styles.taskUser} key={index}>
            <div className={styles.options}>
              <input
                className={styles.checking}
                type="checkbox"
                name="checking"
                id="checking"
              />{" "}
              <p>{task}</p>
              <button
                onClick={(event) => starImportant(event, index)}
                className={styles.star}
              >
                ✰
              </button>
              <button
                onClick={() => deleteTask(index)}
                className={styles.delete}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Tasks;
