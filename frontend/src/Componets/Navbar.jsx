import React, { useEffect, useState, useContext } from "react";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { LogoutService, myProfileService } from "../API_Services/authservice";
import { Store } from "../App";
import { removeLoginCookie } from "../Context/cookie";

const Navbar = () => {
  const [profile, setprofile] = useState(null);
  const { setnotificationtype, setmessage, setisAuth } = useContext(Store);
  const navigate = useNavigate();

  const fetchdata = async () => {
    const { success, data } = await myProfileService();
    setprofile(data);
  };

  const logoutFunction = async () => {
    const { success, message } = await LogoutService();
    if (success) {
      setnotificationtype("success");
      setmessage(message);
      navigate("/login");
      setisAuth(false);
      removeLoginCookie();
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/b5/60/9b/b5609b14-e928-3f4d-0a34-6ead78a0ada4/source/512x512bb.jpg"
            className="h-10 rounded-md"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DealsDray
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="text-[2.5rem]">
            <MdMenu />
          </span>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to={"/dashboard"}
                className="block py-2 px-3 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white md:dark:text--500"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white md:dark:text--500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/add"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Add
              </Link>
            </li>
            <li>
              <span>{profile?.email}</span>
            </li>
            <li>
              <button
                type="button"
                class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                onClick={logoutFunction}
              >
                logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
