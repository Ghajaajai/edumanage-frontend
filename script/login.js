document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await api.login(email, password);
  if (res.status === 200) {
    saveAuth(res.data.token, res.data.user);
    if (res.data.user.role === 'siswa') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Login berhasil, tapi Anda bukan siswa. Tunggu instruksi selanjutnya.');
    }
  } else {
    document.getElementById('loginMessage').innerText = 'Silakan hubungi TU Abbott Elementary';
  }
});