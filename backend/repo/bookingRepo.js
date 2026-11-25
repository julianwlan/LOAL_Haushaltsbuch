"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsAmount = exports.getLength = void 0;
const balance_json_1 = __importDefault(require("../data/balance.json"));
const bookings = Object.values(balance_json_1.default.bookings).map(value => ({
    ...value,
    date: new Date(value.date)
}));
const getLength = () => {
    return bookings.length;
};
exports.getLength = getLength;
const getBookingsAmount = (amount) => {
    return bookings.slice(-amount).reverse();
};
exports.getBookingsAmount = getBookingsAmount;
