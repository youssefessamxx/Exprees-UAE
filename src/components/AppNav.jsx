import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import logo from "../../public/static/images/logo.png";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import axios from "axios";

function AppNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { isAuthenticated } = useAuth();

  const username = userProfile?.full_name;
  const userimg = userProfile?.full_name[0].toUpperCase();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log(token);

        if (!isAuthenticated) {
          throw new Error("User not logged in");
        }

        const res = await axios.get("http://35.157.197.41/core/profile/", {
          headers: {
            Authorization: `Bearer${token}`, // Include the token in the header
          },
        });

        setUserProfile(res.data);
      } catch (e) {
        throw new Error(e.message);
      }
    };

    fetchProfile();
  }, [userProfile]);

  return (
    <div>
      <header className="bg-black text-white  md:text-[.8rem] xl:text-xl    font-bold">
        <nav className="flex items-center justify-between  w-[98.5%] mx-auto py-1">
          <a href="/" className="z-10">
            <img src={logo} alt="" />
          </a>
          <div
            className={`lg:static lg:min-h-fit lg:w-auto absolute lg:pt-4 pt-12 pb-5  bg-black min-h-[50vh] left-0 ${
              showMenu ? "top-[17%]" : "top-[-100%]"
            } w-full flex items-center px-5 `}
          >
            <ul className="flex lg:flex-row flex-col lg:items-center md:gap-7 gap-4">
              <li>
                <a className="hover:text-gray-400 transi duration-300" href="/">
                  Home
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-400 transi duration-300"
                  href="/#About"
                >
                  About US
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-400 transi duration-300"
                  href="/#Services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-400 transi duration-300"
                  href="/#Track"
                >
                  Track
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-400 transi duration-300"
                  href="/#Check"
                >
                  Check Freight
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-400 transi duration-300"
                  href="/#Contact"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center md:gap-4 gap-2 z-10">
            {!isAuthenticated && (
              <div className="flex gap-3">
                <Link
                  className="hover:text-gray-400 transi duration-300"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="hover:text-gray-400 transi duration-300"
                  to="/Register"
                >
                  Register
                </Link>
              </div>
            )}
            {/* {isAuthenticated && <Link onClick={() => logout()}>Logout</Link>} */}
            {isAuthenticated && (
              <div className="flex gap-3 items-center">
                <p className="bg-[#F05B1F] p-1  rounded-full ">{userimg}</p>
                <p>{username}</p>
              </div>
            )}

            <p>En🌐</p>
            {!showMenu && (
              <IoMenu
                className="lg:hidden cursor-pointer"
                onClick={() => setShowMenu(true)}
              />
            )}
            {showMenu && (
              <IoClose
                className="lg:hidden cursor-pointer"
                onClick={() => setShowMenu(false)}
              />
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default AppNav;
