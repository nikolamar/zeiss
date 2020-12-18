import React from 'react';
import { Provider } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './pages/home';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store';

const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          // Below is for auto dark / light switch based on time on machine
          // type: prefersDarkMode ? 'dark' : 'light',
          type: 'dark',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="container">
          <Home />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
