"use client";

import { useState } from "react";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
  type User,
} from "@/lib/users";

type UserFormState = {
  username: string;
  email: string;
  phone: string;
  password: string;
  role: "USER" | "ADMIN" | "PROVIDER";
};

const emptyForm = (): UserFormState => ({
  username: "",
  email: "",
  phone: "",
  password: "",
  role: "USER",
});

export default function UsersPage() {
  const { data: users = [], isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserFormState>(emptyForm());
  const [message, setMessage] = useState("");

  const openAddModal = () => {
    setEditingUser(null);
    setForm(emptyForm());
    setMessage("");
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setForm({
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: "",
      role: user.role,
    });
    setMessage("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setForm(emptyForm());
    setMessage("");
  };

  const handleChange = (field: keyof UserFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === "role" ? (value as UserFormState["role"]) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (createUser.isPending || updateUser.isPending) {
      return;
    }

    try {
      if (editingUser) {
        const payload: Record<string, string> = {
          username: form.username,
          email: form.email,
          phone: form.phone,
          role: form.role,
        };

        if (form.password.trim()) {
          payload.password = form.password;
        }

        await updateUser.mutateAsync({
          id: editingUser.id,
          data: payload,
        });

        closeModal();
        setMessage("User updated successfully.");
      } else {
        await createUser.mutateAsync({
          username: form.username,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: form.role,
        });

        closeModal();
        setMessage("User created successfully.");
      }
    } catch {
      setMessage(
        editingUser ? "Failed to update user." : "Failed to create user.",
      );
    }
  };

  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.username}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser.mutateAsync(user.id);
      setMessage("User deleted successfully.");
    } catch {
      setMessage("Failed to delete user.");
    }
  };

  const usersError =
    error instanceof Error ? error.message : "Failed to load users.";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">
            Management
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#f7f7f3]">
            Users
          </h1>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="rounded-lg bg-[#ffd015] px-4 py-2.5 text-sm font-bold text-[#141414] transition hover:bg-[#ffe066]"
        >
          Add User
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-lg border border-[#ffd015]/30 bg-[#ffd015]/10 px-3 py-2 text-sm text-[#ffd015]">
          {message}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-[#121416] p-6 text-sm text-[#a9adb6]">
          Loading users...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
          {usersError}
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#121416] p-10 text-center text-sm text-[#a9adb6]">
          No users found
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121416]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm text-[#dfe1e6]">
              <thead className="bg-[#191a1b] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b9bcc3]">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-[#a9adb6]">{user.id}</td>
                    <td className="px-4 py-3">{user.username}</td>
                    <td className="px-4 py-3 text-[#a9adb6]">{user.email}</td>
                    <td className="px-4 py-3 text-[#a9adb6]">{user.phone}</td>
                    <td className="px-4 py-3 text-[#ffd015]">{user.role}</td>
                    <td className="px-4 py-3 text-[#a9adb6]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          className="rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-semibold text-[#f7f7f3] transition hover:border-[#ffd015] hover:text-[#ffd015]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          className="rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-300 transition hover:border-red-400 hover:text-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#191a1b] p-6 shadow-2xl shadow-black/30">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#f7f7f3]">
                {editingUser ? "Edit User" : "Add User"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-sm text-[#a9adb6] hover:text-[#ffd015]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#c6c7ca]">
                  Username
                </label>
                <input
                  value={form.username}
                  onChange={(event) =>
                    handleChange("username", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm text-[#f7f7f3] outline-none focus:border-[#ffd015]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c7ca]">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm text-[#f7f7f3] outline-none focus:border-[#ffd015]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c7ca]">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm text-[#f7f7f3] outline-none focus:border-[#ffd015]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c7ca]">
                  {editingUser ? "New Password (optional)" : "Password"}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm text-[#f7f7f3] outline-none focus:border-[#ffd015]"
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c7ca]">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(event) => handleChange("role", event.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm text-[#f7f7f3] outline-none focus:border-[#ffd015]"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="PROVIDER">PROVIDER</option>
                </select>
              </div>

              {message && <p className="text-sm text-[#ffd015]">{message}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#f7f7f3] hover:border-[#ffd015] hover:text-[#ffd015]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUser.isPending || updateUser.isPending}
                  className="rounded-lg bg-[#ffd015] px-4 py-2 text-sm font-bold text-[#141414] hover:bg-[#ffe066] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {createUser.isPending || updateUser.isPending
                    ? editingUser
                      ? "Saving..."
                      : "Creating..."
                    : editingUser
                      ? "Save Changes"
                      : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
