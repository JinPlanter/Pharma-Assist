"use client";

import ImportFileIcon from "./icons/importFile";
import StudentsIcon from "./icons/studentsIcon";
import GradingIcon from "./icons/gradingIcon";
import SignOutButton from "./signoutbutton";

function Sidebar({ onNavigationClick }) {
  const pages = [
    { path: "/Signup", name: "Signup", icon: <ImportFileIcon /> },
    { path: "/ImportClassList", name: "ImportClassList", icon: <ImportFileIcon /> },
    { path: "/Students", name: "Students", icon: <StudentsIcon /> },
    { path: "/Grading", name: "Grading", icon: <GradingIcon /> },
    { path: "/GradingForm4", name: "FunctionalGradingForm", icon: <GradingIcon /> },
  ];

  return (
    <aside className="drawer lg:drawer-open w-64">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {/* Drawer */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 z-40 min-h-full h-screen transition-transform -translate-x-full space-y-2 font-medium bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
          {pages.map((page, i) => {
            return (
              <li key={i}>
                <button
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={() => onNavigationClick(page.name)}
                  htmlFor="my-drawer"
                  type="button"
                >
                  {page.icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {page.name}
                  </span>
                </button>
              </li>
            );
          })}
          <SignOutButton />
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
