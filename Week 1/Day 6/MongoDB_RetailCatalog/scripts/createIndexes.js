// Run in mongosh after collections exist to create recommended indexes
use('retailCatalog');

db.products.createIndex({ sku: 1 }, { unique: true, name: 'idx_products_sku_unique' });
db.products.createIndex({ category: 1, availability: 1, price: 1 }, { name: 'idx_products_category_availability_price' });
db.products.createIndex({ name: 'text', 'attributes.brand': 'text' }, { name: 'idx_products_text_search' });

db.orders.createIndex({ orderNumber: 1 }, { unique: true, name: 'idx_orders_orderNumber_unique' });
db.orders.createIndex({ userId: 1, orderDate: -1 }, { name: 'idx_orders_userId_orderDate' });
db.orders.createIndex(
  { status: 1, orderDate: -1 },
  {
    name: 'idx_orders_status_active_partial',
    partialFilterExpression: { status: { $in: ['pending', 'paid', 'shipped'] } }
  }
);

db.users.createIndex({ username: 1 }, { unique: true, name: 'idx_users_username_unique' });
db.users.createIndex({ email: 1 }, { unique: true, name: 'idx_users_email_unique' });
db.users.createIndex({ status: 1, username: 1 }, { name: 'idx_users_status_username' });
