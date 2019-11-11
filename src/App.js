import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Routes from './Routes';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
      <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
               <Routes />
            </Container>
        </React.Fragment>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
