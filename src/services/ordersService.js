const API_BASE_URL = 'https://localhost:7223'; 

//get orders
export async function getAllOrders() {
  const response = await fetch(`${API_BASE_URL}/api/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders.');
  }
  return await response.json();
}

//get order by id, fetches order by its ID
export async function getOrderById(id) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order.');
  }
  return await response.json();
}

// post method, for creating an order
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

//put(edit order), updates an order by its ID
export async function updateOrder(id, orderData) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to update order.');
  }

  return response;
}

//delete order method (by id)
export async function deleteOrder(id) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete order.');
  }
  return response;
}


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



