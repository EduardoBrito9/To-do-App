import React from "react";
import AddTaske from "./AddTaske";
import { useMyContext } from "../context/MyContext";

const HomeTasks = () => {
  const { allTask, importants, setTasksWhatever } = useMyContext();
  const [storage, setStorage] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.getItem("importantTask")) {
      const importantTasks = localStorage.getItem("importantTask");
      const storedTasks = JSON.parse(importantTasks);
      setStorage([...storedTasks]);
    }
  }, [importants]);

  React.useEffect(() => {
    setTasksWhatever(allTask);
  }, [allTask, setTasksWhatever]);

  const data = new Date();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Marco",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const days = [
    "Domingo",
    "Segunda",
    "Terca",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
  ];
  const month = data.getMonth();
  const day = data.getDay();
  const numberDay = data.getDate();

  return (
    <AddTaske
      days={days[day]}
      months={months[month]}
      numberDay={numberDay}
      title="My day"
    />
  );
};

export default HomeTasks;
