import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import App from "./App";
import Content from "./components/Content/Content";
import DetailPost from "./components/Content/DetailPost/DetailPost";
import Participant from "./components/Participant/Participant"
import { Suspense } from 'react'
import NetworkErr from "./routes/networkErr";
const Layout = () => {
    return (
        <Suspense fallback={<div>Loading... </div>}>
            <Routes>
                <Route exact path="/" element={<App />}>
                    <Route path="/" element={<Content />} />
                    <Route path="/posts/:id" element={<DetailPost />} />
                    <Route path="/participant/:id" element={<Participant />} />
                </Route>
                <Route path="/err" element={<NetworkErr />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    )
}

export default Layout