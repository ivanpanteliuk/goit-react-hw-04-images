import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { Component } from 'react';
import {
  Header,
  Button,
  SearchForm,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = { query: '' };

  formSubmitHandler = evt => {
    evt.preventDefault();

    if (this.state.query.trim() === '') return;

    this.props.onSubmit(this.state.query.trim());
    this.resetInput();
  };

  resetInput() {
    this.setState({ query: '' });
  }

  handleInputChange = evt => {
    this.setState({ query: evt.currentTarget.value.toLowerCase() });
  };

  render() {
    const { query } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.formSubmitHandler}>
          <Button type="submit">
            <BsSearch size="24px" />
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Searchbar;
