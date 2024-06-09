import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home/index.tsx';
import { SupplierDetails } from './pages/supplier/index.tsx';
import { NewSupplier } from './pages/newSupplier/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/fornecedor/:id",
    element: <SupplierDetails/>,
  },
  {
    path: "/fornecedor/novo",
    element: <NewSupplier/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
