import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handlerLogin(req, res) {
  const { name, email, password } = req.body;
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const user = await prisma.user.findFirst({
        where: { OR: [{ name }, { email }] },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
      res.setHeader("Set-Cookie", `token=${token}; httpOnly; path=/`);
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
