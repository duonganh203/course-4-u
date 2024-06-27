import Counter from "./screens/user.screens/counter";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HeaderHomepae from "./components/user.components/header";
// import "./assets/css/App.css";
const LayoutUser = () => {
    return (
        <div className='app-container'>
            <HeaderHomepae />
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutUser />,
        // errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Counter />,
            },
        ],
    },
]);
function App() {
    return <>{<RouterProvider router={router} />}</>;
}

export default App;
