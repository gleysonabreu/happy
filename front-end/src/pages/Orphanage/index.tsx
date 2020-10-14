import { render } from '@testing-library/react';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo, FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import {
  Footer,
  FooterMap,
  Main,
  MapContainer,
  OpenDetails,
  OrphanageDetails,
  OrphanageDetailsContent,
  OrphanageImages,
  PageOrphanage,
  Side,
} from './styles';
import mapMarkerImg from '../../assets/images/map-marker.svg';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

function Orphanage() {
  return (
    <PageOrphanage>
      <Side>
        <img src={mapMarkerImg} alt="Happy" />
        <Footer>
          <button type="button">
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </Footer>
      </Side>

      <Main>
        <OrphanageDetails>
          <img
            src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
            alt="Lar das meninas"
          />
          <OrphanageImages>
            <button className="activeOrpha" type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
          </OrphanageImages>
          <OrphanageDetailsContent>
            <h1>Lar das meninas</h1>
            <p>
              Presta assistência a crianças de 06 a 15 anos que se encontre em
              situação de risco e/ou vulnerabilidade social.
            </p>
            <MapContainer>
              <Map
                center={[-27.2092052, -49.6401092]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[-27.2092052, -49.6401092]}
                />
              </Map>

              <FooterMap>
                <a href="">Ver rotas no Google Maps</a>
              </FooterMap>
            </MapContainer>

            <hr />
            <h2>Instruções para visita</h2>
            <p>
              Venha como se sentir mais à vontade e traga muito amor para dar.
            </p>

            <OpenDetails>
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
            </OpenDetails>
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </OrphanageDetailsContent>
        </OrphanageDetails>
      </Main>
    </PageOrphanage>
  );
}

export default Orphanage;
