// Interfaces and type aliases capture shape and behaviour of customer records
export interface Person {
    readonly id: number;
    name: string;
    email: string;
}

export type ContactPreference = [channel: 'email' | 'phone' | 'sms', detail: string];

export interface Persistable<T> {
    save(item: T): void;
    findById(id: number): T | undefined;
}

export enum CustomerTier {
    STANDARD = 'STANDARD',
    PREMIUM = 'PREMIUM',
    VIP = 'VIP'
}

// Simple class decorator that logs each new instance creation
function logConstruction(message: string) {
    return function <T extends new (...args: any[]) => object>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                const [firstArg] = args;
                const customerName = typeof firstArg === 'object' && firstArg !== null && 'name' in firstArg
                    ? (firstArg as { name?: string }).name
                    : undefined;
                console.log(`${message}${customerName ? `: ${customerName}` : ''}`);
            }
        };
    };
}

export abstract class BaseCustomer implements Person {
    constructor(
        public readonly id: number,
        public name: string,
        public email: string
    ) {}

    abstract getSummary(): string;
}

export interface CustomerDetails {
    id: number;
    name: string;
    email: string;
    tier: CustomerTier;
    preference: ContactPreference;
}

@logConstruction('New customer registered')
export class CustomerRecord extends BaseCustomer {
    constructor(
        id: number,
        name: string,
        email: string,
        public tier: CustomerTier,
        public preference: ContactPreference
    ) {
        super(id, name, email);
    }

    getSummary(): string {
        const [channel, detail] = this.preference;
        return `${this.name} (${this.tier}) prefers ${channel} via ${detail}`;
    }
}

export class CustomerRegistry implements Persistable<CustomerRecord>, Iterable<CustomerRecord> {
    private records: CustomerRecord[] = [];

    save(record: CustomerRecord): void {
        const exists = this.records.some(({ id }) => id === record.id);
        if (!exists) {
            this.records.push(record);
        }
    }

    findById(id: number): CustomerRecord | undefined {
        return this.records.find((record) => record.id === id);
    }

    updateTier(id: number, tier: CustomerTier): boolean {
        const record = this.findById(id);
        if (!record) {
            return false;
        }
        record.tier = tier;
        return true;
    }

    updatePreference(id: number, preference: ContactPreference): boolean {
        const record = this.findById(id);
        if (!record) {
            return false;
        }
        record.preference = preference;
        return true;
    }

    [Symbol.iterator](): Iterator<CustomerRecord> {
        let index = 0;
        const snapshot = [...this.records];
        return {
            next(): IteratorResult<CustomerRecord> {
                if (index < snapshot.length) {
                    return { value: snapshot[index++], done: false };
                }
                return { value: undefined as unknown as CustomerRecord, done: true };
            }
        };
    }
}

export function createCustomer(details: CustomerDetails): CustomerRecord {
    const { id, name, email, tier, preference } = details;
    return new CustomerRecord(id, name, email, tier, preference);
}

export function simulateRegistrationBatch(rawEntries: Array<[number, string, string, CustomerTier, ContactPreference]>): CustomerRegistry {
    const registry = new CustomerRegistry();

    rawEntries.forEach(([id, name, email, tier, preference]) => {
        const customer = createCustomer({ id, name, email, tier, preference });
        registry.save(customer);
    });

    return registry;
}
