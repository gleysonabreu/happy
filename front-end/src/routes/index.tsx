import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';
import Lading from '../pages/Lading';
import Orphanage from '../pages/Orphanage';
import OrphanageMap from '../pages/OrphanagesMap';

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lading />} />
        <Route path="/app" element={<OrphanageMap />} />
        <Route path="/orphanage/create" element={<CreateOrphanage />} />
        <Route path="/orphanage/:id" element={<Orphanage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
