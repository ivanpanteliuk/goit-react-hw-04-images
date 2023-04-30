import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Container } from './App.styled';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const setNextPage = () => setPage(prevPage => prevPage + 1);

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery query={query} page={page} setNextPage={setNextPage} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
}
