# Create Database and Collections
```
mongosh "mongodb://localhost:27017/api_quota_db" schema/developers.js schema/quota_plans.js schema/api_keys.js schema/usage_bucket.js schema/overage_events.js schema/audit_logs.js
```

# Insert Sample Data
```
mongosh "mongodb://localhost:27017/api_quota_db" sample_data/developers.js sample_data/quota_plans.js sample_data/api_keys.js sample_data/usage_bucket.js sample_data/overage_events.js sample_data/audit_logs.js
```