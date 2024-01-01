import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import store from './redux/app/store'
import { Provider } from 'react-redux'
const theme = createTheme({
  /** Your theme override here */
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <ToastContainer />
        <App />
      </MantineProvider>
    </BrowserRouter>

  </Provider>
);
