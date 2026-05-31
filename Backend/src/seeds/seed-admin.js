// admin@test.com

// Password123
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { connectDatabase } from "../config/database.js";

await connectDatabase();

const password = await bcrypt.hash("Password123", 12);

await User.create({
  name: "Admin",

  email: "admin@test.com",

  password,

  role: "admin",
});

console.log("Admin Seeded");

process.exit();
