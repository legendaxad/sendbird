import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Homepage from "./components/homepage";
import Sendbird from "./components/sendbird";
import Login from "./components/login";

const Router = () => {
  const [user, setUser] = useState<{
    name: string;
    token: string;
    nickname: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleLogin = (user: {
    name: string;
    token: string;
    nickname: string;
  }) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/chat");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/chat" element={<Sendbird />} />
      </Routes>
    </>
  );
};

export default Router;
