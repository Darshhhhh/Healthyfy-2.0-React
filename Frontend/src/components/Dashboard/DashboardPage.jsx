import Navbar from "../Navbar/Navbar";
import { useEffect, useMemo, useState } from "react";
import Loader from "../../utils/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getDevicePerUser } from "../../redux/getAllDevicePerUserSlice";
import moment from "moment";
import FilterComponent from "../../utils/Filtercomponent";
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DevicePerUserData = useSelector((state) => state.DevicePerUser);
  const [isLoadig, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const BG_COLORS = ["#ADA2FF", "#10A19D"];
  //@ Only Active Device
  const OnlyActiveDevice = DevicePerUserData.filter((e) => e.isActive === true);
  console.log(OnlyActiveDevice);
  useEffect(() => {
    //@ TO Fetch All the Device Which User Registered
    if (DevicePerUserData?.length === 0) {
      dispatch(getDevicePerUser());
    } else {
      setIsLoading(false);
      console.log("Data Already Fetched!");
    }
  }, [DevicePerUserData.length]);

  const filteredItems = OnlyActiveDevice?.filter(
    (item) =>
      JSON.stringify(item.devicename)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );
  const SearchBarInput = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          PlaceHolder="Search Device..."
        />
      </>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <Navbar />
      <main className="mt-10">
        <div className="text-center">
          <h1 className="my-10 text-3xl font-semibold">
            Hello👋,
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
          <div className="flex align-middle justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-[30px] bg-white ps-1 rounded-s-md"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
            {SearchBarInput}
          </div>
          {isLoadig ? (
            <Loader />
          ) : (
            <div className="px-10 flex flex-wrap gap-10 justify-center my-10">
              {filteredItems.length === 0 &&
                "No Active Device Found Please Active or Add new Device!"}
              {filteredItems?.map((x, index) => (
                <div
                  className="w-[230px] h-[200px] text-center p-5 rounded-xl drop-shadow-lg"
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? BG_COLORS[0] : BG_COLORS[1],
                  }}
                >
                  <h4 className="text-2xl font-semibold text-gray-800 mb-5">
                    {x.devicename}
                  </h4>
                  <h2 className="text-sm font-semibold  text-white">
                    🚀Updated On: <br />
                    <span className="font-normal">
                      ({moment(x.updatedAt).calendar()})
                    </span>
                  </h2>
                  <button
                    className="bg-stone-100 drop-shadow-lg px-5 py-2 rounded-md font-semibold mt-5 btransition-all hover:bg-white hover:text-black hover:border hover:border-gray-600"
                    onClick={() =>
                      navigate("/device/data", {
                        state: {
                          DeviceData: [x],
                        },
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
