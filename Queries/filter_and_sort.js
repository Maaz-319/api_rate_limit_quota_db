// "List the 10 most recently onboarded ACTIVE developers, newest first."
const dev = db.developers
    .find(
        { status: "active" },
        { name: 1, email: 1, organization: 1, createdAt: 1 }
    )
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();
console.log("10 most recently onboarded ACTIVE developers:", dev);


// "Show all currently active API keys with a daily quota of at least 100,000 requests, ordered by the strictest per-minute limit first."
const apis = db.api_keys
    .aggregate([
        { $match: { active: true } },
        {
            $lookup: {
                from: "quota_plans",
                localField: "planId",
                foreignField: "_id",
                as: "plan"
            }
        },
        { $unwind: "$plan" },
        { $match: { "plan.rules.requestsPerDay": { $gte: 100000 } } },
        {
            $project: {
                developerId: 1,
                planId: 1,
                planRules: "$plan.rules",
                createdAt: 1
            }
        },
        { $sort: { "planRules.requestsPerMinute": 1, createdAt: -1 } }
    ])
    .toArray();
console.log("Active API keys with daily quota >= 100,000, ordered by strictest per-minute limit:", apis);

// "Top 20 daily usage buckets for today, ranked by request volume."
const todayStart = new Date();
todayStart.setUTCHours(0, 0, 0, 0);

const usageBuckets = db.usage_buckets
    .find(
        { periodType: "day", periodStart: todayStart },
        { apiKeyId: 1, requestCount: 1, lastUpdatedAt: 1 }
    )
    .sort({ requestCount: -1 })
    .limit(20)
    .toArray();
console.log("Top 20 daily usage buckets for today, ranked by request volume:", usageBuckets);


// "Find every overage event in the last 30 days that resulted in a hard enforcement action (throttle or revoke), worst offenders first."
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

const overageEvents = db.overage_events
    .find(
        {
            time: { $gte: thirtyDaysAgo },
            actionTaken: { $in: ["throttle_429", "key_revoke"] }
        },
        { apiKeyId: 1, developerId: 1, limitType: 1, allowed: 1, observed: 1, actionTaken: 1, time: 1 }
    )
    .sort({ observed: -1, time: -1 })
    .limit(25)
    .toArray();
console.log("Overage events from the last 30 days with hard enforcement actions:", overageEvents);


// "Recent admin or system actions affecting API keys (last 60 days), newest first, paginated (page 1, page size 15)."
const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
const pageSize = 15;
const pageNumber = 1;

const auditLogs = db.audit_logs
    .find(
        {
            actorType: { $in: ["admin", "system"] },
            targetType: "api_key",
            timestamp: { $gte: sixtyDaysAgo }
        },
        { actorType: 1, action: 1, targetId: 1, timestamp: 1, meta: 1 }
    )
    .sort({ timestamp: -1 })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize)
    .toArray();
console.log("Recent admin or system actions affecting API keys (last 60 days), page 1:", auditLogs);