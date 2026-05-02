// ============================================================
// AUDIT LOGS - lifecycle events for keys, plans, developers
// Includes admin actions, system actions, and developer self-service
// ============================================================
const dev = (email) => db.developers.findOne({ email: email })._id;
const keyByHash = (h) => db.api_keys.findOne({ keyHash: h });

// We need a synthetic admin actor (in real systems this would come from an admins collection).
// For demo purposes, we'll reuse Marcus Reed's _id as if he had admin role for the platform.
// You may replace these with real admin ObjectIds from your admin collection.
const adminId = ObjectId();   // platform admin
const systemId = ObjectId();  // system/cron actor

db.audit_logs.insertMany([
    // ----- Developer onboarding -----
    { actorType: "admin", actorId: adminId, action: "developer.create",
      targetType: "developer", targetId: dev("priya@quantleaf.com"),
      timestamp: new Date("2024-03-02T11:45:00Z"),
      meta: { onboardedBy: "sales-team", initialPlan: "Enterprise" } },

    { actorType: "admin", actorId: adminId, action: "developer.create",
      targetType: "developer", targetId: dev("sara.k@helioscloud.dev"),
      timestamp: new Date("2024-05-09T14:12:00Z"),
      meta: { onboardedBy: "sales-team", initialPlan: "Enterprise" } },

    { actorType: "developer", actorId: dev("rohan.mehta@gmail.com"), action: "developer.self_signup",
      targetType: "developer", targetId: dev("rohan.mehta@gmail.com"),
      timestamp: new Date("2024-04-18T07:30:00Z"),
      meta: { source: "web", plan: "Free" } },

    // ----- API key creation -----
    { actorType: "developer", actorId: dev("priya@quantleaf.com"), action: "api_key.create",
      targetType: "api_key", targetId: keyByHash("sha256$a1f9c2e0b8d4e7f1a23b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819")._id,
      timestamp: new Date("2024-03-03T10:00:00Z"),
      meta: { label: "production-primary", ip: "203.0.113.42" } },

    { actorType: "developer", actorId: dev("priya@quantleaf.com"), action: "api_key.create",
      targetType: "api_key", targetId: keyByHash("sha256$b2e8d3f1c9e5f8021b34c5d6e7f80192b3c4d5e6f7081920b3c4d5e6f7081920")._id,
      timestamp: new Date("2024-03-03T10:05:00Z"),
      meta: { label: "staging", ip: "203.0.113.42" } },

    { actorType: "developer", actorId: dev("aarav.sharma@nimbusforge.io"), action: "api_key.create",
      targetType: "api_key", targetId: keyByHash("sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7")._id,
      timestamp: new Date("2024-02-15T10:00:00Z"),
      meta: { label: "default", ip: "198.51.100.7" } },

    // ----- API key revocations -----
    { actorType: "developer", actorId: dev("priya@quantleaf.com"), action: "api_key.revoke",
      targetType: "api_key", targetId: keyByHash("sha256$c3d7e4a2dafa9013c45d6e7f8091a2b3c4d5e6f7081920a3c4d5e6f7081920a3")._id,
      timestamp: new Date("2025-06-01T09:00:00Z"),
      meta: { reason: "key_rotation", replacedBy: "production-v2" } },

    { actorType: "developer", actorId: dev("aarav.sharma@nimbusforge.io"), action: "api_key.revoke",
      targetType: "api_key", targetId: keyByHash("sha256$2977eaf830500769202a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f")._id,
      timestamp: new Date("2025-01-10T12:00:00Z"),
      meta: { reason: "no_longer_needed" } },

    { actorType: "system", actorId: systemId, action: "api_key.auto_revoke",
      targetType: "api_key", targetId: keyByHash("sha256$7e2cbf4d55552501ba10a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6")._id,
      timestamp: new Date("2025-03-01T10:00:00Z"),
      meta: { reason: "abuse_threshold_exceeded", overageEvents: 7 } },

    { actorType: "system", actorId: systemId, action: "api_key.auto_revoke",
      targetType: "api_key", targetId: keyByHash("sha256$8f1bd05e66663602cb20a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6")._id,
      timestamp: new Date("2025-09-10T11:00:00Z"),
      meta: { reason: "bot_detection", confidence: 0.94 } },

    { actorType: "admin", actorId: adminId, action: "api_key.revoke",
      targetType: "api_key", targetId: keyByHash("sha256$3a68fb091111e1d80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f")._id,
      timestamp: new Date("2025-04-15T10:00:00Z"),
      meta: { reason: "customer_request", ticketId: "SUP-2841" } },

    { actorType: "admin", actorId: adminId, action: "api_key.revoke",
      targetType: "api_key", targetId: keyByHash("sha256$900ae16f77774703dc30a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6")._id,
      timestamp: new Date("2025-02-14T08:00:00Z"),
      meta: { reason: "developer_deactivated" } },

    { actorType: "developer", actorId: dev("olivia@bennett.dev"), action: "api_key.revoke",
      targetType: "api_key", targetId: keyByHash("sha256$6d3bce3c44441400a910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6")._id,
      timestamp: new Date("2025-11-20T09:00:00Z"),
      meta: { reason: "leaked_in_public_repo", source: "github_secret_scanner" } },

    // ----- Developer status changes -----
    { actorType: "admin", actorId: adminId, action: "developer.suspend",
      targetType: "developer", targetId: dev("tomas.rivera@hotmail.com"),
      timestamp: new Date("2025-03-01T10:05:00Z"),
      meta: { reason: "tos_violation", details: "Sustained abuse of free tier" } },

    { actorType: "admin", actorId: adminId, action: "developer.suspend",
      targetType: "developer", targetId: dev("anya.volkov@kremlinapps.ru"),
      timestamp: new Date("2025-09-10T11:05:00Z"),
      meta: { reason: "automated_scraping", autoTriggered: true } },

    { actorType: "admin", actorId: adminId, action: "developer.deactivate",
      targetType: "developer", targetId: dev("noah.anderson@gmail.com"),
      timestamp: new Date("2025-02-14T08:05:00Z"),
      meta: { reason: "user_requested_account_closure" } },

    // ----- Plan changes -----
    { actorType: "admin", actorId: adminId, action: "api_key.plan_change",
      targetType: "api_key", targetId: keyByHash("sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7")._id,
      timestamp: new Date("2024-08-01T10:00:00Z"),
      meta: { fromPlan: "Basic", toPlan: "Pro", reason: "customer_upgrade" } },

    { actorType: "developer", actorId: dev("meilin.chen@pagodatech.cn"), action: "api_key.plan_change",
      targetType: "api_key", targetId: keyByHash("sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192")._id,
      timestamp: new Date("2024-09-15T14:00:00Z"),
      meta: { fromPlan: "Basic", toPlan: "Pro", initiatedFrom: "self_service_portal" } },

    // ----- Quota plan management -----
    { actorType: "admin", actorId: adminId, action: "quota_plan.create",
      targetType: "quota_plan", targetId: db.quota_plans.findOne({ name: "Enterprise" })._id,
      timestamp: new Date("2024-01-15T09:00:00Z"),
      meta: { createdBy: "platform-team" } },

    { actorType: "admin", actorId: adminId, action: "quota_plan.update",
      targetType: "quota_plan", targetId: db.quota_plans.findOne({ name: "Pro" })._id,
      timestamp: new Date("2025-07-01T10:00:00Z"),
      meta: { changes: { "rules.requestsPerDay": { from: 80000, to: 100000 } }, reason: "competitive_repricing" } },

    // ----- Overage-related logs (system) -----
    { actorType: "system", actorId: systemId, action: "quota.overage_throttle",
      targetType: "api_key", targetId: keyByHash("sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6")._id,
      timestamp: new Date("2026-04-30T11:34:21Z"),
      meta: { limitType: "day", allowed: 500, observed: 501 } },

    { actorType: "system", actorId: systemId, action: "quota.overage_throttle",
      targetType: "api_key", targetId: keyByHash("sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192")._id,
      timestamp: new Date("2026-04-30T13:45:12Z"),
      meta: { limitType: "day", allowed: 100000, observed: 100001 } },

    { actorType: "system", actorId: systemId, action: "quota.warning_email",
      targetType: "developer", targetId: dev("rohan.mehta@gmail.com"),
      timestamp: new Date("2026-04-27T15:12:00Z"),
      meta: { template: "free_tier_limit_reached", upgradeOffered: true } },

    // ----- Authentication / security events -----
    { actorType: "developer", actorId: dev("hannah.weiss@ironvault.io"), action: "auth.login",
      targetType: "developer", targetId: dev("hannah.weiss@ironvault.io"),
      timestamp: new Date("2026-04-30T08:15:00Z"),
      meta: { ip: "198.51.100.55", userAgent: "Mozilla/5.0", mfa: true } },

    { actorType: "system", actorId: systemId, action: "auth.suspicious_login_blocked",
      targetType: "developer", targetId: dev("kenji.y@sakuralabs.jp"),
      timestamp: new Date("2026-04-22T03:11:00Z"),
      meta: { ip: "185.220.101.42", reason: "tor_exit_node", country: "unknown" } },

    // ----- Read events -----
    { actorType: "developer", actorId: dev("priya@quantleaf.com"), action: "usage.report_view",
      targetType: "developer", targetId: dev("priya@quantleaf.com"),
      timestamp: new Date("2026-04-30T14:00:00Z"),
      meta: { reportType: "monthly_usage", periodStart: "2026-04-01" } },

    { actorType: "admin", actorId: adminId, action: "developer.list_view",
      targetType: "developer", targetId: dev("priya@quantleaf.com"),
      timestamp: new Date("2026-04-29T16:30:00Z"),
      meta: { context: "support_ticket_lookup", ticketId: "SUP-3102" } },

    // ----- Approval / pending state -----
    { actorType: "developer", actorId: dev("beatriz.a@solmadrid.es"), action: "developer.self_signup",
      targetType: "developer", targetId: dev("beatriz.a@solmadrid.es"),
      timestamp: new Date("2026-01-12T09:10:00Z"),
      meta: { source: "web", plan: "Basic", awaitingEmailVerification: true } },

    { actorType: "developer", actorId: dev("olivia@bennett.dev"), action: "developer.self_signup",
      targetType: "developer", targetId: dev("olivia@bennett.dev"),
      timestamp: new Date("2025-11-04T06:18:00Z"),
      meta: { source: "web", plan: "Free", awaitingEmailVerification: true } }
]);
