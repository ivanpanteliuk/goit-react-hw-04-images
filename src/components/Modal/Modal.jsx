import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  overlayClickHandler = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.overlayClickHandler}>
        <ModalWindow>
          <img src={src} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
