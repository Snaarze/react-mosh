import usePost from "../hooks/usePost";
import React from "react";
import PostForm from "./PostForm";

const PostList = () => {
  // these two used paramaters to control the fetched data from the backend by using the parameters to fetch the data by concatinating the userId
  // const [selectedUser, setSelectedUser] = useState<number>();
  // const { data, error, isLoading } = usePost(selectedUser);

  // this function will be used for adding pagination which will take an object for readability which has the same structure for user filtering
  // when using useInfiniteQuery we cannot use useState compontent since the function already track the page number automatically
  // using the useState will make it inconsistently which could lead to various problem such as caching and data consistency
  // pageSize is the variable for handling how many notes or data we can render in one page
  const pageSize = 3000;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = usePost(
    {
      pageSize,
    }
  );

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading....</p>;
  return (
    <>
      <div className="flex flex-col items-center gap-5">
        {/* removed for creating pagination queries */}
        {/* <select
          className="w-88 border-black border-1 mt-5"
          onChange={(e) => setSelectedUser(+e.target.value)}
          value={selectedUser}
        >
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select> */}
        {/* this is for implementation of next and previous button */}
        {/* <div className="flex gap-2 mt-5">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-cyan-600 text-white px-2 py-1 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-cyan-600 text-white px-2 py-1 rounded-md"
          >
            Next
          </button>
        </div> */}

        <PostForm />
        <ul className="flex flex-col">
          {/* {data?.pages[0].map((post, index) => (
            <li
              key={index}
              className="border-1 border-gray-500 p-1 rounded-lg gap-2"
            >
              {post.title}
            </li>
          ))} */}

          {/* mapping through the pages is not working, as of now idk why but it should work, 
            current solution is using an index to access the directly since the array only consist one array item */}
          {/* solved when mapping with page object i am using curly bracket instead of parenthesis */}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((post) => (
                <li className="px-3 py-1 border-1 border-gray-300 rounded-md">
                  {post.title}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-cyan-700 text-white py-1 px-3 rounded-md"
        >
          {isFetchingNextPage ? "Loading...." : "Load more..."}
        </button>
      </div>
    </>
  );
};

export default PostList;
