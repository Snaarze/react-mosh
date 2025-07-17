import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { CACHE_KEY_POSTS } from "./constant";
export interface Post{
    id : number,
    title : string | undefined,
    body : string
    userId : number
}

export interface Query {
    pageSize : number;
}
// userId: number | undefined
// paramaters for dynamically updating the posts by id
const usePost = (queries : Query) => {
    // assigning pageParam value as one is best practices, every first render of the page will make the pageParam value as one
    // pageParam is defined and initialized on the query function
    const fetchPost = (pageParam : number) => apiClient.get<Post[]>('/posts', {
        params : {
            _start : (pageParam - 1) * queries.pageSize,
            _limit : queries.pageSize 
        }
    }
        // this is axiosConfig built in for axios for taking an parameter to fetch data dynamically
        // /posts?userId=1 if the user selected the user 1
        //     , {params : {
        // userId
        // }}
    ).then(res => res.data);
   
    const query = useInfiniteQuery<Post[], Error>(
        {
        //      when fetching api the structure of the URL will follow the same pattern
        // example user/1/posts which has a hierarchy for fetching their child elements
        // this conditional statment for userId is for filtering the query and make it readable by taking its parameters depending on the user Selected
        // userId ? ['users', userId, 'posts'] :
        // queryKey will act as your dependencies
        queryKey : CACHE_KEY_POSTS(queries),
        // re-destructure the pageParam and initialized the data to 1
        queryFn : ({pageParam}) => fetchPost(pageParam = 1),
        staleTime : 1 * 60 * 1000,
        // keepPreviousData is deprecated and changed to placeholderData : keepPreviosData to keep tracking the data without reloading the whole data
        placeholderData : keepPreviousData,
        // initialPageParam is now required  to use the useInfiniteQuery as of July 17, 2025 via documentation
        initialPageParam : 1, 
        // allPages is a post array inside a post array
        getNextPageParam : (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
        }
    )

    return query
}

export default usePost;