import React, { useState, useEffect } from 'react';
import { getAllOrders, getFilteredOrders } from './services/ordersService';
import CreateOrderForm from './CreateOrderForm';
import OrderFilters from './OrderFilters';
import EditOrderForm from './EditOrderForm';
import { deleteOrder } from './services/ordersService';

function App() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const loadOrders = () => {
    getAllOrders()
      .then(setOrders)
      .catch((err) => console.error(err));
  };

  const handleFilter = (filters) => {
    getFilteredOrders(filters)
      .then(setOrders)
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch filtered orders');
      });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-4">
      <h1>🧺 My Laundry Orders</h1>

      {editingOrder ? (
        <EditOrderForm
          order={editingOrder}
          onUpdated={() => {
            setEditingOrder(null);
            loadOrders();
          }}
          onCancel={() => setEditingOrder(null)}
        />
      ) : (
        <>
          <CreateOrderForm onOrderCreated={loadOrders} />
          <OrderFilters onFilter={handleFilter} />
          <ul>
  {orders.map((order) => (
    <li key={order.id}>
      Order #{order.id} | {order.customerId} | {order.telephoneNumber} | {order.status}

      <button onClick={() => setEditingOrder(order)} style={{ marginLeft: '10px' }}>
        Edit
      </button>

      <button
        onClick={() => {
          if (window.confirm(`Delete Order #${order.id}?`)) {
            deleteOrder(order.id)
              .then(() => {
                alert('Order deleted!');
                loadOrders();
              })
              .catch(() => alert('Failed to delete order.'));
          }
        }}
        style={{ marginLeft: '10px', color: 'red' }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>

        </>
      )}
    </div>
  );
}

export default App;
