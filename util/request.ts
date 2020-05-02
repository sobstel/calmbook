import fetch from "isomorphic-unfetch";

export default function request(url: string) {
  return fetch(url).then((response) => response.json());
}
