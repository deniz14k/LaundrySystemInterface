import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import CreateOrderPage from './pages/CreateOrderPage';
import EditOrderPage from './pages/EditOrderPage';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Orders</Link> | <Link to="/create">New Order</Link>
      </nav>
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="/create" element={<CreateOrderPage />} />
        <Route path="/edit/:id" element={<EditOrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
