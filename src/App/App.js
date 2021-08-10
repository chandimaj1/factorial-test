import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

//Sections Components
import NavBar from '../Sections/NavBar';
import MetricsTable from '../Sections/MetricsTable';

//Theme modifications
import themeOverrides from '../Settings/themeOverrides';


const theme = createTheme(themeOverrides);


function App() {
  return (
    <ThemeProvider theme={theme}>
        <NavBar />
        <MetricsTable />
        <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
