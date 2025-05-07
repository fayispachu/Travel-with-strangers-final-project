import React, { useState } from "react";
import API from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/forgot-password", { email });
      setMsg(res.data.msg);
    } catch (err) {
      console.error("Error in forgot password:", err.response || err);
      setMsg(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default ForgotPassword;
