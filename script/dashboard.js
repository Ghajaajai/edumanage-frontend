document.addEventListener('DOMContentLoaded', async () => {
  const token = getToken();
  const user = getUser();
  if (!token || !user) return logout();

  document.getElementById('userName').innerText = user.name;

  // Load table data
  try {
    const res = await api.getIzin(token);
    const tbody = document.querySelector('#izinTable tbody');
    res.data.forEach((izin) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
  <td>${izin.nama}</td>
  <td>${izin.tanggal}</td>
  <td>${izin.keterangan}</td>
  <td>
    <a href="${izin.file}" target="_blank" class="btn-eye" title="Lihat File">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8a13.133 13.133 0 0 1-1.66 2.043C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.172 8z"/>
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    </a>
  </td>
`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error loading izin data:', err);
  }

  // Dropdown toggle
  const userDropdown = document.getElementById("userDropdown");
  const dropdown = document.getElementById("dropdownContent");

  userDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
     // Pastikan path login sesuai struktur folder kamu
    window.location.href = "/edumanage-frontend/login.html";
  });

  // Go to profile
  document.getElementById("profileLink").addEventListener("click", () => {
    window.location.href = "/edumanage-frontend/profile.html";
  });
});
