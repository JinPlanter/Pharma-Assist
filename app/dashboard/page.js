"use client";
import { useState } from "react";
import Grading from "../Grading/page";
import FunctionalGradingForm from "../GradingForm4/page";
import Signup from "../Signup/page";
import LoginPage from "../Login/page";
import Students from "../Students/page";
import ImportClassList from "../ImportClassList/page";
import LogoutPage from "../Logout/page";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function Dashboard() {
    const [activeComponent, setActiveComponent] = useState("");

    const handleNavigationClick = (componentName) => {
        setActiveComponent(componentName);
    };
    // This is terrible and I hate it but it works ¯\_(ツ)_/¯
    const renderComponent = () => {
        switch (activeComponent) {
            case "Signup":
                return <Signup />;
            case "Grading":
                return <Grading />;
            case "FunctionalGradingForm":
                return <FunctionalGradingForm />;
            case "Login":
                return <LoginPage />;
            case "Students":
                return <Students />;
            case "ImportClassList":
                return <ImportClassList />;
            case "Log Out":
                <LogoutPage />
            default:
                return <LoginPage />;
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
