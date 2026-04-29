import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import NavBar from "./NavBar";
import TopLayout from "./TopLayout";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { URL } from "../utils/url";
import { useEffect } from "react";

const getData = (data) => {
  return api.get(`${URL}/users/me`);
};
function RootLayout() {
  const dispatch = useDispatch();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getData,
  });
  useEffect(() => {
    if (data) {
      dispatch(authActions.login(data?.data.data.user));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div>loading ...</div>;
  }
  console.log(data);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.navContainer}>
          <NavBar />
        </div>
        <div>
          <TopLayout />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
