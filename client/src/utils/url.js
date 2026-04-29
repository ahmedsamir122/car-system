import { redirect } from "react-router-dom";

export const URL = "http://localhost:8000/api/v1";
export const checkAuthLoader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/signin");
  }
  return null;
};
