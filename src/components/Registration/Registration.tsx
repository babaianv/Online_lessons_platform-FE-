import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { registerUser } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import { BiHide, BiShow } from "react-icons/bi";

interface FormData {
  nickname: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nickname: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => console.error("Registration error:", error));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nickname" className="form-label">
            Nickname
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="form-field"
            placeholder="Enter your profile name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-field"
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group">
          <div className="password-label-container">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <button
              onClick={togglePasswordVisibility}
              type="button"
              className="toggle-password"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? (
                <BiHide className="icon" />
              ) : (
                <BiShow className="icon" />
              )}
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-field"
            placeholder="Enter your password"
          />
          <div className="password-helper">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>
        </div>
        <div className="form-footer">
          By creating an account, you agree to the{" "}
          <a href="#" className="terms-policy">
            Terms of use
          </a>{" "}
          and{" "}
          <a href="#" className="terms-policy">
            Privacy Policy
          </a>
          .
        </div>
        <button type="submit" className="submit-reg-button">
          Sign up
        </button>
        <div className="login-link">
          Already have an account? <a href="/log">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default Registration;
