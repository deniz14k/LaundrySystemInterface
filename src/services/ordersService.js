// src/services/ordersService.js

const API_BASE_URL = 'https://localhost:7223'; // or wherever your .NET API is running

// GET all orders
export async function getAllOrders() {
  const response = await fetch(`${API_BASE_URL}/api/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders.');
  }
  return await response.json();
}

// GET single order by ID
export async function getOrderById(id) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order.');
  }
  return await response.json();
}

// POST: create new order
export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to create order.');
  }
  return await response.json();
}

// PUT: update existing order
export async function updateOrder(id, orderData) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to update order.');
  }
  // For PUT, you might just get 204, so you can return the status or nothing
  return response;
}

// DELETE: delete order
export async function deleteOrder(id) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete order.');
  }
  return response;
}

// Add this function to src/services/ordersService.js

export async function getFilteredOrders({ searchTerm, status, fromDate, toDate }) {
  const params = new URLSearchParams();

  if (searchTerm) params.append('searchTerm', searchTerm);
  if (status) params.append('status', status);
  if (fromDate) params.append('fromDate', fromDate);
  if (toDate) params.append('toDate', toDate);

  const response = await fetch(`https://localhost:7223/api/orders?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch filtered orders');
  return await response.json();
}



