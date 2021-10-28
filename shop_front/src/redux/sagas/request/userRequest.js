import axios from "axios";

export function registerUser(payload) {
  const { name, is_shop } = payload;
  let url = "http://localhost:8000/api/register";
  if (name == undefined && is_shop === undefined) {
    url = "http://localhost:8000/api/login";
  }
  return axios.request({
    method: "post",
    url: url,
    data: payload,
  });
}

export function logoutUser() {
  return axios.request({
    method: "post",
    url: "http://localhost:8000/api/logout",
  });
}
