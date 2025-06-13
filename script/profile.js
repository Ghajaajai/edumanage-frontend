document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const API_BASE = "http://13.214.206.178:8080"; // ganti jika endpoint beda

  const nameElement = document.getElementById("profile-name");
  const emailElement = document.getElementById("profile-email");
  const nomorElement = document.getElementById("profile-nomorTelepon");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const nomorInput = document.getElementById("nomorTelepon");
  const updateBtn = document.getElementById("update-btn");
  const errorText = document.getElementById("error-text");

  // Ambil data profil
  fetch(`${API_BASE}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`HTTP ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then((result) => {
      if (result.status === "success") {
        const data = result.data;
        nameElement.textContent = data.nama;
        document.getElementById("dynamic-title").innerHTML = `Account Setting`;
        emailElement.textContent = data.email;
        nomorElement.textContent = data.nomorTelepon;
        nameInput.value = data.nama;
        emailInput.value = data.email;
        nomorInput.value = data.nomorTelepon;
        errorText.textContent = "";
      } else {
        throw new Error(result.message);
      }
    })
    .catch((error) => {
      console.error("Gagal mengambil data profil:", error);
      errorText.textContent = "Gagal mengambil data profil.";
    });

  // Submit update profil
  updateBtn.addEventListener("click", () => {
    const updatedNama = nameInput.value.trim();
    const updatedEmail = emailInput.value.trim();
    const updatedNomor = nomorInput.value.trim();

    if (!updatedNama || !updatedEmail) {
      alert("Nama dan email tidak boleh kosong.");
      return;
    }

    fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama: updatedNama,
        email: updatedEmail,
        nomorTelepon: updatedNomor,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          alert("Profil berhasil diperbarui.");
          nameElement.textContent = updatedNama;
          emailElement.textContent = updatedEmail;
          nomorElement.textContent = updatedNomor;
          errorText.textContent = "";
        } else {
          throw new Error(result.message);
        }
      })
      .catch((error) => {
        console.error("Gagal memperbarui profil:", error);
        errorText.textContent = "Gagal memperbarui profil.";
      });
  });

  // Go to profile
  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "/edumanage-frontend/dashboard.html";
  });
});
