// Sample order history and analytics queries
use('retailCatalog');

// Recent orders for a given customer
const customerId = ObjectId('652fac1a4d3e770011223344');
const customerOrders = db.orders
  .find(
    { userId: customerId },
    {
      orderNumber: 1,
      status: 1,
      totals: 1,
      orderDate: 1
    }
  )
  .sort({ orderDate: -1 })
  .limit(10)
  .toArray();

// Top selling SKUs in the past 30 days
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
const topSkus = db.orders
  .aggregate([
    { $match: { orderDate: { $gte: thirtyDaysAgo }, status: { $nin: ['cancelled'] } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.sku',
        totalQty: { $sum: '$items.quantity' },
        revenue: { $sum: '$items.lineTotal' }
      }
    },
    { $sort: { totalQty: -1 } },
    { $limit: 10 }
  ])
  .toArray();

print(`Recent orders pulled: ${customerOrders.length}`);
print('Top SKU summary:');
printjson(topSkus);
