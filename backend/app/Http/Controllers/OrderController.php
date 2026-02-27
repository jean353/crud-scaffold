<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * List all orders (admin use).
     */
    public function index(): JsonResponse
    {
        $orders = Order::with('dish')->orderByDesc('created_at')->get();

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * POST /api/orders
     * Records a confirmed Starknet order in the database.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'dish_id'      => 'required|exists:dishes,id',
            'user_address' => 'required|string|max:255',
            'tx_hash'      => 'required|string|max:255',
            'amount'       => 'required|numeric|min:0',
            'quantity'     => 'sometimes|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors(),
            ], 422);
        }

        $dish = Dish::findOrFail($request->dish_id);

        $order = Order::create([
            'dish_id'      => $request->dish_id,
            'user_address' => $request->user_address,
            'tx_hash'      => $request->tx_hash,
            'amount'       => $request->amount,
            'quantity'     => $request->quantity ?? 1,
            'status'       => 'confirmed', // Already confirmed on Starknet
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order recorded successfully.',
            'data'    => $order->load('dish'),
        ], 201);
    }

    /**
     * Show a specific order.
     */
    public function show(Order $order): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $order->load('dish'),
        ]);
    }
}
