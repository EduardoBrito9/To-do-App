import React from "react";
import styles from "./ToDo.module.css";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AddTaske from "./components/AddTaske";
import Tasks from "./components/Tasks";
import Navigation from "./components/Navigation";
import Important from "./components/Important";
const App = () => {
  const [allTask, setAllTask] = React.useState([]);

  const [task, setTask] = React.useState("");

  const [importants, setImportants] = React.useState([]);

  //splice
 

  return (
    <div className={styles.containerGlobal}>
      <BrowserRouter>
        <Navigation />
        <div className={styles.todo}>
          <AddTaske
            task={task}
            setTask={setTask}
            setAllTask={setAllTask}
            allTask={allTask}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Tasks
                  tasksWhatever={allTask}
                  allTask={allTask}
                  setImportants={setImportants}
                  setAllTask={setAllTask}
                  importants={importants}
                />
              }
            />
            <Route
              path="/important"
              element={
                <Important
                  setAllTask={setAllTask}
                  setImportants={setImportants}
                  allTask={allTask}
                  importants={importants}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
