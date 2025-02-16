import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { shops } from '../../data/shops';
import { categories } from '../../data/categories';

interface ProductFormProps {
  newProduct: {
    name: string;
    shopId: string;
    categoryId: string;
  };
  setNewProduct: (product: { name: string; shopId: string; categoryId: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ newProduct, setNewProduct, handleSubmit }) => {
  return (
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
  );
}; 