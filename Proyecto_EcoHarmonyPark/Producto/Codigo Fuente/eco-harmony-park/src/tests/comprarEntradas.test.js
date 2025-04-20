import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Checkout } from '../pages/Checkout';

test('Intento de compra sin seleccionar forma de pago (debe fallar)', async () => {
  render(<Checkout userEmail="dahnihel@gmail.com" />);

  fireEvent.change(screen.getByLabelText(/Fecha de visita/i), { target: { value: '2025-04-20' } });

  fireEvent.change(screen.getByLabelText(/Cantidad de entradas/i), { target: { value: '1' } });

  fireEvent.change(screen.getByLabelText(/Edad/i), { target: { value: '30' } });

  fireEvent.change(screen.getByLabelText(/Tipo de pase/i), { target: { value: 'VIP' } });

  fireEvent.click(screen.getByText(/Confirmar y pagar/i));

  await waitFor(() => {
    expect(screen.getByText(/Error: Debe seleccionar forma de pago/i)).toBeInTheDocument();
  });
});
