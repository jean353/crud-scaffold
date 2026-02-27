<?php

namespace Database\Seeders;

use App\Models\Dish;
use Illuminate\Database\Seeder;

class DishSeeder extends Seeder
{
    public function run(): void
    {
        $dishes = [
            // Starters
            ['name' => 'Salade Niçoise', 'description' => 'Tomates, olives, thon, haricots verts, œuf', 'price' => 8.50, 'category' => 'starter', 'image' => 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400'],
            ['name' => 'Soupe à l\'oignon', 'description' => 'Soupe gratinée au fromage', 'price' => 7.00, 'category' => 'starter', 'image' => 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'],
            ['name' => 'Bruschetta', 'description' => 'Pain grillé, tomate, basilic, ail', 'price' => 6.00, 'category' => 'starter', 'image' => 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400'],

            // Main dishes
            ['name' => 'Entrecôte grillée', 'description' => 'Pièce de bœuf 250g, frites maison, sauce béarnaise', 'price' => 24.90, 'category' => 'main', 'image' => 'https://images.unsplash.com/photo-1558030006-450675393462?w=400'],
            ['name' => 'Poulet rôti', 'description' => 'Demi-poulet rôti, légumes de saison', 'price' => 18.50, 'category' => 'main', 'image' => 'https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=400'],
            ['name' => 'Burger StarkFood', 'description' => 'Bœuf artisanal, cheddar, salade, tomate, sauce maison', 'price' => 16.00, 'category' => 'main', 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'],
            ['name' => 'Risotto aux champignons', 'description' => 'Risotto crémeux, champignons sauvages, parmesan', 'price' => 15.90, 'category' => 'main', 'image' => 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400'],
            ['name' => 'Pavé de saumon', 'description' => 'Saumon grillé, purée citron, beurre blanc', 'price' => 22.00, 'category' => 'main', 'image' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'],

            // Desserts
            ['name' => 'Crème brûlée', 'description' => 'Crème vanille, caramel croquant', 'price' => 7.50, 'category' => 'dessert', 'image' => 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400'],
            ['name' => 'Moelleux au chocolat', 'description' => 'Cœur fondant, glace vanille', 'price' => 8.00, 'category' => 'dessert', 'image' => 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'],
            ['name' => 'Tarte Tatin', 'description' => 'Tarte aux pommes caramélisées, crème fraîche', 'price' => 7.00, 'category' => 'dessert', 'image' => 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400'],

            // Drinks
            ['name' => 'Vin rouge Maison', 'description' => 'Verre de vin rouge sélection chef', 'price' => 6.50, 'category' => 'drink', 'image' => 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400'],
            ['name' => 'Eau minérale', 'description' => 'Bouteille 75cl', 'price' => 3.50, 'category' => 'drink', 'image' => 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400'],
        ];

        foreach ($dishes as $dish) {
            Dish::create(array_merge($dish, ['is_available' => true]));
        }
    }
}
