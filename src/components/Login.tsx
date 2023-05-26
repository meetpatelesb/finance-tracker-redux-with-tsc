import "../assets/styles/login.css";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { result } from "../utils/helper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { RootState } from "../Redux/store";
import { loginErrorsType } from "../interface/app_interface";


const Login = () => {

  // redux data ....
  const reduxUserData = useSelector((data:RootState) => data.userData);
  const registrationData = [...reduxUserData]
  
  // cookies set
  const [cookies, setCookie] = useCookies(["userLogin"]);

  const navigate = useNavigate();
  let [loginData, setRegData] = useState({});
  let [error, setError] = useState({});

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(12).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginErrorsType>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (e:any) => {
    loginData = { ...e };
    setRegData(loginData);

    // useeffect

    if (Object.values(loginData).length) {
      let flag = false;
      for (const key in registrationData) {
        if (
          registrationData[key].email === loginData.email &&
          registrationData[key].password === loginData.password
        ) {
          flag = true;
          setError((prev) => {
            return {
              ...prev,
              login: "",
            };
          });
          break;
        } else {
          flag = false;

          setError((prev) => {
            return {
              ...prev,
              login: "email & psw not matched!!!",
            };
          });
        }
      }

      if (flag === true) {
        // setCookie("Name", result, { path: "/" });
          setCookie(
            "tempdata",
            { email: loginData["email"], token: result },
            { path: "/", maxAge: 3600 }
          );
        navigate("/transaction");
      }
    }

    // ....................................
  };

  return (
    <>
      <div className="form">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <label className="label">Email:</label>
          <input
            type="email"
            className="inputFields"
            {...register("email")}
            name="email"
            ></input>
          <span>{errors.email?.message}</span>
          <br></br>
          <label className="label">Password:</label>
          <input
            type="password"
            className="pswFields"
            {...register("password")}
            name="password"
          ></input>
          <span>{errors.password?.message}</span>
          <span>{error.login}</span>
          <br></br>
          <button type="submit" id="submit" className="ViewBtn">
            Submit
          </button>
          <br></br>
        </form>
        <Link to={"/public/registration"} className="loginBtn">
          Registration
        </Link>
      </div>
    </>
  );
};

export default Login;
