import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, InputNumber, Select, Button, Card, message, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import dayjs from 'dayjs';
import MercadoPagoModal from '../components/MercadoPagoModal/MercadoPagoModal';
import '../App.css'

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
  const [mostrarModalMP, setMostrarModalMP] = useState(false);


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
      // Se simula un cobro con MP
      setMostrarModalMP(true);
      return;
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
    try {
      const entradasConPrecio = entradas.map((entrada, index) => ({
        ...entrada,
        precio: precios[entrada.tipo],
      }));

      const entradasHtml = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-family: sans-serif;">
        <thead>
          <tr style="background-color: #f0f0f0;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">#</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tipo</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Edad</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${entradasConPrecio
            .map(
              (entrada, i) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${entrada.tipo.toUpperCase()}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${entrada.edad}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${entrada.precio}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
    

      console.log(entradasHtml)
      await emailjs.send(
        'service_ugy99au',
        'template_34uc2dc',
        {
          user_email: userEmail,
          fecha: resumen.fecha,
          tipo_pago: resumen.tipoPago,
          total: resumen.total,
          entradas: entradasHtml,
        },
        'EAiiqrSOqhQcgpuO0'
      );
    } catch (err) {
      console.error(err);
      message.error('Error al enviar el email');
    }

    setLoading(false);
    navigate('/');
  };

  const handlePagoFinalizado = (pago) => {
    console.log("Pago confirmado:", pago);
    Swal.fire({
      icon: "success",
      title: "Compra confirmada",
      html: `
        <p>Entradas: ${cantidad}</p>
        <p>Fecha: ${fechaDayjs.format("DD/MM/YYYY")}</p>
        <p>Pago: ${tipoPago}</p>
        <p>Total: $${total}</p>
      `,
    }).then(() => {
      navigate("/");
    });
  };
  

  return (
    <>      
      <div style={{ maxWidth: 600, margin: "20px auto 0", paddingLeft: 8 }}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
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
              <Button className="btn" type="deafult" onClick={handleAgregarEntrada} block>
                Terminar entradas
              </Button>
            ) : (
              <Button className="btn" type="deafult" onClick={handleAgregarEntrada} block>
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
                <Select
                  onChange={(v) => setTipoPago(v)}
                  placeholder="Selecciona forma de pago"
                >
                  <Option value="efectivo">Efectivo</Option>
                  <Option value="tarjeta">Tarjeta de Crédito (Mercado Pago)</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="deafult" className='btn' onClick={handleConfirm} loading={loading} block>
                  Confirmar y pagar
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Card>
      <MercadoPagoModal
        visible={mostrarModalMP}
        onClose={() => {
          setMostrarModalMP(false);
          setLoading(false);
        }}
        onFinish={handlePagoFinalizado}
        total={total}
      />
    </>
  );
};