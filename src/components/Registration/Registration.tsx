import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { registerUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";

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
  const [errors, setErrors] = useState<FormData>({
    nickname: "",
    email: "",
    password: "",
  });

  const validateNickname = (nickname: string): string => {
    const regexp = new RegExp(
      "^(?![\\d-]+$)(?=(?:[^a-zA-Z]*[a-zA-Z]){3})[a-zA-Z0-9_-]{3,10}$"
    );
    return regexp.test(nickname) ? "" : "Invalid nickname format";
  };

  const validateEmail = (email: string): string => {
    const regexp = new RegExp("\\S+@\\S+\\.\\S+");
    return regexp.test(email) ? "" : "Invalid email format";
  };

  const validatePassword = (password: string): string => {
    const regexp = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!$#%])[a-zA-Z0-9!$#%]{8,}$"
    );
    return regexp.test(password) ? "" : "Invalid password format";
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let message = "";
    if (value.trim() === "") {
      // Если поле пустое, сразу сбрасываем сообщение об ошибке для этого поля
      message = "";
    } else {
      // Продолжаем валидацию, если в поле есть текст
      if (name === "nickname") message = validateNickname(value);
      else if (name === "email") message = validateEmail(value);
      else if (name === "password") message = validatePassword(value);
    }

    setErrors({ ...errors, [name]: message });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидация всех полей перед отправкой
    const nicknameError = validateNickname(formData.nickname);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nicknameError || emailError || passwordError) {
      // Обновление состояния ошибок, если они есть
      setErrors({
        nickname: nicknameError,
        email: emailError,
        password: passwordError,
      });
      return; // Прекратить дальнейшую отправку формы
    }

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => toast.error(error.message || "An unexpected error occurred"));
      
  };

  return (
    <div className="registration-form-container">
      <h2 className="registration-form-title">Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="registration-form-group">
          <label htmlFor="nickname" className="registration-form-label">
            Nickname
          </label>
          {errors.nickname && <div className="registration-error-message">{errors.nickname}</div>}
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="registration-form-field"
            placeholder="Enter your profile name"
          />
        </div>
        <div className="registration-form-group">
          <label htmlFor="email" className="registration-form-label">
            Email
          </label>
          {errors.email && <div className="registration-error-message">{errors.email}</div>}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="registration-form-field"
            placeholder="Enter your email address"
          />
        </div>
        <div className="registration-form-group">
          <div className="registration-password-label-container">
            <label htmlFor="password" className="registration-form-label">
              Password
            </label>
            <button
              onClick={togglePasswordVisibility}
              type="button"
              className="registration-toggle-password"
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
          {errors.password && <div className="registration-error-message">{errors.password}</div>}
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="registration-form-field"
            placeholder="Enter your password"
          />
          <div className="registration-password-helper">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>
        </div>
        <div className="registration-form-footer">
          By creating an account, you agree to the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Terms_of_service"
            className="terms-policy"
            target="blank_"
          >
            Terms of use
          </a>{" "}
          and{" "}
          <a
            href="https://en.wikipedia.org/wiki/Privacy_policy"
            className="registration-terms-policy"
            target="blank_"
          >
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
