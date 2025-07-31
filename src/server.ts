import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import app from "./app";
import { adminSeed } from "./app/utils/adminSeed";

const port = envVars.PORT || 5000;
const startServer = async () => {
    try {
        await mongoose.connect(envVars.MONGO_URI)
        console.log('✅ Connected to MongoDB');

        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });

    }
    catch (error) {
        console.error("❌ Failed to start the server: ", error);
    }
}

(async () => {
    await startServer()
    await adminSeed()

})()