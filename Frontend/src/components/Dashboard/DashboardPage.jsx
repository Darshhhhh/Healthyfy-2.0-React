import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useEffect, useState } from "react";
import Loader from "../../utils/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getDevicePerUser } from "../../redux/getAllDevicePerUserSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const DevicePerUserData = useSelector((state) => state.DevicePerUser);
  const [SelectedDeviceID, setSelectedDeviceID] = useState("");
  const [isLoadig, setIsLoading] = useState(false);

  //@ Only Active Device
  const OnlyActiveDevice = DevicePerUserData.filter((e) => e.isActive === true);

  //@ To Fetch Data of Selected Device
  const FilteredData = DevicePerUserData.filter(
    (x) => x._id === SelectedDeviceID
  );

  useEffect(() => {
    //@ TO Fetch All the Device Which User Registered
    if (DevicePerUserData?.length === 0) {
      console.log("Fetching Data!");
      setIsLoading(true);
      Promise.all([dispatch(getDevicePerUser())]).then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      console.log("Data Already Fetched!");
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="text-center">
          <h1 className=" my-5 text-3xl font-semibold">
            Welcome Back{" "}
            {sessionStorage.getItem("user-email") === null ||
            sessionStorage.getItem("user-email") === undefined
              ? "User"
              : sessionStorage
                  .getItem("user-email")
                  ?.split("@")[0]
                  .charAt(0)
                  .toUpperCase() +
                sessionStorage.getItem("user-email")?.split("@")[0].slice(1)}
            !!
          </h1>
          <select
            defaultValue={""}
            className="p-2"
            onChange={(e) => setSelectedDeviceID(e.target.value)}
          >
            <option value={""}>Select Device</option>
            {OnlyActiveDevice?.map((value, index) => (
              <option value={value?._id} key={value?._id + index}>
                {value?.devicename}
              </option>
            ))}
          </select>
        </div>
        <div>
          {FilteredData.map((e) => (
            <p>{e.devicename}</p>
          ))}
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
