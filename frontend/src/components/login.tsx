import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LoginProps = {
  onLogin: (user: { name: string; token: string; nickname: string }) => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (!name || !nickname) {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      // Step 1: Send user data to backend for authentication
      const response = await fetch("http://localhost:7722/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, nickname }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      await createSendbirdUser(data.user.name, data.user.nickname, data.token);

      toast.success("Login successful!");
      onLogin({
        name: data.user.name,
        token: data.token,
        nickname: data.user.nickname,
      });
    } catch (err: any) {
      toast.error(err.message || "server error!");
    } finally {
      setLoading(false);
    }
  };

  const createSendbirdUser = async (
    name: string,
    nickname: string,
    token: string
  ) => {
    const SEND_BIRD_API_TOKEN =
      process.env.REACT_APP_SENDBIRD_API_TOKEN || "default-value";

    try {
      const response = await fetch(`https://api.sendbird.com/v3/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": SEND_BIRD_API_TOKEN,
        },
        body: JSON.stringify({
          user_id: name,
          nickname: nickname,
          access_token: token,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to create Sendbird user"
        );
      }

      console.log("Sendbird user created:", responseData);
    } catch (error) {
      console.error("Error creating Sendbird user:", error);
      toast.error("Error creating Sendbird user!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Ism"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button} disabled={loading}>
        {loading ? "Loading..." : "Enter"}
      </button>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "300px",
    margin: "50px auto",
    textAlign: "center" as const,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;
