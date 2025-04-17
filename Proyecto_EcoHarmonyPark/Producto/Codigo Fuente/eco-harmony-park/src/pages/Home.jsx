import React, {useState} from 'react';
import { DatePicker, Alert, InputNumber, Button, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const Home = ({ userEmail }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errorMensaje, setErrorMensaje] = useState('');


  const isDayAvailable = (date) => {
    const today = dayjs().startOf('day');
    const day = date.day();
    return date.isAfter(today.subtract(1, 'day')) && day !== 0;
  };
  const onFinish = (values) => {
    const cantidad = values.cantidad;
    console.log('Valores del formulario:', values);
    if (typeof cantidad !== 'number' || isNaN(cantidad)) {
      message.error('Ingresa una cantidad válida.');
      console.log('Cantidad no válida:', cantidad);
      return;
    }

    if (cantidad > 10) {
      setErrorMensaje('No se pueden seleccionar más de 10 entradas.');
      return;
    }

    const fechaFormateada = dayjs(values.fecha);
    navigate('/checkout', {
      state: {
        ...values,
        cantidad,
        fecha: fechaFormateada.toISOString(),
      },
    });
  };


  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form.Item
        label="Selecciona la fecha de visita"
        name="fecha"
        rules={[{ required: true, message: 'Selecciona una fecha válida' }]}
      >
        <DatePicker
          disabledDate={(date) => !isDayAvailable(dayjs(date))}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Cantidad de entradas"
        name="cantidad"
        rules={[{ required: true, message: 'Ingresa una cantidad válida' }]}
      >
        <InputNumber
          min={1}
          style={{ width: '100%' }}
          placeholder="Máximo 10 entradas"
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button className="btn" type="deafult" htmlType="submit" block disabled={!userEmail}>
          Continuar
        </Button>
      </Form.Item>
      {errorMensaje && (
        <div style={{ marginBottom: 16 }}>
          <Alert message={errorMensaje} type="error" showIcon />
        </div>
      )}

      {!userEmail && (
        <div style={{ color: 'red', textAlign: 'center' }}>
          * Inicia sesión para continuar
        </div>
      )}
    </Form>
  );
};
