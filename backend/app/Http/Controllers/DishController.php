<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DishController extends Controller
{
    /**
     * List all available dishes.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Dish::where('is_available', true);

        // Filter by category if provided
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $dishes = $query->orderBy('category')->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $dishes,
        ]);
    }

    /**
     * Show a single dish.
     */
    public function show(Dish $dish): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $dish,
        ]);
    }
}
