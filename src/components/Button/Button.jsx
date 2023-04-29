import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = ({ clickHandler, children, isLoading }) => (
  <LoadMoreButton onClick={clickHandler} type="button" disabled={isLoading}>
    {children}
  </LoadMoreButton>
);

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Button;
