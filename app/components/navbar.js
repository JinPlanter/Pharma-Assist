import SignOutButton from "./signoutbutton";
function Navbar() {
  return (
    <nav className="navbar top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Menu Button */}
          <div className="flex items-center justify-start rtl:justify-end">
            <label
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="btn btn-square btn-ghost lg:hidden"
              htmlFor="my-drawer"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </label>
          </div>
          {/* Logo */}
          <div className="flex-1">
            <a href="/">
              <img
                src="/logo.png"
                className="btn btn-ghost h-20 me-3"
                alt="Pharma Assist Logo"
              />
            </a>
          </div>
          {/* User Icon Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src="/user.png" />
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-900 rounded-box w-52"
            >
                <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
