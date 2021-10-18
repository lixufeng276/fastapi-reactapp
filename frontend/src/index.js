import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "@chakra-ui/core";
import Header from "./components/Header"
import Todos from "./components/Todos"
import MyDropzone from './components/Dropzone';

function App() {
  
  return (
    <ThemeProvider>
      <Header />
      <Todos />
      <MyDropzone></MyDropzone>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)