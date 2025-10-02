import "./App.css";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "@components/Error/NotFound";
import ErrorBoundary from "@components/Error/ErrorBoundary";
import LandingLayout from "@layouts/LandingLayout";
import Home from "@pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        { path: "/", element: <Home />, errorElement: <ErrorBoundary /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <div className="antialiased container-lg min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </>
  );
}

export default App;
