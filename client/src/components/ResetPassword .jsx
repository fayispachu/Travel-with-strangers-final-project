import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/reset-password/${token}`, { password });
      setMsg(res.data.msg);
    } catch (err) {
      console.error("Error in reset password:", err.response || err);
      setMsg(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default ResetPassword;
