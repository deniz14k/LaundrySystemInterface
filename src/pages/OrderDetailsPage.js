import React, { useEffect, useState } from 'react';
import { getOrderById } from '../services/ordersService';
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderById(id)
      .then(setOrder)
      .catch(() => alert('Failed to load order.'));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>📄 Order #{order.id} Details</h2>
      <p><b>Customer ID:</b> {order.customerId}</p>
      <p><b>Phone:</b> {order.telephoneNumber}</p>
      <p><b>Service Type:</b> {order.serviceType}</p>
      {order.serviceType === 'PickupDelivery' && (
        <p><b>Delivery Address:</b> {order.deliveryAddress}</p>
      )}
      {order.observation && (
        <p><b>Observation:</b> {order.observation}</p>
      )}
      <p><b>Status:</b> {order.status}</p>
      <p><b>Received Date:</b> {new Date(order.receivedDate).toLocaleString()}</p>
      {order.completedDate && (
        <p><b>Completed Date:</b> {new Date(order.completedDate).toLocaleString()}</p>
      )}

      <h3>🧼 Items</h3>
      <ul>
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.type} — {item.length ?? '-'} x {item.width ?? '-'} → <b>{item.price.toFixed(2)} lei</b>
          </li>
        ))}
      </ul>

      <h3>💰 Total Price: {order.totalPrice.toFixed(2)} lei</h3>

      <button onClick={() => navigate(-1)}>⬅️ Back</button>
    </div>
  );
}

export default OrderDetailsPage;
