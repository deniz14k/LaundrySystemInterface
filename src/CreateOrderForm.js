// src/CreateOrderForm.js
import React, { useState } from 'react';
import { createOrder } from './services/ordersService';



function CreateOrderForm({ onOrderCreated }) {
  const [customerId, setCustomerId] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [serviceType, setServiceType] = useState('Office');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [items, setItems] = useState([
    { type: 'Carpet', length: '', width: '' }
  ]);

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

    const formattedItems = items.map(item => ({
      type: item.type,
      length: item.type === 'Carpet' ? parseFloat(item.length) : null,
      width: item.type === 'Carpet' ? parseFloat(item.width) : null,
    }));

    const newOrder = {
      customerId,
      telephoneNumber,
      serviceType,
      deliveryAddress: serviceType === 'PickupDelivery' ? deliveryAddress : null,
      status: 'Pending',
      items: formattedItems,
    };
    

    try {
      await createOrder(newOrder);
      alert('Order created!');
      onOrderCreated();
    } catch (err) {
      console.error(err);
      alert('Failed to create order.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Order</h2>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Telephone Number"
        value={telephoneNumber}
        onChange={(e) => setTelephoneNumber(e.target.value)}
        required
      />
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
        <option value="Office">Office</option>
        <option value="PickupDelivery">PickupDelivery</option>
      </select>

      {serviceType === 'PickupDelivery' && (
  <input
    type="text"
    placeholder="Delivery Address"
    value={deliveryAddress}
    onChange={(e) => setDeliveryAddress(e.target.value)}
    required
  />
)}


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
      <button type="submit">Create Order</button>
    </form>
  );
}

export default CreateOrderForm;
