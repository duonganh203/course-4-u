import Counter from "./components/counter";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HeaderHomepae from "./components/header";
import FooterHomepage from "./components/footer";
// import "./assets/css/App.css";
const LayoutUser = () => {
    return (
        <div className='app-container'>
            <HeaderHomepae />
            {/* <Outlet /> */}
            <FooterHomepage />
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
