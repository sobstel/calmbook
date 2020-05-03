import { NextApiRequest, NextApiResponse } from "next";
import { google, customsearch_v1 as cse } from "googleapis";

function fetchTitle(item: cse.Schema$Result): string {
  let title = item.title;
  if (!title) return "";

  title = title.replace(" - Home | Facebook", "");

  return title;
}

function fetchSlug(item: cse.Schema$Result): string {
  let slug = item.link;
  if (!slug) return "";

  slug = slug.replace(/.+facebook\.com\//, "");
  slug = slug.replace(/\?.+$/, "");
  slug = slug.replace(/\/+$/, "");

  const parts = slug.split("/");
  if (parts.length === 1) return slug;

  const lastPart = parts[parts.length - 1];
  if (!lastPart.match(/^[0-9]+$/)) return lastPart;

  return parts.slice(-2).join("-");
}

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
    fields: "items(title,link)",
    quotaUser: req.headers["x-forwarded-for"] as string,
  });
  const data = response.data;
  const { items } = data;

  const results = items
    ?.filter((item) =>
      ["videos", "photos", "profiles"].every(
        (string) => item?.link?.indexOf(string) === -1
      )
    )
    .map((item) => {
      return {
        title: fetchTitle(item),
        slug: fetchSlug(item),
      };
    })
    // unique
    .filter(
      (item, i, array) =>
        array.findIndex((_item) => _item.slug === item.slug) === i
    );

  res.status(200).json(results || []);
};
