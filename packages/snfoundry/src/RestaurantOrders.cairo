use starknet::ContractAddress;

#[starknet::interface]
pub trait IRestaurantOrders<TContractState> {
    fn place_order(ref self: TContractState, order_id: u64, amount: u256);
    fn get_order(self: @TContractState, order_id: u64) -> OrderInfo;
    fn get_owner(self: @TContractState) -> ContractAddress;
}

#[derive(Drop, Serde, starknet::Store)]
pub struct OrderInfo {
    pub customer: ContractAddress,
    pub order_id: u64,
    pub amount: u256,
    pub timestamp: u64,
    pub is_confirmed: bool,
}

#[starknet::contract]
pub mod RestaurantOrders {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
    };
    use super::{IRestaurantOrders, OrderInfo};

    #[storage]
    struct Storage {
        owner: ContractAddress,
        orders: Map<u64, OrderInfo>,
        order_count: u64,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        OrderPlaced: OrderPlaced,
    }

    #[derive(Drop, starknet::Event)]
    pub struct OrderPlaced {
        #[key]
        pub customer: ContractAddress,
        #[key]
        pub order_id: u64,
        pub amount: u256,
        pub timestamp: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
        self.order_count.write(0);
    }

    #[abi(embed_v0)]
    impl RestaurantOrdersImpl of IRestaurantOrders<ContractState> {
        /// Records an order on-chain as proof of payment.
        /// @param order_id: The unique order identifier from the backend.
        /// @param amount: The payment amount in the token's smallest unit (u256).
        fn place_order(ref self: ContractState, order_id: u64, amount: u256) {
            assert(amount > 0, 'Amount must be greater than 0');

            let caller = get_caller_address();
            let timestamp = get_block_timestamp();

            let order = OrderInfo {
                customer: caller,
                order_id,
                amount,
                timestamp,
                is_confirmed: true,
            };

            self.orders.entry(order_id).write(order);
            self.order_count.write(self.order_count.read() + 1);

            self.emit(OrderPlaced { customer: caller, order_id, amount, timestamp });
        }

        fn get_order(self: @ContractState, order_id: u64) -> OrderInfo {
            self.orders.entry(order_id).read()
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }
    }
}
