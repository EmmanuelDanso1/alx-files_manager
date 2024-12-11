const { ObjectId } = require('mongodb');
const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        const userCollection = dbClient.client.db(dbClient.database).collection('users');
        const existingUser = await userCollection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Already exist' });
        }

        const hashedPassword = sha1(password);
        const newUser = {
            email,
            password: hashedPassword,
        };

        const result = await userCollection.insertOne(newUser);
        const userId = result.insertedId;

        res.status(201).json({ id: userId, email });
    }
}

module.exports = UsersController;