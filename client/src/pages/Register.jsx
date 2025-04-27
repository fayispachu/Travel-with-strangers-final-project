import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import googleicon from "../assets/google.png";
import facebookicon from "../assets/facebook.png";
function Register() {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [agencyName, setAgencyName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (role === "user") {
        const { data } = await axios.post(
          "http://localhost:4000/api/user/create",
          {
            name,
            email,
            password,
          }
        );
        console.log("User registered: ", data);
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/api/agency/register",
          {
            agencyName: agencyName,
            email,
            phone,
            password,
          }
        );

        console.log("Agency registered success:", data);
      }
    } catch (error) {
      console.log(error, "Error in register component, or user already exist");
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email with '@'.");
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
  return (
    <>
      <div className="flex justify-center py-14 items-center bg-gray-100">
        <div className="drop-shadow-xl w-[80%] h-[80vh] bg-white flex flex-row">
          {/* Left Panel */}
          <section className="bg-[#33D69F] w-[50%] h-full text-center flx items-center justify-center flex-col py-24">
            <h1 className="font-bold text-4xl text-white drop-shadow-2xl">
              Welcome
            </h1>
            <p>
              This application allows users or agencies to register and connect
              through trips
            </p>
          </section>

          {/* Right Panel */}
          <section className="bg-white w-[50%] h-full flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#33D69F] font-bold text-2xl mb-2">Register</h1>

            {/* Role Selector */}
            <div className="mb-3">
              <label className="mr-2">Register as:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-[#33D69F] px-3 py-1"
              >
                <option value="user">User</option>
                <option value="agency">Agency</option>
              </select>
            </div>

            {/* Conditional Inputs */}
            {role === "user" ? (
              <input
                value={name || agencyName}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="px-11 py-3 border border-[#33D69F]"
              />
            ) : (
              <>
                <input
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  type="text"
                  placeholder="Agency Name"
                  className="px-11 py-3 border border-[#33D69F]"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone Number"
                  className="px-11 py-3 border border-[#33D69F]"
                />
              </>
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="px-11 py-3 border border-[#33D69F]"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type=""
              placeholder="Password"
              className="px-11 py-3 border border-[#33D69F]"
            />

            {/* Icons */}
            <div className="flex flex-row gap-5">
              <img className="w-7" src={googleicon} alt="Google" />
              <img className="w-7" src={facebookicon} alt="Facebook" />
            </div>

            {/* Submit Button */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleLogin}
              className="bg-[#33D69F] px-[20%] py-3 font-semibold border border-[#33D69F]"
            >
              Submit
            </button>

            <Link to="/login">
              <h1>Already have an account? Log in</h1>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
