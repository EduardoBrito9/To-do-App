import React from "react";
import Tasks from "./Tasks";

const Important = ({  allTask,
  setAllTask,
  setImportants,
  importants,
}) => {
  const [storage, setStorage] = React.useState([]);

  React.useEffect(() => {
    const importantTasks = localStorage.getItem("tasksImp");
    const storedTasks = JSON.parse(importantTasks);
    setStorage([...storedTasks]);
  }, [importants]);

  return <Tasks tasksWhatever={storage} setAllTask={setAllTask} setImportants={setImportants} allTask={allTask}  importants={importants} />;
};

export default Important;
