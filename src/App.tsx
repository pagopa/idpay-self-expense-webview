import { ThemeProvider } from '@emotion/react'
import './App.css'
import { theme } from '@pagopa/mui-italia'
import { BrowserRouter as Router } from "react-router-dom";
import RoutesList from './routing/Routes';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RoutesList />
      </Router>
    </ThemeProvider>
  )
}

export default App
