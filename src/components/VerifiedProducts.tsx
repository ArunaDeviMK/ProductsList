import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dec } from "../redux/slice.ts";
import { useNavigate } from "react-router-dom";
import './VerifiedProducts.css';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const VerifiedProducts = () => {
  const verified = useSelector((store: any) => store.counting.verified);
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Post[]>(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => setPosts(res.data));
  }, []);

  const verifiedPosts = posts.filter(post => verified.includes(post.id));

  const handleRemoveVerified = (id: number) => {
    dispatch(dec(id));
  };

  return (
    <div className="verified-container">
      <h2 className="verified-title">✅ Verified Products</h2>
      {verifiedPosts.length > 0 ? (
        verifiedPosts.map(product => (
          <div key={product.id} className="verified-card">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-body">{product.body}</p>
            <div className="button-group">
              <button className="back-button" onClick={() => navigate("/")}>
                ← Back to list
              </button>
              <button
                className="unverify-button"
                onClick={() => handleRemoveVerified(product.id)}
              >
                ❌ Unverify
              </button>
            </div>
          </div>
        ))
      ) : (
        <>
          <p className="no-products">No verified products yet.</p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="back-button" onClick={() => navigate("/")}>
              ← Back to list
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifiedProducts;
