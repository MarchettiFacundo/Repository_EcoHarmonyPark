import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Row, Col } from "antd";
import dayjs from "dayjs";
import "./MercadoPagoModal.css";
import logoMP from "../../assets/logoMP.png";
import logoPark from "../../assets/logo.png";

const MercadoPagoModal = ({ visible, onClose, onFinish, total }) => {
  const [form] = Form.useForm();
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [cuotas, setCuotas] = useState([]);

  useEffect(() => {
    if (total > 0) {
      setCuotas([
        { label: `1 cuota de $${total.toFixed(2)}`, value: "1" },
        { label: `3 cuotas de $${(total / 3).toFixed(2)}`, value: "3" },
        { label: `6 cuotas de $${(total / 6).toFixed(2)}`, value: "6" },
      ]);
    }
  }, [total]);

  const formatearTarjeta = (value) => {
    return value
      .replace(/\D/g, "")
      .substring(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const totalFormateado = total.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setProcesandoPago(true);
        setTimeout(() => {
          setProcesandoPago(false);
          onClose();
          onFinish({ ...values, total });
        }, 2000);
      })
      .catch((errorInfo) => {
        console.error("Errores de validación:", errorInfo);
      });
  };

  const handleClose = () => {
    form.resetFields();
    setProcesandoPago(false);
    setCuotas([]);
    onClose();
  };

  return (
    <div>
      {visible && <div className="overlay"></div>}

      <Modal
        title={null}
        open={visible}
        footer={null}
        onCancel={handleClose}
        centered
        width={"80%"}
        styles={{
          body: { padding: 0 },
        }}
        className="custom-modal"
      >
        <div className="modal-bar">
          <img src={logoMP} alt="Logo" className="modal-logo" />
        </div>

        <div className="modal-content">
          {/* Info de pago */}
          <div className="modal-infoSection">
            <div className="modal-circleLogo">
              <img src={logoPark} alt="Parque" />
            </div>
            <div className="modal-pagoInfo">
              <p>Vas a pagar</p>
              <h2>${totalFormateado}</h2>
              <p>Empresa: EcoHarmony Park</p>
            </div>
          </div>

          {/* Parte izquierda - Formulario */}
          <div className="modal-formSection">
            <h3 className="modal-title">Tarjeta de crédito</h3>
            <Form layout="vertical" form={form} validateTrigger="none">
              <Form.Item
                label="Número de tarjeta"
                name="numeroTarjeta"
                rules={[
                  { required: true, message: "Ingresa el número de tarjeta" },
                  {
                    pattern: /^(\d{4} ?){4}$/,
                    message:
                      "Debe contener 16 dígitos (ej: 4509 9535 6623 3704)",
                  },
                ]}
              >
                <Input
                  placeholder="4509 9535 6623 3704"
                  onChange={(e) =>
                    form.setFieldValue(
                      "numeroTarjeta",
                      formatearTarjeta(e.target.value)
                    )
                  }
                />
              </Form.Item>

              <Row gutter={12}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Nombre y apellido"
                    name="nombre"
                    rules={[
                      {
                        required: true,
                        message: "Ingresa el nombre como figura en la tarjeta",
                      },
                    ]}
                  >
                    <Input placeholder="Nombre y Apellido" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Documento" required>
                    <Input.Group compact>
                      <Form.Item
                        name={["documento", "tipo"]}
                        noStyle
                        rules={[{ required: true, message: "Tipo requerido" }]}
                      >
                        <Select style={{ width: "40%" }} placeholder="Tipo">
                          <Select.Option value="DNI">DNI</Select.Option>
                          <Select.Option value="CUIT">CUIT</Select.Option>
                          <Select.Option value="CI">CI</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={["documento", "numero"]}
                        noStyle
                        rules={[
                          { required: true, message: "Número requerido" },
                          {
                            pattern: /^[0-9]+$/,
                            message: "Solo se permiten números",
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "60%" }}
                          placeholder="12511311"
                          onChange={(e) => {
                            const soloNumeros = e.target.value.replace(
                              /\D/g,
                              ""
                            );
                            form.setFieldValue(
                              ["documento", "numero"],
                              soloNumeros
                            );
                          }}
                        />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Fecha de vencimiento"
                    name="vencimiento"
                    rules={[
                      { required: true, message: "Ingresa la fecha" },
                      {
                        validator: (_, value) => {
                          if (!/^\d{2}\/\d{2}$/.test(value)) {
                            return Promise.reject("Formato inválido (MM/YY)");
                          }
                          const [mes, anio] = value.split("/");
                          const ahora = dayjs();
                          const fechaIngresada = dayjs(`20${anio}-${mes}-01`);
                          if (!fechaIngresada.isValid()) {
                            return Promise.reject("Fecha inválida");
                          }
                          if (fechaIngresada.isBefore(ahora, "month")) {
                            return Promise.reject("La tarjeta está vencida");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="10/29" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Código de seguridad"
                    name="codigo"
                    rules={[
                      { required: true, message: "Ingresa el código" },
                      {
                        pattern: /^[0-9]{3,4}$/,
                        message: "Debe tener 3 o 4 números",
                      },
                    ]}
                  >
                    <Input
                      placeholder="123"
                      onChange={(e) => {
                        const soloNumeros = e.target.value.replace(/\D/g, "");
                        form.setFieldValue("codigo", soloNumeros);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Cuotas"
                name="cuotas"
                rules={[{ required: true, message: "Selecciona una opción" }]}
              >
                <Select placeholder="Selecciona cuotas">
                  {cuotas.map((opcion) => (
                    <Select.Option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Botones al final */}
              <div className="modal-actions">
                <Button type="link" onClick={handleClose}>
                  Elige otro medio de pago
                </Button>
                <Button
                  style={{ backgroundColor: "#009EE3", borderColor: "#009EE3" }}
                  type="primary"
                  loading={procesandoPago}
                  onClick={handleSubmit}
                >
                  Continuar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MercadoPagoModal;
