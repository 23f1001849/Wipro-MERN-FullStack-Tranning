"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["Audio"] = "Audio";
    ProductCategory["Accessories"] = "Accessories";
    ProductCategory["Computers"] = "Computers";
    ProductCategory["SmartHome"] = "Smart Home";
    ProductCategory["Wearables"] = "Wearables";
    ProductCategory["Displays"] = "Displays";
})(ProductCategory || (ProductCategory = {}));
const logChange = (message) => {
    console.log(`[Product Log]: ${message}`);
};
function TrackInventoryChange(propertyLabel) {
    return function (value, context) {
        return {
            get() {
                return value.get.call(this);
            },
            set(newValue) {
                if (newValue < 0) {
                    throw new Error(`${String(context.name)} cannot be negative`);
                }
                const currentValue = value.get.call(this);
                if (typeof currentValue === "number" && currentValue !== newValue) {
                    const changeType = newValue > currentValue ? "increase" : "decrease";
                    logChange(`${propertyLabel} ${changeType}d from ${currentValue} to ${newValue} for ${this.name}`);
                }
                value.set.call(this, newValue);
            }
        };
    };
}
let Product = (() => {
    let _price_decorators;
    let _price_initializers = [];
    let _price_extraInitializers = [];
    let _stock_decorators;
    let _stock_initializers = [];
    let _stock_extraInitializers = [];
    return class Product {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _price_decorators = [TrackInventoryChange("price")];
            _stock_decorators = [TrackInventoryChange("stock")];
            __esDecorate(this, null, _price_decorators, { kind: "accessor", name: "price", static: false, private: false, access: { has: obj => "price" in obj, get: obj => obj.price, set: (obj, value) => { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(this, null, _stock_decorators, { kind: "accessor", name: "stock", static: false, private: false, access: { has: obj => "stock" in obj, get: obj => obj.stock, set: (obj, value) => { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id;
        name;
        category;
        constructor(id, name, category, price, stock) {
            __runInitializers(this, _stock_extraInitializers);
            this.id = id;
            this.name = name;
            this.category = category;
            this.price = price;
            this.stock = stock;
        }
        #price_accessor_storage = __runInitializers(this, _price_initializers, 0);
        get price() { return this.#price_accessor_storage; }
        set price(value) { this.#price_accessor_storage = value; }
        #stock_accessor_storage = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _stock_initializers, 0));
        get stock() { return this.#stock_accessor_storage; }
        set stock(value) { this.#stock_accessor_storage = value; }
    };
})();
const inventory = new Map();
const seedProducts = [
    [1, new Product(1, "NoiseBlock Wireless Headphones", ProductCategory.Audio, 129.99, 42)],
    [2, new Product(2, "EchoSphere Mini Speaker", ProductCategory.SmartHome, 69.0, 55)],
    [3, new Product(3, "Skyline Mechanical Keyboard", ProductCategory.Accessories, 159.0, 18)],
];
seedProducts.forEach(([id, product]) => inventory.set(id, product));
for (const [id, product] of inventory.entries()) {
    console.log(`${id}. ${product.name} | ${product.category} | $${product.price.toFixed(2)} | Stock: ${product.stock}`);
}
const adjustPrice = (productId, newPrice) => {
    const product = inventory.get(productId);
    if (!product) {
        console.warn(`Product with id ${productId} was not found.`);
        return;
    }
    product.price = newPrice;
};
const adjustStock = (productId, newStock) => {
    const product = inventory.get(productId);
    if (!product) {
        console.warn(`Product with id ${productId} was not found.`);
        return;
    }
    product.stock = newStock;
};
adjustPrice(1, 139.99);
adjustStock(3, 12);
