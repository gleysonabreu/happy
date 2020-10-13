import styled from 'styled-components';
import landingImg from '../../assets/images/landing.svg';

export const PageLading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
`;
export const ContentWrapper = styled.div`
  position: relative;

  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url(${landingImg}) no-repeat 80% center;

  a {
    position: absolute;
    bottom: 0;
    right: 0;

    width: 80px;
    height: 80px;

    background-color: #ffd666;
    border-radius: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    &:hover {
      background-color: #96feff;
    }
  }
`;
export const Main = styled.div`
  max-width: 350px;
`;
export const Location = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  text-align: right;
`;
export const Description = styled.p`
  margin-top: 40px;
  font-size: 24px;
  line-height: 34px;
`;
export const Title = styled.h1`
  font-size: 76px;
  font-weight: 900;
  line-height: 70px;
`;
export const BoldText = styled.strong`
  font-weight: 800;
`;
export const Span = styled.span``;
