import { Spin } from "antd";

export default function Loader() {
  return (
    <div className="w-full h-screen bg-white  flex text-blue-1">
      <div className="w-full relative flex flex-col">
        <div className="bg-white p-2 md:p-6 flex justify-between items-center">
          <div className="w-[200px] h-12 bg-grey-300 rounded-lg skeleton"></div>
          <div className="flex gap-4 p-1 items-center">
            <span className="w-8 h-8 bg-grey-300 skeleton"></span>
            <div className="flex p-1 gap-1">
              <span className="w-12 h-12 rounded-[50%] bg-grey-300 skeleton border"></span>
              <div className="flex flex-col gap-2 w-[160px] pr-3 md:pr-[50px]">
                <span className="h-5 bg-grey-300 rounded-md w-11/12 skeleton"></span>
                <span className="h-4 bg-grey-300 rounded-md w-7/12 skeleton"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-grow items-center justify-center">
          <div className="w-full md:w-[397px] h-[176px] items-center flex flex-col gap-10">
            <Spin size="large" />
            <p className="text-center">Hang on, we are setting up this page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
