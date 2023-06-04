import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { EMAIL_REGEX, GlobalConstants } from "../../utils/GlobalConstants";
import {
  errorToast,
  infoToast,
  successToast,
  warnToast,
} from "../../utils/GlobalToaster";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const UserRegister = () => {
    if (!Email.match(EMAIL_REGEX)) {
      return infoToast("Enter Valid Email"); //Checking Email Formate
    }
    if (Email === "" || Password === "" || ConfirmPassword === "") {
      return warnToast("Enter Email or Passoword!"); //Validation for Email Password
    }
    if (Password !== ConfirmPassword) {
      return warnToast("Passoword Doesnt Matched!"); //Validation for Password
    }
    var api_url = GlobalConstants.domain + "api/user/register";
    var dataToBeSent = {
      email: Email,
      password: ConfirmPassword,
    };
    axios
      .post(api_url, dataToBeSent)
      .then((resposne) => {
        if (resposne.status === 200) {
          successToast(resposne.data.message);
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      })
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  };
  return (
    <main>
      <div className="p-5">
        <nav className="flex justify-between align-middle">
          <div>
            <h1 className="text-xl">
              <span className="text-3xl">
                <b>H</b>
              </span>
              ealthyfyy
            </h1>
          </div>
          <button className="black_btn" onClick={() => navigate("/")}>
            Sign In
          </button>
        </nav>
        <div className="flex justify-center mt-[10%]">
          <div className="bg-[#FFF] w-[500px] p-5 text-center rounded-md drop-shadow-md">
            <h4 className="text-3xl font-bold">Sign Up</h4>
            <p className="my-2">Join us Now👋</p>
            <input
              className="w-[300px] my-3"
              placeholder="Email"
              type="email"
              onBlur={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[300px] my-3"
              placeholder="Password"
              type="password"
              onBlur={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-[300px] my-3"
              placeholder="Confirm Password"
              type="password"
              onBlur={(e) => setConfirmPassword(e.target.value)}
            />
            <div>
              <button className="sign_btn" onClick={UserRegister}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default RegisterPage;
