import React, { useState } from "react";

const TabbedContent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs tabs-lift mb-16">
      {/* Tabs */}
      {tabs.map((tab, index) => (
        <label
          key={index}
          className={`tab text-xs md:text-base ${
            activeTab === index ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab(index)}
        >
          <input
            type="radio"
            name="my_tabs"
            checked={activeTab === index}
            readOnly
          />
          {tab.icon && <span className="me-2 text-gray-700">{tab.icon}</span>}
          {tab.label}
        </label>
      ))}

      {/* Tab Contents */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-content bg-base-100 border-base-300 p-6 ${
            activeTab === index ? "block" : "hidden"
          }`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default TabbedContent;
