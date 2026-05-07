// CREATE
const targetDev = db.developers.findOne({ email: "claire@quantleaf.com" });
const basicPlan = db.quota_plans.findOne({ name: "Basic" });

if (!targetDev) {
    throw new Error("Cannot create api_key: referenced developer does not exist.");
}
if (!basicPlan) {
    throw new Error("Cannot create api_key: referenced quota plan does not exist.");
}

db.api_keys.insertOne({
    developerId: targetDev._id,
    keyHash: "sha256$newkey99887766554433221100ffeeddccbbaa99887766554433221100ffeedd",
    planId: basicPlan._id,
    active: true,
    createdAt: new Date(),
    revokedAt: null
});

console.log("New API key created for developer:", targetDev.email);

// READ
const claire = db.developers.findOne({ email: "claire@quantleaf.com" });
const res = db.api_keys.find({ developerId: claire._id, active: true }).toArray();
console.log("Active API keys for Claire:", res);

// UPDATE
db.api_keys.updateOne(
    { keyHash: "sha256$newkey99887766554433221100ffeeddccbbaa99887766554433221100ffeedd" },
    { $set: { active: false, revokedAt: new Date() } }
); // revoke key