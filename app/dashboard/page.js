"use client";
import { useState } from "react";
import Navigation from "../components/navigation";
import Grading from "../Grading/page";
import LoginPage from "../Login/page";
import Students from "../Students/page";
import ImportFile from "../ImportFile/page";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Login");

  const handleNavigationClick = (componentName) => {
    setActiveComponent(componentName);
  };
  // This is terrible and I hate it but it works ¯\_(ツ)_/¯
  const renderComponent = () => {
    switch (activeComponent) {
      case "Grading":
        return <Grading />;
      case "Login":
        return <LoginPage />;
      case "Students":
        return <Students />;
      case "Import File":
        return <ImportFile />;
      default:
        return <Grading />;
    }
  };

  return (
    <div className="h-screen flex flex-row w-full">
      <p className="absolute">{activeComponent}</p> {/* Debug */}
      <Navigation onNavigationClick={handleNavigationClick} />
      <div className="overflow-auto bg-accent">{renderComponent()}</div>
    </div>
  );
}

export default Dashboard;
