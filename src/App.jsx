import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthContextProvider } from './context/AuthContext';
import { EditContextProvider } from './context/EditConetext';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import './style.scss'

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
      <AuthContextProvider>
      <EditContextProvider>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
        </EditContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
