import styled from 'styled-components';

export const PageMap = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  a {
    position: absolute;
    z-index: 10;
    right: 40px;
    bottom: 40px;

    width: 64px;
    height: 64px;
    background-color: #15c3d6;
    border-radius: 28px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &hover {
      background: #17d6eb;
    }
  }
`;

export const SideMap = styled.aside`
  width: 440px;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderMap = styled.header``;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 800;
  line-height: 42px;
  margin-top: 64px;
`;

export const Description = styled.p`
  line-height: 28px;
  margin-top: 24px;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  line-height: 24px;
`;

export const TextBold = styled.strong`
  font-weight: 800;
`;

export const Span = styled.span``;
