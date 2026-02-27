// ABI of RestaurantOrders.cairo for Starknet React
export const RESTAURANT_ORDERS_ABI = [
    {
        type: 'function',
        name: 'place_order',
        inputs: [
            { name: 'order_id', type: 'core::integer::u64' },
            { name: 'amount', type: 'core::integer::u256' },
        ],
        outputs: [],
        state_mutability: 'external',
    },
    {
        type: 'function',
        name: 'get_order',
        inputs: [{ name: 'order_id', type: 'core::integer::u64' }],
        outputs: [
            {
                type: 'restaurant_orders::RestaurantOrders::OrderInfo',
            },
        ],
        state_mutability: 'view',
    },
    {
        type: 'event',
        name: 'restaurant_orders::RestaurantOrders::RestaurantOrders::Event',
        kind: 'enum',
        variants: [
            {
                name: 'OrderPlaced',
                type: 'restaurant_orders::RestaurantOrders::RestaurantOrders::OrderPlaced',
                kind: 'nested',
            },
        ],
    },
    {
        type: 'event',
        name: 'restaurant_orders::RestaurantOrders::RestaurantOrders::OrderPlaced',
        kind: 'struct',
        members: [
            { name: 'customer', type: 'core::starknet::contract_address::ContractAddress', kind: 'key' },
            { name: 'order_id', type: 'core::integer::u64', kind: 'key' },
            { name: 'amount', type: 'core::integer::u256', kind: 'data' },
            { name: 'timestamp', type: 'core::integer::u64', kind: 'data' },
        ],
    },
] as const;

// Update this after deployment with `scarb build && sncast deploy`
export const CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ??
    '0x0000000000000000000000000000000000000000000000000000000000000000';
