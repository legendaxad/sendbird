import { useState } from "react";
import { App as SendbirdApp } from "@sendbird/uikit-react";
import Login from "./login";

import "@sendbird/uikit-react/dist/index.css";
type User = {
  name: string;
  token: string;
  nickname: string;
};
const colorSet = {
  "--sendbird-light-primary-500": "#066858",
  "--sendbird-light-primary-400": "#027d69",
  "--sendbird-light-primary-300": "#259c72",
  "--sendbird-light-primary-200": "#69c085",
  "--sendbird-light-primary-100": "#a8e2ab",
};

const APP_ID: string = process.env.REACT_APP_SENDBIRD_APP_ID || "default-value";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setUser(user);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {user ? (
        <SendbirdApp
          theme="dark"
          colorSet={colorSet}
          appId={APP_ID}
          userId={user.name}
          accessToken={user.token}
          nickname={user.nickname}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
