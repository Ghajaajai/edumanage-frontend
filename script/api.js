const BASE_URL = "http://localhost:3000";
const api = {
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  getIzin: async (token) => {
    const res = await fetch(`${BASE_URL}/izin/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  getProfile: async (userId, token) => {
    const res = await fetch(`${BASE_URL}/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  getArsip: async (token) => {
  const res = await fetch(`${BASE_URL}/arsip-akademik/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil arsip");
  return res.json();
},
};
