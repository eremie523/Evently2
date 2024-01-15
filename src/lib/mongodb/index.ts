import mongoose, { Connection } from 'mongoose';

// Fetch MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Interface to define the structure of the mongoose cache
interface MongooseCacheInterface {
    conn?: Connection; // Change 'any' to 'Connection' for better type checking
    promise?: Promise<typeof mongoose>; // Use 'Promise<typeof mongoose>' for better type checking
}

// Create an object to cache mongoose connection and promise
let mongooseCached: MongooseCacheInterface = {
    conn: null,
    promise: null,
};

// Function to establish or retrieve a mongoose connection
export const MongooseConnection = async (): Promise<Connection> => {
    // If a connection already exists, return it immediately
    if (mongooseCached.conn) return mongooseCached.conn;

    // If MongoDB URI is not provided, throw an error
    if (!MONGODB_URI) {
        throw new Error('MongoDB URI missing!');
    }

    // Use a single promise for mongoose connection to avoid multiple simultaneous connections
    mongooseCached.promise = mongooseCached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'Evently',
        bufferCommands: false,
        useNewUrlParser: true, // Add useNewUrlParser for compatibility
        useUnifiedTopology: true, // Add useUnifiedTopology for compatibility
    });

    // Wait for the mongoose connection to be established
    mongooseCached.conn = await mongooseCached.promise;

    // Return the established connection
    return mongooseCached.conn;
};
