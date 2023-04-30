import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import {
  Header,
  Button,
  SearchForm,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const formSubmitHandler = evt => {
    evt.preventDefault();

    if (query.trim() === '') return;

    onSubmit(query.trim());
    setQuery('');
  };

  const handleInputChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  return (
    <Header>
      <SearchForm onSubmit={formSubmitHandler}>
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
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
