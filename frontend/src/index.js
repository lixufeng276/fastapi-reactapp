import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "@chakra-ui/core";

import Header from "./components/Header"
import Todos from "./components/Todos"

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Todos />
    </ThemeProvider>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)