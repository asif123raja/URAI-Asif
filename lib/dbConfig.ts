import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://Solo:asif1230@cluster0.qjke5.mongodb.net/";

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI environment variable is not defined.");
}

export const connect = async () => {
    console.log("MongoDB URI:", MONGODB_URI);

    // Skip if already connected
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        // Enable debugging in development
        if (process.env.NODE_ENV === "development") {
            mongoose.set("debug", true);
        }

        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            dbName: "SoloLevelling", // Database name
        });

        console.log("🔥 MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Export the connection for reuse
export const db = mongoose.connection;

// Optional: Handle connection events
db.on("connected", () => {
    console.log("✅ MongoDB Connected");
});

db.on("error", (error) => {
    console.error("❌ MongoDB Connection Error:", error);
});

db.on("disconnected", () => {
    console.log("❌ MongoDB Disconnected");
});