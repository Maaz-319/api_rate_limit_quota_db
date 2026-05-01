db.createCollection("quota_plans", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "rules", "active"],
            properties: {
                name: {
                    bsonType: "string",
                    enum: ["Free", "Basic", "Pro", "Enterprise"],
                    description: "Plan name is required and must be one of the four tiers"
                },
                rules: {
                    bsonType: "object",
                    required: ["requestsPerMinute", "requestsPerDay", "burstLimit"],
                    properties: {
                        requestsPerMinute: { bsonType: "int", minimum: 1 },
                        requestsPerDay: { bsonType: "int", minimum: 1 },
                        burstLimit: { bsonType: "int", minimum: 0 }
                    }
                },
                description: { bsonType: "string" },
                active: { bsonType: "bool" }
            }
        }
    },
    validationAction: "error",
    validationLevel: "strict"
});