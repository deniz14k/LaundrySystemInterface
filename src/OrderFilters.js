// src/OrderFilters.js
import React, { useState } from 'react';

function OrderFilters({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ searchTerm, status, fromDate, toDate });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search (ID or Phone)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Ready">Ready</option>
      </select>

      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      <button type="submit">Filter</button>
    </form>
  );
}

export default OrderFilters;
