import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404);
    return;
  }

  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;

  const customsearch = google.customsearch("v1");
  const response = await customsearch.cse.list({
    auth: process.env.GOOGLE_SEARCH_API_KEY,
    cx: process.env.GOOGLE_SEARCH_CX,
    q: `${q} page`,
    fields: "searchInformation,items(title,link)",
    quotaUser: req.headers["x-forwarded-for"] as string,
  });
  const data = response.data;

  res.status(200).json(data);
};
