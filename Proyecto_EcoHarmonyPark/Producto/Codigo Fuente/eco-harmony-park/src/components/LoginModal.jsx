import React from 'react';
import { Modal, Form, Input, message } from 'antd';

const LoginModal = ({ visible, onClose, onLogin }) => {
  const [form] = Form.useForm();

  const handleLogin = () => {
    form.validateFields()
      .then(({ email }) => {
        onLogin(email);
      })
      .catch(() => {
        message.error('Email es requerido');
      });
  };

  return (
    <Modal
      title="Login"
      open={visible}
      onOk={handleLogin}
      onCancel={onClose}
      okText="Ingresar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Ingresa un email válido' }]}
        >
          <Input placeholder="ejemplo@correo.com" />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Ingresa una contraseña' }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
