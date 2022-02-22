import Post from "./Post";
export default function AllPosts({ posts }) {
  return (
      <div style={{display:"flex",flexWrap:"wrap"}}>
        {posts.map((post) => (
          <Post post={post} key={post.title} />
        ))}
      </div>
  
  );
}
