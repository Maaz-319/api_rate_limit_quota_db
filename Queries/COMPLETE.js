// Run all query files (CRUD, filtering, aggregation)

console.log("Running all queries and examples...\n");

console.log("=".repeat(70));
console.log("CRUD OPERATIONS");
console.log("=".repeat(70));

// Pre-check: ensure minimal dependencies exist so CRUD examples can run standalone.
// If the workspace user runs this file without seeding sample data, load minimal seed files.
if (db.developers.countDocuments() === 0) {
	console.log("Developers collection is empty — seeding developers from sample_data/developers.js...");
	load("sample_data/developers.js");
}
if (db.quota_plans.countDocuments() === 0) {
	console.log("Quota plans collection is empty — seeding quota_plans from sample_data/quota_plans.js...");
	load("sample_data/quota_plans.js");
}


// Load CRUD operations in order that avoids deleting developers before dependents
// Execute CRUD operations in a safe order for deletions:
// 1) usage_buckets & overage_events (depend on api_keys)
// 2) api_keys (depend on quota_plans)
// 3) quota_plans
// 4) developers (run last)

// 1. Usage Bucket CRUD operations
console.log("\n1. Usage Bucket CRUD operations...");
load("Queries/CRUD/usage_bucket.js");

// 2. Overage Event CRUD operations
console.log("\n2. Overage Event CRUD operations...");
load("Queries/CRUD/overage_event.js");

// 3. API Key CRUD operations
console.log("\n3. API Key CRUD operations...");
load("Queries/CRUD/api_key.js");

// 4. Quota Plans CRUD operations
console.log("\n4. Quota Plans CRUD operations...");
load("Queries/CRUD/quota_plans.js");

// 5. Developer CRUD operations (run after dependent resources)
console.log("\n5. Developer CRUD operations...");
load("Queries/CRUD/developer.js");

console.log("\n" + "=".repeat(70));
console.log("FILTERING & SORTING");
console.log("=".repeat(70));

// 6. Filter and Sort queries
console.log("\n6. Filter and Sort queries...");
load("Queries/filter_and_sort.js");

console.log("\n" + "=".repeat(70));
console.log("AGGREGATIONS");
console.log("=".repeat(70));

// 7. Aggregation pipelines
console.log("\n7. Aggregation pipelines...");
load("Queries/aggregation.js");

console.log("\n" + "=".repeat(70));
console.log("All queries executed.");
console.log("=".repeat(70) + "\n");
