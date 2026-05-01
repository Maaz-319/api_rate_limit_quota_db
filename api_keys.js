db.createCollection("api_keys", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["developerId", "keyHash", "planId", "active", "quotaRules", "createdAt"],
            properties: {
                developerId: {
                    bsonType: "objectId",
                    description: "Reference to the developer is required and must be an ObjectId"
                },
                keyHash: {
                    bsonType: "string",
                    description: "Hashed API key is required"
                },
                planId: {
                    bsonType: "objectId",
                    description: "Reference to the quota plan is required and must be an ObjectId"
                },
                active: {
                    bsonType: "bool",
                    description: "Active flag is required"
                },
                quotaRules: {
                    bsonType: "object",
                    required: ["requestsPerMinute", "requestsPerDay", "burstLimit"],
                    properties: {
                        requestsPerMinute: {
                            bsonType: "int",
                            minimum: 1,
                            description: "Requests per minute must be a positive integer"
                        },
                        requestsPerDay: {
                            bsonType: "int",
                            minimum: 1,
                            description: "Requests per day must be a positive integer"
                        },
                        burstLimit: {
                            bsonType: "int",
                            minimum: 0,
                            description: "Burst limit must be a non-negative integer"
                        }
                    },
                    description: "Quota rules are required"
                },
                createdAt: {
                    bsonType: "date",
                    description: "Creation timestamp is required"
                },
                revokedAt: {
                    bsonType: ["date", "null"],
                    description: "Revocation timestamp, null if still active"
                }
            }
        }
    },
    validationAction: "error",
    validationLevel: "strict"
});