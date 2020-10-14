import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: #EBF2F5;
    color: #FFF;
  }

  body, input, button, textarea{
    font:600 18px Nunito, sans-serif;
  }

  .leaflet-container {
    z-index: 5;
  }
  .mapPopup .leaflet-popup-content-wrapper{
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: none;
  }
  .mapPopup .leaflet-popup-content{
    color: #0089A5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mapPopup .leaflet-popup-content a{
    width: 40px;
    height: 40px;
    background-color: #15c3d6;
    box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);

    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .mapPopup .leaflet-popup-tip-container {
    display: none;
  }
`;

export default GlobalStyles;
