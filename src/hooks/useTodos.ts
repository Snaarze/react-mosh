
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "./constant";
import TodoService from "../services/TodoService";
import { Todo } from "../services/TodoService";


const useTodo = () => {
	// fetching the todos api
	const data = useQuery<Todo[], Error>({
		queryKey: CACHE_KEY_TODOS,
		queryFn: TodoService.getAll,
		staleTime : 10 * 1000
	});


  return data
}

export default useTodo