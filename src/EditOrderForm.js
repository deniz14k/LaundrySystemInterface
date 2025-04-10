// src/EditOrderForm.js
import React, { useState } from 'react';
import { updateOrder } from './services/ordersService';



function EditOrderForm({ order, onUpdated, onCancel }) {
  const [customerId, setCustomerId] = useState(order.customerId);
  const [telephoneNumber, setTelephoneNumber] = useState(order.telephoneNumber);
  const [status, setStatus] = useState(order.status);
  const [serviceType, setServiceType] = useState(order.serviceType || 'Office');
  const [items, setItems] = useState(order.items);
  const [deliveryAddress, setDeliveryAddress] = useState(order.deliveryAddress || ''); 
  const [observation, setObservation] = useState(order.observation || '');


  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { type: 'Carpet', length: '', width: '' }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      ...order,
      customerId,
      telephoneNumber,
      serviceType,
      deliveryAddress: serviceType === 'PickupDelivery' ? deliveryAddress : null,
      observation,
      status,
      items: items.map(item => ({
        ...item,
        length: item.type === 'Carpet' ? parseFloat(item.length) : null,
        width: item.type === 'Carpet' ? parseFloat(item.width) : null,
      })),
    };
    

    try {
      await updateOrder(order.id, updatedOrder);
      alert('Order updated!');
      onUpdated();
    } catch (err) {
      console.error(err);
      alert('Failed to update order.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editing Order #{order.id}</h3>

      <input
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Customer ID"
        required
      />
      <input
        type="text"
        value={telephoneNumber}
        onChange={(e) => setTelephoneNumber(e.target.value)}
        placeholder="Phone"
        required
      />

{serviceType === 'PickupDelivery' && (
  <input
    type="text"
    placeholder="Delivery Address"
    value={deliveryAddress}
    onChange={(e) => setDeliveryAddress(e.target.value)}
    required
  />
)}


      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Ready">Ready</option>
      </select>

      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
        <option value="Office">Office</option>
        <option value="PickupDelivery">PickupDelivery</option>
      </select>

      <textarea
       placeholder="Observation (optional)"
       value={observation}
       onChange={(e) => setObservation(e.target.value)}
      ></textarea>


      <h4>Items</h4>
      {items.map((item, index) => (
        <div key={index}>
          <select
            value={item.type}
            onChange={(e) => handleItemChange(index, 'type', e.target.value)}
          >
            <option value="Carpet">Carpet</option>
            <option value="Blanket">Blanket</option>
          </select>

          {item.type === 'Carpet' && (
            <>
              <input
                type="number"
                placeholder="Length"
                value={item.length}
                onChange={(e) => handleItemChange(index, 'length', e.target.value)}
              />
              <input
                type="number"
                placeholder="Width"
                value={item.width}
                onChange={(e) => handleItemChange(index, 'width', e.target.value)}
              />
            </>
          )}

          <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
        </div>
      ))}

      <button type="button" onClick={handleAddItem}>Add Item</button>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
}

export default EditOrderForm;
