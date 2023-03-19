import { useEffect } from "react";
import {
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";
import App from "./App";
import Content from "./components/Content/Content";
const Layout = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/content" element={<Content />} />
            </Route>
        </Routes>
    )
}

export default Layout