// Run all sample data files in correct order

console.log(" Loading sample data...\n");

// 1. Seed developers first (other collections depend on this)
console.log("1. Seeding developers...");
load("sample_data/developers.js");

// 2. Seed quota plans (api_keys depends on this)
console.log("2. Seeding quota plans...");
load("sample_data/quota_plans.js");

// 3. Seed API keys (usage_buckets and overage_events depend on this)
console.log("3. Seeding API keys...");
load("sample_data/api_keys.js");

// 4. Seed usage buckets (depends on API keys)
console.log("4. Seeding usage buckets...");
load("sample_data/usage_bucket.js");

// 5. Seed overage events (depends on API keys)
console.log("5. Seeding overage events...");
load("sample_data/overage_events.js");

// 6. Seed audit logs (depends on all previous data)
console.log("6. Seeding audit logs...");
load("sample_data/audit_logs.js");

console.log("\n Sample data setup complete!");
const counts = {
    developers: db.developers.countDocuments(),
    quota_plans: db.quota_plans.countDocuments(),
    api_keys: db.api_keys.countDocuments(),
    usage_buckets: db.usage_buckets.countDocuments(),
    overage_events: db.overage_events.countDocuments(),
    audit_logs: db.audit_logs.countDocuments()
};
console.log(" Data counts:");
console.log(`   • developers: ${counts.developers}`);
console.log(`   • quota_plans: ${counts.quota_plans}`);
console.log(`   • api_keys: ${counts.api_keys}`);
console.log(`   • usage_buckets: ${counts.usage_buckets}`);
console.log(`   • overage_events: ${counts.overage_events}`);
console.log(`   • audit_logs: ${counts.audit_logs}\n`);
