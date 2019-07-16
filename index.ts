import { NowRequest, NowResponse } from "@now/node";
import axios from "axios";
import cheerio from "cheerio";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    // TODO: determine format (html or atom)

    // TODO: sanitize url
    const url = req.url
    const response = await axios.get(`https://www.facebook.com${url}/posts`);

    const $ = cheerio.load(response.data);

    let output = '';
    $('.userContentWrapper').each((_, element) => {
      output += `${$(element).html()}<br><br><br>`;
    });;

    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
