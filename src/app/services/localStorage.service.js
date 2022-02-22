const REFRESH_KEY = "jwt-refresh-token";
const TOKEN_KEY = "jwt-token";
const EXPIRES_KEY = "jwt-expires";

export function setTokens({ idToken, refreshToken, expiresIn = 3600 }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresToken() {
  return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getExpiresToken,
  getRefreshToken
};

export default localStorageService;
