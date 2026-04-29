import classes from "./Signin.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/url";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const postData = (data) => {
  return axios.post(`${URL}/users/signin`, data);
};
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onSubmit" });

  const { mutate, error, isError } = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      console.log(data.data.data.user);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("expiresin", Date.now() + 12 * 60 * 60 * 1000);
      dispatch(authActions.login(data.data.data.user));
      if (data.data.data.user.role === "admin") {
        navigate("/");
      }
      if (data.data.data.user.role === "user") {
        navigate("/cars");
      }
    },
  });

  const onsubmit = async (data) => {
    const [email, password] = getValues(["email", "password"]);
    console.log(email, password);
    mutate(data); // mutate({ phone, password });
    // if (window.recaptchaVerifier) {
    //   window.recaptchaVerifier.render().then(function (widgetId) {
    //     window.recaptchaVerifier.reset(widgetId);
    //   });
    // }
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <h3 className={classes.title}>Sign In</h3>
        <form onSubmit={handleSubmit(onsubmit)}>
          <p>Email</p>
          <input
            className={classes.input}
            {...register("email", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className={classes.error}>please enter your password</p>
          )}
          <p>Password</p>
          <input
            type="password"
            className={classes.input}
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className={classes.error}>please enter your password</p>
          )}
          {isError && (
            <p className={classes.error}>{error.response.data.message}</p>
          )}
          <button className={classes.button}>Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
