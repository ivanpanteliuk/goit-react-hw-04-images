import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useCallback } from 'react';
import { imagesApi } from 'services/images-api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import Button from 'components/Button';
import InfinityLoader from 'components/Loader';
import Modal from 'components/Modal';

export default function ImageGallery({ query, page, setNextPage }) {
  const [imagesArr, setImagesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [perPage] = useState(12);
  const getImages = useCallback(
    async (searchQuery, currentPage) => {
      try {
        setIsLoading(true);
        const { totalHits, hits } = await imagesApi.fetchImages(
          searchQuery,
          currentPage
        );
        setImagesArr(prevImagesArr => [
          ...prevImagesArr,
          ...imagesApi.normalizeData(hits),
        ]);
        setIsVisible(Math.ceil(totalHits / perPage) !== page);
      } catch (error) {
        setIsVisible(false);
        toast.error(`${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [page, perPage]
  );

  useEffect(() => {
    if (query === '') return;

    if (page > 1) {
      getImages(query, page);
      return;
    }

    setImagesArr([]);
    getImages(query);
  }, [getImages, page, query]);

  const onLoadMoreClick = () => {
    setNextPage();
  };

  const toggleModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <List>
        {imagesArr.length !== 0 && (
          <ImageGalleryItem images={imagesArr} showModal={toggleModal} />
        )}
      </List>
      {isLoading && <InfinityLoader />}
      {isVisible && (
        <Button clickHandler={onLoadMoreClick} isLoading={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
      {showModal && (
        <Modal src={largeImageURL} alt={tags} closeModal={toggleModal} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  setNextPage: PropTypes.func.isRequired,
};
