// Run all query files (CRUD, filtering, aggregation)

console.log("🔍 Running all queries and examples...\n");

console.log("=".repeat(70));
console.log("CRUD OPERATIONS");
console.log("=".repeat(70));

// 1. Developer CRUD operations
console.log("\n1️⃣  Developer CRUD operations...");
load("Queries/CRUD/developer.js");

// 2. Quota Plans CRUD operations
console.log("\n2️⃣  Quota Plans CRUD operations...");
load("Queries/CRUD/quota_plans.js");

// 3. API Key CRUD operations
console.log("\n3️⃣  API Key CRUD operations...");
load("Queries/CRUD/api_key.js");

// 4. Usage Bucket CRUD operations
console.log("\n4️⃣  Usage Bucket CRUD operations...");
load("Queries/CRUD/usage_bucket.js");

// 5. Overage Event CRUD operations
console.log("\n5️⃣  Overage Event CRUD operations...");
load("Queries/CRUD/overage_event.js");

console.log("\n" + "=".repeat(70));
console.log("FILTERING & SORTING");
console.log("=".repeat(70));

// 6. Filter and Sort queries
console.log("\n6️⃣  Filter and Sort queries...");
load("Queries/filter_and_sort.js");

console.log("\n" + "=".repeat(70));
console.log("AGGREGATIONS");
console.log("=".repeat(70));

// 7. Aggregation pipelines
console.log("\n7️⃣  Aggregation pipelines...");
load("Queries/aggregation.js");

console.log("\n" + "=".repeat(70));
console.log("✅ All queries executed successfully!");
console.log("=".repeat(70) + "\n");
