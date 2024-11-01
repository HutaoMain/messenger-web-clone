import { Typography } from "@mui/material";
import messengerLogo from "../assets/messenger_logo.png";
import React, { useState } from "react";
import useAuthStore from "../AuthStore";
import axios from "axios";

export default function Login() {
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); // Track error messages

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        {
          username,
          password,
        }
      );

      if (res.status === 200) {
        setUser(res.data.id);
        console.log("Login successful");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <form className="login-container" onSubmit={(e) => submitLogin(e)}>
      <div className="login-card">
        <img src={messengerLogo} alt="" className="messenger-logo" />
        <Typography
          marginBottom={5}
          marginTop={5}
          variant="body1"
          fontSize={35}
        >
          Connect with your favorite people.
        </Typography>
        <div className="login-form">
          <input
            placeholder="Email or Phone Number"
            className="input-field"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            Continue
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </form>
  );
}
