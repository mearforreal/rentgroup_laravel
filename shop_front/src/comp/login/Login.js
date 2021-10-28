import React, { useState } from "react";
import { Link } from "react-router-dom";
import leftImg from "./img/login.png";
import "./sigin.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice";

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const signInUser = (e) => {
    e.preventDefault();
    dispatch(getUser(loginUser));
  };

  const dispatch = useDispatch();

  return (
    <div className="signUp">
      <div className="signUp__wrapper">
        {/* left part img */}
        <div className="signupImage">
          {/* <div className="logo">CoClient</div> */}
          <img src={leftImg} alt="leftImg" />
        </div>

        {/* right form */}

        <div className="sigupForm__wrapper">
          {/* top sign in */}
          <div className="sigupHeader">
            <p>Нет аккаунт?</p>
            <Link to="/signup">ЗАРЕГИСТРИРОВАТЬСЯ</Link>
          </div>

          <div className="signUp_from_container">
            {/* title */}
            <div className="signUp_title_wrapper">
              <p className="form_title">Добро пожаловать</p>
              <p className="sub_title">Войдите в свой аккаунт</p>
            </div>

            {/* form */}
            <form className="signUp__form" onSubmit={signInUser}>
              <div className="signUp_form_control">
                <label htmlFor="email">Эл. адрес</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => {
                    const email = e.target.value;
                    setLoginUser({ ...loginUser, ...{ email } });
                  }}
                />
              </div>
              <div className="signUp_form_control">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    const password = e.target.value;
                    setLoginUser({ ...loginUser, ...{ password } });
                  }}
                />
              </div>

              <button type="submit" className="resgiter_btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
