export type BookingEntry = {
    id: number,
    date: Date,
    description: string,
    amount: number,
    type: Type,
    category: {
        id: number,
        name: string
    }
};

export type Booking = {
    [key: string]: BookingEntry
};

export type BookingDto = Omit<Booking, "id">;

export enum Type {
    INCOME,
    EXPENDITURE
}

export type Category = {
    id: number;
    name: string;
}

export type Categories = {
    incomeCategories: Category[];
    expenditureCategories: Category[];
}