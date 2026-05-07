// AGGREGATION 1
// Top 10 developers by today's usage.

const todayStart = new Date();
todayStart.setUTCHours(0, 0, 0, 0);

db.usage_buckets.aggregate([
    { $match: { periodType: "day", periodStart: todayStart } },
    {
        $lookup: {
            from: "api_keys",
            localField: "apiKeyId",
            foreignField: "_id",
            as: "key"
        }
    },
    { $unwind: "$key" },
    {
        $group: {
            _id: "$key.developerId",
            totalRequestsToday: { $sum: "$requestCount" },
            keyCount: { $addToSet: "$apiKeyId" }
        }
    },
    {
        $lookup: {
            from: "developers",
            localField: "_id",
            foreignField: "_id",
            as: "developer"
        }
    },
    { $unwind: "$developer" },
    {
        $lookup: {
            from: "api_keys",
            let: { devId: "$_id" },
            pipeline: [
                { $match: { $expr: { $and: [
                    { $eq: ["$developerId", "$$devId"] },
                    { $eq: ["$active", true] }
                ] } } },
                { $limit: 1 }
            ],
            as: "sampleKey"
        }
    },
    {
        $lookup: {
            from: "quota_plans",
            localField: "sampleKey.planId",
            foreignField: "_id",
            as: "plan"
        }
    },
    {
        $project: {
            _id: 0,
            name: "$developer.name",
            organization: "$developer.organization",
            plan: { $ifNull: [{ $arrayElemAt: ["$plan.name", 0] }, "—"] },
            totalRequestsToday: 1,
            activeKeyCount: { $size: "$keyCount" }
        }
    },
    { $sort: { totalRequestsToday: -1 } },
    { $limit: 10 }
]);


// AGGREGATION 2
// Simple active plan summary.

db.api_keys.aggregate([
    { $match: { active: true } },
    {
        $group: {
            _id: "$planId",
            activeKeyCount: { $sum: 1 },
            developerIds: { $addToSet: "$developerId" }
        }
    },
    {
        $lookup: {
            from: "quota_plans",
            localField: "_id",
            foreignField: "_id",
            as: "plan"
        }
    },
    { $unwind: "$plan" },
    {
        $project: {
            _id: 0,
            planName: "$plan.name",
            active: "$plan.active",
            requestsPerMinute: "$plan.rules.requestsPerMinute",
            requestsPerDay: "$plan.rules.requestsPerDay",
            burstLimit: "$plan.rules.burstLimit",
            activeKeyCount: 1,
            developerCount: { $size: "$developerIds" }
        }
    },
    { $sort: { activeKeyCount: -1 } }
]);
