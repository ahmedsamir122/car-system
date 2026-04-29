import { useEffect, useState } from "react";
import classes from "./ProfileModal.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";

function ProfileModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [props]);

  const logOutHandler = () => {
    navigate("/signin");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresin");
    dispatch(authActions.logOut());
  };

  return (
    <div onClick={props.onClose} className={classes.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.modalContainer}
      >
        <h3 className={classes.logOutButton} onClick={logOutHandler}>
          log out
        </h3>
      </div>
    </div>
  );
}

export default ProfileModal;
