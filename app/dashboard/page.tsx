'use client';
import React, { useState } from "react";

interface Activity {
  id: number;
  message: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, message: "Alice was promoted to Librarian.", timestamp: "2 hours ago" },
    { id: 2, message: "New role 'Research Assistant' created.", timestamp: "5 hours ago" },
    { id: 3, message: "Bob updated his profile.", timestamp: "1 day ago" },
  ]);

  const stats = {
    totalUsers: 150,
    totalRoles: 5,
    totalActiveMembers: 120,
  };

  // Handle Quick Action Buttons
  const handleAddUser = () => {
    console.log("Redirecting to add new user page...");
  };

  const handleCreateRole = () => {
    console.log("Redirecting to create new role page...");
  };

  const handleManagePermissions = () => {
    console.log("Redirecting to manage permissions page...");
  };

  return (
    <section className="dashboard-home p-6">

      {/* Header */}
      <header className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav>
          <ul className="flex gap-2 text-gray-500">
            <li>Dashboard</li>
          </ul>
        </nav>
      </header>

      {/* Stats Cards */}
      <div className="stats-cards grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div className="card bg-blue-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-xl">{stats.totalUsers}</p>
        </div>
        <div className="card bg-green-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Roles</h3>
          <p className="text-xl">{stats.totalRoles}</p>
        </div>
        <div className="card bg-yellow-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Active Members</h3>
          <p className="text-xl">{stats.totalActiveMembers}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
        >
          Add New User
        </button>
        <button
          onClick={handleCreateRole}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
        >
          Create New Role
        </button>
        <button
          onClick={handleManagePermissions}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-full sm:w-auto"
        >
          Manage Permissions
        </button>
      </div>

      {/* Recent Activity Feed */}
      <div className="recent-activity mt-6">
        <h3 className="text-xl font-semibold">Recent Activity</h3>
        <div className="activity-feed mt-4">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item p-4 border-b">
              <p className="text-gray-700">{activity.message}</p>
              <p className="text-sm text-gray-500">{activity.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
