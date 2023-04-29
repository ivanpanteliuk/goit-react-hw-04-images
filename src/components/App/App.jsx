import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={this.state.query} />
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
}
