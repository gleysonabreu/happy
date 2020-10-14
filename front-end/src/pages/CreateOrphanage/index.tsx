import React from 'react';

import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import {
  PageCreateOrphanage,
  Main,
  Form,
  Fieldset,
  Legend,
  Label,
  InputBlock,
  NewImage,
  ButtonSelect,
  ConfirmButton,
} from './styles';
import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/mapIcon';

function CreateOrphanage() {
  return (
    <PageCreateOrphanage>
      <Sidebar />
      <Main>
        <Form>
          <Fieldset>
            <Legend>Dados</Legend>
            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              <Marker
                interactive={false}
                icon={mapIcon}
                position={[-27.2092052, -49.6401092]}
              />
            </Map>

            <InputBlock>
              <Label>Nome</Label>
              <input id="name" />
            </InputBlock>

            <InputBlock>
              <Label>Sobre</Label>
              <textarea id="name" maxLength={300} />
            </InputBlock>

            <InputBlock>
              <Label>Fotos</Label>
              <div className="uploaded-image" />
              <NewImage>
                <FiPlus size={24} color="#15b6d6" />
              </NewImage>
            </InputBlock>
          </Fieldset>

          <Fieldset>
            <Legend>Visitação</Legend>
            <InputBlock>
              <Label>Instruções</Label>
              <textarea id="instructions" />
            </InputBlock>
            <InputBlock>
              <Label>Horário de atendimento</Label>
              <input id="opening_hours" />
            </InputBlock>
            <InputBlock>
              <Label>Atende fim de semana</Label>
              <ButtonSelect>
                <button type="button" className="active">
                  Sim
                </button>
                <button type="button">Não</button>
              </ButtonSelect>
            </InputBlock>
          </Fieldset>
          <ConfirmButton type="submit">Confirmar</ConfirmButton>
        </Form>
      </Main>
    </PageCreateOrphanage>
  );
}

export default CreateOrphanage;
