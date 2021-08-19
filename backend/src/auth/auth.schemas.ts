import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    updatedAt: { type: Date, default: Date.now },
});