document.addEventListener("DOMContentLoaded", () => {
  const token = getToken();
  const user = getUser();

  if (!token || !user || user.role !== "admin") {
    return logout();
  }

  // 👇 Tambahkan listener untuk tombol logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Yakin ingin logout?")) {
        logout();
      }
    });
  }

  document.getElementById("adminName").innerText = user.name;
  document.getElementById("logoutBtn").onclick = logout;

  // Navigation
  const navTo = (page) => (window.location.href = page + ".html");
  document.getElementById("nav-dashboard").onclick = () => navTo("dashboard");
  document.getElementById("nav-users").onclick = () => navTo("data_users");
  document.getElementById("card-dashboard").onclick = () => navTo("dashboard");
  document.getElementById("card-users").onclick = () => navTo("data_users");

  // Load history data
  async function loadHistory() {
    try {
      const token = getToken();
      const res = await api.getIzin(token);

      if (res.status !== "success" || !res.data) {
        throw new Error("Gagal memuat data riwayat pengajuan");
      }

      const historyTable = document.getElementById("historyTableBody");
      historyTable.innerHTML = "";

      for (let i = 0; i < res.data.length; i++) {
        const item = res.data[i];

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i + 1}</td>
          <td>${item.nama}</td>
          <td>${item.keterangan}</td>
          <td>${
            item.tanggal ? new Date(item.tanggal).toLocaleDateString() : "-"
          }</td>
          <td>
            <a href="${item.file}" target="_blank">📎</a>
          </td>
          <td>
            <button class="delete-btn" data-id="${item.izinId}">🗑️</button>
          </td>
        `;
        historyTable.appendChild(row);
      }

      // Tombol delete
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const izinId = e.target.dataset.id;
          if (confirm("Yakin ingin menghapus pengajuan ini?")) {
            try {
              const delRes = await api.deleteIzin(izinId, token);
              if (delRes.status === "success") {
                alert("Berhasil dihapus");
                loadHistory();
              } else {
                alert("Gagal menghapus data");
              }
            } catch (err) {
              console.error("Gagal hapus:", err);
              alert("Terjadi kesalahan saat menghapus");
            }
          }
        });
      });
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("historyTableBody").innerHTML = `
        <tr><td colspan="5">Gagal memuat riwayat pengajuan.</td></tr>
      `;
    }
  }

  loadHistory();

  // Filter pencarian
  document.getElementById("searchBox").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll("#historyTableBody tr").forEach((tr) => {
      const text = tr.innerText.toLowerCase();
      tr.style.display = text.includes(q) ? "" : "none";
    });
  });
});
