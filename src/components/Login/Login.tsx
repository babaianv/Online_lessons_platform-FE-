import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from 'react-icons/bi';
import "./Login.css";
import { fetchCurrentUser, loginUser } from "../../slices/userSlice";

interface FormData {
    email: string;
    password: string;
  }

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
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
        dispatch(loginUser(formData))
          .unwrap()
          .then(() => {
            dispatch(fetchCurrentUser());
            navigate("/")
          })
          .catch((error) => console.error("Login error:", error));
      };

      const handleSignUpClick = () => {
        navigate('/reg');
      };

  return (
    <div className="form-container">
      <h2 className="form-title">Log in</h2>
      <form onSubmit={handleSubmit}>
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
              {isPasswordVisible ? <BiHide className="icon" /> : <BiShow className="icon" />}
              {isPasswordVisible ? 'Hide' : 'Show'}
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
        </div>
        <button type="submit" className="submit-log-button">
          Log in
        </button>
        <div className='line'/>
        <div className="register-helper">
          Don't have an account?
        </div>
        <button onClick={handleSignUpClick} className="registration-button">
          Sign up
        </button>
      </form>
    </div>
  )
}

export default Login