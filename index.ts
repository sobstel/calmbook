import { NowRequest, NowResponse } from "@now/node";

export default (req: NowRequest, res: NowResponse) => {
  try {
    res.status(200).send(`path: ${req.url}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
