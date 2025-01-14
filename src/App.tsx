import React from "react";
import "./App.css";
import InfinityPage from "./page/InfinityPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <InfinityPage />
      </QueryClientProvider>
    </div>
  );
}

export default App;
