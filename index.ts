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
    let format = "html";
    if (req.url && req.url.includes(".xml")) {
      format = "xml";
      res.setHeader("Content-Type", "application/atom+xml");
    }

    const username = fetchUsername(req.url);
    if (!username) {
      throw new Error(
        "provide page username in url, eg. https://calmbook.page/TurismoArgentina"
      );
    }

    const response = await cachedAxios.get(
      `https://www.facebook.com/${username}/posts`
    );

    const $ = cheerio.load(response.data);
    const page: Page = buildPage($);

    const render = pug.compileFile(`${__dirname}/views/page.${format}.pug`);
    const output = render({ page, username, moment });

    res.status(200).send(output);
  } catch (error) {
    res.setHeader("Content-Type", "text/html");
    res.status(500).send(`<center>${error.message}</center>`);
  }
};

const fetchUsername = (url: string | undefined): string | null => {
  if (!url) return null;

  let sanitizedUrl = url;
  sanitizedUrl = sanitizedUrl.trim();
  sanitizedUrl = sanitizedUrl.replace(/\/+$/g, ""); // trailing slashes
  sanitizedUrl = sanitizedUrl.replace(/^\/+/g, ""); // leading slashes
  sanitizedUrl = sanitizedUrl.replace(/\.\w{3}$/, ""); // extension (format)
  sanitizedUrl = sanitizedUrl.replace(/#.+$/, ""); // fragment link

  return sanitizedUrl;
};
