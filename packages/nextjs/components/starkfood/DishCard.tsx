'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import type { Dish } from '@/lib/types';
import { OrderButton } from './OrderButton';

interface DishCardProps {
    dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
    const [showOrder, setShowOrder] = useState(false);

    const price = parseFloat(dish.price);

    return (
        <>
            <div className="card card-hover group flex flex-col overflow-hidden animate-fade-in">
                {/* Image */}
                <div className="relative h-48 bg-dark-card overflow-hidden">
                    {dish.image ? (
                        <Image
                            src={dish.image}
                            alt={dish.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
                    )}
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 badge bg-black/60 text-white backdrop-blur-sm capitalize">
                        {dish.category}
                    </span>
                    {/* Availability */}
                    {!dish.is_available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-semibold">Indisponible</span>
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-[var(--text)] text-base leading-tight">{dish.name}</h3>
                        <div className="flex items-center gap-0.5 shrink-0">
                            <Star className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />
                            <span className="text-xs text-brand-400 font-medium">4.8</span>
                        </div>
                    </div>

                    {dish.description && (
                        <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">{dish.description}</p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]">
                        <span className="text-xl font-bold text-brand-500">{price.toFixed(2)} €</span>

                        <button
                            onClick={() => setShowOrder(true)}
                            disabled={!dish.is_available}
                            className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
                        >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Commander
                        </button>
                    </div>
                </div>
            </div>

            {/* Order modal */}
            {showOrder && (
                <OrderButton
                    dish={dish}
                    onClose={() => setShowOrder(false)}
                />
            )}
        </>
    );
}
