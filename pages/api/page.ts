import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";
import buildPage from "builders/buildPage";

// TODO: move to "util"
const sanitizeName = (name: string): string => {
  let sanitizedName = name;
  sanitizedName = sanitizedName.trim();
  sanitizedName = sanitizedName.replace(/\/+$/g, ""); // trailing slashes
  sanitizedName = sanitizedName.replace(/^\/+/g, ""); // leading slashes
  sanitizedName = sanitizedName.replace(/\.\w{3}$/, ""); // extension (format)
  sanitizedName = sanitizedName.replace(/#.+$/, ""); // fragment link
  return sanitizedName;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404).json({ error: 404 });
    return;
  }

  const name = req.query.name as string;
  if (!name) {
    res.status(400).json({ error: 400 });
    return;
  }

  const sanitizedName = sanitizeName(name);
  const response = await axios.get(
    `https://www.facebook.com/${sanitizedName}/posts`
  );

  const $ = cheerio.load(response.data);
  const page: Page = buildPage($);

  res.status(200).json({ page });
};