import React, { useEffect, useState } from 'react';
import { getAllOrders,getFilteredOrders, deleteOrder } from '../services/ordersService';
import { useNavigate } from 'react-router-dom';
import OrderFilters from '../OrderFilters';



function OrdersPage() {

    
  const handleFilter = (filters) => {
    getFilteredOrders(filters)
      .then(setOrders)
      .catch(() => alert('Failed to filter orders'));
    setSelectedOrders([]); //clear selection on new filter
  };
        

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  const loadOrders = () => {
    getAllOrders().then(setOrders).catch(console.error);
  };

  useEffect(() => {
    loadOrders();
  }, []);


  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };
  
  const toggleSelectAll = () => {
    const allVisibleIds = orders.map((o) => o.id);
    const allSelected = allVisibleIds.every((id) => selectedOrders.includes(id));
  
    if (allSelected) {
      setSelectedOrders((prev) => prev.filter((id) => !allVisibleIds.includes(id)));
    } else {
      setSelectedOrders((prev) => [...new Set([...prev, ...allVisibleIds])]);
    }
  };

  const handleBulkUpdate = () => {
    if (!newStatus || selectedOrders.length === 0) {
      alert('Please select a new status and at least one order.');
      return;
    }
  
    const updates = selectedOrders.map((id) => ({
      id,
      status: newStatus,
    }));
  
    fetch('https://localhost:7223/api/orders/bulk-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Bulk update failed');
        return res.text();
      })
      .then(() => {
        alert('Status updated successfully!');
        setSelectedOrders([]);
        setNewStatus('');
        loadOrders();
      })
      .catch((err) => alert(err.message));
  };
  
  

  

  return (
    <div>
      <h2>🧺 All Orders</h2>
      <button onClick={() => navigate('/create')}>+ New Order</button>
  

  
      {/*Filtering*/}  
      <OrderFilters onFilter={handleFilter} /> 
      
  
         
  
      {/*ORder List*/}
      <div style={{ marginBottom: '10px' }}>
  <label>
    <input
      type="checkbox"
      checked={orders.length > 0 && orders.every(o => selectedOrders.includes(o.id))}
      onChange={toggleSelectAll}
    />
    Select All
  </label>

  <select
    value={newStatus}
    onChange={(e) => setNewStatus(e.target.value)}
    style={{ marginLeft: '10px' }}
  >
    <option value="">-- Set Status --</option>
    <option value="Pending">Pending</option>
    <option value="Ready">Ready</option>
  </select>

  <button onClick={handleBulkUpdate} style={{ marginLeft: '10px' }}>
    Update Status
  </button>
</div>

<ul>
  {orders.map((order) => (
    <li key={order.id}>
      <input
        type="checkbox"
        checked={selectedOrders.includes(order.id)}
        onChange={() => toggleOrderSelection(order.id)}
        style={{ marginRight: '5px' }}
      />
      #{order.id} - {order.customerId} - {order.status}
      <button onClick={() => navigate(`/order/${order.id}`)}>Details</button>
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
