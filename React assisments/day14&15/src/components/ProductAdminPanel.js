import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct } from '../store/productsSlice';

const ProductAdminPanel = () => {
  const dispatch = useDispatch();
  const { items, status, error, lastUpdated } = useSelector((state) => state.products);
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (items.length) {
      setDrafts(
        items.reduce((acc, product) => {
          acc[product.id] = product.price.toFixed(2);
          return acc;
        }, {})
      );
    }
  }, [items]);

  const isLoading = status === 'loading' || status === 'updating';

  const summary = useMemo(() => {
    if (!items.length) {
      return null;
    }
    const total = items.reduce((acc, item) => acc + item.price, 0);
    return {
      average: total / items.length,
      total,
    };
  }, [items]);

  const handleRefresh = () => {
    dispatch(fetchProducts());
  };

  const handleDraftChange = (productId, value) => {
    setDrafts((prev) => ({ ...prev, [productId]: value }));
  };

  const handleSave = (productId) => {
    const nextPrice = Number(drafts[productId]);
    if (Number.isNaN(nextPrice)) {
      return;
    }
    dispatch(updateProduct({ id: productId, changes: { price: nextPrice } }));
  };

  return (
    <div className="product-admin">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <p className="eyebrow mb-1">Challenge 8 · Redux Toolkit</p>
          <h2 className="h5 mb-0">Product Control Panel</h2>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleRefresh} disabled={isLoading}>
            Refresh
          </button>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      <div className="product-grid">
        {items.map((product) => (
          <div key={product.id} className="product-admin-card">
            <h3 className="h6 mb-1">{product.title}</h3>
            <p className="text-muted small mb-2">Category: {product.category}</p>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-grow-1">
                <label htmlFor={`price-${product.id}`} className="form-label small mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  id={`price-${product.id}`}
                  className="form-control form-control-sm"
                  min="1"
                  step="0.5"
                  value={drafts[product.id] ?? product.price.toFixed(2)}
                  onChange={(event) => handleDraftChange(product.id, event.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleSave(product.id)}
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          </div>
        ))}
        {!items.length && <p className="text-muted mb-0">Trigger a refresh to load product data.</p>}
      </div>
      <div className="mt-3 small text-muted d-flex flex-wrap gap-3">
        <span>Status: {status}</span>
        {lastUpdated && <span>Last update: {new Date(lastUpdated).toLocaleTimeString()}</span>}
        {summary && (
          <span>
            Avg price ${summary.average.toFixed(2)} · Inventory value ${summary.total.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductAdminPanel;
