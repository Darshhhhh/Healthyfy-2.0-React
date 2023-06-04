import { Fragment, useEffect, useRef, useState } from "react";
import { GlobalConstants, customStyles } from "../../utils/GlobalConstants";
import Navbar from "../Navbar/Navbar";
import DataTable from "react-data-table-component";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { errorToast, successToast } from "../../utils/GlobalToaster";
import { ToastContainer } from "react-toastify";

function UserDevice() {
  const [TableData, setTableData] = useState([]);
  const [AddDevicePopup, setAddDevicePopup] = useState(false);
  const [DeviceName, setDeviceName] = useState("");
  const [DeviceCode, setDeviceCode] = useState("");
  const cancelButtonRef = useRef(null);
  const columns = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      width: "100px",
    },
    {
      name: "Device",
      selector: (row) => row.devicename,
    },
    {
      name: "Status",
      width: "140px",
      selector: (row) =>
        row?.isActive === true ? (
          <button className="active_btn">Active</button>
        ) : (
          <button className="deactive_btn">Deactive</button>
        ),
    },

    {
      name: "Change Status",
      width: "200px",
      selector: (row) => (
        <button className="normal_btn">
          {row?.isActive === true ? "Turn Off" : "Turn On"}
        </button>
      ),
    },
  ];
  //@ TO Insert New Device Per User
  const SaveDevice = () => {
    var USER_ID = sessionStorage.getItem("user-id");
    var TOKEN = sessionStorage.getItem("token");
    var API_URL = GlobalConstants.domain + "api/device/create";
    var DATA_TO_SEND = {
      devicename: DeviceName,
      deviececode: DeviceCode,
      user: USER_ID,
    };
    let headerConfig = {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + TOKEN,
      },
    };
    axios
      .post(API_URL, DATA_TO_SEND, headerConfig)
      .then((response) => {
        console.log(response);
        successToast(response.data.message);
        setAddDevicePopup(false);
        FetchAllDevice();
        CancelClicked();
      })
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  };
  //@ TO Fetch All the Device Whic User Registered
  const FetchAllDevice = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    FetchAllDevice();
  }, []);
  //@ TO Clear All The State From Modal
  const CancelClicked = () => {
    setDeviceName("");
    setDeviceCode("");
    setAddDevicePopup(false);
  };
  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="flex justify-between items-center ">
          <div>
            <h1 className="text-xl font-bold">Device List</h1>
          </div>
          <div>
            <button
              className="Create_btn"
              onClick={() => setAddDevicePopup(true)}
            >
              Add Device
            </button>
          </div>
        </div>
        <hr class="h-px my-2 border-0 dark:bg-gray-300"></hr>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={TableData}
            highlightOnHover
            fixedHeader={true}
            fixedHeaderScrollHeight="80vh"
            customStyles={customStyles}
          />
        </div>
      </main>
      {AddDevicePopup ? (
        <Transition.Root show={AddDevicePopup} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setAddDevicePopup}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-center justify-center">
                        <h1 className="text-xl font-bold">Add New Device</h1>
                      </div>
                      <hr class="h-px my-2 border-0 dark:bg-gray-300"></hr>
                      <div className="flex flex-wrap gap-6 mt-1">
                        <div>
                          <h4 className="my-2">Device Name :</h4>
                          <input
                            placeholder="Enter Device Name"
                            type="text"
                            onChange={(e) => setDeviceName(e.target.value)}
                          />
                        </div>
                        <div>
                          <h4 className="my-2">Device Code :</h4>
                          <input
                            placeholder="Enter Device Code"
                            type="text"
                            onChange={(e) => setDeviceCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 xl:flex justify-center sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        onClick={() => SaveDevice()}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto "
                        onClick={() => CancelClicked()}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default UserDevice;
