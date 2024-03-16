import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    await seedSuperAdmin();
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();
