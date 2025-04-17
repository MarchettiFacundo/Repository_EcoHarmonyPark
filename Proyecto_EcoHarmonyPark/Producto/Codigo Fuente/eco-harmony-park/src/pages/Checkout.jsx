import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, InputNumber, Select, Button, Card, message, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import dayjs from 'dayjs';


const { Option } = Select;
const { Title } = Typography;

const precios = {
  basica: 1000,
  vip: 2000,
};

export const Checkout = ({ userEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fecha, cantidad } = location.state || {};
  const fechaDayjs = dayjs(fecha);

  const [entradaIndex, setEntradaIndex] = useState(0);
  const [entradas, setEntradas] = useState([]);
  const [form] = Form.useForm();
  const [tipoPago, setTipoPago] = useState(null);
  const [loading, setLoading] = useState(false);


  if (!fecha || !cantidad) {
    message.error('Faltan datos. Redirigiendo...');
    navigate('/');
    return null;
  }

  const handleAgregarEntrada = async () => {
    try {
      const entradaData = await form.validateFields();
      const nuevasEntradas = [...entradas, entradaData];
      setEntradas(nuevasEntradas);
      form.resetFields();

      if (entradaIndex + 1 === cantidad) {
      } else {
        setEntradaIndex(entradaIndex + 1);
      }
    } catch (err) {
      console.log('Validación fallida');
    }
  };

  const total = entradas.reduce((acc, entrada) => acc + precios[entrada.tipo], 0);

  const handleConfirm = async () => {
    if (entradas.length !== cantidad || !tipoPago) {
      message.error('Faltan datos por completar');
      return;
    }
    const fechaFormateada = fechaDayjs.format('DD/MM/YYYY');

    setLoading(true);
    const resumen = {
      fecha: fechaFormateada,
      cantidad,
      tipoPago,
      entradas,
      total,
    };
    console.log('Resumen:', resumen);
    console.log('Fecha:', fecha)
    if (tipoPago === 'tarjeta') {
      // Se debe redirigir o simular un cobro con MP
      // =====================================================================
      await Swal.fire({
        title: 'Simulando pago con tarjeta...',
        timer: 2000,
        didOpen: () => Swal.showLoading(),
      });
      //=========================================================================
    }

    await Swal.fire({
      icon: 'success',
      title: 'Compra confirmada',
      html: `
    <p>Entradas: ${cantidad}</p>
    <p>Fecha: ${resumen.fecha}</p>
    <p>Pago: ${tipoPago}</p>
    <p>Total: $${total}</p>
  `,
    });

    // EmailJS para envio de mails o investigar otro servicio
    // ======================================================================================================================
    try {
      await emailjs.send('tu_service_id', 'tu_template_id', {
        user_email: userEmail,
        message: `Compra para el día ${resumen.fecha} - ${cantidad} entradas. Total: $${total}`,
      }, 'tu_user_id');
    } catch (err) {
      message.error('Error al enviar email');
    }
    // ===================================================================================================================

    setLoading(false);
    navigate('/');
  };

  return (
    <>
      <div style={{ maxWidth: 600, margin: '20px auto 0', paddingLeft: 8 }}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          style={{ paddingLeft: 0 }}
        >
          Volver al inicio
        </Button>
      </div>

      <Card title={`Entrada ${entradaIndex + 1} de ${cantidad}`} style={{ maxWidth: 600, margin: '0 auto' }}>
      {entradas.length < cantidad ? (

        <Form form={form} layout="vertical">
          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: 'Selecciona el tipo de entrada' }]}
          >
            <Select placeholder="Selecciona tipo">
              <Option value="basica">Básica - $1000</Option>
              <Option value="vip">VIP - $2000</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Edad"
            name="edad"
            rules={[{ required: true, message: 'Ingresa la edad' }]}
          >
            <InputNumber min={0} max={120} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            {entradaIndex + 1 === cantidad ? (
              <Button type="primary" onClick={handleAgregarEntrada} block>
                Terminar entradas
              </Button>
            ) : (
              <Button type="primary" onClick={handleAgregarEntrada} block>
                Siguiente entrada
              </Button>
            )}
          </Form.Item>
        </Form>
      ):(
        <p>✅ Todas las entradas han sido registradas</p>
      )}

        {entradas.length === cantidad && (
          <>
            <Title level={4}>Total a pagar: ${total}</Title>
            <Form layout="vertical">
              <Form.Item label="Método de pago" required>
                <Select onChange={(v) => setTipoPago(v)} placeholder="Selecciona forma de pago">
                  <Option value="efectivo">Efectivo</Option>
                  <Option value="tarjeta">Tarjeta (Mercado Pago)</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleConfirm} loading={loading} block>
                  Confirmar y pagar
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Card>
      </>
      );
};