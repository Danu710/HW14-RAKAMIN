import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { name, email, password } = req.body;
  const prisma = new PrismaClient();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  } finally {
    await prisma.$disconnect();
  }
}
