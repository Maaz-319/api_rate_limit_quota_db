// CREATE
const activeKeys = db.api_keys.find({ active: true }).limit(3).toArray();
const currentMinute = new Date();
currentMinute.setSeconds(0, 0);

db.usage_buckets.insertMany(
    activeKeys.map(k => ({
        apiKeyId: k._id,
        periodType: "minute",
        periodStart: currentMinute,
        requestCount: NumberInt(0),
        lastUpdatedAt: new Date()
    }))
);

// READ
const todayStart = new Date();
todayStart.setUTCHours(0, 0, 0, 0);
const abusingKey = db.api_keys.findOne({
    keyHash: "sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6"
});

const res = db.usage_buckets.findOne({
    apiKeyId: abusingKey._id,
    periodType: "day",
    periodStart: todayStart
});
console.log("Usage bucket for today:", res);

// DELETE
const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
db.usage_buckets.deleteMany({
    periodType: "minute",
    periodStart: { $lt: oneDayAgo }
});