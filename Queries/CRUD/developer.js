// CREATE
const newDevResult = db.developers.insertOne({
    name: "Hafiz Abdul Rahman",
    email: "hafiz.abdul.rahman@google.com",
    organization: "Google LLC",
    status: "pending",
    createdAt: new Date()
});

// READ
db.developers.findOne({ email: "hafiz.abdul.rahman@google.com" });

// UPDATE
db.developers.updateOne(
    { email: "hafiz.abdul.rahman@google.com" },
    { $set: { status: "active" } }
); // activate after email verification

db.developers.updateMany(
    { organization: "Kremlin Apps", status: { $ne: "deactivated" } },
    { $set: { status: "suspended" } }
); // suspend from a certain org

// DELETE
const devToDelete = db.developers.findOne({
    email: "noah.anderson@gmail.com",
    status: "deactivated"
});

if (!devToDelete) {
    throw new Error("Delete skipped: developer not found.");
}

const apiKeysCount = db.api_keys.countDocuments({ developerId: devToDelete._id });
const overageEventsCount = db.overage_events.countDocuments({ developerId: devToDelete._id });
const apiKeyIds = db.api_keys.find({ developerId: devToDelete._id }, { _id: 1 }).toArray().map(d => d._id);
const usageBucketsCount = apiKeyIds.length === 0
    ? 0
    : db.usage_buckets.countDocuments({ apiKeyId: { $in: apiKeyIds } });

if (apiKeysCount > 0 || usageBucketsCount > 0 || overageEventsCount > 0) {
    throw new Error("Cannot delete developer: dependent api_keys/usage_buckets/overage_events exist.");
}

db.developers.deleteOne({ _id: devToDelete._id });