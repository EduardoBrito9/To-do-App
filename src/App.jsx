import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import Important from "./components/Important";
import HomeTasks from "./components/HomeTasks";
import {
  MyContextProvider,
  MyContext,
  useMyContext,
} from "./context/MyContext";

const App = () => {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <div className="titlesPart">
          <h1 className="titleTo">Welcome to To do App</h1>
          <span className="create">
            - create by <strong>Eduardo Brito</strong>{" "}
          </span>
        </div>

        <section className="container">
          <MyContext.Consumer>
            {(context) => (
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route
                  path="/important"
                  element={
                    <Important
                      task={context.task}
                      setTask={context.setTask}
                      setAllTask={context.setAllTask}
                      setImportants={context.setImportants}
                      allTask={context.allTask}
                      importants={context.importants}
                      tasksWhatever={context.tasksWhatever}
                      setTasksWhatever={context.setTasksWhatever}
                    />
                  }
                />
                <Route
                  path="/home"
                  element={
                    <HomeTasks
                      task={context.task}
                      setTask={context.setTask}
                      setAllTask={context.setAllTask}
                      setImportants={context.setImportants}
                      allTask={context.allTask}
                      importants={context.importants}
                      tasksWhatever={context.tasksWhatever}
                      setTasksWhatever={context.setTasksWhatever}
                    />
                  }
                />
              </Routes>
            )}
          </MyContext.Consumer>
        </section>
      </BrowserRouter>
    </MyContextProvider>
  );
};

export default App;
