"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var yourOwn = function (_a) {
    var _b;
    var req = _a.req;
    if (req.user.role === 'admin')
        return true;
    return {
        user: {
            equals: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
        }
    };
};
exports.Orders = {
    slug: 'orders',
    admin: {
        useAsTitle: 'Your orders',
        description: 'A summary of all your orders on DigitalHippo'
    },
    access: {
        create: yourOwn,
        read: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
    },
    fields: [
        {
            name: '_isPaid',
            type: 'checkbox',
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
                create: function () { return false; },
                update: function () { return false; }
            },
            admin: {
                hidden: true
            },
            required: true
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            admin: {
                hidden: true
            },
            required: true,
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            required: true
        },
    ]
};
