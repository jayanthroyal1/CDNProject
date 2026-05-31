// Jayanth Royal

// Software Engineer

// India
import Profile from "../models/profile.model.js";

import { connectDatabase } from "../config/database.js";

await connectDatabase();

await Profile.create({
  fullName: "Jayanth Royal",

  title: "Software Engineer",

  summary: "Portfolio Owner",

  email: "admin@test.com",

  location: "India",
});

console.log("Profile Seeded");

process.exit();
