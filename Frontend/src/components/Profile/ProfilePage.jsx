import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Profilebg from "../../assests/image/ProfilePage.png";
import { GlobalConstants } from "../../utils/GlobalConstants";
import axios from "axios";
import { errorToast, successToast } from "../../utils/GlobalToaster";
import { ToastContainer } from "react-toastify";
function ProfilePage() {
  const [IsEdit, setIsEdit] = useState(false);
  const [ProfileAbout, setProfileAbout] = useState("");

  const [firtsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");

  useEffect(() => {
    var USER_ID = sessionStorage.getItem("user-id");
    var TOKEN = sessionStorage.getItem("token");
    var API_URL =
      GlobalConstants.domain + "api/user/userdata/userid=" + USER_ID;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + TOKEN,
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then((response) => {
        var USERDATA = response.data.data;
        setFirstName(USERDATA.firstName);
        setLastName(USERDATA.lastName);
        setEmail(USERDATA.email);
      })
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  }, []);

  const UpdateUserData = () => {
    var USER_ID = sessionStorage.getItem("user-id");
    var TOKEN = sessionStorage.getItem("token");
    var API_URL =
      GlobalConstants.domain + "api/user/updateuserdata/userid=" + USER_ID;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + TOKEN,
      },
    };
    let DATA = {
      firstName: firtsName,
      lastName: lastName,
      user_id: USER_ID,
    };
    axios
      .post(API_URL, DATA, headerConfig)
      .then((response) => {
        console.log(response.data.data);
        sessionStorage.setItem(
          "UserName",
          response.data.data.firstName + " " + response.data.data.lastName
        );
        successToast(response.data.message);
      })
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  };
  return (
    <>
      <Navbar />
      <h1 className="text-center px-5 my-5 text-2xl font-bold">Your Profile</h1>
      <main className="p-5 flex justify-center ">
        <div className="bg-white p-10 flex flex-col gap-5 w-max">
          <div>
            <h4>First Name</h4>{" "}
            <input
              type="text"
              value={firtsName}
              disabled={!IsEdit}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <h4>Last Name</h4>{" "}
            <input
              type="text"
              value={lastName}
              disabled={!IsEdit}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <h4>Email</h4> <input disabled type="text" value={Email} />
          </div>
          <div>
            <div className="flex items-center gap-2  mb-3">
              <input
                className="h-max"
                type="checkbox"
                checked={IsEdit}
                onChange={(e) => setIsEdit(e.target.checked)}
              />
              <label>Edit Profile</label>
            </div>
            {IsEdit && (
              <button className="Create_btn" onClick={UpdateUserData}>
                Update Profile
              </button>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default ProfilePage;
