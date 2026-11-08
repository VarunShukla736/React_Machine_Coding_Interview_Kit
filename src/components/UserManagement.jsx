import { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "Varun Shukla",
    email: "varun@gmail.com",
    phone: "9876543210",
    role: "Developer",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543211",
    role: "Designer",
  },
];

function UserManagemnt() {
  const [users, setUsers] = useState(initialUsers);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add or Update User
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.role.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Enter a valid 10 digit phone number");
      return;
    }

    if (editId !== null) {
      setUsers((prev) =>
        prev.map((user) => (user.id === editId ? { ...user, ...form } : user)),
      );

      setEditId(null);
    } else {
      const newUser = {
        id: Date.now(),
        ...form,
      };

      setUsers((prev) => [...prev, newUser]);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  // Edit User
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    setEditId(user.id);
  };

  // Delete User
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // Search User
  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage users, update details, and assign roles.
          </p>
        </div>

        {/* User Form */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            {editId !== null ? "Update User" : "Add New User"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  name="name"
                  placeholder="Enter Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  User Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Role</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
              >
                {editId !== null ? "Update User" : "Add User"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      role: "",
                    });
                  }}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage all registered users.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-blue-50/50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-800">
                        {user.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {user.phone}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === "Developer"
                              ? "bg-blue-100 text-blue-700"
                              : user.role === "Designer"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="rounded-md bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(user.id)}
                            className="rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 text-sm text-gray-500">
            Showing {filteredUsers.length} users
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagemnt;
