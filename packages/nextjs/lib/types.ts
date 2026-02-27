// Types shared across the StarkFood app
export interface Dish {
    id: number;
    name: string;
    description: string | null;
    price: string;   // decimal from Laravel
    image: string | null;
    category: 'starter' | 'main' | 'dessert' | 'drink';
    is_available: boolean;
}

export interface Order {
    id: number;
    dish_id: number;
    user_address: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    tx_hash: string | null;
    amount: string;
    quantity: number;
    dish?: Dish;
    created_at: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: Record<string, string[]>;
}

export const CATEGORY_LABELS: Record<string, string> = {
    all: 'Tout',
    starter: 'Entrées',
    main: 'Plats',
    dessert: 'Desserts',
    drink: 'Boissons',
};
