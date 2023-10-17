const TOKEN_KEY = "jwt-token";
const USERID_KEY = "user-local-id";

interface Props {
  id: number;
  token: string;
}

export function setTokens({ id, token }: Props) {
  localStorage.setItem(USERID_KEY, String(id));
  localStorage.setItem(TOKEN_KEY, token);
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getUserId,
  removeAuthData,
};
export default localStorageService;
