import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Customers from "./pages/Customers";
import RootLayout from "./components/RootLayout";
import Suppliers from "./pages/Suppliers";
import Sales from "./pages/Sales";
import Expenses from "./pages/Expenses";
import Installments from "./pages/Installments";
import Signin from "./pages/Signin";
import { checkAuthLoader } from "./utils/url";
import Purchases from "./pages/Purchases";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: checkAuthLoader,
      },
      { path: "/cars", element: <Cars />, loader: checkAuthLoader },
      { path: "/customers", element: <Customers />, loader: checkAuthLoader },
      { path: "/expenses", element: <Expenses />, loader: checkAuthLoader },
      { path: "/purchases", element: <Purchases />, loader: checkAuthLoader },
      {
        path: "/installments",
        element: <Installments />,
        loader: checkAuthLoader,
      },
      { path: "/reports", element: <Cars />, loader: checkAuthLoader },
      { path: "/sales", element: <Sales />, loader: checkAuthLoader },
      { path: "/suppliers", element: <Suppliers />, loader: checkAuthLoader },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
