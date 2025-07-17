import { Query } from "./usePost"

export const CACHE_KEY_TODOS = ['toods']

export const CACHE_KEY_POSTS = (queries : Query) => ['posts', queries]