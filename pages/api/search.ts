import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404);
    return;
  }

  // req.query.page as string

  // TODO

  res.status(200).json({});
};
