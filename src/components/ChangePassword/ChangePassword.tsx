import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./ChangePassword.css";
import { useAppDispatch } from "../../hooks/hooks";
import { changePassword, resetChangePasswordStatus } from "../../slices/myAccountSlice";
// import { useNavigate } from "react-router-dom";

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const [changePasswordInfo, setChangePasswordInfo] =
    useState<ChangePasswordData>({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

  const error = useSelector((state: RootState) => state.accountInfo.error);
  const status = useSelector((state: RootState) => state.accountInfo.status);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Changing password:", changePasswordInfo);
      await dispatch(changePassword(changePasswordInfo)).unwrap();
      console.log("Password changed successfully");
      // navigate("/change_password");
    } catch (error) {
      console.error("Password changing error:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setChangePasswordInfo({ ...changePasswordInfo, [name]: value });
  };

  useEffect(() => {
    dispatch(resetChangePasswordStatus());
  }, [dispatch]);

  return (
    <div className="main-container-change-password">
      <form onSubmit={handleSubmit} className="change-password-form">
        <h1>Change Password</h1>
        <div className="input-label-container">
          <div className="label-container">
            <label className="label" htmlFor="password">
              Password
            </label>
            <label className="label" htmlFor="newPassword">
              New Password
            </label>
            <label className="label" htmlFor="ConfirmPassword">
              Confirm Password
            </label>
          </div>
          <div className="input-container">
            <input
              className="input"
              id="oldPassword"
              name="oldPassword"
              onChange={handleInputChange}
            />
            <input
              className="input"
              id="newPassword"
              name="newPassword"
              onChange={handleInputChange}
            />
            <input
              className="input"
              id="confrimNewPassword"
              name="confirmNewPassword"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="btn-container">
          <button id="save-btn" type="submit">
            SAVE
          </button>
        </div>
      </form>

      {error && (
        <h2 id="error">Incorrect current password or new password mismatch</h2>
      )}
      {status === "succeeded" && (
        <h2 id="success">Password changed successfully</h2>
      )}
    </div>
  );
};

export default ChangePassword;
