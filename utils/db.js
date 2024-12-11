// Database that has the DBClient

const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `mongodb://${host}:${port}`;

        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.database = database;

        this.client.connect().catch((err) => {
            console.error('MongoDB connection error:', err);
        });
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        try {
            const db = this.client.db(this.database);
            return await db.collection('users').countDocuments();
        } catch (err) {
            console.error('Error counting users:', err);
            return 0;
        }
    }

    async nbFiles() {
        try {
            const db = this.client.db(this.database);
            return await db.collection('files').countDocuments();
        } catch (err) {
            console.error('Error counting files:', err);
            return 0;
        }
    }
}

const dbClient = new DBClient();
module.exports = dbClient;
