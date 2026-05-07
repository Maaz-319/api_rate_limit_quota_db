// FIND
const res = db.quota_plans.find({ active: true }).toArray();
console.log("Active quota plans:", res);

// UPDATE
db.quota_plans.updateOne(
    { name: "Pro" },
    { $set: { "rules.requestsPerDay": NumberInt(120000) } }
);

// DELETE
const planToDelete = db.quota_plans.findOne({ name: "Free" });
const referencedByApiKeys = db.api_keys.countDocuments({ planId: planToDelete._id }) > 0;

if (planToDelete && !referencedByApiKeys) {
    db.quota_plans.deleteOne({ _id: planToDelete._id });
}
