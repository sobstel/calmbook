import { NowRequest, NowResponse } from "@now/node";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import cheerio from "cheerio";
import pug from "pug";
import moment from "moment";
import buildPage from "./builders/buildPage";
import { Page } from "./models";

const cache = setupCache({ maxAge: 5 * 60 * 1000 });

// @ts-ignore
const cachedAxios = axios.create({ adapter: cache.adapter });

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const format =
      req.url && req.url.substr(req.url.length - 3) === "xml" ? "xml" : "html";

    const object = sanitizeUrl(req.url);
    if (!object || object.username.length == 0) {
      throw new Error(
        "provide page @username in url, eg. https://calmbook.page/TurismoArgentina"
      );
    }

    const response = await cachedAxios.get(
      object.itemid
        ? `https://www.facebook.com/${object.username}/posts/${
            object.itemid
          }?_fb_noscript=1`
        : `https://www.facebook.com/${object.username}/posts`
    );

    const $ = cheerio.load(response.data);
    const pageInfo = await buildPage($);
    const page: Page = { username: object.username, ...pageInfo };

    const output = pug.renderFile(`${__dirname}/views/page.${format}.pug`, {
      page,
      moment
    });

    if (format === "xml") {
      res.setHeader("Content-Type", "application/atom+xml");
    }

    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(`<center>${error.message}</center>`);
  }
};

const sanitizeUrl = (
  url: string | undefined
): { username: string; itemid?: string } | null => {
  if (!url) return null;

  let sanitizedUrl = url;
  sanitizedUrl = sanitizedUrl.trim();
  sanitizedUrl = sanitizedUrl.replace(/\/+$/g, ""); // trailing slashes
  sanitizedUrl = sanitizedUrl.replace(/^\/+/g, ""); // leading slashes
  sanitizedUrl = sanitizedUrl.replace(/\.\w{3}$/, ""); // extension (format)

  const [username, itemid = undefined] = sanitizedUrl.split("@");

  return { username, itemid };
};
