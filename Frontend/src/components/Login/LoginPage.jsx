import axios from "axios";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { ToastContainer } from "react-toastify";
import { errorToast, successToast, warnToast } from "../../utils/GlobalToaster";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  //@User Login API call
  const UserLogin = () => {
    // if (!Email.match(EMAIL_REGEX)) {
    //   return infoToast("Enter Valid Email"); //Checking Email Formate
    // }
    if (Email === "" || Password === "") {
      return warnToast("Enter Email or Passoword!"); //Validation for Email Password
    }
    var api_url = GlobalConstants.domain + "api/user/login";
    var dataToBeSent = {
      email: Email,
      password: Password,
    };
    axios
      .post(api_url, dataToBeSent)
      .then((resposne) => {
        // console.log(resposne);
        if (resposne.status === 200) {
          sessionStorage.setItem("token", resposne.data.token); //setting Token For Auth in Other APIs
          sessionStorage.setItem("user-email", resposne.data.data.email); //setting Email as Username
          sessionStorage.setItem("user-id", resposne.data.data.user_id); //setting user-id
          successToast(resposne.data.message);
          setTimeout(() => {
            navigate(`/user/dashboard`);
          }, 1000);
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
          <button
            className="black_btn"
            onClick={() => navigate("/user/register")}
          >
            Sign Up
          </button>
        </nav>
        <div className="flex justify-center mt-[10%]">
          <div className="bg-[#FFF] w-[500px] p-5 text-center rounded-md drop-shadow-md">
            <h4 className="text-3xl font-bold">Sign In</h4>
            <p className="my-2">Welcome Back👋</p>
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

            <div>
              <button className="sign_btn" onClick={UserLogin}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default LoginPage;
