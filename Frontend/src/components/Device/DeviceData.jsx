import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/GlobalConstants";
import moment from "moment";

function DeviceData() {
  const data = useLocation();
  const SelectedDeviceData = data.state.DeviceData;
  console.log(SelectedDeviceData);
  const ECGcolumns = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      width: "100px",
    },
    {
      name: "ECG Value",
      selector: (row) => row?.value + " BPM",
    },
    {
      name: "ECG Checked On",
      selector: (row) => moment(row?.rec_time).format("LLL"),
      sortable: true,
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.value > 100,
      style: {
        backgroundColor: "rgb(248 113 113)",
        color: "white",
      },
    },
    {
      when: (row) => row.value >= 90 && row.value < 100,
      style: {
        backgroundColor: "rgb(251 146 60)",
        color: "white",
      },
    },
    {
      when: (row) => row.value >= 70 && row.value < 90,
      style: {
        backgroundColor: "rgb(45 212 191)",
        color: "white",
      },
    },
    {
      when: (row) => row.value >= 20 && row.value < 70,
      style: {
        backgroundColor: "rgb(45 212 191)",
        color: "white",
      },
    },
  ];
  const Heartbeatcolumns = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      width: "100px",
    },
    {
      name: "ECG Value",
      selector: (row) => row?.value + " BPS",
    },
    {
      name: "ECG Checked On",
      selector: (row) => moment(row?.rec_time).format("LLL"),
      sortable: true,
    },
  ];
  const Tempcolumns = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      width: "100px",
    },
    {
      name: "ECG Value",
      selector: (row) => row?.value + " °C",
    },
    {
      name: "ECG Checked On",
      selector: (row) => moment(row?.rec_time).format("LLL"),
      sortable: true,
    },
  ];
  const Oxycolumns = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      width: "100px",
    },
    {
      name: "ECG Value",
      selector: (row) => row?.value + " SpO2",
    },
    {
      name: "ECG Checked On",
      selector: (row) => moment(row?.rec_time).format("LLL"),
      sortable: true,
    },
  ];
  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-center font-semibold my-5 underline">
        {SelectedDeviceData[0]?.devicename}'s Data
      </h1>
      <h4 className="text-xl text-center font-semibold">Latest Readings</h4>
      <p className="text-center font-normal">
        ({moment(SelectedDeviceData[0]?.updatedAt).calendar()})
      </p>
      {SelectedDeviceData.length > 0 &&
        SelectedDeviceData?.map((data, idx) => (
          <div className="px-10 py-5 flex flex-wrap gap-10 justify-center">
            <div className="bg-red-400 w-[200px] h-[140px] text-center p-5 rounded-md">
              <h4 className="text-2xl font-semibold text-white mb-5">
                {data.ecg?.length === 0 ? "NA" : data.ecg?.slice(-1)[0].value}
                <spna className="text-sm"> BPM</spna>
              </h4>
              <h2 className="text-2xl font-semibold  text-white">ECG</h2>
            </div>
            <div className="bg-teal-400 w-[200px] h-[140px] text-center p-7 rounded-md">
              <h4 className="text-2xl font-semibold text-white mb-5">
                {data.heartbeat?.length === 0
                  ? "NA"
                  : data.heartbeat?.slice(-1)[0].value}
                <spna className="text-sm"> BPS</spna>
              </h4>
              <h2 className="text-2xl font-semibold  text-white">Heart Beat</h2>
            </div>
            <div className="bg-orange-400 w-[200px] h-[140px] text-center p-7 rounded-md">
              <h4 className="text-2xl font-semibold text-white mb-5">
                {data.temparature?.length === 0
                  ? "NA"
                  : data.temparature?.slice(-1)[0].value}
                <spna className="text-sm"> °C</spna>
              </h4>
              <h2 className="text-2xl font-semibold  text-white">
                Temparature
              </h2>
            </div>
            <div className="bg-indigo-400 w-[200px] h-[140px] text-center p-7 rounded-md">
              <h4 className="text-2xl font-semibold text-white mb-5">
                {data.oxygen?.length === 0
                  ? "NA"
                  : data.oxygen?.slice(-1)[0].value}
                <spna className="text-sm"> SpO2</spna>
              </h4>
              <h2 className="text-2xl font-semibold  text-white">oxygen</h2>
            </div>
          </div>
        ))}
      <hr className="h-px px-5 my-2 border-0 dark:bg-gray-300"></hr>
      <div className="flex gap-10 px-10 flex-wrap justify-center">
        <div className="mt-5 lg:w-[40%]">
          <DataTable
            columns={ECGcolumns}
            data={SelectedDeviceData[0].ecg}
            highlightOnHover
            fixedHeader={true}
            fixedHeaderScrollHeight="80vh"
            customStyles={customStyles}
            pagination
            paginationPerPage={5}
            title={"ECG Data"}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
        <div className="mt-5 lg:w-[40%]">
          <DataTable
            columns={Heartbeatcolumns}
            data={SelectedDeviceData[0].heartbeat}
            highlightOnHover
            fixedHeader={true}
            fixedHeaderScrollHeight="80vh"
            customStyles={customStyles}
            pagination
            paginationPerPage={5}
            title={"Heartbeat Data"}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
        <div className="mt-5 lg:w-[40%]">
          <DataTable
            columns={Tempcolumns}
            data={SelectedDeviceData[0].temparature}
            highlightOnHover
            fixedHeader={true}
            fixedHeaderScrollHeight="80vh"
            customStyles={customStyles}
            pagination
            paginationPerPage={5}
            title={"Temparature Data"}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
        <div className="mt-5 lg:w-[40%]">
          <DataTable
            columns={Oxycolumns}
            data={SelectedDeviceData[0].oxygen}
            highlightOnHover
            fixedHeader={true}
            fixedHeaderScrollHeight="80vh"
            customStyles={customStyles}
            pagination
            paginationPerPage={5}
            conditionalRowStyles={conditionalRowStyles}
            title={"Oxygen Data"}
          />
        </div>
      </div>
    </>
  );
}

export default DeviceData;
