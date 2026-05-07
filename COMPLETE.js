// This runs: schema setup → sample data → queries

console.log("\n" + "█".repeat(70));
console.log("█" + " ".repeat(68) + "█");
console.log("█" + "  🚀 API Rate Limit Quota Database - Complete Setup".padEnd(69) + "█");
console.log("█" + " ".repeat(68) + "█");
console.log("█".repeat(70) + "\n");

// Switch to correct database
use("api_quota_db");
console.log("📍 Using database: api_quota_db\n");

// CREATE SCHEMA
console.log("PHASE 1️⃣  - SCHEMA SETUP");
console.log("─".repeat(70) + "\n");

console.log("🔨 Loading database schema...\n");

console.log("  1️⃣  Creating 'developers' collection...");
load("schema/developers.js");

console.log("  2️⃣  Creating 'quota_plans' collection...");
load("schema/quota_plans.js");

console.log("  3️⃣  Creating 'api_keys' collection...");
load("schema/api_keys.js");

console.log("  4️⃣  Creating 'usage_buckets' collection...");
load("schema/usage_buckets.js");

console.log("  5️⃣  Creating 'overage_events' collection...");
load("schema/overage_events.js");

console.log("  6️⃣  Creating 'audit_logs' collection...");
load("schema/audit_logs.js");

console.log("\n✅ Schema setup complete!\n");

// SEED SAMPLE DATA
console.log("PHASE 2️⃣  - SAMPLE DATA SEEDING");
console.log("─".repeat(70) + "\n");

console.log("🌱 Loading sample data...\n");

console.log("  1️⃣  Seeding developers...");
load("sample_data/developers.js");

console.log("  2️⃣  Seeding quota plans...");
load("sample_data/quota_plans.js");

console.log("  3️⃣  Seeding API keys...");
load("sample_data/api_keys.js");

console.log("  4️⃣  Seeding usage buckets...");
load("sample_data/usage_bucket.js");

console.log("  5️⃣  Seeding overage events...");
load("sample_data/overage_events.js");

console.log("  6️⃣  Seeding audit logs...");
load("sample_data/audit_logs.js");

console.log("\n✅ Sample data setup complete!\n");

const counts = {
    developers: db.developers.countDocuments(),
    quota_plans: db.quota_plans.countDocuments(),
    api_keys: db.api_keys.countDocuments(),
    usage_buckets: db.usage_buckets.countDocuments(),
    overage_events: db.overage_events.countDocuments(),
    audit_logs: db.audit_logs.countDocuments()
};
console.log("📊 Data counts:");
console.log(`   • developers:      ${counts.developers}`);
console.log(`   • quota_plans:     ${counts.quota_plans}`);
console.log(`   • api_keys:        ${counts.api_keys}`);
console.log(`   • usage_buckets:   ${counts.usage_buckets}`);
console.log(`   • overage_events:  ${counts.overage_events}`);
console.log(`   • audit_logs:      ${counts.audit_logs}\n`);

// PHASE 3: RUN QUERIES
console.log("PHASE 3️⃣  - QUERIES & EXAMPLES");
console.log("─".repeat(70) + "\n");

console.log("🔍 Running all queries and examples...\n");

console.log("📋 CRUD OPERATIONS");
console.log("─".repeat(70));

console.log("\n  1️⃣  Developer CRUD operations...");
load("Queries/CRUD/developer.js");

console.log("\n  2️⃣  Quota Plans CRUD operations...");
load("Queries/CRUD/quota_plans.js");

console.log("\n  3️⃣  API Key CRUD operations...");
load("Queries/CRUD/api_key.js");

console.log("\n  4️⃣  Usage Bucket CRUD operations...");
load("Queries/CRUD/usage_bucket.js");

console.log("\n  5️⃣  Overage Event CRUD operations...");
load("Queries/CRUD/overage_event.js");

console.log("\n📋 FILTERING & SORTING");
console.log("─".repeat(70));

console.log("\n  6️⃣  Filter and Sort queries...");
load("Queries/filter_and_sort.js");

console.log("\n📋 AGGREGATIONS");
console.log("─".repeat(70));

console.log("\n  7️⃣  Aggregation pipelines...");
load("Queries/aggregation.js");

// COMPLETION
console.log("\n" + "█".repeat(70));
console.log("█" + " ".repeat(68) + "█");
console.log("█" + "  ✅ COMPLETE! Database setup and all queries executed".padEnd(69) + "█");
console.log("█" + " ".repeat(68) + "█");
console.log("█".repeat(70) + "\n");
