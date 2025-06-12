document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await api.login(email, password);

    if (res.status === 200) {
      const user = res.data.user;           // <== DEFINISIKAN user
      const role = user.role;               // <== DEFINISIKAN role

      saveAuth(res.data.token, user);

      if (role === "siswa" || role === "guru") {
        window.location.href = "dashboard.html";
      } else if (role === "admin") {
        window.location.href = "./admin/dashboard.html";
      } else {
        document.getElementById("loginMessage").innerText =
          "Peran pengguna tidak dikenali.";
      }
    } else {
      document.getElementById("loginMessage").innerText =
        "Silakan hubungi TU Abbott Elementary";
    }
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById("loginMessage").innerText =
      "Terjadi kesalahan saat login.";
  }

  console.log("Role:", role);
console.log("User:", user);

});
