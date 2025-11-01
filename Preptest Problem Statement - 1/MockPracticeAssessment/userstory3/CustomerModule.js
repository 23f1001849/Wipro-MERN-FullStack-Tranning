"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRegistry = exports.CustomerRecord = exports.BaseCustomer = exports.CustomerTier = void 0;
exports.createCustomer = createCustomer;
exports.simulateRegistrationBatch = simulateRegistrationBatch;
var CustomerTier;
(function (CustomerTier) {
    CustomerTier["STANDARD"] = "STANDARD";
    CustomerTier["PREMIUM"] = "PREMIUM";
    CustomerTier["VIP"] = "VIP";
})(CustomerTier || (exports.CustomerTier = CustomerTier = {}));
// Simple class decorator that logs each new instance creation
function logConstruction(message) {
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                const [firstArg] = args;
                const customerName = typeof firstArg === 'object' && firstArg !== null && 'name' in firstArg
                    ? firstArg.name
                    : undefined;
                console.log(`${message}${customerName ? `: ${customerName}` : ''}`);
            }
        };
    };
}
class BaseCustomer {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
exports.BaseCustomer = BaseCustomer;
let CustomerRecord = class CustomerRecord extends BaseCustomer {
    constructor(id, name, email, tier, preference) {
        super(id, name, email);
        this.tier = tier;
        this.preference = preference;
    }
    getSummary() {
        const [channel, detail] = this.preference;
        return `${this.name} (${this.tier}) prefers ${channel} via ${detail}`;
    }
};
exports.CustomerRecord = CustomerRecord;
exports.CustomerRecord = CustomerRecord = __decorate([
    logConstruction('New customer registered')
], CustomerRecord);
class CustomerRegistry {
    constructor() {
        this.records = [];
    }
    save(record) {
        const exists = this.records.some(({ id }) => id === record.id);
        if (!exists) {
            this.records.push(record);
        }
    }
    findById(id) {
        return this.records.find((record) => record.id === id);
    }
    updateTier(id, tier) {
        const record = this.findById(id);
        if (!record) {
            return false;
        }
        record.tier = tier;
        return true;
    }
    updatePreference(id, preference) {
        const record = this.findById(id);
        if (!record) {
            return false;
        }
        record.preference = preference;
        return true;
    }
    [Symbol.iterator]() {
        let index = 0;
        const snapshot = [...this.records];
        return {
            next() {
                if (index < snapshot.length) {
                    return { value: snapshot[index++], done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}
exports.CustomerRegistry = CustomerRegistry;
function createCustomer(details) {
    const { id, name, email, tier, preference } = details;
    return new CustomerRecord(id, name, email, tier, preference);
}
function simulateRegistrationBatch(rawEntries) {
    const registry = new CustomerRegistry();
    rawEntries.forEach(([id, name, email, tier, preference]) => {
        const customer = createCustomer({ id, name, email, tier, preference });
        registry.save(customer);
    });
    return registry;
}
