import React, { useState } from "react";
import { Link } from "react-router-dom";
import leftImg from "./img/signUpBackground.png";
import "./sigup.scss";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/slices/userSlice";
import { Checkbox, FormControlLabel } from "@mui/material";

function SignUp() {
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
    is_shop: 1,
  });
  const dispatch = useDispatch();

  const signUpUser = (e) => {
    e.preventDefault();
    dispatch(getUser(registerUser));
  };

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
            <p>Уже есть аккаунт?</p>
            <Link to="/signin"> ВОЙТИ</Link>
          </div>

          <div className="signUp_from_container">
            {/* title */}
            <div className="signUp_title_wrapper">
              <p className="form_title">Добро пожаловать</p>
              <p className="sub_title">Зарегистрируйте свой аккаунт</p>
            </div>

            {/* form */}
            <form className="signUp__form" onSubmit={signUpUser}>
              <div className="signUp_form_control">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => {
                    const name = e.target.value;
                    setRegisterUser({ ...registerUser, ...{ name } });
                  }}
                />
              </div>
              <div className="signUp_form_control">
                <label htmlFor="email">Эл. адрес</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => {
                    const email = e.target.value;
                    setRegisterUser({ ...registerUser, ...{ email } });
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
                    setRegisterUser({ ...registerUser, ...{ password } });
                  }}
                />
              </div>

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Владелец магазина"
                onChange={(e) => {
                  const is_shop = e.target.checked === true ? 1 : 0;
                  setRegisterUser({ ...registerUser, ...{ is_shop } });
                }}
              />

              <button type="submit" className="resgiter_btn">
                регистр
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
