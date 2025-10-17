import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    company: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Client = mongoose.model('Client', clientSchema);
export default Client;