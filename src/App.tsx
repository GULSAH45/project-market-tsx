import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { ProductForm } from './components/ProductForm/ProductForm';
import { ProductList } from './components/ProductList/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: string;
  name: string;
  shopId: number;
  categoryId: number;
  isBought: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    shopId: '',
    categoryId: ''
  });
  const [previousProductsLength, setPreviousProductsLength] = useState(0);
  const [previousAllBought, setPreviousAllBought] = useState(false);

  useEffect(() => {
    const allBought = products.length > 0 && products.every(product => product.isBought);
    
    if (products.length === previousProductsLength && allBought && !previousAllBought) {
      alert('Alışveriş Tamamlandı!');
    }
    
    setPreviousProductsLength(products.length);
    setPreviousAllBought(allBought);
  }, [products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.shopId || !newProduct.categoryId) return;

    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      shopId: parseInt(newProduct.shopId),
      categoryId: parseInt(newProduct.categoryId),
      isBought: false
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', shopId: '', categoryId: '' });
  };

  const toggleBought = (id: string) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, isBought: !product.isBought } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Layout>
      <ProductForm
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleSubmit={handleSubmit}
      />
      <ProductList
        products={products}
        toggleBought={toggleBought}
        deleteProduct={deleteProduct}
      />
    </Layout>
  );
}

export default App;