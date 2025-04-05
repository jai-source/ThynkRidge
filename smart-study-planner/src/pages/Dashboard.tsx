import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Smart Study Planner</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Study Plan Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Study Plan</h2>
          <p className="text-gray-600 mb-4">View and manage your study schedule</p>
          <Link to="/study-plan" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Plan
          </Link>
        </div>

        {/* Upcoming Sessions Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          <p className="text-gray-600 mb-4">Check your next study sessions</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Sessions
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <p className="text-gray-600 mb-4">Track your learning progress</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 