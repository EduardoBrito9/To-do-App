import React from "react";
import styles from "./Tasks.module.css";

const Tasks = ({
  importants,
  setImportants,
  allTask,
  setAllTask,
  tasksWhatever,
}) => {
  function starImportant(event, index) {
    if (!importants.includes(allTask[index])) {
      setImportants([...importants, allTask[index]]);
      event.target.classList.add(`${styles.active}`);
    } else if (importants.includes(allTask[index])) {
      importants.splice(allTask[index], 1);
      event.target.classList.remove(`${styles.active}`);
    }
  }

  React.useEffect(() => {
    console.log(importants);
    const tasks = [...importants];
    const tasksStrings = JSON.stringify(tasks);
    localStorage.setItem("tasksImp", tasksStrings);
  }, [importants]);

  function deleteTask(index) {
    const array = JSON.parse(localStorage.getItem("storage"));
    const arrayneww = [...array];

    arrayneww.splice(arrayneww[index], 1);
    localStorage.setItem("storage", JSON.stringify(arrayneww));
    setAllTask(arrayneww);
  }

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
            <button onClick={() => deleteTask(index)} className={styles.delete}>
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
