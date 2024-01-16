import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCacheInterface {
    conn?: any;
    promise?: any;
}

let mongooseCached = <MongooseCacheInterface> {
    conn: null, 
    Promise: null,
} 

export const MongooseConnection = async () => {
    if(mongooseCached.conn) return mongooseCached.conn;

    if(!MONGODB_URI) throw new Error('Mongodb URI missing!')

    mongooseCached.promise = mongooseCached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'Evently',
        bufferCommands: false
    })

    mongooseCached.conn = await mongooseCached.promise;

    return mongooseCached.conn
}
