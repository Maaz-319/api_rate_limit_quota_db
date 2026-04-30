db.quota_plans.insertMany([
    {
        name: "Free",
        rules: {
            requestsPerMinute: NumberInt(10),
            requestsPerDay: NumberInt(500),
            burstLimit: NumberInt(0)
        },
        description: "Free tier for hobby developers. Hard limit enforced, no overage allowed.",
        active: true
    },
    {
        name: "Basic",
        rules: {
            requestsPerMinute: NumberInt(60),
            requestsPerDay: NumberInt(20000),
            burstLimit: NumberInt(10)
        },
        description: "Basic paid plan for small projects. Burst allowance of 10 extra requests per minute.",
        active: true
    },
    {
        name: "Pro",
        rules: {
            requestsPerMinute: NumberInt(300),
            requestsPerDay: NumberInt(100000),
            burstLimit: NumberInt(50)
        },
        description: "Pro plan for production applications. Paid overage permitted after daily limit.",
        active: true
    },
    {
        name: "Enterprise",
        rules: {
            requestsPerMinute: NumberInt(2000),
            requestsPerDay: NumberInt(5000000),
            burstLimit: NumberInt(300)
        },
        description: "Enterprise plan with dedicated limits and priority support.",
        active: true
    }
]);