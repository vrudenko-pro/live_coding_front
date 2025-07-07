import { useEffect } from "react";
import "./App.css";
import { AuthPage } from "../src/pages/AuthPage";
import { LoginPage } from "./pages/LoginPage";
import { Refresh } from "./pages/Refresh";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

// import { checkIsAuth, getMe } from "../src/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { MainPage } from "./pages/MainPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/refresh" element={<Refresh />} />
      </Routes>
    </Layout>
  );
};

export default App;
