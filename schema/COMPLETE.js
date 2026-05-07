// Run all schema files in correct order

console.log("🔨 Loading database schema...\n");

// 1. Create all collections with schema validation
console.log("1️⃣  Creating 'developers' collection...");
load("schema/developers.js");

console.log("2️⃣  Creating 'quota_plans' collection...");
load("schema/quota_plans.js");

console.log("3️⃣  Creating 'api_keys' collection...");
load("schema/api_keys.js");

console.log("4️⃣  Creating 'usage_buckets' collection...");
load("schema/usage_buckets.js");

console.log("5️⃣  Creating 'overage_events' collection...");
load("schema/overage_events.js");

console.log("6️⃣  Creating 'audit_logs' collection...");
load("schema/audit_logs.js");

console.log("\n✅ Schema setup complete!");
console.log("📋 Collections created: developers, quota_plans, api_keys, usage_buckets, overage_events, audit_logs\n");
