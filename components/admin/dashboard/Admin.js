import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.API}/admin/users`);
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          toast.error("Error while fetching the data, please reload the page");
        }
      } catch (error) {
        toast.error(
          "An error occurred while fetching the data, please reload the page"
        );
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleAdminChange = async (userId, role) => {
    if (role === "admin") {
      // Delete user if the checkbox is ticked and the user is already an admin
      try {
        const response = await fetch(
          `${process.env.API}/admin/users/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("User deleted successfully");
          setUsers(users.filter((user) => user._id !== userId));
        } else {
          toast.error("Failed to delete user");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the user");
      }
    } else {
      // Update user role
      try {
        const response = await fetch(
          `${process.env.API}/admin/users/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: isAdmin ? "admin" : "user" }),
          }
        );

        if (response.ok) {
          toast.success("User updated successfully");
          setUsers(
            users.map((user) =>
              user._id === userId
                ? { ...user, role: isAdmin ? "admin" : "user" }
                : user
            )
          );
        } else {
          toast.error("Failed to update user");
        }
      } catch (error) {
        toast.error("An error occurred while updating the user");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">
                <input
                  type="checkbox"
                  checked={user.role === "admin"}
                  onChange={(e) => handleAdminChange(user._id, user.role)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
