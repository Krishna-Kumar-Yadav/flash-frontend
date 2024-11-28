import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from '../pages/Home'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import Main from "../pages/Main";
import Info from "../pages/Info";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLoggedInUser } from "../redux/slices/loggedInUser";

const AppRoute = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUser?.data);

    useEffect(() => {
        dispatch(fetchLoggedInUser())
    }, [dispatch])





    return (
        <Router>
            <Routes>
                <Route path="/index" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/" element={!user ? <Main /> : <Home />} />
                <Route path="/info" element={<Info />} />
            </Routes>
        </Router>
    );
}

export default AppRoute;