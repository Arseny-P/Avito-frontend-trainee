import type { PostType } from "../../services/types/Post.type";
import Post from "../Post/Post";

const PostsList = ({posts} : {posts: PostType[]}) => {
    
  return (
    <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', 
        rowGap: '12px', 
    }}>
        {posts.map(post => (
        <Post 
            key={post.id} 
            id={post.id}
            category={post.category} 
            title={post.title} 
            price={post.price} 
            needsRevision={post.needsRevision} 
        />
        ))}
    </div>
  )
}

export default PostsList