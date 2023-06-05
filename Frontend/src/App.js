import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuardedRoute from "./AuthGuard";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import ProfilePage from "./components/Profile/ProfilePage";
import UserDevice from "./components/Device/UserDevice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
        <Route
          path="/user/dashboard"
          element={<GuardedRoute Component={DashboardPage} />}
        />
        <Route
          path="/user/device"
          element={<GuardedRoute Component={UserDevice} />}
        />
        <Route
          path="/user/profile"
          element={<GuardedRoute Component={ProfilePage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
