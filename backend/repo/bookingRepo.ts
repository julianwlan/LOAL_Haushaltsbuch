import bookingsJson from "../data/balance.json"
import type{BookingEntry, Booking, BookingDto, Category, Categories} from "../models/booking.js";

const bookings: BookingEntry[] = Object.values(bookingsJson.bookings).map(value => ({
    ...value,
    date: new Date(value.date)
}));

export const getLength = () => {
    return bookings.length;
}

export const getBookingsAmount = (amount: number): BookingEntry[] => {
    return bookings.slice(-amount).reverse();
}