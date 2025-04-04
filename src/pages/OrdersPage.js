import React, { useEffect, useState } from 'react';
import { getAllOrders,getFilteredOrders, deleteOrder } from '../services/ordersService';
import { useNavigate } from 'react-router-dom';
import OrderFilters from 'C:/Users/deniz/source/repos/interfata/my-laundry-frontend/src/OrderFilters';

function OrdersPage() {

    
    const handleFilter = (filters) => {
        getFilteredOrders(filters)
          .then(setOrders)
          .catch(() => alert('Failed to filter orders'));
      };
        

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const loadOrders = () => {
    getAllOrders().then(setOrders).catch(console.error);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  

  return (
    <div>
      <h2>🧺 All Orders</h2>
      <button onClick={() => navigate('/create')}>+ New Order</button>
  

  
      {/* 🔍 Filter Section */}
      <OrderFilters onFilter={handleFilter} />
      
  
         
  
      {/* 🔽 Orders List */}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            #{order.id} - {order.customerId} - {order.status}
            <button onClick={() => navigate(`/edit/${order.id}`)}>Edit</button>
            <button
              onClick={() => {
                if (window.confirm('Delete this order?')) {
                  deleteOrder(order.id).then(loadOrders);
                }
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default OrdersPage;
