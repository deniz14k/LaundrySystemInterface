import React from 'react';
import CreateOrderForm from '../CreateOrderForm';
import { useNavigate } from 'react-router-dom';

function CreateOrderPage() {
  const navigate = useNavigate();

  return (
    <div>
      <CreateOrderForm onOrderCreated={() => navigate('/')} />
    </div>
  );
}

export default CreateOrderPage;
