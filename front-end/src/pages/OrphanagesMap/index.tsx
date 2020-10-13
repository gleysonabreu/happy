import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import {
  PageMap,
  SideMap,
  HeaderMap,
  Title,
  Description,
  Footer,
  TextBold,
  Span,
} from './styles';

import mapMarkerImg from '../../assets/images/map-marker.svg';

function OrphanageMap() {
  return (
    <PageMap>
      <SideMap>
        <HeaderMap>
          <img src={mapMarkerImg} alt="Happy" />

          <Title>Escolha um orfanato no mapa</Title>
          <Description>
            Muitas crianças estão esperando a sua visita :)
          </Description>
        </HeaderMap>

        <Footer>
          <TextBold>Caucaia</TextBold>
          <Span>Ceará</Span>
        </Footer>
      </SideMap>

      <Map
        center={[-3.6899674, -38.6005319]}
        zoom={14}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
      </Map>

      <Link to="/">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </PageMap>
  );
}

export default OrphanageMap;
