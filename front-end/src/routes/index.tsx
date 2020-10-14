import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';
import Lading from '../pages/Lading';
import OrphanageMap from '../pages/OrphanagesMap';

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lading />} />
        <Route path="/orphanagemap" element={<OrphanageMap />} />
        <Route path="/createorphanage" element={<CreateOrphanage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
