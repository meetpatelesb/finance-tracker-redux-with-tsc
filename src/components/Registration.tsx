import "../assets/styles/transaction.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/ducks/registrationSlice";
import * as React from 'react';
import { RootState } from "../Redux/store";
import { errorsType } from "../interface/app_interface";

const Registration = () => {
  const navigate = useNavigate();

  // redux data ....
  const reduxUserData = useSelector((data:RootState) => data.userData);

  // dispatch redux
  const dispatch = useDispatch();
  let [regData, setRegData] = useState(reduxUserData);

  const [issubmit, setIsSubmit] = useState(false);

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    name: yup.string().required("Your name is required!!"),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(12).required(),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password is not matched!!")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<errorsType>({
    resolver: yupResolver(formSchema),
  });
   
  // ......    console.log(errors );
    console.log(errors);
  const onSubmit = (e:any) => {
    console.log("fff");
    
 
    regData = { ...e };
    // delete regData.cpassword;
    setRegData(regData);
    setIsSubmit(true);
   
    if (Object.values(e).length && issubmit === true) {
      if (Object.keys(reduxUserData).length) {
        const retrivedata = [...reduxUserData];
        let lastIdIndex = Object.keys(retrivedata).length - 1;
        let lastId = retrivedata[lastIdIndex].id;
        regData[lastIdIndex+1].id= Number(lastId) + 1 + "";
        
        dispatch(addUser({ regData }));
        } else {
        regData[0].id = 1+"";
         dispatch(addUser({ regData }));
         }
      navigate("/login");
    } else {
      console.log("error existed");
    }


    
  };
  return (
    <>
      <div className="form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <label className="label">Name:</label>
          <input
            type="text"
            className="inputFields"
            {...register("name")}
            name="name"
          ></input>
          <span>{errors.name?.message}</span>
          <br></br>
          <label className="label">Email:</label>
          <input
            type="email"
            // name="email"
            className="inputFields"
            {...register("email")}
          ></input>
          <span>{errors.email?.message}</span>
          <br></br>
          <label className="label">Password:</label>
          <input
            type="password"
            // name="password"
            className="pswFields"
            {...register("password")}
          ></input>
          <span>{errors.password?.message}</span>
          <br></br>
          <label className="label">CPassword:</label>
          <input
            type="password"
            // name="cpassword"
            className="pswFields"
            {...register("cpassword")}
          ></input>
          <span>{errors.cpassword?.message}</span>
          <br></br>
          <button type="submit" className="ViewBtn">
            Submit
          </button>
          <br></br>
        </form>
        <Link to={"/public/login"} className="loginBtn">
          Login
        </Link>
      </div>
    </>
  );
};

export default Registration;
