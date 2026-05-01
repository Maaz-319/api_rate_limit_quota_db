db.createCollection("overage_events", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["apiKeyId", "developerId", "time", "limitType", "allowed", "observed", "actionTaken"],
            properties: {
                apiKeyId: {
                    bsonType: "objectId",
                    description: "Reference to the API key is required and must be an ObjectId"
                },
                developerId: {
                    bsonType: "objectId",
                    description: "Reference to the developer is required and must be an ObjectId"
                },
                time: {
                    bsonType: "date",
                    description: "Timestamp of the overage event is required"
                },
                limitType: {
                    bsonType: "string",
                    enum: ["minute", "day", "burst"],
                    description: "Limit type is required and must be one of: minute, day, burst"
                },
                allowed: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Allowed request threshold is required and must be a non-negative integer"
                },
                observed: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Observed request count is required and must be a non-negative integer"
                },
                actionTaken: {
                    bsonType: "string",
                    description: "Action taken in response to the overage is required"
                },
                note: {
                    bsonType: "string",
                    description: "Optional additional note about the overage event"
                }
            }
        }
    },
    validationAction: "error",
    validationLevel: "strict"
});