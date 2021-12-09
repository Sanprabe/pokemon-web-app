import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { GameProvider } from '../../GameContext/GameContext'
import Catch from '../Catch/Catch'
import NavBar from "../NavBar/NavBar";
import MyPokes from "../MyPokes/MyPokes";

import "./App.css";

function App () {
  return (
    <GameProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Catch />} />
          <Route path='/myPokes' element={<MyPokes />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
};

export { App }