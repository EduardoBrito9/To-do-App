import React from "react";
import AddTaske from "./AddTaske";
import { useMyContext } from "../context/MyContext";

const HomeTasks = () => {
  const { setImportants, setTasksWhatever } = useMyContext();

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
