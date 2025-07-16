import usePost from "../hooks/usePost";

const PostList = () => {
  const { data, error, isLoading } = usePost();

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading....</p>;
  return (
    <div className=" h-screen flex flex-wrap gap-10 items-center justify-center">
      {data?.map((post) => (
        <div key={post.id} className="w-62 h-70 border-1 border-black ">
          <p>Title : {post.title}</p>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
