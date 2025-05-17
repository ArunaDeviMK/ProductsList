import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { add } from '../redux/slice.ts';
import { useDispatch, useSelector } from 'react-redux';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const verified = useSelector((state: any) => state.counting.verified);
const isVerified = verified.includes(Number(id));

  
  const [post, setPost] = useState<Post | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => setPost(res.data));
  }, [id]);

  const handleClick = () => {
    if (!isVerified) {
      dispatch(add(Number(id)));
     
    } else {
      alert("Already verified");
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontFamily: 'Arial, sans-serif'
    }}>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p><strong>ID:</strong> {post.id}</p>
          <p><strong>User ID:</strong> {post.userId}</p>
          <p><strong>Body:</strong> {post.body}</p>
          <button
            style={{
              display: 'inline-block',
              marginTop: '20px',
              textDecoration: 'none',
              color: 'white',
              backgroundColor: '#007bff',
              padding: '10px 16px',
              borderRadius: '6px'
            }}
            onClick={() => navigate("/")}
          >
            ← Back to list
          </button>
          <button
            style={{
              textDecoration: 'none',
              color: 'white',
              backgroundColor: isVerified ? 'gray' : '#28a745',
              padding: '10px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px',
              opacity: isVerified ? 0.7 : 1,
            }}
            onClick={handleClick}
          >
            ✅ Verified
          </button>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}
