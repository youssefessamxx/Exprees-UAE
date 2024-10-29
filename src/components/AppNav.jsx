import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import logo from "../../public/static/images/logo.png";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import axiosInstance from "../services/axiosInstance";

function AppNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { authToken, isAuthenticated, setAuthToken, logout } = useAuth();

  const firstName = userProfile?.full_name?.split(" ")[0] || "User";
  const userInitial = userProfile?.full_name?.[0]?.toUpperCase() || "U";

  const refreshTokenFunction = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      if (!refresh) {
        logout();
        return;
      }

      const res = await axiosInstance.post("http://13.60.18.142/api/core/token/refresh", { refresh });
      const newToken = res.data.access;

      localStorage.setItem("authToken", newToken);
      setAuthToken(newToken);

      await fetchProfile();
    } catch (e) {
      console.error("Error refreshing token:", e.message);
      logout();
    }
  };

  const fetchProfile = async () => {
    try {
      if (!authToken || !isAuthenticated) return;

      const res = await axiosInstance.get("http://13.60.18.142/api/core/profile/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUserProfile(res.data);
    } catch (e) {
      console.error("Error fetching profile:", e.message);
      if (e.response && e.response.status === 401) {
        await refreshTokenFunction();
      }
    }
  };

  useEffect(() => {
    fetchProfile();

    const refreshInterval = setInterval(refreshTokenFunction, 15 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [isAuthenticated, authToken]);

  return (
    <header className="bg-black text-white md:text-[.8rem] xl:text-xl font-bold">
      <nav className="flex items-center justify-between w-[98.5%] mx-auto py-1">
        <a href="/" className="z-10">
          <img src={logo} alt="Logo" />
        </a>

        <div
          className={`lg:static lg:min-h-fit lg:w-auto absolute lg:pt-4 pt-12 pb-5 bg-black min-h-[50vh] left-0 transition-all duration-500 ${
            showMenu ? "top-[17%]" : "top-[-100%]"
          } w-full flex items-center px-5`}
        >
          <ul className="flex lg:flex-row flex-col lg:items-center md:gap-7 gap-4">
            <li><a className="hover:text-gray-400 transition duration-300" href="/">Home</a></li>
            <li><a className="hover:text-gray-400 transition duration-300" href="/#About">About Us</a></li>
            <li><a className="hover:text-gray-400 transition duration-300" href="/#Services">Services</a></li>
            <li><a className="hover:text-gray-400 transition duration-300" href="/#Track">Track</a></li>
            <li><a className="hover:text-gray-400 transition duration-300" href="/#Check">Check Freight</a></li>
            <li><a className="hover:text-gray-400 transition duration-300" href="/#Contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="flex items-center md:gap-4 gap-2 z-10">
          {!isAuthenticated ? (
            <div className="flex gap-3">
              <Link className="hover:text-gray-400 transition duration-300" to="/login">Login</Link>
              <Link className="hover:text-gray-400 transition duration-300" to="/register">Register</Link>
            </div>
          ) : (
            <div className="relative">
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <p className="bg-[#F05B1F] p-1 rounded-full">{userInitial}</p>
                <p>{firstName}</p>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/reset"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                   Change Password
                  </Link>
                 
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {showMenu ? (
            <IoClose
              className="lg:hidden cursor-pointer"
              onClick={() => setShowMenu(false)}
            />
          ) : (
            <IoMenu
              className="lg:hidden cursor-pointer"
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>
      </nav>
    </header>
  );
}

export default AppNav;
