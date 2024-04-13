import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { RegisterResponse } from "../../types/types";
import "./MyAccountInfo.css";
import { useNavigate } from "react-router-dom";
import { deleteUser, logout, selectUser } from "../../slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUser } from "../../slices/myAccountSlice";

const MyAccountInfo: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accountInfoData = useSelector<RootState, RegisterResponse | null>(
    (state) => state.accountInfo.userInfo
  );

  const status = useSelector<
    RootState,
    "idle" | "loading" | "succeeded" | "failed"
  >((state) => state.accountInfo.status);

  const error = useSelector<RootState, string | null | undefined>(
    (state) => state.accountInfo.error
  );

  const deleteUserOnClick = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const username = accountInfoData?.nickname;
      try {
        console.log("Deleting user with username ", username);
        await dispatch(deleteUser());
        await dispatch(logout());
        console.log("User deleted");
        navigate("/");
      } catch (error) {
        console.error("User deleting error:", error);
      }
    }
  };

  useEffect(() => {
    if (user.userInfo?.name) {
      dispatch(fetchUser());
    }
  }, [dispatch, user.userInfo?.name]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <h2 id="error">User with this username not found</h2>;
  }

  return (
    <div className="main-container-account">
      {accountInfoData && (
        <>
          <h1>Account</h1>
          <div className="input-label-container">
            <div className="label-container">
              <label className="label" htmlFor="nickname">
                Nickname
              </label>
              <label className="label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                className="input"
                id="nickname"
                name="nickname"
                value={accountInfoData?.nickname}
                disabled
              />
              <input
                className="input"
                id="email"
                name="email"
                value={accountInfoData?.email}
                disabled
              />
            </div>
          </div>
        </>
      )}
      {accountInfoData && (
        <div className="btn-containerAcc">
          <button id="delete-btn" type="submit" onClick={deleteUserOnClick}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAccountInfo;
