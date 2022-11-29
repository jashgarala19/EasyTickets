import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from './theme'
const root = ReactDOM.createRoot(document.getElementById("root"));


const themee = createTheme({
  palette: {
    primary: {
      main: "#ff4d4d"
    },
    secondary: {
      main: "#ffff",
    },

  },
});

root.render(
 
 
     <ChakraProvider >
       {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <App />
      </ChakraProvider>

    

);

reportWebVitals();
