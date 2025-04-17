import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../assets/logo-leon-blanco.png'; // Ajusta la ruta según tu estructura


const HeaderComponent = ({ userEmail, setLoginVisible }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#008a20', color: 'white', padding: '1rem 2.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Logo" style={{ height: 40 }} />
        <span style={{ marginLeft: 10, fontWeight: 'bold', fontSize: '18px' }}>
          EcoHarmonyPark
        </span>
      </div>
      <Button className='btn' type="deafult" onClick={() => setLoginVisible(true)}>
        {userEmail ? `Hola ${userEmail}` : 'Login'}
      </Button>
    </div>
  );
};

export default HeaderComponent;
