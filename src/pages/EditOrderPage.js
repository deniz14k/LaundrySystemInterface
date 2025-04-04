import React, { useEffect, useState } from 'react';
import { getOrderById } from '../services/ordersService';
import EditOrderForm from '../EditOrderForm';
import { useParams, useNavigate } from 'react-router-dom';

function EditOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then(setOrder);
  }, [id]);

  return (
    <div>
      <h2>Edit Order #{id}</h2>
      {order ? (
        <EditOrderForm
          order={order}
          onUpdated={() => navigate('/')}
          onCancel={() => navigate('/')}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditOrderPage;
