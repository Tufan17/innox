import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  /** Your theme override here */
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <MantineProvider theme={theme}>
   <ToastContainer />
      <App />
    </MantineProvider>
  </BrowserRouter>
);
