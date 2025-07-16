import useTodo from "../hooks/useTodos";

const Todo = () => {
  const { error, data, isLoading } = useTodo();

  if (isLoading) return <p>Loading....</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
};

export default Todo;
