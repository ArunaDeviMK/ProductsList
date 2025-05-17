import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination.tsx';
import { Link } from 'react-router-dom';
import './DisplayProducts.css'; // Import the CSS for hover styles

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function DisplayProducts() {
  const [data, setData] = useState<Post[]>([]);
  const [perPageData, setPerPageData] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setData(res.data);
        setPerPageData(res.data.slice(0, 10));
      });
  }, []);

  const filteredData = perPageData.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center', padding: '30px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>🛍️ Product List</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 15px',
            width: '280px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '0 20px' }}>
        {filteredData.map(item => (
          <Link
            to={`/post/${item.id}`}
            key={item.id}
            className="product-card"
          >
            <h3 style={{ marginBottom: '10px' }}>{item.title}</h3>
            <p style={{ color: '#555', lineHeight: '1.4' }}>{item.body.slice(0, 80)}...</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <Pagination data={data} setPerPageData={setPerPageData} />
      </div>
    </div>
  );
}
