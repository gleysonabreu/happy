import React from 'react';

import GlobalStyles from './assets/styles/GlobalStyles';
import MainRoutes from './routes';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <GlobalStyles />
      <MainRoutes />
    </>
  );
}

export default App;
