import axios from "axios";
import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  const link = req.query.link;
  const a = axios.create();
  const r = await a.get(
    `https://facebook.com/plugins/video/oembed.json/?url=https://facebook.com${link}`
  );
  res.json(r.data);
};
