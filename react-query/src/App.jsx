import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import Home from "./pages/Home.page";
import SuperHeroes from "./pages/SuperHeroes.page";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import RQSuperHeroes from "./pages/RQSuperHeroes.page";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/super-heroes",
    element: (
      <Layout>
        <SuperHeroes />
      </Layout>
    ),
  },
  {
    path: "/rq-super-heroes",
    element: (
      <Layout>
        <RQSuperHeroes />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
