import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Post{
    id : number,
    title : string,
    body : string
}

const usePost = () => {

    const fetchPost = () => apiClient.get<Post[]>('/posts').then(res => res.data);

    const query = useQuery<Post[], Error>({
        queryKey : ['posts'],
        queryFn : fetchPost,
        staleTime : 1 * 60 * 1000
    })

    return query
}

export default usePost;