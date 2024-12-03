import React from "react";
import Header from "../../components/Header";

export default function ProviderHome() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Provider Dashboard</h1>
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-500 text-white p-4 rounded shadow">
            
          </div>
          <div className="flex-1 bg-green-500 text-white p-4 rounded shadow"></div>
        </div>
      </div>
    </div>
  );
}
