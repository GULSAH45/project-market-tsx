import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { shops } from './data/shops';
import { categories } from './data/categories';
import { IconButton } from './components/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: string;
  name: string;
  shopId: number;
  categoryId: number;
  isBought: boolean;
}

const StyledContainer = styled(Container)`
  padding: 2rem;
`;

const StyledTableRow = styled.tr<{ $isBought: boolean }>`
  cursor: pointer;
  td {
    text-decoration: ${props => props.$isBought ? 'line-through' : 'none'};
    color: ${props => props.$isBought ? '#6c757d' : 'inherit'};
  }
`;

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

  const getShopName = (shopId: number) => {
    return shops.find(shop => shop.id === shopId)?.name || '';
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find(category => category.id === categoryId)?.name || '';
  };

  return (
    <StyledContainer>
      <h1 className="mb-4">Alışveriş Listesi</h1>
      
      <Form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <Form.Control
              type="text"
              placeholder="Ürün Adı"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>
          <div className="col-md-3 mb-3">
            <Form.Select
              value={newProduct.shopId}
              onChange={e => setNewProduct({ ...newProduct, shopId: e.target.value })}
            >
              <option value="">Market Seçin</option>
              {shops.map(shop => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-md-3 mb-3">
            <Form.Select
              value={newProduct.categoryId}
              onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            >
              <option value="">Kategori Seçin</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-md-2 mb-3">
            <Button type="submit" variant="primary" className="w-100">
              Ekle
            </Button>
          </div>
        </div>
      </Form>

      {products.length > 0 ? (
        <Table hover>
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Market</th>
              <th>Kategori</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <StyledTableRow
                key={product.id}
                $isBought={product.isBought}
                onClick={() => toggleBought(product.id)}
              >
                <td>{product.name}</td>
                <td>{getShopName(product.shopId)}</td>
                <td>{getCategoryName(product.categoryId)}</td>
                <td>
                  <IconButton onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(product.id);
                  }} />
                </td>
              </StyledTableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">
          Henüz ürün eklenmedi. Yukarıdaki formu kullanarak yeni ürünler ekleyebilirsiniz.
        </Alert>
      )}
    </StyledContainer>
  );
}

export default App;