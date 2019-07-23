import { NowRequest, NowResponse } from "@now/node";
import axios from "axios";
import { setupCache } from 'axios-cache-adapter'
import cheerio from "cheerio";
import pug from "pug";
import buildPage from "./builders/buildPage";

const cache = setupCache({ maxAge: 5 * 60 * 1000 });
// @ts-ignore
const cachedAxios = axios.create({ adapter: cache.adapter });

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const format = req.url && req.url.substr(req.url.length - 3) === 'xml' ? 'xml' : 'html';
    const url = sanitizeUrl(req.url);
    const response = await cachedAxios.get(`https://www.facebook.com/pg/${url}/posts`);

    const $ = cheerio.load(response.data);
    const page = buildPage($);

    const output = pug.renderFile(`${__dirname}/views/index.${format}.pug`, { url, page });

    if (format === 'xml') {
      res.setHeader('Content-Type', 'application/atom+xml');
    }

    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const sanitizeUrl = (url: string | undefined) => {
  if (!url) return url;

  let sanitizedUrl = url;
  sanitizedUrl = sanitizedUrl.trim();
  sanitizedUrl = sanitizedUrl.replace(/\/+$/g, ''); // trailing slashes
  sanitizedUrl = sanitizedUrl.replace(/^\/+/g, ''); // leading slashes
  sanitizedUrl = sanitizedUrl.replace(/\.\w{3}$/, ''); // extension (format)

  return sanitizedUrl;
}
