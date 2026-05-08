# API Rate Limit Quota Database (MongoDB)

This project is a MongoDB-first data model and script suite for API rate limiting, quota enforcement, usage tracking, overage handling, and auditability.

It includes:
- Strict collection schemas using MongoDB JSON Schema validation.
- Seed data for realistic multi-plan API traffic.
- CRUD examples for each core collection.
- Filtering/sorting and aggregation examples for analytics and operations.
- End-to-end runner scripts (`COMPLETE.js`) for schema, data, and query execution.

## 1) Project Goals

- Model API access control primitives: developers, keys, plans, usage buckets.
- Capture policy breaches through overage events.
- Keep an auditable trail of operational and security events.
- Provide executable examples for learning and experimentation in `mongosh`.

## 2) Tech Stack

- Database: MongoDB
- Shell: `mongosh`
- Script language: JavaScript (`mongosh` scripts)

## 3) Repository Structure

```text
api_rate_limit_quota_db/
├─ COMPLETE.js
├─ readme.md
├─ schema/
│  ├─ COMPLETE.js
│  ├─ developers.js
│  ├─ quota_plans.js
│  ├─ api_keys.js
│  ├─ usage_buckets.js
│  ├─ overage_events.js
│  ├─ audit_logs.js
│  └─ schema.md
├─ sample_data/
│  ├─ COMPLETE.js
│  ├─ developers.js
│  ├─ quota_plans.js
│  ├─ api_keys.js
│  ├─ usage_bucket.js
│  ├─ overage_events.js
│  └─ audit_logs.js
└─ Queries/
	 ├─ COMPLETE.js
	 ├─ filter_and_sort.js
	 ├─ aggregation.js
	 └─ CRUD/
			├─ developer.js
			├─ quota_plans.js
			├─ api_key.js
			├─ usage_bucket.js
			├─ overage_event.js
			└─ audit_log.js
```

## 4) Data Model Overview

### Core entities

- `developers`: API consumers (individuals/teams).
- `quota_plans`: Named plan tiers and numerical rate limits.
- `api_keys`: Credentials linked to developers and plans.
- `usage_buckets`: Time-window counters (`minute`, `hour`, `day`).
- `overage_events`: Policy violations and enforcement actions.
- `audit_logs`: Operational/security activity log for governance.

Note: MongoDB does not enforce foreign keys natively. This project enforces referential integrity in seed/CRUD scripts using lookup checks before inserts/deletes.

## 5) Execution Flow

### Option A: Run everything (recommended)

```bash
mongosh COMPLETE.js
```

This performs:
1. Schema creation (`schema/*.js`)
2. Data seeding (`sample_data/*.js`)
3. Query demos (`Queries/*.js`)

### Option C: Run individual scripts

```bash
mongosh schema/developers.js
mongosh sample_data/api_keys.js
mongosh Queries/CRUD/api_key.js
```

## 6) Sample Data Characteristics

- 25 developers across multiple organizations.
- 4 quota plans (`Free`, `Basic`, `Pro`, `Enterprise`).
- API keys mapped to developers/plans with both active and revoked examples.
- Time-series usage buckets across minute/hour/day windows.
- Overage events representing throttling, warnings, and revocations.
- Audit trail entries for onboarding, key lifecycle, security, and reporting events.

The seed scripts include dependency checks (for example, ensuring a referenced developer or plan exists before key insertion).

## 7) Reset / Clean DB

For reruns, drop the database first:

```javascript
use("api_quota_db");
db.dropDatabase();
```

Then execute:

```bash
mongosh COMPLETE.js
```

## 8) Repo Start

```bash
git clone https://www.github.com/maaz-319/api_rate_limit_quota_db
cd api_rate_limit_quota_db
mongosh COMPLETE.js
```