export const baseURL = "https://ndfx29.sse.codesandbox.io";

export const api = (page, options = {}) => {
  const token = localStorage.getItem("@tccEtec:token");

  if (!options?.headers) {
    options.headers = { Authorization: `Bearer ${token}` };
  } else {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    };
  }
  console.log(`${baseURL}${page}`);
  return fetch(`${baseURL}${page}`, options);
};
