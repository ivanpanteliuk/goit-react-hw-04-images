import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ images, showModal }) {
  return images.map(({ id, previewURL, largeImageURL, tags }) => (
    <ListItem
      onClick={() => showModal(largeImageURL, tags)}
      key={id}
      className="gallery-item"
    >
      <Image src={previewURL} alt={tags} loading="lazy" />
    </ListItem>
  ));
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGalleryItem;
