const keyByHash = (h) => db.api_keys.findOne({ keyHash: h });

function overage(hash, time, limitType, allowed, observed, actionTaken, note) {
    const k = keyByHash(hash);
    if (!k) {
        throw new Error(`Cannot insert overage_events: api_key not found for hash ${hash}`);
    }
    const developerExists = db.developers.countDocuments({ _id: k.developerId }, { limit: 1 }) === 1;
    if (!developerExists) {
        throw new Error(`Cannot insert overage_events: developer not found for hash ${hash}`);
    }
    const doc = {
        apiKeyId: k._id,
        developerId: k.developerId,
        time: time,
        limitType: limitType,
        allowed: NumberInt(allowed),
        observed: NumberInt(observed),
        actionTaken: actionTaken
    };
    if (note) doc.note = note;
    return doc;
}

db.overage_events.insertMany([
    //  Michael Davidson (Free) - repeatedly hitting daily limit 
    overage("sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2026-04-30T11:34:21Z"), "day", 500, 501, "throttle_429", "Free tier daily cap reached; further requests rejected until 00:00 UTC."),
    overage("sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2026-04-29T22:00:14Z"), "day", 500, 502, "throttle_429", "Repeat offender; consider upgrade prompt."),
    overage("sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2026-04-28T19:45:00Z"), "minute", 10, 14, "throttle_429", "Burst not allowed on Free tier."),
    overage("sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2026-04-27T15:12:00Z"), "day", 500, 500, "warn_email", "Threshold reached, email warning dispatched."),

    //  Tomas Rivera (Free, now suspended) - severe abuse pattern 
    overage("sha256$7e2cbf4d55552501ba10a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2025-02-28T14:00:00Z"), "minute", 10, 187, "throttle_429", "Sudden 18x burst, possible scraper script."),
    overage("sha256$7e2cbf4d55552501ba10a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2025-02-28T14:30:00Z"), "minute", 10, 203, "throttle_429", "Continued abuse after throttling."),
    overage("sha256$7e2cbf4d55552501ba10a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2025-02-28T15:00:00Z"), "day", 500, 1240, "key_revoke", "Auto-revocation triggered after sustained abuse."),

    //  Anya Volkov (Free, suspended) - bot-like traffic 
    overage("sha256$8f1bd05e66663602cb20a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2025-09-08T03:14:00Z"), "minute", 10, 340, "throttle_429", "Bot signature detected; flagged for review."),
    overage("sha256$8f1bd05e66663602cb20a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2025-09-09T04:22:00Z"), "minute", 10, 412, "key_revoke", "Confirmed automation abuse."),

    //  Eva Novak (Basic) - hit per-minute burst 
    overage("sha256$e5b5a6b4ccdb9c835d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b", new Date("2026-04-30T14:23:55Z"), "minute", 60, 71, "throttle_429", "Within burst allowance window but exceeded soft cap."),
    overage("sha256$e5b5a6b4ccdb9c835d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b", new Date("2026-04-29T18:10:00Z"), "burst", 10, 12, "soft_warn", "Burst limit exceeded by 2; allowed but logged."),

    //  Mei Lin Chen / Pagoda Tech (Pro) - hit daily cap 
    overage("sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192", new Date("2026-04-30T13:45:12Z"), "day", 100000, 100001, "throttle_429", "Pro daily cap reached; overage billing not enabled on this key."),
    overage("sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192", new Date("2026-04-29T23:59:30Z"), "day", 100000, 99876, "warn_email", "95%+ of daily cap consumed; warning email sent."),

    //  James Smith / NimbusForge (Pro) - one-time burst spike 
    overage("sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", new Date("2026-04-15T09:33:00Z"), "burst", 50, 73, "soft_warn", "Burst limit exceeded during marketing campaign launch."),

    //  Noah Anderson (Free, deactivated) - historical abuse 
    overage("sha256$900ae16f77774703dc30a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", new Date("2025-02-13T22:00:00Z"), "day", 500, 2451, "key_revoke", "Account abuse detected, key revoked and developer deactivated.")
]);
