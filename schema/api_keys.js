db.createCollection("api_keys", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["developerId", "keyHash", "planId", "active", "createdAt"],
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