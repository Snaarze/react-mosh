import { useMutation } from "@tanstack/react-query";
import useTodo from "../hooks/useTodos";
import PostForm from "./PostForm";

const Todo = () => {
  const addTodo = useMutation({
    
  });
  const { error, data, isLoading } = useTodo();

  if (isLoading) return <p>Loading....</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="flex flex-col justify-center items-center">
      <PostForm />
      Todo List
      {data?.map((todo) => (
        <li
          key={todo.id}
          className=" border-slate-500 border-1 w-88 text-center rounded-md gap"
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default Todo;
