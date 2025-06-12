function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}
function getToken() {
  return localStorage.getItem('token');
}
function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}
function logout() {
  localStorage.clear();

  const currentPath = window.location.pathname;

    if (currentPath.includes('/admin/')) {
    window.location.href = '../login.html'; // naik 1 folder ke root
  } else {
    window.location.href = 'login.html';
  }
}
