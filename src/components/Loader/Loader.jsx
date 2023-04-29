import { InfinitySpin } from 'react-loader-spinner';
import { LoaderConatiner } from './Loader.styled';

const InfinityLoader = () => (
  <LoaderConatiner>
    <InfinitySpin width="200" color="#3f51b5" />
  </LoaderConatiner>
);

export default InfinityLoader;
