import React from 'react';
import { Button, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import parqueImg from '../assets/Parque.png';
import '../assets/styles/landingPageStyles.css' 

const { Title, Paragraph } = Typography;
const { Footer, Content } = Layout;

export const LandingPage = ({ onLoginClick }) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '2rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <img
            src={parqueImg}
            alt="Parque"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: '10px',
              marginBottom: '1rem',
              flex: '1 1 300px',
            }}
          />
          <div
            style={{
              flex: '1 1 300px',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <Title level={2}>Bienvenido a EcoHarmony Park</Title>
            <Paragraph>
                Descubrí la magia de la naturaleza en EcoHarmony Park 🌿🦁
            </Paragraph>
            <Paragraph>
                Viví una experiencia inolvidable rodeado de aventura, ideal para familias y grupos de amigos. Tenemos actividades para todas las edades!
                Recorre senderos naturales, alimentá a nuestros animales, tirate por la tirolesa, explorá el parque en un emocionante safari y desafiá tus habilidades en nuestra palestra.
            </Paragraph>
            <Paragraph>
                ¿Listo para la aventura?
            </Paragraph>
            <Button className="btn" type="deafult" onClick={() => navigate('/home')} size="large">
                Comprá tus entradas
            </Button>
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        <div>
          <p>Contacto: info@ecoharmonypark.com | Tel: 0800-888-6245</p>
          <p>Ubicación: Córdoba Capital</p>
        </div>
      </Footer>
    </Layout>
  );
};
