import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";
import buildPage from "builders/buildPage";

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

  const { data } = await axios.get(
    `https://www.facebook.com/${encodeURI(name)}/posts`,
    { responseType: "text" }
  );

  const $ = cheerio.load(data);
  const page: Page = buildPage($);

  res.setHeader("Cache-Control", "s-maxage=300");
  res.status(200).json({ page });
};
