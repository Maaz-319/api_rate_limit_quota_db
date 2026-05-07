// CREATE
const targetDev = db.developers.findOne({ email: "hafiz.abdul.rahman@google.com" });
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

// READ
const hafiz = db.developers.findOne({ email: "hafiz.abdul.rahman@google.com" });
db.api_keys.find({ developerId: hafiz._id, active: true }).toArray();

// UPDATE
db.api_keys.updateOne(
    { keyHash: "sha256$newkey99887766554433221100ffeeddccbbaa99887766554433221100ffeedd" },
    { $set: { active: false, revokedAt: new Date() } }
); // revoke key