import { useParams } from 'react-router'
import { useGetSinglePost } from '../services/hooks/useSinglePost';

const PagePost = () => {
  const { id } = useParams();
  const {data, isLoading, isError, error } = useGetSinglePost(id!);
  console.log(data);
  return (
   <></> 
  )
}

export default PagePost