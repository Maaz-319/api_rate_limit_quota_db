// CREATE
db.audit_logs.insertOne({
    actorType: "developer",
    actorId: targetDev._id,
    action: "api_key.create",
    targetType: "api_key",
    targetId: db.api_keys.findOne({ keyHash: "sha256$newkey99887766554433221100ffeeddccbbaa99887766554433221100ffeedd" })._id,
    timestamp: new Date(),
    meta: { source: "self_service_portal", ip: "203.0.113.99" }
});

// READ
db.audit_logs.find({
    actorType: "admin",
    targetType: "developer",
    targetId: db.developers.findOne({ email: "hafiz.abdul.rahman@google.com" })._id
}).toArray();

// DELETE
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
db.audit_logs.deleteMany({
    action: { $in: ["usage.report_view", "developer.list_view"] },
    timestamp: { $lt: thirtyDaysAgo }
});