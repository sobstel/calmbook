import axios from "axios";
import { NowRequest, NowResponse } from "@now/node";

const FBVideoEmbedEndpoint = "https://facebook.com/plugins/video/oembed.json/";

export default async (req: NowRequest, res: NowResponse) => {
  const link = req.query.link;
  try {
    const embed = await axios.get(
      `${FBVideoEmbedEndpoint}?url=https://facebook.com${link}`
    );
    res.json(embed.data);
  } catch (e) {
    res.json({ error: e.message });
  }
};
