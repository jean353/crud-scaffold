'use client';

import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Dish } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/types';
import api from '@/lib/api';
import { DishCard } from './DishCard';

const CATEGORIES = ['all', 'starter', 'main', 'dessert', 'drink'];

export function MenuDisplay() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
        setError(null);

        const params = category !== 'all' ? { category } : {};

        api
            .get('/dishes', { params })
            .then((res) => setDishes(res.data.data))
            .catch(() => setError('Impossible de charger le menu. Vérifiez que le serveur Laravel est démarré.'))
            .finally(() => setLoading(false));
    }, [category]);

    const filtered = dishes.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Section header */}
            <div className="mb-10">
                <h2 className="font-display text-4xl font-bold text-[var(--text)] mb-2">Notre Carte</h2>
                <p className="text-[var(--muted)]">Sélectionnez un plat et payez en crypto ou en monnaie classique.</p>
            </div>

            {/* Search + filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                        type="text"
                        placeholder="Rechercher un plat…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all text-sm"
                    />
                </div>

                {/* Category pills */}
                <div className="flex items-center gap-2 flex-wrap">
                    <SlidersHorizontal className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat
                                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                                    : 'border border-[var(--border)] text-[var(--muted)] hover:border-brand-500 hover:text-brand-500'
                                }`}
                        >
                            {CATEGORY_LABELS[cat]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error state */}
            {error && (
                <div className="py-16 text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <p className="text-[var(--muted)] text-sm">{error}</p>
                </div>
            )}

            {/* Loading skeletons */}
            {loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="card overflow-hidden">
                            <div className="skeleton h-48 rounded-none" />
                            <div className="p-5 space-y-3">
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-3 w-full" />
                                <div className="skeleton h-3 w-1/2" />
                                <div className="flex justify-between items-center pt-2">
                                    <div className="skeleton h-6 w-16" />
                                    <div className="skeleton h-9 w-28 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Dishes grid */}
            {!loading && !error && (
                <>
                    {filtered.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="text-5xl mb-4">🔍</div>
                            <p className="text-[var(--muted)]">Aucun plat trouvé pour "{search}"</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((dish) => (
                                <DishCard key={dish.id} dish={dish} />
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-[var(--muted)] text-center mt-8">
                        {filtered.length} plat{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
                    </p>
                </>
            )}
        </section>
    );
}
