import { CSSProperties } from "react";
import Loader from "react-spinners/ClipLoader";
const Loading = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#0096FF",
  };
  return (
    <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center bg-white">
      <Loader
        color={"#0096FF"}
        loading={true}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="text-[#0096FF]">Confirming....</p>
    </div>
  );
};
export default Loading;
