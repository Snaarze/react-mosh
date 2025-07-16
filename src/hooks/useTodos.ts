import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}


const useTodo = () => {
    const fetchTodo = () =>
    apiClient.get<Todo[]>("/todos").then((res) => res.data);

  const data = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodo,
    staleTime : 10 * 1000
  });

  return data
}

export default useTodo