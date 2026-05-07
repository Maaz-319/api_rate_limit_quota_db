// Examples operate against an existing seeded developer to avoid referencing
// data that may not exist in the environment running these scripts.

// READ
const existingDev = db.developers.findOne({ email: "claire@quantleaf.com" });
if (existingDev) {
    // UPDATE
    db.developers.updateOne(
        { email: "claire@quantleaf.com" },
        { $set: { status: "active" } }
    ); // activate after email verification
    console.log("Developer status updated to active for:", existingDev.email);
}

db.developers.updateMany(
    { organization: "Kremlin Apps", status: { $ne: "deactivated" } },
    { $set: { status: "suspended" } }
); // suspend from a certain org
console.log("Developers suspended from Kremlin Apps:");

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

db.developers.deleteOne({ _id: devToDelete._id });