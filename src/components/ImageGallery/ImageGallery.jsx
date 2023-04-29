import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { imagesApi } from 'services/images-api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import Button from 'components/Button';
import InfinityLoader from 'components/Loader';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    imagesArr: [],
    page: 1,
    isLoading: false,
    perPage: 12,
    isVisible: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      this.setState({ imagesArr: [], page: 1 });
      this.getImages(query);
    }
    if (prevState.page !== page && page > 1) {
      this.getImages(query, page);
    }
  }

  async getImages(query, page) {
    if (!query) return;
    this.setState({ isLoading: true });
    try {
      const { totalHits, hits } = await imagesApi.fetchImages(
        query,
        page,
        this.perPage
      );
      this.setState(prevState => ({
        imagesArr: [...prevState.imagesArr, ...imagesApi.normalizeData(hits)],
        isVisible:
          Math.ceil(totalHits / this.state.perPage) !== this.state.page,
      }));
    } catch (error) {
      this.setState({ isVisible: false });
      toast.error(`${error}`);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = (largeImageURL, tags) =>
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
      tags,
    }));

  render() {
    const { imagesArr, isLoading, isVisible, showModal, largeImageURL, tags } =
      this.state;
    return (
      <>
        <List>
          {imagesArr.length !== 0 && (
            <ImageGalleryItem images={imagesArr} showModal={this.toggleModal} />
          )}
        </List>
        {isLoading && <InfinityLoader />}
        {isVisible && (
          <Button clickHandler={this.onLoadMoreClick} isLoading={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
        {showModal && (
          <Modal src={largeImageURL} alt={tags} closeModal={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imagesArr: PropTypes.array,
  isLoading: PropTypes.bool,
  isVisible: PropTypes.bool,
  showModal: PropTypes.bool,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGallery;
