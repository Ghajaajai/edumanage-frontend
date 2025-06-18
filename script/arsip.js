document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    window.location.href = "/edumanage-frontend/login.html";
    return;
  }

  document.getElementById("userName").innerText = user.name;

  // Dropdown user menu
  const dropdown = document.getElementById("dropdownContent");
  document.getElementById("userDropdown").addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/edumanage-frontend/login.html";
  });

  document.getElementById("profileLink").addEventListener("click", () => {
    window.location.href = "/edumanage-frontend/profile.html";
  });

  // Upload Arsip
  const form = document.getElementById("formArsip");
  const statusDiv = document.getElementById("uploadStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const namaFile = document.getElementById("namaFile").value;
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (!file) {
      statusDiv.textContent = "❌ File tidak boleh kosong.";
      return;
    }

    const formData = new FormData();
    formData.append("namaFile", namaFile);
    formData.append("file", file);

    try {
      const res = await fetch("http://54.254.127.79:3000//arsip-akademik", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        statusDiv.textContent = "✅ Berhasil mengunggah arsip.";
        form.reset();
        setTimeout(() => location.reload(), 1000);
      } else {
        statusDiv.textContent = data.message || "❌ Gagal mengunggah arsip.";
      }
    } catch (err) {
      console.error("Upload gagal:", err);
      statusDiv.textContent = "❌ Terjadi kesalahan saat mengunggah.";
    }
  });

  (async () => {
    try {
      const res = await api.getArsip(token);
      const tbody = document.querySelector("#arsipTable tbody");

      if (res.data && Array.isArray(res.data)) {
        res.data.forEach((arsip) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${arsip.namaFile}</td>
            <td>${arsip.tanggal}</td>
            <td>
              <a href="${arsip.file}" target="_blank" class="btn-eye" title="Lihat File">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8a13.133 13.133 0 0 1-1.66 2.043C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.172 8z"/>
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    </a>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    } catch (error) {
      console.error("Gagal memuat arsip:", error);
    }
  })();
});
