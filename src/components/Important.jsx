import React from "react";
import AddTaske from "./AddTaske";

const Important = ({
  allTask,
  setAllTask,
  setImportants,
  importants,
  setTask,
  task,
}) => {
  const [storage, setStorage] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.getItem("importantTask")) {
      const importantTasks = localStorage.getItem("importantTask");
      const storedTasks = JSON.parse(importantTasks);
      setStorage([...storedTasks]);
    }
  }, [importants]);

  return (
    <AddTaske
      task={task}
      setTask={setTask}
      setAllTask={setAllTask}
      allTask={allTask}
      tasksWhatever={storage}
      setImportants={setImportants}
      importants={importants}
      state={true}
      title='✰ Important'
    />
  );
};

export default Important;
