import { useState, useEffect } from "react";
import { WiMoonAltWaxingCrescent6 } from "react-icons/wi";
import classes from "./TopLayout.module.css";
import ProfileModal from "./ProfileModal";
import { useSelector } from "react-redux";

function TopLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");

    document.documentElement.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark"
    );
  };
  return (
    <div className={classes.topLayoutContainer}>
      <div className={classes.themeButton} onClick={toggleTheme}>
        <WiMoonAltWaxingCrescent6 className={classes.theme} />
      </div>
      <div
        className={classes.userContainer}
        onClick={() => setOpenProfileModal(!openProfileModal)}
      >
        {user?.username[0].toUpperCase() || "loading.."}
      </div>
      {openProfileModal && (
        <ProfileModal open={open} onClose={() => setOpenProfileModal(false)} />
      )}
    </div>
  );
}

export default TopLayout;
