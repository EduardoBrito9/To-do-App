import React from "react";
import AddTaske from "./AddTaske";
import { useMyContext } from "../context/MyContext";

const Important = () => {
  const { importants, setTasksWhatever } = useMyContext();

  const [storage, setStorage] = React.useState([]);

  React.useEffect(() => {
    const impBox = localStorage.getItem("importantTask");
    if (impBox) {
      const completeds = JSON.parse(localStorage.getItem("completed"));
      const storedTasks = JSON.parse(impBox).filter(
        (item) => !completeds.includes(item),
      );
      setStorage([...storedTasks]);
      setTasksWhatever([...storedTasks]);
    }
  }, [importants, setTasksWhatever]);

  return <AddTaske state={true} title="✰ Important" />;
};

export default Important;
