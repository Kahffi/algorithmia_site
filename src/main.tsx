import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthPage from "./pages/AuthPage.tsx";
import Profile from "./pages/Profile.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import HomePage from "./pages/HomePage.tsx";
import ScanPage from "./pages/ScanPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
  { path: "qr-scanner", element: <ScanPage /> },
  {
    path: "auth/:authType",
    element: <AuthPage />,
  },
  {
    path: "about",
    element: <Profile />,
  },
  {
    path: "admin-algorithmia-24",
    element: <AdminPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <HomePage /> */}

    {/* <LeaderBoard /> */}
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
);
