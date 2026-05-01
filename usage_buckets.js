db.createCollection("usage_buckets", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["apiKeyId", "developerId", "periodType", "periodStart", "requestCount", "lastUpdatedAt"],
            properties: {
                apiKeyId: {
                    bsonType: "objectId",
                    description: "Reference to the API key is required and must be an ObjectId"
                },
                developerId: {
                    bsonType: "objectId",
                    description: "Reference to the developer is required and must be an ObjectId"
                },
                periodType: {
                    bsonType: "string",
                    enum: ["minute", "hour", "day"],
                    description: "Period type is required and must be one of: minute, hour, day"
                },
                periodStart: {
                    bsonType: "date",
                    description: "Start of the tracking period is required"
                },
                requestCount: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Request count is required and must be a non-negative integer"
                },
                lastUpdatedAt: {
                    bsonType: "date",
                    description: "Last update timestamp is required"
                }
            }
        }
    },
    validationAction: "error",
    validationLevel: "strict"
});