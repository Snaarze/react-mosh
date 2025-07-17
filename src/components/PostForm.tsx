import { useRef } from "react";
import useAddTodos from "../hooks/useAddTodos";

const PostForm = () => {
  const todos = useRef<HTMLInputElement>(null);

  const addPosts = useAddTodos(() => {
    if (todos.current !== null) todos.current.value = "";
  });

  return (
    <>
      {addPosts.error && (
        <div className="bg-red-300 p-2 rounded-md">
          {addPosts.error.message}
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (todos.current && todos.current.value)
            addPosts.mutate({
              id: 0,
              title: todos.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <label htmlFor="todo" className="flex gap-2">
          <input
            type="text"
            id="todo"
            name="todo"
            ref={todos}
            className="border-1 border-black rounded-md"
          />
          <button
            disabled={addPosts.isPending}
            type="submit"
            className="bg-cyan-600 text-white  py-1 px-2 rounded-md"
          >
            {" "}
            {addPosts.isPending ? "Adding....." : "Add"}
          </button>
        </label>
      </form>
    </>
  );
};

export default PostForm;
