// Run all schema files in correct order

console.log("Loading database schema...\n");

// 1. Create all collections with schema validation
console.log("Creating 'developers' collection...");
load("schema/developers.js");

console.log("Creating 'quota_plans' collection...");
load("schema/quota_plans.js");

console.log("Creating 'api_keys' collection...");
load("schema/api_keys.js");

console.log("Creating 'usage_buckets' collection...");
load("schema/usage_buckets.js");

console.log("Creating 'overage_events' collection...");
load("schema/overage_events.js");

console.log("Creating 'audit_logs' collection...");
load("schema/audit_logs.js");

console.log("\nSchema setup complete!");
console.log("Collections created: developers, quota_plans, api_keys, usage_buckets, overage_events, audit_logs\n");
