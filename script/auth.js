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
  window.location.href = 'login.html';
}