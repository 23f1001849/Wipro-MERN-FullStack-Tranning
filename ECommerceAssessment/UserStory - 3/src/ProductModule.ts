enum ProductCategory {
    Audio = "Audio",
    Accessories = "Accessories",
    Computers = "Computers",
    SmartHome = "Smart Home",
    Wearables = "Wearables",
    Displays = "Displays"
}

type StockChange = "increase" | "decrease";

interface IProduct {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
}

const logChange = (message: string) => {
    console.log(`[Product Log]: ${message}`);
};

function TrackInventoryChange(propertyLabel: keyof Pick<IProduct, "price" | "stock">) {
    return function (
        value: ClassAccessorDecoratorTarget<Product, number>,
        context: ClassAccessorDecoratorContext<Product, number>
    ) {
        return {
            get(this: Product) {
                return value.get.call(this);
            },
            set(this: Product, newValue: number) {
                if (newValue < 0) {
                    throw new Error(`${String(context.name)} cannot be negative`);
                }

                const currentValue = value.get.call(this);
                if (typeof currentValue === "number" && currentValue !== newValue) {
                    const changeType: StockChange = newValue > currentValue ? "increase" : "decrease";
                    logChange(`${propertyLabel} ${changeType}d from ${currentValue} to ${newValue} for ${this.name}`);
                }

                value.set.call(this, newValue);
            }
        } satisfies ClassAccessorDecoratorResult<Product, number>;
    };
}

class Product implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public category: ProductCategory,
        price: number,
        stock: number
    ) {
        this.price = price;
        this.stock = stock;
    }

    @TrackInventoryChange("price")
    accessor price: number = 0;

    @TrackInventoryChange("stock")
    accessor stock: number = 0;
}

type InventoryEntry = [number, Product];

const inventory = new Map<number, Product>();

const seedProducts: InventoryEntry[] = [
    [1, new Product(1, "NoiseBlock Wireless Headphones", ProductCategory.Audio, 129.99, 42)],
    [2, new Product(2, "EchoSphere Mini Speaker", ProductCategory.SmartHome, 69.0, 55)],
    [3, new Product(3, "Skyline Mechanical Keyboard", ProductCategory.Accessories, 159.0, 18)],
];

seedProducts.forEach(([id, product]) => inventory.set(id, product));

for (const [id, product] of inventory.entries()) {
    console.log(`${id}. ${product.name} | ${product.category} | $${product.price.toFixed(2)} | Stock: ${product.stock}`);
}

const adjustPrice = (productId: number, newPrice: number) => {
    const product = inventory.get(productId);
    if (!product) {
        console.warn(`Product with id ${productId} was not found.`);
        return;
    }
    product.price = newPrice;
};

const adjustStock = (productId: number, newStock: number) => {
    const product = inventory.get(productId);
    if (!product) {
        console.warn(`Product with id ${productId} was not found.`);
        return;
    }
    product.stock = newStock;
};

adjustPrice(1, 139.99);
adjustStock(3, 12);
