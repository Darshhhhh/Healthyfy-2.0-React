import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Profilebg from "../../assests/image/ProfilePage.png";
function ProfilePage() {
  const [IsEdit, setIsEdit] = useState(false);
  const [ProfileAbout, setProfileAbout] = useState("");
  return (
    <>
      <Navbar />
      <h1 className="text-start px-5 my-5 text-2xl font-bold">Profile</h1>
      <main className="p-5 flex">
        <img src={Profilebg} alt="profilePage_background" className="w-[40%]" />
        <div className="bg-white w-full p-4">
          <div>
            <h4>First Name</h4> <input type="text" />
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
