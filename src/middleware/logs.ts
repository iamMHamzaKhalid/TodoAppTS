import mongoose from 'mongoose';

export const logs = async () => {

    mongoose.connection.once('open', () => {
        console.log('MongoDB Connection ready!');
    });
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB Connection error:' + err);
    });
}