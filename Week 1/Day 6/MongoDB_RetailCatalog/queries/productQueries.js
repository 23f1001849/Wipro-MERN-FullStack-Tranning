// Sample product catalog queries for mongosh or Node.js scripts
use('retailCatalog');

// Fetch available audio products priced under $200 sorted by price
const audioProducts = db.products
  .find(
    {
      category: 'Electronics > Audio',
      availability: 'in-stock',
      price: { $lt: NumberDecimal('200') }
    },
    {
      sku: 1,
      name: 1,
      price: 1,
      stock: 1
    }
  )
  .sort({ price: 1 })
  .limit(20)
  .toArray();

// Text search powered by the name/brand index
const keywordResults = db.products
  .find(
    { $text: { $search: 'wireless noise cancelling' } },
    {
      score: { $meta: 'textScore' },
      name: 1,
      price: 1
    }
  )
  .sort({ score: { $meta: 'textScore' } })
  .limit(10)
  .toArray();

print(`Audio products: ${audioProducts.length}`);
print(`Keyword results: ${keywordResults.length}`);
