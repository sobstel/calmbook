import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404);
    return;
  }

  // TODO: make it array[] bulletproof
  const query = req.query.q as string;

  const customsearch = google.customsearch("v1");

  const response = await customsearch.cse.list({
    cx: process.env.GOOGLE_SEARCH_CX,
    q: query,
    auth: process.env.GOOGLE_SEARCH_API_KEY,
  });

  res.status(200).json({ results: response.data });
};
