import fetch from "isomorphic-unfetch";

export function json(url: string) {
  return fetch(url).then((response) => response.json());
}

export function text(url: string) {
  return fetch(url).then((response) => response.text());
}
