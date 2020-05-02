import { NowRequest, NowResponse } from "@now/node";
import { json } from "util/request";

const FBVideoEmbedEndpoint = "https://facebook.com/plugins/video/oembed.json/";

export default async (req: NowRequest, res: NowResponse) => {
  const link = req.query.link as string;
  console.log(`${FBVideoEmbedEndpoint}?url=https://facebook.com${link}`);
  try {
    const data = await json(
      `${FBVideoEmbedEndpoint}?url=https://facebook.com${link}`
    );
    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
};
