import app from "./app.js";
import { connectDB } from "./db/index.js";
import { PORT } from "./config/env.js";

connectDB()
    .then(() => {
        app.listen(PORT || 3000, () => console.log(`** server listen on port: ${PORT || 3000} **`)
        );
    })
    .catch((error) => {
        console.error("mongodb connection error:", error);
        process.exit(1);
    });