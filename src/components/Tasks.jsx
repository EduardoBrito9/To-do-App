import React from "react";
import styles from "./Tasks.module.css";
import "../App.css";
import { useMyContext } from "../context/MyContext";
import TaskComponent from "./TaskComponent";

const Tasks = () => {
  const { tasksWhatever, completed, setCompleted } = useMyContext();

  const importantTask = JSON.parse(localStorage.getItem("importantTask"));

  const filteredTasks = tasksWhatever.filter(
    (item) => !completed.includes(item) && !importantTask.includes(item),
  );

  let filteredImportants;
  if (importantTask) {
    filteredImportants = importantTask.filter(
      (item) => !completed.includes(item),
    );
  }

  React.useEffect(() => {
    if (!localStorage.getItem("importantTask")) {
      localStorage.setItem("importantTask", JSON.stringify([]));
    }
  }, []);

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

  React.useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem("completed")));
  }, [setCompleted]);

  return (
    <div className={styles.tasks}>
      {filteredImportants &&
        filteredImportants.map((task) => {
          return <TaskComponent key={task} task={task}  />;
        })}
      {filteredTasks &&
        filteredTasks.map((task) => {
          return <TaskComponent key={task} task={task}  />;
        })}
      {completed.length > 0 && window.location.pathname !== "/important" && (
        <div className={styles.completed}>
          <button className={styles.openCompleted}>
            Completed {completed.length}
          </button>
          {completed.map((task) => (
            <TaskComponent key={task} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
