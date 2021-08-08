import React from 'react';
import './App.css';
import Averages from '../Sections/Averages';
import NavBar from '../Components/NavBar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import DataGrid from '../Sections/DataGrid';
import AddMetrics from '../Sections/AddMetrics';


const theme = createTheme({
  
  palette:{
    primary:{
      main: '#3cf',
      light: '#3c44b126'
    },

    secondary:{
      main: '#f83245',
      light: '#f8324526'
    },

    background:{
      default: '#f4f5fd'
    }
  }
  
});


function App() {
  return (
    <ThemeProvider theme={theme}>
        <NavBar />
        <Averages />
        <AddMetrics />
        <DataGrid />
        <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
