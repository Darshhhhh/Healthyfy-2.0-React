import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function DeviceData() {
  const data = useLocation();
  const SelectedDeviceData = data.state.DeviceData;
  console.log(SelectedDeviceData);
  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-center font-semibold my-5 underline">
        {SelectedDeviceData[0]?.devicename}'s Data
      </h1>
      <h4 className="text-xl text-center font-semibold">Latest Readings</h4>
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
    </>
  );
}

export default DeviceData;
