const dev = (email) => {
    const developer = db.developers.findOne({ email: email });
    if (!developer) {
        throw new Error(`Cannot insert api_keys: developer not found for email ${email}`);
    }
    return developer._id;
};

const plan = (name) => {
    const quotaPlan = db.quota_plans.findOne({ name: name });
    if (!quotaPlan) {
        throw new Error(`Cannot insert api_keys: quota plan not found for name ${name}`);
    }
    return quotaPlan._id;
};

const planFree = plan("Free");
const planBasic = plan("Basic");
const planPro = plan("Pro");
const planEnt = plan("Enterprise");

db.api_keys.insertMany([
    { developerId: dev("claire@quantleaf.com"), keyHash: "sha256$a1f9c2e0b8d4e7f1a23b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819", planId: planEnt, active: true, createdAt: new Date("2024-03-03T10:00:00Z"), revokedAt: null },
    { developerId: dev("claire@quantleaf.com"), keyHash: "sha256$b2e8d3f1c9e5f8021b34c5d6e7f80192b3c4d5e6f7081920b3c4d5e6f7081920", planId: planEnt, active: true, createdAt: new Date("2024-03-03T10:05:00Z"), revokedAt: null },
    { developerId: dev("claire@quantleaf.com"), keyHash: "sha256$c3d7e4a2dafa9013c45d6e7f8091a2b3c4d5e6f7081920a3c4d5e6f7081920a3", planId: planEnt, active: false, createdAt: new Date("2024-03-03T10:10:00Z"), revokedAt: new Date("2025-06-01T09:00:00Z") },

    { developerId: dev("sara.k@helioscloud.dev"), keyHash: "sha256$d4c6f5b3eb0ba124d56e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c", planId: planEnt, active: true, createdAt: new Date("2024-05-10T08:00:00Z"), revokedAt: null },
    { developerId: dev("sara.k@helioscloud.dev"), keyHash: "sha256$e5b5a6c4fc1cb235e67f8091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c4d", planId: planEnt, active: true, createdAt: new Date("2024-05-10T08:15:00Z"), revokedAt: null },

    { developerId: dev("m.reed@stellardata.us"), keyHash: "sha256$f6a4b7d50d2dc346f78091a2b3c4d5e6f708192a3b4c5d6e7f80910a2b3c4d5e", planId: planEnt, active: true, createdAt: new Date("2025-04-06T09:00:00Z"), revokedAt: null },
    { developerId: dev("m.reed@stellardata.us"), keyHash: "sha256$0795c8e61e3ed457089192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6", planId: planEnt, active: true, createdAt: new Date("2025-04-06T09:05:00Z"), revokedAt: null },

    { developerId: dev("james.smith@nimbusforge.io"), keyHash: "sha256$1886d9f72f4fe5681920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", planId: planPro, active: true, createdAt: new Date("2024-02-15T10:00:00Z"), revokedAt: null },
    { developerId: dev("james.smith@nimbusforge.io"), keyHash: "sha256$2977eaf830500769202a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f", planId: planPro, active: false, createdAt: new Date("2024-02-20T10:00:00Z"), revokedAt: new Date("2025-01-10T12:00:00Z") },

    { developerId: dev("dan.obrien@orbitstack.co"), keyHash: "sha256$3a68fb09415108702b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081", planId: planPro, active: true, createdAt: new Date("2024-06-22T09:00:00Z"), revokedAt: null },

    { developerId: dev("meilin.chen@pagodatech.cn"), keyHash: "sha256$4b59ec1a526219813c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f708192", planId: planPro, active: true, createdAt: new Date("2024-07-04T10:00:00Z"), revokedAt: null },
    { developerId: dev("meilin.chen@pagodatech.cn"), keyHash: "sha256$5c4add2b637320924d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f70819203", planId: planPro, active: true, createdAt: new Date("2024-07-04T10:10:00Z"), revokedAt: null },

    { developerId: dev("lucas.mueller@brandt-ag.de"), keyHash: "sha256$6d3bce3c748431a35e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b", planId: planPro, active: true, createdAt: new Date("2024-07-30T08:00:00Z"), revokedAt: null },

    // --- Hannah Weiss (IronVault - Pro) ---
    { developerId: dev("hannah.weiss@ironvault.io"), keyHash: "sha256$7e2cbf4d855542b46f7081920a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c", planId: planPro, active: true, createdAt: new Date("2024-12-02T09:00:00Z"), revokedAt: null },

    // --- Kenji Yamamoto (Sakura Labs - Pro) ---
    { developerId: dev("kenji.y@sakuralabs.jp"), keyHash: "sha256$8f1bd05e966653c5708192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6", planId: planPro, active: true, createdAt: new Date("2025-01-20T07:00:00Z"), revokedAt: null },

    // --- Liam Walsh (CelticForge - Pro) ---
    { developerId: dev("liam.walsh@celticforge.ie"), keyHash: "sha256$900ae16fa77764d68192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7", planId: planPro, active: true, createdAt: new Date("2025-06-12T09:00:00Z"), revokedAt: null },

    // --- Grace Thompson (MapleBridge - Pro, 2 keys) ---
    { developerId: dev("grace.t@maplebridge.ca"), keyHash: "sha256$a1f9c2708887584909192a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e", planId: planPro, active: true, createdAt: new Date("2025-10-26T10:00:00Z"), revokedAt: null },
    { developerId: dev("grace.t@maplebridge.ca"), keyHash: "sha256$b2e8d381999869502a3b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80", planId: planPro, active: true, createdAt: new Date("2025-10-26T10:05:00Z"), revokedAt: null },

    // --- Basic plan users ---
    { developerId: dev("ahmed.alfarsi@dunesoft.ae"), keyHash: "sha256$c3d7e492aaa97a613b4c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f8091", planId: planBasic, active: true, createdAt: new Date("2024-09-16T09:00:00Z"), revokedAt: null },
    { developerId: dev("isabela@verdecode.br"), keyHash: "sha256$d4c6f5a3bbba8b724c5d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a", planId: planBasic, active: true, createdAt: new Date("2024-10-23T11:00:00Z"), revokedAt: null },
    { developerId: dev("eva@novak-systems.cz"), keyHash: "sha256$e5b5a6b4ccdb9c835d6e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b", planId: planBasic, active: true, createdAt: new Date("2025-03-13T08:00:00Z"), revokedAt: null },
    { developerId: dev("fatima.zahra@atlasmena.ma"), keyHash: "sha256$f6a4b7c5dddcad946e7f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c", planId: planBasic, active: true, createdAt: new Date("2025-02-09T10:00:00Z"), revokedAt: null },
    { developerId: dev("chioma@bayoutech.ng"), keyHash: "sha256$0795c8d6eeedbea57f80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d", planId: planBasic, active: true, createdAt: new Date("2025-07-23T09:00:00Z"), revokedAt: null },
    { developerId: dev("sven@nordlys.se"), keyHash: "sha256$1886d9e7ffefcfb6800910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5", planId: planBasic, active: true, createdAt: new Date("2025-08-31T08:00:00Z"), revokedAt: null },
    { developerId: dev("yusuf.demir@bosphorlabs.tr"), keyHash: "sha256$2977eaf80000d0c70910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planBasic, active: true, createdAt: new Date("2025-09-19T11:00:00Z"), revokedAt: null },
    // Basic with revoked key
    { developerId: dev("ahmed.alfarsi@dunesoft.ae"), keyHash: "sha256$3a68fb091111e1d80910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6f", planId: planBasic, active: false, createdAt: new Date("2024-09-16T09:30:00Z"), revokedAt: new Date("2025-04-15T10:00:00Z") },

    // --- Free plan users (hobbyists / indies) ---
    { developerId: dev("michael.davidson@gmail.com"), keyHash: "sha256$4b59ec1a2222f2e90910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planFree, active: true, createdAt: new Date("2024-04-19T08:00:00Z"), revokedAt: null },
    { developerId: dev("robert.harrison@protonmail.com"), keyHash: "sha256$5c4add2b333303fa0910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planFree, active: true, createdAt: new Date("2025-12-15T16:00:00Z"), revokedAt: null },
    { developerId: dev("olivia@bennett.dev"), keyHash: "sha256$6d3bce3c44441400a910a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planFree, active: false, createdAt: new Date("2025-11-05T07:00:00Z"), revokedAt: new Date("2025-11-20T09:00:00Z") },
    { developerId: dev("tomas.rivera@hotmail.com"), keyHash: "sha256$7e2cbf4d55552501ba10a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planFree, active: false, createdAt: new Date("2024-11-12T13:00:00Z"), revokedAt: new Date("2025-03-01T10:00:00Z") },
    { developerId: dev("anya.volkov@kremlinapps.ru"), keyHash: "sha256$8f1bd05e66663602cb20a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planFree, active: false, createdAt: new Date("2025-05-21T13:00:00Z"), revokedAt: new Date("2025-09-10T11:00:00Z") },
    { developerId: dev("noah.anderson@gmail.com"), keyHash: "sha256$900ae16f77774703dc30a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planFree, active: false, createdAt: new Date("2024-08-15T11:00:00Z"), revokedAt: new Date("2025-02-14T08:00:00Z") },
    { developerId: dev("michael.davidson@gmail.com"), keyHash: "sha256$a1f9c27088884804ed40a2b3c4d5e6f7081920a3b4c5d6e7f80910a2b3c4d5e6", planId: planFree, active: true, createdAt: new Date("2025-01-10T10:00:00Z"), revokedAt: null }
    // Note: developers Beatriz Alvarez (pending) intentionally has NO API key yet.
]);

