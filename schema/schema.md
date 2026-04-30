# developers
```
developers: {
  _id,
  name,
  email,
  organization,
  status,
  createdAt
}
```
# api_keys
```
api_keys: {
  _id,
  developerId,
  keyHash,
  planId,
  active,
  quotaRules: {
    requestsPerMinute,
    requestsPerDay,
    burstLimit
  },
  createdAt,
  revokedAt
}
```
# quota_plans
```
quota_plans: {
  _id,
  name,
  rules: {
    requestsPerMinute,
    requestsPerDay,
    burstLimit
  },
  description,
  active
}
```
# usage_buckets
```
usage_buckets: {
  _id,
  apiKeyId,
  developerId,
  periodType,      // minute, hour, day
  periodStart,
  requestCount,
  lastUpdatedAt
}
```
# overage_events
```
overage_events: {
  _id,
  apiKeyId,
  developerId,
  time,
  limitType,       // minute/day/burst
  allowed,
  observed,
  actionTaken,
  note
}
```
# audit_logs
```
audit_logs: {
  _id,
  actorType,       // admin/system/developer
  actorId,
  action,
  targetType,
  targetId,
  timestamp,
  meta
}
```