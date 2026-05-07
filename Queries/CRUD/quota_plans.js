// FIND
db.quota_plans.find({ active: true }).toArray();

// UPDATE
db.quota_plans.updateOne(
    { name: "Pro" },
    { $set: { "rules.requestsPerDay": NumberInt(120000) } }
);

// DELETE
const planToDelete = db.quota_plans.findOne({ name: "Free" });

if (!planToDelete) {
    throw new Error("Delete skipped: quota plan not found.");
}

const referencedByApiKeys = db.api_keys.countDocuments({ planId: planToDelete._id }) > 0;
if (referencedByApiKeys) {
    throw new Error("Cannot delete quota plan: dependent api_keys exist.");
}

db.quota_plans.deleteOne({ _id: planToDelete._id });