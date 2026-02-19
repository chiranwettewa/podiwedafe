import React, { useState } from 'react';

function CourseForm() {
  const [form, setForm] = useState({ id: '', name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://api.podiweda.com/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(form.id),
        name: form.name,
        price: parseFloat(form.price)
      })
    })
      .then(res => res.json())
      .then(data => {
        alert('Course created successfully!');
        setForm({ id: '', name: '', price: '' });
      })
      .catch(err => alert('Error: ' + err.message));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>Create Course</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>ID: </label>
        <input type="number" value={form.id} onChange={e => setForm({...form, id: e.target.value})} required />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Name: </label>
        <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Price: </label>
        <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CourseForm;
