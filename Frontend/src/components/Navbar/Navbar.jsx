import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import BrandLogo from "../../assests/image/FinalBrandLogo.png";
import { useNavigate } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    current: true,
  },
  { name: "Device", href: "/user/device", current: false },
  { name: "Contact Us", href: "/contact-us", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const navigate = useNavigate();
  const UserLogoutHandler = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };
  return (
    <Disclosure as="nav" className="bg-sky-300">
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                      color="black"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                      color="black"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-10 w-auto lg:hidden"
                    src={BrandLogo}
                    alt="HealthX"
                  />
                  <img
                    className="hidden h-10 w-auto lg:block"
                    src={BrandLogo}
                    alt="HealthX"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        className={classNames(
                          item.href === window.location.pathname
                            ? "bg-gray-900 text-white"
                            : "text-black hover:bg-black hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => navigate(item.href)}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}
                      <svg
                        className="h-10 w-10 rounded-full border border-gray-500 p-2"
                        fill="white"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <p className="block px-4 py-2 text-sm text-center text-gray-700 w-full">
                          {sessionStorage.getItem("user-email") === null ||
                          sessionStorage.getItem("user-email") === undefined
                            ? "User"
                            : sessionStorage
                                .getItem("user-email")
                                ?.split("@")[0]
                                .charAt(0)
                                .toUpperCase() +
                              sessionStorage
                                .getItem("user-email")
                                ?.split("@")[0]
                                .slice(1)}
                        </p>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/user/profile")}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full"
                            )}
                          >
                            Your Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => UserLogoutHandler()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                  }}
                  className={classNames(
                    item.href === window.location.pathname
                      ? "bg-gray-900 text-white"
                      : "text-black hover:bg-black hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
