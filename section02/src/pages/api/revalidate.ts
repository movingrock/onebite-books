import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // revalidate 하고 싶은 페이지를 넣는다.
    await res.revalidate("/");
    // 성공시 revalidate: true를 반환
    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("Revalidation Failed");
  }
}
