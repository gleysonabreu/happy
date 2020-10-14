import React from 'react';

import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  PageLading,
  ContentWrapper,
  Main,
  Description,
  Location,
  Title,
  BoldText,
  Span,
} from './styles';
import logoImg from '../../assets/images/logo.svg';

function Lading() {
  return (
    <PageLading>
      <ContentWrapper>
        <img src={logoImg} alt="Happy" />

        <Main>
          <Title>Leve felicidade para o mundo.</Title>
          <Description>
            Visite orfanatos e mude o dia de muitas crianças.
          </Description>
        </Main>

        <Location>
          <BoldText>Caucaia</BoldText>
          <Span>Ceará</Span>
        </Location>

        <Link to="/app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </ContentWrapper>
    </PageLading>
  );
}

export default Lading;
