import { useEffect } from "react";
import {
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";
import App from "./App";
import Content from "./components/Content/Content";
import DetailPost from "./components/Content/DetailPost/DetailPost";
const Layout = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/posts" element={<Content />} />
                <Route path="/posts/:id" element={<DetailPost />} />
            </Route>
        </Routes>
    )
}

export default Layout