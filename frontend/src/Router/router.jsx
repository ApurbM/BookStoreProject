import {createBrowserRouter,RouterProvider} from "react-router";
import  Home  from '../Pages/Home'
import  Order  from '../Pages/Order';
import  App  from '../App';
import  About  from '../Pages/About';
import AllBook from "../Pages/AllBook";
import Login from "../Pages/Login";
import SingIn from "../Pages/SingIn";
import BookInfo from "../Pages/BookInfo";
import Admin from "../adminPanel/admin";
import Orders from "../adminPanel/components/Orders";
import AddBook from "../adminPanel/components/AddBook";
import EditBooks from "../adminPanel/components/EditBooks";
import { Navigate } from "react-router";
import Profile from "../Pages/Profile";
import EditBookInfo from "../adminPanel/components/EditBookInfo";
const router = createBrowserRouter(
[
    {
       path: "/",
       element: <App/>,
       children: [
           {
                path: "/",
                element:<Home/>
           },
           {
                path: "/order",
                element:<Order/>
           },
           {
                path: "/about",
                element:<About/>
           },
           {
               path : '/allBook',
               element:<AllBook/>
           },
           {
               path:'/login',
               element:<Login/>
           },
           {
               path:'/signIn',
               element:<SingIn/>
           },
           {
               path:'/bookinfo/:_id',
               element:<BookInfo/>
           },
           {
          path: "/admin",
          element: <Admin />,
          children: [
            {
             index: true,
             element: <Navigate to="add-book" replace />,
            },
          { path: "add-book", element: <AddBook /> },
          { path: "edit-book", element: <EditBooks /> },
          { path: "edit-book-info/:id", element: <EditBookInfo/> },
          { path: "order", element: <Orders/> },
          ]
          },
          {
           path:'/profile',
           element:<Profile/>
          }
        ] 
    }
]
);

export default router