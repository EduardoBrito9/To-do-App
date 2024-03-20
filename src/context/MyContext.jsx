import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [allTask, setAllTask] = React.useState([]);
  const [task, setTask] = React.useState("");
  const [importants, setImportants] = React.useState([]);
  const [tasksWhatever, setTasksWhatever] = React.useState([]);
  const [completed, setCompleted] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [inx, setInx] = React.useState(null);
  const [editOn, setEditOn] = React.useState(false);
  const [actualValue, setActualValue] = React.useState("");
  const [indexChange, setIndexChange] = React.useState(null);
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
        completed,
        setCompleted,
        modal,
        setModal,
        inx,
        setInx,
        editOn,
        setEditOn,
        actualValue,
        setActualValue,
        indexChange,
        setIndexChange,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => useContext(MyContext);

export { MyContext, MyContextProvider, useMyContext };
