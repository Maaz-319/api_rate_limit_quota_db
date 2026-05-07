// CREATE
const abusingKey = db.api_keys.findOne({
    keyHash: "sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6"
});
if (!abusingKey) {
    throw new Error("Cannot create overage_event: referenced api_key does not exist.");
}
const devExists = db.developers.countDocuments({ _id: abusingKey.developerId }, { limit: 1 }) === 1;
if (!devExists) {
    throw new Error("Cannot create overage_event: referenced developer does not exist.");
}

db.overage_events.insertOne({
    apiKeyId: abusingKey._id,
    developerId: abusingKey.developerId,
    time: new Date(),
    limitType: "minute",
    allowed: NumberInt(10),
    observed: NumberInt(15),
    actionTaken: "throttle_429",
    note: "Real-time rate limit triggered by middleware."
});

// READ
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
db.overage_events.find(
    { time: { $gte: sevenDaysAgo } },
    { _id: 0, apiKeyId: 1, limitType: 1, observed: 1, allowed: 1, actionTaken: 1, time: 1 }
).toArray();

// DELETE
const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
db.overage_events.deleteMany({ time: { $lt: ninetyDaysAgo } });