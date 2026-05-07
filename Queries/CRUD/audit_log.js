// CREATE
const targetDev = db.developers.findOne({ email: "claire@quantleaf.com" });
const createdKey = db.api_keys.findOne({ keyHash: "sha256$newkey99887766554433221100ffeeddccbbaa99887766554433221100ffeedd" });
if (targetDev && createdKey) {
    db.audit_logs.insertOne({
        actorType: "developer",
        actorId: targetDev._id,
        action: "api_key.create",
        targetType: "api_key",
        targetId: createdKey._id,
        timestamp: new Date(),
        meta: { source: "self_service_portal", ip: "203.0.113.99" }
    });
}

console.log("New audit log entry created for API key creation by developer:", targetDev.email);

// READ
const res = db.audit_logs.find({
    actorType: "admin",
    targetType: "developer",
    targetId: db.developers.findOne({ email: "claire@quantleaf.com" })._id
}).toArray();
console.log("Audit logs for admin actions on Claire's developer record:", res);

// DELETE
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
db.audit_logs.deleteMany({
    action: { $in: ["usage.report_view", "developer.list_view"] },
    timestamp: { $lt: thirtyDaysAgo }
});