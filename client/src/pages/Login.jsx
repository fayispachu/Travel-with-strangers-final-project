import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleicon from "../assets/google.png";
import facebookicon from "../assets/facebook.png";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AgencyContext } from "../context/AgencyContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, checkUser } = useContext(UserContext);
  const { checkAgency } = useContext(AgencyContext);
  const [isAgency, setIsAgency] = useState(true);

  const navigate = useNavigate();

  const loginData = async () => {
    try {
      const endpoint = isAgency
        ? "http://localhost:4000/api/agency/login"
        : "http://localhost:4000/api/user/login";

      const payload = { email, password };
      const { data } = await axios.post(endpoint, payload);

      console.log(payload);

      localStorage.setItem("token", data.token);

      if (isAgency) {
        await checkAgency();
      } else {
        setUser(data.document);
        await checkUser();
      }

      console.log("Login success", data);
      navigate("/"); // Redirect after login
    } catch (error) {
      console.log(error, "Error in loginPage");
      alert("Login failed, check your email/password");
    }
  };

  const toggleUser = () => setIsAgency((prev) => !prev);

  return (
    <div className="flex justify-center w-full h-screen py-14 items-center bg-gray-100">
      <div className="drop-shadow-xl w-[90%] md:h-[80vh] h-auto bg-white flex flex-col md:flex-row">
        {/* Left Side */}
        <section
          className={`w-full md:w-[50%] h-[200px] md:h-full text-center flex items-center justify-center flex-col py-24 ${
            isAgency ? "bg-white text-[#33D69F]" : "bg-[#33D69F] text-white"
          }`}
        >
          <h1 className="font-bold text-4xl drop-shadow-2xl">
            {isAgency ? "Agency Portal" : "Welcome"}
          </h1>
          <p className="px-4 mt-2 text-sm">
            {isAgency
              ? "Login here as an agency to host travel packages."
              : "This app lets you travel with strangers."}
          </p>
        </section>

        {/* Right Side */}
        <section
          className={`w-full md:w-[50%] h-full flex flex-col items-center justify-center gap-3 ${
            isAgency ? "bg-[#33D69F] text-white" : "bg-white text-black"
          }`}
        >
          <button
            onClick={toggleUser}
            className={`self-end rounded-l-full px-5 py-2 font-semibold border ${
              isAgency
                ? "bg-white text-[#33D69F] border-white"
                : "bg-[#33D69F] text-white border-[#33D69F]"
            }`}
          >
            {isAgency ? "User" : "Agency"}
          </button>

          <h1 className="font-bold text-2xl mb-10">
            Login as {isAgency ? "Agency" : "User"}
          </h1>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="px-11 py-3 border border-[#33D69F] text-black"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="px-11 py-3 border border-[#33D69F] text-black"
          />

          <div className="flex flex-row gap-5">
            <img className="w-7" src={googleicon} alt="Google login" />
            <img className="w-7" src={facebookicon} alt="Facebook login" />
          </div>

          <button
            type="submit"
            onClick={loginData}
            className={`mt-4 px-[20%] py-3 font-semibold border ${
              isAgency
                ? "bg-white text-[#33D69F] border-white"
                : "bg-[#33D69F] text-white border-[#33D69F]"
            }`}
          >
            Submit
          </button>

          <p className="mt-3 underline cursor-pointer">Forgot password?</p>
          <Link to="/register">
            <h1 className="underline">Sign Up</h1>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Login;
