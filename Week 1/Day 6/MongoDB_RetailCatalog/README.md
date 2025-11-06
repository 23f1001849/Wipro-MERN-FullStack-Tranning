# MongoDB Retail Catalog Schema

## Overview
- Collections target the core domains: `products`, `orders`, and `users`.
- Product facts stay denormalized for fast reads, while orders embed item snapshots to preserve historical pricing.
- Referenced `ObjectId` values keep collections decoupled and support sharding or horizontal growth.

## Collections and Document Shapes

### products
```
Field            Type        Notes
--------------- ----------- --------------------------------------------
_id              ObjectId    Default identifier
sku              string      Unique stock keeping unit (indexed, unique)
name             string      Product title
category         string      High-cardinality category path (e.g. "Electronics > Audio")
subCategory      string      Optional second-level grouping
price            decimal128  Current list price (decimal128 keeps precision)
currency         string      ISO currency code (e.g. "USD")
stock            object      { available: int, reserved: int }
availability     string      Enum: in-stock, backorder, preorder, discontinued
attributes       object      Key/value bag for variant details (e.g. color, size)
variants         array       Per-variant stock/price overrides (optional)
createdAt        date        Creation timestamp
updatedAt        date        Last update timestamp
```

#### Sample documents
```json
{
  "_id": ObjectId("652f9d8a2f1b4a0011223344"),
  "sku": "EL-HEAD-0001",
  "name": "Aurora Wireless Headphones",
  "category": "Electronics > Audio",
  "subCategory": "Headphones",
  "price": NumberDecimal("149.99"),
  "currency": "USD",
  "stock": { "available": 120, "reserved": 8 },
  "availability": "in-stock",
  "attributes": { "color": "Black", "connectivity": "Bluetooth 5.3" },
  "variants": [
    {
      "sku": "EL-HEAD-0001-GRY",
      "color": "Grey",
      "stock": { "available": 45, "reserved": 2 }
    }
  ],
  "createdAt": ISODate("2025-01-14T09:24:00Z"),
  "updatedAt": ISODate("2025-03-01T11:12:45Z")
}
```
```json
{
  "_id": ObjectId("652f9d8a2f1b4a0011223355"),
  "sku": "HM-KET-2100",
  "name": "BrewMate Electric Kettle",
  "category": "Home & Kitchen",
  "price": NumberDecimal("39.50"),
  "currency": "USD",
  "stock": { "available": 560, "reserved": 43 },
  "availability": "in-stock",
  "attributes": { "capacity_l": 1.7, "material": "Stainless Steel", "autoShutOff": true },
  "createdAt": ISODate("2025-02-10T14:05:20Z"),
  "updatedAt": ISODate("2025-02-20T10:01:11Z")
}
```

### orders
```
Field            Type        Notes
--------------- ----------- --------------------------------------------
_id              ObjectId    Default identifier
orderNumber      string      Human-friendly identifier (indexed, unique)
userId           ObjectId    Reference to users._id (indexed)
status           string      Enum: pending, paid, shipped, delivered, cancelled
orderDate        date        Creation timestamp (indexed for sorting)
items            array       Embedded item details
items[].productId ObjectId   Reference to products._id
items[].sku      string      Product SKU snapshot
items[].name     string      Product name snapshot
items[].unitPrice decimal128 Unit price snapshot
items[].quantity int         Quantity ordered
items[].lineTotal decimal128 Precomputed subtotal
payment          object      { method, transactionId, status }
shippingAddress  object      Embedded address snapshot
totals           object      { subtotal, tax, shipping, discount, grandTotal }
notes            string      Optional customer notes
updatedAt        date        Last status change timestamp
```

#### Sample document
```json
{
  "_id": ObjectId("6530a0bf3c56ab0011aa2200"),
  "orderNumber": "ORD-2025-00004512",
  "userId": ObjectId("652fac1a4d3e770011223344"),
  "status": "shipped",
  "orderDate": ISODate("2025-03-05T16:22:00Z"),
  "items": [
    {
      "productId": ObjectId("652f9d8a2f1b4a0011223344"),
      "sku": "EL-HEAD-0001",
      "name": "Aurora Wireless Headphones",
      "unitPrice": NumberDecimal("149.99"),
      "quantity": 1,
      "lineTotal": NumberDecimal("149.99")
    },
    {
      "productId": ObjectId("652f9d8a2f1b4a0011223355"),
      "sku": "HM-KET-2100",
      "name": "BrewMate Electric Kettle",
      "unitPrice": NumberDecimal("39.50"),
      "quantity": 2,
      "lineTotal": NumberDecimal("79.00")
    }
  ],
  "payment": {
    "method": "card",
    "transactionId": "txn_9876543210",
    "status": "captured"
  },
  "shippingAddress": {
    "name": "Priya Desai",
    "line1": "221B Baker Street",
    "city": "London",
    "postalCode": "NW16XE",
    "country": "GB"
  },
  "totals": {
    "subtotal": NumberDecimal("228.99"),
    "tax": NumberDecimal("18.32"),
    "shipping": NumberDecimal("7.99"),
    "discount": NumberDecimal("0"),
    "grandTotal": NumberDecimal("255.30")
  },
  "notes": "Leave at reception",
  "updatedAt": ISODate("2025-03-06T08:47:33Z")
}
```

