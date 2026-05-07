const keyByHash = (h) => db.api_keys.findOne({ keyHash: h });

function bucket(hash, periodType, periodStart, count, lastUpdatedAt) {
    const k = keyByHash(hash);
    if (!k) {
        throw new Error(`Cannot insert usage_buckets: api_key not found for hash ${hash}`);
    }
    return {
        apiKeyId: k._id,
        periodType: periodType,
        periodStart: periodStart,
        requestCount: NumberInt(count),
        lastUpdatedAt: lastUpdatedAt
    };
}

db.usage_buckets.insertMany([
    //  Claire Thompson / QuantLeaf - Enterprise heavy traffic 
    bucket("sha256$a1f9c2e0b8d4e7f1a23b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819", "minute", new Date("2026-04-30T14:23:00Z"), 1834, new Date("2026-04-30T14:23:58Z")),
    bucket("sha256$a1f9c2e0b8d4e7f1a23b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819", "hour", new Date("2026-04-30T14:00:00Z"), 98342, new Date("2026-04-30T14:59:55Z")),
    bucket("sha256$a1f9c2e0b8d4e7f1a23b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819", "day", new Date("2026-04-30T00:00:00Z"), 2341890, new Date("2026-04-30T14:59:55Z")),
    bucket("sha256$b2e8d3f1c9e5f8021b34c5d6e7f80192b3c4d5e6f7081920b3c4d5e6f7081920", "day", new Date("2026-04-30T00:00:00Z"), 1102553, new Date("2026-04-30T14:58:00Z")),
    bucket("sha256$b2e8d3f1c9e5f8021b34c5d6e7f80192b3c4d5e6f7081920b3c4d5e6f7081920", "minute", new Date("2026-04-30T14:23:00Z"), 712, new Date("2026-04-30T14:23:50Z")),

    //  Sara Khan / Helios Cloud - Enterprise 
    bucket("sha256$d4c6f5b3eb0ba124d56e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c", "day", new Date("2026-04-30T00:00:00Z"), 3450112, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$d4c6f5b3eb0ba124d56e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c", "hour", new Date("2026-04-30T14:00:00Z"), 145890, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$d4c6f5b3eb0ba124d56e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c", "minute", new Date("2026-04-30T14:23:00Z"), 1456, new Date("2026-04-30T14:23:55Z")),
    bucket("sha256$e5b5a6c4fc1cb235e67f8091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c4d", "day", new Date("2026-04-30T00:00:00Z"), 890234, new Date("2026-04-30T14:55:00Z")),

    //  Marcus Reed / Stellar Data - Enterprise 
    bucket("sha256$f6a4b7d50d2dc346f78091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c4d5e", "day", new Date("2026-04-30T00:00:00Z"), 4123007, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$f6a4b7d50d2dc346f78091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c4d5e", "hour", new Date("2026-04-30T14:00:00Z"), 178234, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$0795c8e61e3ed457089192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6", "day", new Date("2026-04-30T00:00:00Z"), 2567891, new Date("2026-04-30T14:58:00Z")),

    //  James Smith / NimbusForge - Pro 
    bucket("sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", "day", new Date("2026-04-30T00:00:00Z"), 78342, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", "hour", new Date("2026-04-30T14:00:00Z"), 4231, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", "minute", new Date("2026-04-30T14:23:00Z"), 187, new Date("2026-04-30T14:23:55Z")),

    //  Daniel O'Brien / OrbitStack - Pro 
    bucket("sha256$3a68fb09415108702b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081", "day", new Date("2026-04-30T00:00:00Z"), 56234, new Date("2026-04-30T14:50:00Z")),
    bucket("sha256$3a68fb09415108702b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081", "hour", new Date("2026-04-30T14:00:00Z"), 2890, new Date("2026-04-30T14:50:00Z")),
    bucket("sha256$3a68fb09415108702b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081", "minute", new Date("2026-04-30T14:23:00Z"), 95, new Date("2026-04-30T14:23:40Z")),

    //  Mei Lin Chen / Pagoda Tech - Pro (hit daily limit!) 
    bucket("sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192", "day", new Date("2026-04-30T00:00:00Z"), 100000, new Date("2026-04-30T13:45:12Z")),
    bucket("sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192", "hour", new Date("2026-04-30T13:00:00Z"), 8923, new Date("2026-04-30T13:45:12Z")),
    bucket("sha256$5c4add2b637320924d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f70819203", "day", new Date("2026-04-30T00:00:00Z"), 45678, new Date("2026-04-30T14:30:00Z")),

    //  Lucas Mueller / Brandt AG - Pro 
    bucket("sha256$6d3bce3c748431a35e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b", "day", new Date("2026-04-30T00:00:00Z"), 34521, new Date("2026-04-30T14:55:00Z")),
    bucket("sha256$6d3bce3c748431a35e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b", "minute", new Date("2026-04-30T14:23:00Z"), 142, new Date("2026-04-30T14:23:50Z")),

    //  Hannah Weiss / IronVault - Pro 
    bucket("sha256$7e2cbf4d855542b46f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c", "day", new Date("2026-04-30T00:00:00Z"), 23456, new Date("2026-04-30T14:45:00Z")),

    //  Kenji Yamamoto / Sakura Labs - Pro 
    bucket("sha256$8f1bd05e966653c5708192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6", "day", new Date("2026-04-30T00:00:00Z"), 67890, new Date("2026-04-30T14:58:00Z")),
    bucket("sha256$8f1bd05e966653c5708192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6", "hour", new Date("2026-04-30T14:00:00Z"), 3210, new Date("2026-04-30T14:58:00Z")),

    //  Liam Walsh / CelticForge - Pro 
    bucket("sha256$900ae16fa77764d68192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", "day", new Date("2026-04-30T00:00:00Z"), 12340, new Date("2026-04-30T14:30:00Z")),

    //  Grace Thompson / MapleBridge - Pro 
    bucket("sha256$a1f9c2708887584909192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e", "day", new Date("2026-04-30T00:00:00Z"), 89012, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$b2e8d381999869502a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80", "day", new Date("2026-04-30T00:00:00Z"), 23410, new Date("2026-04-30T14:40:00Z")),

    //  Basic plan: Ahmed / DuneSoft 
    bucket("sha256$c3d7e492aaa97a613b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f8091", "day", new Date("2026-04-30T00:00:00Z"), 14567, new Date("2026-04-30T14:55:00Z")),
    bucket("sha256$c3d7e492aaa97a613b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f8091", "hour", new Date("2026-04-30T14:00:00Z"), 870, new Date("2026-04-30T14:55:00Z")),
    bucket("sha256$c3d7e492aaa97a613b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f8091", "minute", new Date("2026-04-30T14:23:00Z"), 47, new Date("2026-04-30T14:23:45Z")),

    //  Basic: Isabela / VerdeCode 
    bucket("sha256$d4c6f5a3bbba8b724c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a", "day", new Date("2026-04-30T00:00:00Z"), 8923, new Date("2026-04-30T14:50:00Z")),
    bucket("sha256$d4c6f5a3bbba8b724c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a", "minute", new Date("2026-04-30T14:23:00Z"), 32, new Date("2026-04-30T14:23:30Z")),

    //  Basic: Eva / Novak Systems (heavy basic - near limit) 
    bucket("sha256$e5b5a6b4ccdb9c835d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b", "day", new Date("2026-04-30T00:00:00Z"), 19850, new Date("2026-04-30T14:59:00Z")),
    bucket("sha256$e5b5a6b4ccdb9c835d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b", "minute", new Date("2026-04-30T14:23:00Z"), 58, new Date("2026-04-30T14:23:55Z")),

    //  Basic: Fatima / Atlas MENA 
    bucket("sha256$f6a4b7c5dddcad946e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c", "day", new Date("2026-04-30T00:00:00Z"), 6234, new Date("2026-04-30T14:30:00Z")),

    //  Basic: Chioma / Bayou Tech 
    bucket("sha256$0795c8d6eeedbea57f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d", "day", new Date("2026-04-30T00:00:00Z"), 11203, new Date("2026-04-30T14:55:00Z")),

    //  Basic: Sven / Nordlys 
    bucket("sha256$1886d9e7ffefcfb6800910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5", "day", new Date("2026-04-30T00:00:00Z"), 4523, new Date("2026-04-30T14:20:00Z")),

    //  Basic: Yusuf / Bosphor Labs 
    bucket("sha256$2977eaf80000d0c70910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", "day", new Date("2026-04-30T00:00:00Z"), 7890, new Date("2026-04-30T14:40:00Z")),

    //  Free: Michael Davidson (light) 
    bucket("sha256$4b59ec1a2222f2e90910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", "day", new Date("2026-04-30T00:00:00Z"), 234, new Date("2026-04-30T14:00:00Z")),
    bucket("sha256$4b59ec1a2222f2e90910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", "minute", new Date("2026-04-30T14:23:00Z"), 4, new Date("2026-04-30T14:23:10Z")),

    //  Free: Michael's 2nd key (hit free daily limit!) 
    bucket("sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", "day", new Date("2026-04-30T00:00:00Z"), 500, new Date("2026-04-30T11:34:21Z")),
    bucket("sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", "minute", new Date("2026-04-30T11:34:00Z"), 10, new Date("2026-04-30T11:34:21Z")),

    //  Free: Vikram (very light) 
    bucket("sha256$5c4add2b333303fa0910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", "day", new Date("2026-04-30T00:00:00Z"), 47, new Date("2026-04-30T13:15:00Z")),

    //  Historical buckets (yesterday) for analytics 
    bucket("sha256$a1f9c2e0b8d4e7f1a23b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819", "day", new Date("2026-04-29T00:00:00Z"), 4123890, new Date("2026-04-29T23:59:55Z")),
    bucket("sha256$d4c6f5b3eb0ba124d56e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c", "day", new Date("2026-04-29T00:00:00Z"), 4890123, new Date("2026-04-29T23:59:50Z")),
    bucket("sha256$f6a4b7d50d2dc346f78091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c4d5e", "day", new Date("2026-04-29T00:00:00Z"), 4567234, new Date("2026-04-29T23:59:00Z")),
    bucket("sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", "day", new Date("2026-04-29T00:00:00Z"), 92341, new Date("2026-04-29T23:58:00Z")),
    bucket("sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192", "day", new Date("2026-04-29T00:00:00Z"), 99876, new Date("2026-04-29T23:59:30Z")),
    bucket("sha256$e5b5a6b4ccdb9c835d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b", "day", new Date("2026-04-29T00:00:00Z"), 19999, new Date("2026-04-29T23:55:00Z")),
    bucket("sha256$4b59ec1a2222f2e90910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", "day", new Date("2026-04-29T00:00:00Z"), 312, new Date("2026-04-29T22:00:00Z"))
]);
