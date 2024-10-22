import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthPage from "./pages/AuthPage.tsx";
import Profile from "./pages/Profile.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "auth/:authType",
    element: <AuthPage />,
  },
  {
    path: "about",
    element: <Profile />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
