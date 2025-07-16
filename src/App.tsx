import { useState } from "react";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./components/Todo";
function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Todo />
    </QueryClientProvider>
  );
}

export default App;
