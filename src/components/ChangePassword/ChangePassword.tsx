import React, { ChangeEvent, useEffect, useState } from "react";
import "./ChangePassword.css";
import { useAppDispatch } from "../../hooks/hooks";
import {
  changePassword,
  resetChangePasswordStatus,
} from "../../slices/myAccountSlice";
import { toast } from "react-toastify";

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();

  const [changePasswordInfo, setChangePasswordInfo] =
    useState<ChangePasswordData>({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

  const validatePassword = (password: string): string => {
    const regexp = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!$#%])[a-zA-Z0-9!$#%]{8,}$"
    );
    return regexp.test(password) ? "" : "Invalid new password format";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordError = validatePassword(changePasswordInfo.newPassword);

    if (passwordError) {
      toast.error(passwordError, { toastId: "invalid_password_format" });
      return;
    }

    if (changePasswordInfo.newPassword === changePasswordInfo.oldPassword) {
      toast.error("New password cannot be the same as the current password", {
        toastId: "new_password_same_as_old",
      });
      return;
    }

    try {
      console.log("Changing password:", changePasswordInfo);
      await dispatch(changePassword(changePasswordInfo)).unwrap();
      toast.success("Password changed successfully", {
        toastId: "change_password_success",
      });
      // Сброс значений полей после успешного изменения пароля
      setChangePasswordInfo({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      toast.error(error as string, {
        toastId: "change_password_error",
      });
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
              value={changePasswordInfo.oldPassword}
              onChange={handleInputChange}
            />
            <input
              className="input"
              id="newPassword"
              name="newPassword"
              value={changePasswordInfo.newPassword}
              onChange={handleInputChange}
            />
            <input
              className="input"
              id="confrimNewPassword"
              name="confirmNewPassword"
              value={changePasswordInfo.confirmNewPassword}
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
    </div>
  );
};

export default ChangePassword;
