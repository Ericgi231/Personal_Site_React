import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@styles/GlobalStyles.js'
import { theme } from '@styles/Theme.js'
import App from '@/App.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
