import React from "react";
import styles from "./addTaske.module.css";

import Navigation from "./Navigation";

import Tasks from "./Tasks";

const AddTaske = ({
  task,
  setTask,
  setAllTask,
  allTask,
  importants,
  setImportants,
  tasksWhatever,
  state,
}) => {
  const [save, setSave] = React.useState([]);
  const [store, setStore] = React.useState([]);
  const data = new Date();
  const jsonP = JSON.parse(localStorage.getItem("storage"));
  const [modal, setModal] = React.useState(false);
  const [sure, setSure] = React.useState(false);
  const [inx, setInx] = React.useState(null);

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

  function addTask(event) {
    event.preventDefault();
    if (
      jsonP &&
      !JSON.parse(localStorage.getItem("storage")).includes(task) &&
      task.length
    ) {
      add();
    } else if (!jsonP && task.length) {
      add();
    }
  }

  function add() {
    const array = localStorage.getItem("storage")
      ? JSON.parse(localStorage.getItem("storage"))
      : [];
    array.push(task);
    setSave(array);
    console.log(array);
    const arrayTemp = [...array];
    const parsed = JSON.stringify(arrayTemp);
    localStorage.setItem("storage", parsed);
    setTask("");
    if (state) {
      const arrayim = localStorage.getItem("importantTask")
        ? JSON.parse(localStorage.getItem("importantTask"))
        : [];
      arrayim.push(task);
      setSave(arrayim);
      const arrayImpTemp = [...arrayim];
      const parsedImp = JSON.stringify(arrayImpTemp);
      localStorage.setItem("importantTask", parsedImp);
      setTask("");
    }
  }

  React.useEffect(() => {
    if (
      localStorage.getItem("storage") ||
      localStorage.getItem("importantTask")
    ) {
      setImportants(JSON.parse(localStorage.getItem("importantTask")));
      setAllTask(JSON.parse(localStorage.getItem("storage")));
    }
  }, [save, setAllTask, setImportants]);

  function confirmation() {
    setModal(false);
    deleteTask(inx);
  }

  function deleteTask(index) {
    const impLocal = JSON.parse(localStorage.getItem("importantTask"));
    const localSto = localStorage.getItem("storage");
    if (impLocal && impLocal.includes(allTask[index])) {
      const indexToRemove = impLocal.indexOf(allTask[index]);
      impLocal.splice(indexToRemove, 1);
      setImportants(impLocal);
      const become = JSON.stringify(impLocal);
      localStorage.setItem("importantTask", become);
    }

    if (localSto) {
      const ars = JSON.parse(localSto);
      ars.splice(index, 1);
      const turningSto = JSON.stringify(ars);
      localStorage.setItem("storage", turningSto);
      setAllTask(ars);
    }
  }

  return (
    <section className={styles.containerGlobal}>
      {modal && (
        <div className={styles.modal} style={{ color: "white" }}>
          <div className={styles.question}>
            {" "}
            <h3>Delete task</h3>
            <span> will be permanently deleted.</span>
          </div>

          <div className={styles.buttons}>
            <button onClick={confirmation}>Delete</button>
            <button className={styles.cancel}>Cancel</button>
          </div>
        </div>
      )}
      <Navigation />
      <div className={styles.todo}>
        <div className={styles.date}>
          <h1 className={styles.myDay}>My day</h1>
          <span className={styles.day}>
            {days[day]}, {months[month]} {numberDay}
          </span>
        </div>

        <Tasks
          tasksWhatever={tasksWhatever}
          allTask={allTask}
          setImportants={setImportants}
          setAllTask={setAllTask}
          importants={importants}
          state={state}
          setModal={setModal}
          sure={sure}
          setInx={setInx}
        />
        <form onSubmit={addTask} className={styles.forms}>
          <div className={styles.add}>
            <input
              value={task}
              className={styles.input}
              onChange={({ target }) => {
                setTask(target.value);
              }}
              type="text"
            />{" "}
            <button onClick={addTask} className={styles.button}>
              add
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTaske;

// )
