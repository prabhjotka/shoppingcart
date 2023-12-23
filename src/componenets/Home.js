import React from 'react';
import '../styles/style.css';
import Filters from './Filters';
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct';
function Home() {
  const {
    state: { products },
    productState: { byStock, byFastDelivery, byRating, sort, searchQuery },
  } = CartState();


  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating>0) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <div className='home'>
      <Filters />
      <div className='productContainer'>
        {transformProducts().map((product) => {
          return <SingleProduct
            key={product.id}
            product={product} />

        })}

      </div>

    </div>
  );
};

export default Home
