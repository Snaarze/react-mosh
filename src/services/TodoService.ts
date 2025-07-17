import APIClient from "./api-client";

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	userId : number
}
 const TodoService = new APIClient<Todo>('/todos')

 export default TodoService