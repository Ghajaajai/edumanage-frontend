const BASE_URL = "http://localhost:3000";

const api = {
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok || data.status !== 200) {
      throw new Error(data.message || "Login gagal");
    }

    return data; // { token, user }
  },

  getIzin: async (token) => {
    const res = await fetch(`${BASE_URL}/izin/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      throw new Error(data.message || "Gagal mengambil data izin.");
    }

    return data;
  },

  deleteIzin: async (izinId, token) => {
    const res = await fetch(`${BASE_URL}/izin/${izinId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Gagal menghapus izin");
    return data;
  },

  getProfile: async (token) => {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      throw new Error(data.message || "Gagal mengambil profil");
    }

    return data;
  },

  getArsip: async (token) => {
    const res = await fetch(`${BASE_URL}/arsip-akademik/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      throw new Error(data.message || "Gagal mengambil arsip");
    }

    return data;
  },

  getUsers: async (token) => {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      throw new Error(data.message || "Gagal memuat data users.");
    }

    return data;
  },

  updateUser: async (id, payload, token) => {
    const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || data.status !== 200) {
      throw new Error(data.message || "Gagal memperbarui user.");
    }

    return data;
  },

  deleteUser: async (id, token) => {
    const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      throw new Error(data.message || "Gagal menghapus user.");
    }

    return data;
  },
};

// expose ke global scope
window.api = api;