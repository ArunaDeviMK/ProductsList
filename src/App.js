import { Routes, Route, useNavigate } from 'react-router-dom';
import DisplayProducts from './components/DisplayProducts.tsx';
import ProductDetails from './components/ProductDetails.tsx';
import VerifiedProducts from './components/VerifiedProducts.tsx';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
//import { RootState } from './redux/store'; // Replace or remove if you're not using typed Redux

function App() {
  const navigate = useNavigate();
  const count = useSelector((state) => state.counting.cnt);

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          background: 'linear-gradient(to right, #4facfe, #00f2fe)',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo or Brand */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Segoe UI, sans-serif',
            letterSpacing: '0.5px',
          }}
        >
          🛍️ MyStore
        </div>

        {/* Verified Badge */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '6px 12px',
            borderRadius: '24px',
            cursor: 'pointer',
            color: '#0072ff',
            fontWeight: 600,
            fontSize: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
          onClick={() => navigate('/verified')}
          title="Verified Products"
        >
          {count > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: '#ff4757',
                color: 'white',
                borderRadius: '50%',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }}
            >
              {count}
            </span>
          )}
          <FaCheckCircle style={{ marginRight: '8px' }} />
          Verified
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<DisplayProducts />} />
          <Route path="/post/:id" element={<ProductDetails />} />
          <Route path="/verified" element={<VerifiedProducts />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
