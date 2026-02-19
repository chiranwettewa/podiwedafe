import React, { useState, useEffect } from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', price: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch('https://api.podiweda.com/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `https://api.podiweda.com/courses/${editing}` : 'https://api.podiweda.com/courses';
    
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: parseInt(form.id), name: form.name, price: parseFloat(form.price) })
    })
      .then(res => res.json())
      .then(data => {
        if (editing) {
          setCourses(courses.map(c => c.id === editing ? data : c));
        } else {
          setCourses([...courses, data]);
        }
        setForm({ id: '', name: '', price: '' });
        setEditing(null);
      })
      .catch(err => alert('Error: ' + err.message));
  };

  const handleEdit = (course) => {
    setForm({ id: course.id, name: course.name, price: course.price });
    setEditing(course.id);
  };

  const handleDelete = (id) => {
    fetch(`https://api.podiweda.com/courses/${id}`, { method: 'DELETE' })
      .then(() => setCourses(courses.filter(c => c.id !== id)))
      .catch(err => alert('Error: ' + err.message));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Course Management</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>{editing ? 'Edit Course' : 'Add Course'}</h2>
        <input type="number" placeholder="ID" value={form.id} onChange={e => setForm({...form, id: e.target.value})} required style={{ margin: '0.5rem', padding: '0.5rem' }} />
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ margin: '0.5rem', padding: '0.5rem' }} />
        <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required style={{ margin: '0.5rem', padding: '0.5rem' }} />
        <button type="submit" style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ id: '', name: '', price: '' }); }} style={{ padding: '0.5rem 1rem' }}>Cancel</button>}
      </form>

      <h2>Courses List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem' }}>{course.id}</td>
              <td style={{ padding: '0.5rem' }}>{course.name}</td>
              <td style={{ padding: '0.5rem' }}>${course.price}</td>
              <td style={{ padding: '0.5rem' }}>
                <button onClick={() => handleEdit(course)} style={{ marginRight: '0.5rem', padding: '0.3rem 0.8rem' }}>Edit</button>
                <button onClick={() => handleDelete(course.id)} style={{ padding: '0.3rem 0.8rem', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
