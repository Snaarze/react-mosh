import useTodo from "../hooks/useTodos";

const Todo = () => {
  const { error, data, isLoading } = useTodo();

  if (isLoading) return <p>Loading....</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="flex flex-col justify-center items-center">
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
