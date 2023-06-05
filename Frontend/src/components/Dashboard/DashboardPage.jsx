import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { GlobalConstants } from "../../utils/GlobalConstants";
import { useEffect, useMemo, useState } from "react";
import Loader from "../../utils/Loader/Loader";

const DashboardPage = () => {
  const [isLoadig, setIsLoading] = useState(false);
  const [TableData, setTableData] = useState([]);
  const [SelectedDeviceID, setSelectedDeviceID] = useState("");
  const OnlyActiveDevice = TableData.filter((e) => e.isActive === true); //@ Only Active Device
  const FilteredData = TableData.filter((x) => x._id === SelectedDeviceID); //@ To Fetch Data of Selected Device
  console.log(FilteredData);
  console.log(OnlyActiveDevice);
  //@ TO Fetch All the Device Whic User Registered
  const FetchAllDevice = () => {
    setIsLoading(true);
    var USER_ID = sessionStorage.getItem("user-id");
    var TOKEN = sessionStorage.getItem("token");
    var API_URL = GlobalConstants.domain + "api/device/" + USER_ID;
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + TOKEN,
      },
    };
    axios
      .get(API_URL, headerConfig)
      .then((response) => {
        setTableData(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    FetchAllDevice();
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
            {TableData?.map((value, index) => (
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
