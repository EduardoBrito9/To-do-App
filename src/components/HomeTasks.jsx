import React from "react";
import AddTaske from "./AddTaske";
import { useMyContext } from "../context/MyContext";

const HomeTasks = () => {
  const { setImportants, setTasksWhatever } = useMyContext();

  //date
  const data = new Date();

  const year = [
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
  const week = [
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

  React.useEffect(() => {
    if (
      localStorage.getItem("storage") ||
      localStorage.getItem("importantTask")
    ) {
      console.log(JSON.parse(localStorage.getItem("storage")));
      setTasksWhatever(JSON.parse(localStorage.getItem("storage")));
      setImportants(JSON.parse(localStorage.getItem("importantTask")));
    }
  }, [setImportants, setTasksWhatever]);

  return (
    <AddTaske
      title="My day"
      days={week[day]}
      months={year[month]}
      numberDay={numberDay}
    />
  );
};

export default HomeTasks;
