window.BASE_URL = window.BASE_URL || "http://54.254.127.79:3000/";
const token = localStorage.getItem("token");

async function loadUsers() {
  try {
    const response = await fetch(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    const users = result.data;

    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.nama}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.alamat}</td>
        <td>${user.nomorTelepon}</td>
        <td>${user.tanggalLahir}</td>
        <td>
          <button class="action-btn view-btn" onclick="editUser(
            '${user.UserId}', 
            '${user.nama}', 
            '${user.email}', 
            '${user.role}', 
            '${user.nomorTelepon}', 
            '${user.alamat}', 
            '${user.tanggalLahir}'
          )">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteUser('${user.UserId}')">Hapus</button>
        </td>`;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal memuat data user:", error);
    document.getElementById("userError").innerText = "Gagal memuat data user.";
  }
}

async function deleteUser(userId) {
  if (!confirm("Apakah kamu yakin ingin menghapus user ini?")) return;
  try {
    const response = await fetch(`${BASE_URL}/admin/user/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    if (response.ok) {
      alert("User berhasil dihapus.");
      loadUsers();
    } else {
      alert(`Gagal menghapus user: ${result.message}`);
    }
  } catch (error) {
    console.error("Error hapus user:", error);
    alert("Terjadi kesalahan saat menghapus user.");
  }
}

function editUser(userId, nama, email, role, nomorTelepon, alamat, tanggalLahir) {
  document.getElementById("editUserId").value = userId;
  document.getElementById("editNama").value = nama;
  document.getElementById("editEmail").value = email;
  document.getElementById("editRole").value = role;
  document.getElementById("editNomor").value = nomorTelepon;
  document.getElementById("editAlamat").value = alamat;
  document.getElementById("editTanggalLahir").value = tanggalLahir;
  document.getElementById("editUserModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editUserModal").style.display = "none";
}

async function submitUserUpdate() {
  const userId = document.getElementById("editUserId").value;
  const nama = document.getElementById("editNama").value;
  const email = document.getElementById("editEmail").value;
  const role = document.getElementById("editRole").value;
  const nomorTelepon = document.getElementById("editNomor").value;
  const alamat = document.getElementById("editAlamat").value;
  const tanggalLahir = document.getElementById("editTanggalLahir").value;

  try {
    const response = await fetch(`${BASE_URL}/admin/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nama, email, role, nomorTelepon, alamat, tanggalLahir }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("User berhasil diperbarui.");
      closeEditModal();
      loadUsers();
    } else {
      alert(`Gagal update: ${result.message}`);
    }
  } catch (error) {
    console.error("Gagal update user:", error);
    alert("Terjadi kesalahan saat update user.");
  }
}

// 🔍 Fitur pencarian real-time
document.getElementById("searchBox").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  document.querySelectorAll("#userTableBody tr").forEach((row) => {
    const rowText = row.innerText.toLowerCase();
    row.style.display = rowText.includes(keyword) ? "" : "none";
  });
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", loadUsers);
