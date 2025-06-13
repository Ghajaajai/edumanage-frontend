document.addEventListener('DOMContentLoaded', () => {
  const token = getToken();
  const user = getUser();
  if (!token || !user) return logout();

  document.getElementById('userName').innerText = user.name;

  const dropdown = document.getElementById("dropdownContent");
  document.getElementById("userDropdown").addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
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

  const form = document.getElementById("izinForm");
  const messageBox = document.getElementById("responseMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const keterangan = document.getElementById("keterangan").value;
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (!file) {
      messageBox.innerText = "Silakan unggah file terlebih dahulu.";
      return;
    }

    const formData = new FormData();
    formData.append("keterangan", keterangan);
    formData.append("file", file);

    try {
      const res = await fetch("http://13.214.206.178:8080/izin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        messageBox.style.color = "green";
        messageBox.innerText = "Izin berhasil diajukan!";
        form.reset();
      } else {
        messageBox.style.color = "red";
        messageBox.innerText = data.message || "Gagal mengajukan izin.";
      }
    } catch (error) {
      console.error("Error submitting izin:", error);
      messageBox.style.color = "red";
      messageBox.innerText = "Terjadi kesalahan saat mengajukan izin.";
    }
  });
});
