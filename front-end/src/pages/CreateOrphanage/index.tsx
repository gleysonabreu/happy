import React, { ChangeEvent, FormEvent, useState } from 'react';
import { LeafletMouseEvent } from 'leaflet';

import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
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
import api from '../../services/api';

function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const navigation = useNavigate();

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const imagesOrpha = Array.from(event.target.files);
    setImages(imagesOrpha);

    const imagesPreview = imagesOrpha.map(img => {
      return URL.createObjectURL(img);
    });

    setPreviewImages(imagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('/orphanages', data);

    alert('Cadastro realizado com sucesso!.');

    navigation('/app');
  }

  return (
    <PageCreateOrphanage>
      <Sidebar />
      <Main>
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <Legend>Dados</Legend>
            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <InputBlock>
              <Label>Nome</Label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <Label>Sobre</Label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <Label>Fotos</Label>
              <div className="images-container">
                {previewImages.map(image => {
                  return <img key={image} src={image} alt={name} />;
                })}
                <NewImage htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </NewImage>
              </div>
              <input
                onChange={handleSelectImages}
                multiple
                type="file"
                id="image[]"
              />
            </InputBlock>
          </Fieldset>

          <Fieldset>
            <Legend>Visitação</Legend>
            <InputBlock>
              <Label>Instruções</Label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </InputBlock>
            <InputBlock>
              <Label>Horário de atendimento</Label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </InputBlock>
            <InputBlock>
              <Label>Atende fim de semana</Label>
              <ButtonSelect>
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
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
