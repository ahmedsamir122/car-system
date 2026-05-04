import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
import preview from "../assets/preview.jpg";
import { AiTwotoneDashboard } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineFireTruck } from "react-icons/md";
import { LuCalculator } from "react-icons/lu";
import { CiInboxOut } from "react-icons/ci";
import { BsCashStack } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={preview} className={classes.logo} />
      </div>
      <ul>
        {user?.role === "admin" && (
          <li className={classes.linkContainer}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${classes.list} ${isActive ? classes.active : ""}`
              }
              end
            >
              <AiTwotoneDashboard />
              <span>Dashboard</span>
            </NavLink>
          </li>
        )}
        <li className={classes.linkContainer}>
          <NavLink
            to="/cars"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <IoCarOutline />
            <span>Cars</span>
          </NavLink>
        </li>
        <li className={classes.linkContainer}>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <IoPersonOutline />
            <span>Customers</span>
          </NavLink>
        </li>
        <li className={classes.linkContainer}>
          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <MdOutlineFireTruck />
            <span>Suppliers</span>
          </NavLink>
        </li>
        <li className={classes.linkContainer}>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <LuCalculator />
            <span>Sales</span>
          </NavLink>
        </li>
        <li className={classes.linkContainer}>
          <NavLink
            to="/purchases"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <LuCalculator />
            <span>Purchases</span>
          </NavLink>
        </li>
        <li className={classes.linkContainer}>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <CiInboxOut />
            <span>Expenses</span>
          </NavLink>
        </li>
        {/* <li className={classes.linkContainer}>
          <NavLink
            to="/installments"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <BsCashStack />
            <span>Installments</span>
          </NavLink>
        </li>
        <li className={classes.linkContainer}>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `${classes.list} ${isActive ? classes.active : ""}`
            }
          >
            <TbReport />
            <span>Reports</span>
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default NavBar;
