import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [allTask, setAllTask] = React.useState([]);
  const [task, setTask] = React.useState("");
  const [importants, setImportants] = React.useState([]);
  const [tasksWhatever, setTasksWhatever] = React.useState([]);
  return (
    <MyContext.Provider
      value={{
        allTask,
        setAllTask,
        task,
        setTask,
        importants,
        setImportants,
        tasksWhatever,
        setTasksWhatever,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => useContext(MyContext);


export { MyContext, MyContextProvider, useMyContext };
