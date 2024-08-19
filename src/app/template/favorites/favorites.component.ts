import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];

  constructor(
    private productService: ProductService,
    private favoritesService: FavoritesService
  ) {}


  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.favorites = products.filter(product => product.isFavorite);
      },
      error => {
        console.error('Error loading favorites:', error);
      }
    );
  }

  removeFavorite(product: Product): void {
    this.favoritesService.toggleFavorite(product.id).then(() => {
      this.loadFavorites(); // Refresh the list after removing
    }).catch(error => {
      console.error('Error removing favorite:', error);
    });
  }

  // removeFavorite(product: Product): void {
  //   // Assuming you have a method to toggle favorite status
  //   product.isFavorite = false;
  //   this.productService.toggleFavorite(product.id).catch(error => {
  //     console.error('Error removing favorite:', error);
  //   });
  // }
}