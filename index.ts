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
    // TODO: sanitize url
    const url = req.url
    const response = await cachedAxios.get(`https://www.facebook.com${url}/posts`);

    const $ = cheerio.load(response.data);
    const page = buildPage($);

    // TODO: determine format (html or atom) and redirect to proper template
    const output = pug.renderFile(`${__dirname}/views/index.html.pug`, {});

    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
