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
            path:'/admin',
            element:<Admin/>
           }
        ] 
    }
]
);

export default router