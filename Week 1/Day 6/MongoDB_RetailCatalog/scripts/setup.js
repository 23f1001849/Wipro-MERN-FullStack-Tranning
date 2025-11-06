// Run in mongosh to provision collections with validation rules
use('retailCatalog');

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['sku', 'name', 'category', 'price', 'currency', 'stock', 'availability', 'createdAt', 'updatedAt'],
      properties: {
        sku: { bsonType: 'string' },
        name: { bsonType: 'string' },
        category: { bsonType: 'string' },
        subCategory: { bsonType: ['string', 'null'] },
        price: { bsonType: 'decimal' },
        currency: { bsonType: 'string', minLength: 3, maxLength: 3 },
        stock: {
          bsonType: 'object',
          required: ['available', 'reserved'],
          properties: {
            available: { bsonType: 'int', minimum: 0 },
            reserved: { bsonType: 'int', minimum: 0 }
          }
        },
        availability: { enum: ['in-stock', 'backorder', 'preorder', 'discontinued'] },
        attributes: {
          bsonType: 'object',
          additionalProperties: { bsonType: ['string', 'double', 'decimal', 'bool', 'int'] }
        },
        variants: {
          bsonType: ['array', 'null'],
          items: {
            bsonType: 'object',
            required: ['sku', 'stock'],
            properties: {
              sku: { bsonType: 'string' },
              price: { bsonType: ['decimal', 'null'] },
              stock: {
                bsonType: 'object',
                required: ['available', 'reserved'],
                properties: {
                  available: { bsonType: 'int', minimum: 0 },
                  reserved: { bsonType: 'int', minimum: 0 }
                }
              }
            }
          }
        },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  },
  validationLevel: 'moderate'
});

db.createCollection('orders', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orderNumber', 'userId', 'status', 'orderDate', 'items', 'payment', 'shippingAddress', 'totals', 'updatedAt'],
      properties: {
        orderNumber: { bsonType: 'string' },
        userId: { bsonType: 'objectId' },
        status: { enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'] },
        orderDate: { bsonType: 'date' },
        items: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['productId', 'sku', 'name', 'unitPrice', 'quantity', 'lineTotal'],
            properties: {
              productId: { bsonType: 'objectId' },
              sku: { bsonType: 'string' },
              name: { bsonType: 'string' },
              unitPrice: { bsonType: 'decimal' },
              quantity: { bsonType: 'int', minimum: 1 },
              lineTotal: { bsonType: 'decimal' }
            }
          }
        },
        payment: {
          bsonType: 'object',
          required: ['method', 'status'],
          properties: {
            method: { enum: ['card', 'wallet', 'cod', 'upi'] },
            transactionId: { bsonType: ['string', 'null'] },
            status: { enum: ['pending', 'authorized', 'captured', 'failed', 'refunded'] }
          }
        },
        shippingAddress: {
          bsonType: 'object',
          required: ['name', 'line1', 'city', 'postalCode', 'country'],
          properties: {
            name: { bsonType: 'string' },
            line1: { bsonType: 'string' },
            line2: { bsonType: ['string', 'null'] },
            city: { bsonType: 'string' },
            state: { bsonType: ['string', 'null'] },
            postalCode: { bsonType: 'string' },
            country: { bsonType: 'string', minLength: 2, maxLength: 2 }
          }
        },
        totals: {
          bsonType: 'object',
          required: ['subtotal', 'tax', 'shipping', 'discount', 'grandTotal'],
          properties: {
            subtotal: { bsonType: 'decimal' },
            tax: { bsonType: 'decimal' },
            shipping: { bsonType: 'decimal' },
            discount: { bsonType: 'decimal' },
            grandTotal: { bsonType: 'decimal' }
          }
        },
        notes: { bsonType: ['string', 'null'] },
        updatedAt: { bsonType: 'date' }
      }
    }
  },
  validationLevel: 'moderate'
});

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'passwordHash', 'roles', 'status', 'createdAt', 'updatedAt'],
      properties: {
        username: { bsonType: 'string', minLength: 3 },
        email: { bsonType: 'string', pattern: '^.+@.+\\..+$' },
        passwordHash: { bsonType: 'string' },
        passwordSalt: { bsonType: ['string', 'null'] },
        roles: {
          bsonType: 'array',
          items: { bsonType: 'string' }
        },
        status: { enum: ['active', 'locked', 'pending'] },
        lastLogin: { bsonType: ['date', 'null'] },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  },
  validationLevel: 'moderate'
});