### users
```
Field            Type        Notes
--------------- ----------- --------------------------------------------
_id              ObjectId    Default identifier
username         string      Unique login name (indexed, unique)
email            string      Unique email (indexed, unique)
passwordHash     string      Hash produced by Argon2 / bcrypt
passwordSalt     string      Optional if hash algo requires it separately
roles            array       Role names (e.g. ["customer"], ["admin"])
status           string      Enum: active, locked, pending
lastLogin        date        Timestamp of last successful login
createdAt        date        Creation timestamp
updatedAt        date        Last profile update
```

#### Sample documents
```json
{
  "_id": ObjectId("652fac1a4d3e770011223344"),
  "username": "priya.desai",
  "email": "priya.desai@example.com",
  "passwordHash": "$argon2id$v=19$m=4096,t=3,p=1$YTRhZ...",
  "roles": ["customer"],
  "status": "active",
  "lastLogin": ISODate("2025-03-04T07:19:42Z"),
  "createdAt": ISODate("2024-11-10T10:02:18Z"),
  "updatedAt": ISODate("2025-01-15T08:54:09Z")
}
```
```json
{
  "_id": ObjectId("652fac1a4d3e770011223355"),
  "username": "ops.manager",
  "email": "operations@example.com",
  "passwordHash": "$argon2id$v=19$m=4096,t=3,p=1$ajR2Z...",
  "roles": ["admin", "inventory"],
  "status": "active",
  "lastLogin": ISODate("2025-03-05T12:40:05Z"),
  "createdAt": ISODate("2023-06-01T09:00:00Z"),
  "updatedAt": ISODate("2025-02-02T07:21:33Z")
}
```

## Indexing Strategy and Query Examples

### products
- Compound index for catalog filtering: `db.products.createIndex({ category: 1, availability: 1, price: 1 })`.
- Text search (MongoDB text index) on `name` and `attributes` for keyword search: `db.products.createIndex({ name: "text", "attributes.brand": "text" })`.

Sample queries:
```javascript
// Fetch available audio products priced under $200
const cursor = db.products.find(
  { category: "Electronics > Audio", availability: "in-stock", price: { $lt: NumberDecimal("200") } },
  { sku: 1, name: 1, price: 1, stock: 1 }
).sort({ price: 1 }).limit(20);
```
```javascript
// Keyword search leveraging the text index
const searchResults = db.products.find(
  { $text: { $search: "wireless noise cancelling" } },
  { score: { $meta: "textScore" }, name: 1, price: 1 }
).sort({ score: { $meta: "textScore" } }).limit(10);
```

### orders
- Index on `userId` and `orderDate` for account history: `db.orders.createIndex({ userId: 1, orderDate: -1 })`.
- Partial index for in-flight orders: `db.orders.createIndex({ status: 1, orderDate: -1 }, { partialFilterExpression: { status: { $in: ["pending", "paid", "shipped"] } } })`.

Sample queries:
```javascript
// Recent orders for a customer
const history = db.orders.find(
  { userId: ObjectId("652fac1a4d3e770011223344") },
  { orderNumber: 1, status: 1, totals: 1, orderDate: 1 }
).sort({ orderDate: -1 }).limit(10);
```
```javascript
// Aggregation: top-selling SKUs last 30 days
const topSkus = db.orders.aggregate([
  { $match: { orderDate: { $gte: ISODate("2025-02-03T00:00:00Z") }, status: { $nin: ["cancelled"] } } },
  { $unwind: "$items" },
  { $group: { _id: "$items.sku", totalQty: { $sum: "$items.quantity" }, revenue: { $sum: "$items.lineTotal" } } },
  { $sort: { totalQty: -1 } },
  { $limit: 10 }
]);
```

### users
- Unique constraints: `db.users.createIndex({ username: 1 }, { unique: true })` and `db.users.createIndex({ email: 1 }, { unique: true })`.
- Login helper index: `db.users.createIndex({ status: 1, username: 1 })` to quickly reject locked accounts.

Sample queries:
```javascript
// Authentication lookup by username or email
const account = db.users.findOne({
  $or: [
    { username: "priya.desai" },
    { email: "priya.desai@example.com" }
  ],
  status: "active"
}, { passwordHash: 1, roles: 1 });
```
```javascript
// Admin dashboard: list recently locked accounts
const locked = db.users.find(
  { status: "locked" },
  { username: 1, email: 1, updatedAt: 1 }
).sort({ updatedAt: -1 }).limit(25);
```

## Additional Considerations
- Employ change streams (optional) to propagate stock adjustments into analytics or caching layers.
- Use MongoDB schema validation rules (via `validator`) to enforce required fields and value ranges at collection level.
- Shard `products` by `category` or hashed `sku` when catalog grows beyond single-node capacity; shard `orders` by `userId` for balanced distribution.
