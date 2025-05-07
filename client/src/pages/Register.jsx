import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import googleicon from "../assets/google.png";
import facebookicon from "../assets/facebook.png";

function Register() {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (role === "user") {
        const { data } = await axios.post(
          "http://localhost:4000/api/user/create",
          { name, email, password }
        );
        console.log("User registered: ", data);
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/api/agency/register",
          { agencyName, email, phone, password }
        );
        alert(`User registered: ${data.msg}`);

        console.log("Agency registered success:", data);
      }
      navigate("/login");
    } catch (error) {
      alert("User register faild");

      console.log(error, "Error in register component, or user already exists");
    }
  };

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/.test(password);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 5 characters, include one letter and one number."
      );
      return;
    }

    handleSubmit();
  };

  const toggleRole = () =>
    setRole((prev) => (prev === "user" ? "agency" : "user"));

  return (
    <div className="flex justify-center w-full h-screen py-14 items-center bg-gray-100">
      <div className="drop-shadow-xl w-[90%] md:h-[80vh] h-auto bg-white flex flex-col md:flex-row">
        {/* Left Side */}
        <section
          className={`w-full md:w-[50%] h-[200px] md:h-full text-center flex items-center justify-center flex-col py-24 ${
            role === "agency"
              ? "bg-white text-[#33D69F]"
              : "bg-[#33D69F] text-white"
          }`}
        >
          <h1 className="font-bold text-4xl drop-shadow-2xl">
            {role === "agency" ? "Agency Register" : "Welcome"}
          </h1>
          <p className="px-4 mt-2 text-sm">
            {role === "agency"
              ? "Register your agency to host travel packages."
              : "Sign up to join and explore trips with others."}
          </p>
        </section>

        {/* Right Side */}
        <section
          className={`w-full md:w-[50%] h-full flex flex-col items-center justify-center gap-3 ${
            role === "agency"
              ? "bg-[#33D69F] text-white"
              : "bg-white text-black"
          }`}
        >
          <button
            onClick={toggleRole}
            className={`self-end rounded-l-full px-5 py-2 font-semibold border ${
              role === "agency"
                ? "bg-white text-[#33D69F] border-white"
                : "bg-[#33D69F] text-white border-[#33D69F]"
            }`}
          >
            {role === "agency" ? "User" : "Agency"}
          </button>

          <h1 className="font-bold text-2xl mb-4">
            Register as {role === "agency" ? "Agency" : "User"}
          </h1>

          {role === "user" ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="px-11 py-3 border border-[#33D69F] text-black"
            />
          ) : (
            <>
              <input
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                type="text"
                placeholder="Agency Name"
                className="px-11 py-3 border border-[#33D69F] text-black"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Phone Number"
                className="px-11 py-3 border border-[#33D69F] text-black"
              />
            </>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="px-11 py-3 border border-[#33D69F] text-black"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="px-11 py-3 border border-[#33D69F] text-black"
          />

          <div className="flex flex-row gap-5 mt-2">
            <img className="w-7" src={googleicon} alt="Google" />
            <img className="w-7" src={facebookicon} alt="Facebook" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleRegister}
            className={`mt-2 px-[20%] py-3 font-semibold border ${
              role === "agency"
                ? "bg-white text-[#33D69F] border-white"
                : "bg-[#33D69F] text-white border-[#33D69F]"
            }`}
          >
            Submit
          </button>

          <Link to="/login">
            <h1 className="underline mt-2">Already have an account? Log in</h1>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Register;
