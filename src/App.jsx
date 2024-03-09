import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import Important from "./components/Important";
import HomeTasks from "./components/HomeTasks";

const App = () => {
  const [allTask, setAllTask] = React.useState([]);

  const [task, setTask] = React.useState("");

  const [importants, setImportants] = React.useState([]);
  const [tasksWhatever, setTasksWhatever] = React.useState([])
  return (
    <BrowserRouter>
    <h1 className="ToDoAPP">To do App</h1>
    <section className="container">
      <Routes>
        <Route path="/" element={<StartPage/>}/> 
        <Route
          path="/important"
          element={
            <Important
              task={task}
              setTask={setTask}
              setAllTask={setAllTask}
              setImportants={setImportants}
              allTask={allTask}
              importants={importants}
              tasksWhatever={tasksWhatever}
              setTasksWhatever={setTasksWhatever}
            />
          }
        />
        <Route
          path="/home"
          element={
            <HomeTasks
              task={task}
              setTask={setTask}
              setAllTask={setAllTask}
              setImportants={setImportants}
              allTask={allTask}
              importants={importants}
              tasksWhatever={tasksWhatever}
              setTasksWhatever={setTasksWhatever}
            />
          }
        />
      </Routes>
      </section>
    </BrowserRouter>
  );
};

export default App;
