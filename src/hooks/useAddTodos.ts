import { useMutation, useQueryClient } from "@tanstack/react-query";
import TodoService, { Todo } from "../services/TodoService";
import { CACHE_KEY_TODOS } from "./constant";



interface addTodoContext {
  previousTodos: Todo[];
}



const useAddTodos = (onAdd: () => void ) => {
	// mistakes using new object of query client which led me to not be able to fetch or invalidates the query
	// useQueryClient lets you to use the instance of the new QueryClient that were defined somewhere
	// variables are the data that we send to the backend
	// while the data is the data that we get from the backend
    const queryClient = useQueryClient();

  	// first type is  the data that we get from the backend, second is the Error type, third is the data that we sent to the backend
  	return  useMutation<Todo, Error, Todo, addTodoContext>({
		mutationFn: TodoService.post, 
		onMutate: (newTodo: Todo) => {
			// this is the original Todo which can be useful
			// for Error handling so we can go back the previous state if something wrong happen
			const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

			// moved the functionalities here onMutate from onSuccess
			queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
				newTodo,
				...todos,
			]);

			onAdd();

			return { previousTodos };
		},

		// first parameter is the data that we fetch or get from the backend,
		// second paramter is the one that we send to the back to update or mutate the existing data that we currently have
		// second parameter is the todo that we created from the client and send it to the backend
    	onSuccess: (savedTodo, newTodo) => {
      	// doesnt work in json place holder

			queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
				todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
			);
    	},
		//second  is our input, our  newly created todo
		// context is the third paramater, is the object that we create and pass the data between the callbacks callbacks
    	onError: (error, newTodo, context) => {
		if (!context) return;
		queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    	},
	})
}


export default useAddTodos;