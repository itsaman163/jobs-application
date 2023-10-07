import { Link } from "react-router-dom";
import "./LayoutHeader.css";
import Logout from "../pages/Guest/Logout";
const LayoutHeader = () => {
  return (
    <header>
      <nav>
        <Link to="/jobs">Jobs</Link>
      </nav>
      <Logout/>
    </header>
  );
};
export default LayoutHeader;
