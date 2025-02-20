import { ThemeProvider } from '@emotion/react'
import './App.css'
import { theme } from '@pagopa/mui-italia'
import { BrowserRouter as Router } from "react-router-dom";
import RoutesList from './routing/Routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query.clint';

const basename = import.meta.env.MODE === "development" ? "/" : "/ricevute";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router basename={basename}>
          <RoutesList />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
