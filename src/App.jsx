import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import Important from "./components/Important";
import HomeTasks from "./components/HomeTasks";
import { MyContextProvider } from "./context/MyContext";

const App = () => {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <div className="titlesPart">
          <h1 className="titleApp">Welcome to To do App</h1>
          <span className="create">
            - create by <strong>Eduardo Brito</strong>{" "}
          </span>
        </div>

        <section className="container">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/important" element={<Important />} />
            <Route path="/home" element={<HomeTasks />} />
          </Routes>
        </section>
      </BrowserRouter>
    </MyContextProvider>
  );
};

export default App;
