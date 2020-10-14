import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Footer, Side } from './styles';
import mapMarkerImg from '../../assets/images/map-marker.svg';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Side>
      <img src={mapMarkerImg} alt="Happy" />
      <Footer>
        <button type="button" onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </Footer>
    </Side>
  );
};

export default Sidebar;
