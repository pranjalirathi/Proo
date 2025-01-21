import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import midbot from "../assets/midbot.svg";
import { Bell } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [tokenValid, setTokenValid] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
        if (alertMessage) {
          const timeout = setTimeout(() => setAlertMessage(""), 3500); 
          return () => clearTimeout(timeout);
        }
      }, [alertMessage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      axios
        .post("http://localhost:8000/api/verify_reset_token", { token })
        .then((response) => {
          if (response.status === 200) {
            setTokenValid(true);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setTokenValid(false);
          }
        });
    } else {
      setTokenValid(false);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setAlertColor("bg-red-500/50 backdrop-blur-lg text-white");
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    axios
      .post(`http://localhost:8000/api/reset_password?token=${token}`, {
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      .then(() => {
        setAlertMessage("Password successfully changed!");
        setAlertColor("bg-green-500/50 backdrop-blur-lg text-white");
        setTimeout(() => {
            navigate("/login");
          }, 2000);
      })
      .catch(() => {
        setAlertMessage("Failed to reset password.");
        setAlertColor("bg-red-500/50 backdrop-blur-lg text-white");
      });
  };

  return (
    <section
      className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-br"
      style={{
        backgroundImage: `url(${midbot})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 ${alertColor} text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in border border-white/20 z-50`}
        >
          <Bell className="w-6 h-6 shake shake-rotation" />
          <span>{alertMessage}</span>
          <button
            onClick={() => setAlertMessage("")}
            className="text-lg font-bold ml-4 hover:text-gray-200 focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}
      <div className="relative z-10 w-[28rem] h-auto bg-transparent border-none rounded-2xl backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center p-8">
        <div className="w-full">
          {tokenValid === null ? (
            <p className="text-white text-center">Validating your token...</p>
          ) : tokenValid ? (
            <form className="w-full" onSubmit={handleSubmit}>
              <h2 className="text-3xl text-white text-center mb-8">Reset Password</h2>

              <div className="relative mb-10 w-full border-b-2 border-white">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  required
                  className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="off"
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
                />
              </div>

              <div className="relative mb-10 w-full border-b-2 border-white">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
                />
              </div>

              <button className="w-full h-12 bg-white text-black rounded-full font-semibold hover:bg-gray-200">
                Reset Password
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-white text-lg">Your reset link has expired.</p>
              <Link to="/forget_password" className="text-blue-400 hover:underline">
                Request a new reset link
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;