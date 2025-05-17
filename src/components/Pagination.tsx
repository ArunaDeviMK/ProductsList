import React, { useState, useEffect } from 'react';

type PaginationProps = {
  data: any[];
  setPerPageData: (items: any[]) => void;
};

export default function Pagination({ setPerPageData, data }: PaginationProps) {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNos = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    // Load first page by default
    const start = 0;
    const end = itemsPerPage;
    setPerPageData(data.slice(start, end));
  }, [data]);

  const handleClick = (page: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setPerPageData(data.slice(start, end));
    setActivePage(page);
  };

  return (
    <div style={paginationContainerStyle}>
      {pageNos.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          style={{
            ...pageButtonStyle,
            backgroundColor: activePage === page ? '#007bff' : '#f0f0f0',
            color: activePage === page ? '#fff' : '#333',
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

const paginationContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '20px',
  flexWrap: 'wrap',
};

const pageButtonStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '20px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
  color: '#333',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '14px',
};
