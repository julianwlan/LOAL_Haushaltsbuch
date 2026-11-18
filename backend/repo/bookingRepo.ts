import bookingsJson from "../data/balance.json"
import type{Booking, BookingDto, Category, Categories} from "../backend/models/booking.js";

const bookings: Booking[] = Object.entries(bookingsJson.bookings).map(([key, value]) => ({[key]: value}));

export const getLength = () => {
    return bookings.length;
};