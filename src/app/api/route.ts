import { NextApiRequest, NextApiResponse } from "next";

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req", req);
  console.log("res", res);
  return res
};
