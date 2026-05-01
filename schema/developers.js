db.createCollection("developers", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "organization", "status", "createdAt"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "Developer full name is required"
                },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$",
                    description: "Email is required and must be a valid email address"
                },
                organization: {
                    bsonType: "string",
                    description: "Organization name is required"
                },
                status: {
                    bsonType: "string",
                    enum: ["active", "suspended", "pending", "deactivated"],
                    description: "Status is required and must be one of: active, suspended, pending, deactivated"
                },
                createdAt: {
                    bsonType: "date",
                    description: "Creation timestamp is required"
                }
            }
        }
    },
    validationAction: "error",
    validationLevel: "strict"
});