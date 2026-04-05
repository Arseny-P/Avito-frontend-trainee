import type { PostType } from "../../../services/types/Post.type";
import { useAppSelector } from "../../../store";
import Post from "../Post/Post";
import { PostListSlice } from "./PostList.slice";

const PostsList = ({ posts }: { posts: PostType[] }) => {
  const getVision = () => {
    switch (
      useAppSelector((state) => PostListSlice.selectors.getVision(state))
    ) {
      case "table":
        return "repeat(5, 1fr)";
      case "list":
        return "1fr";
    }
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: getVision(),
        rowGap: "12px",
      }}
    >
      {posts.map((post) => (
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
  );
};

export default PostsList;
