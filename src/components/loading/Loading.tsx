import logo from "../../assets/kinepolis_logo.png";
import "../../styles/index.css";

export default function Loading() {
  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div role="status" className="logo-container loaded">
        <img src={logo} alt="Kinepolis Logo" className="w-40" />
      </div>
    </div>
  );
}
