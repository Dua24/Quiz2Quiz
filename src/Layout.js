import {
    Route,
    Routes
} from "react-router-dom";
import App from "./App";
import Content from "./components/Content/Content";
import DetailPost from "./components/Content/DetailPost/DetailPost";
import Participant from "./components/Participant/Participant"
const Layout = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Content />} />
                <Route path="/posts/:id" element={<DetailPost />} />
                <Route path="/participant/:id" element={<Participant />} />
            </Route>
        </Routes>
    )
}

export default Layout