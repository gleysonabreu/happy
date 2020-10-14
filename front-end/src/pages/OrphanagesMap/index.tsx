import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
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

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

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

        <Marker icon={mapIcon} position={[-3.6899674, -38.6005319]}>
          <Popup
            closeButton={false}
            minWidth={250}
            maxWidth={250}
            className="mapPopup"
          >
            Lar das meninas
            <Link to="/">
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </PageMap>
  );
}

export default OrphanageMap;
