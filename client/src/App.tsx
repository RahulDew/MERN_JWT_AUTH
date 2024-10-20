import "./global.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EditorPage from "./pages/EditorPage";
import TextEditor from "./components/TextEditor";
import { SignupPage } from "./pages/auth/SignupPage";
import { SigninPage } from "./pages/auth/SigninPage";
import PrivateRoute from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import VideoCallPage from "./pages/VIdeoCallPage";
import { SocketProvider } from "./context/ServerContext";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/about" element={<AboutPage />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/room/:roomId"} element={<VideoCallPage />} />
            <Route path="/document/:id" element={<TextEditor />} />
          </Route>
          <Route path="/" element={<HomePage />} />

          <Route path={"/signup"} element={<SignupPage />} />
          <Route path={"/login"} element={<SigninPage />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
