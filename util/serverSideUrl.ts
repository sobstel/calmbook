import { NextPageContext } from "next";

export default function serverSideUrl({
  req,
  path,
}: {
  req: Required<NextPageContext>["req"];
  path: string;
}) {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${req.headers.host}${path}`;
  return url;
}
