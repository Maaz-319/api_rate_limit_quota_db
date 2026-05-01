db.createCollection("audit_logs", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["actorType", "actorId", "action", "targetType", "targetId", "timestamp"],
            properties: {
                actorType: {
                    bsonType: "string",
                    enum: ["admin", "system", "developer"],
                    description: "Actor type is required and must be one of: admin, system, developer"
                },
                actorId: {
                    bsonType: "objectId",
                    description: "Reference to the acting entity is required and must be an ObjectId"
                },
                action: {
                    bsonType: "string",
                    description: "Action performed is required"
                },
                targetType: {
                    bsonType: "string",
                    description: "Type of the target entity is required"
                },
                targetId: {
                    bsonType: "objectId",
                    description: "Reference to the target entity is required and must be an ObjectId"
                },
                timestamp: {
                    bsonType: "date",
                    description: "Timestamp of the audit event is required"
                },
                meta: {
                    bsonType: "object",
                    description: "Optional metadata about the action"
                }
            }
        }
    },
    validationAction: "error",
    validationLevel: "strict"
});