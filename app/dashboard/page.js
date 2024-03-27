"use client";
import { useState } from "react";
import Grading from "../GradingForm4/page";
import LoginPage from "../Login/page";
import Students from "../Students/page";
import ImportFile from "../ImportFile/page";
import LogoutPage from "../Logout/page";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import DisplayFilePage from "../displayFile/page";
import UploadClassList from "../uploadclasslist/page";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("");

  const handleNavigationClick = (componentName) => {
    setActiveComponent(componentName);
  };
  // This is terrible and I hate it but it works ¯\_(ツ)_/¯
  const renderComponent = () => {
    switch (activeComponent) {
      case "GradingForm4":
        return <Grading />;
      case "Students":
        return <Students />;
      case "ImportFile":
        return <ImportFile />;
      case "LogOut":
        return <LogoutPage />;
      case "displayFile":
        return <DisplayFilePage />;
      case "uploadclasslist":
        return <UploadClassList />;
      default:
        return <Grading />;
    }
  };

  return (
    <div className="overflow-auto h-screen w-full bg-white border-b border-gray-200 dark:bg-gray-700 ">
      <Navbar />
      <div className="w-full flex flex-row">
        <Sidebar onNavigationClick={handleNavigationClick} />
        <div className="w-full drawer-content">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
