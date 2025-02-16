import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { IconButton } from '../IconButton';
import { shops } from '../../data/shops';
import { categories } from '../../data/categories';

const StyledTableRow = styled.tr<{ $isBought: boolean }>`
  cursor: pointer;
  td {
    text-decoration: ${props => props.$isBought ? 'line-through' : 'none'};
    color: ${props => props.$isBought ? '#6c757d' : 'inherit'};
  }
`;

interface Product {
  id: string;
  name: string;
  shopId: number;
  categoryId: number;
  isBought: boolean;
}

interface ProductListProps {
  products: Product[];
  toggleBought: (id: string) => void;
  deleteProduct: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, toggleBought, deleteProduct }) => {
  const getShopName = (shopId: number) => {
    return shops.find(shop => shop.id === shopId)?.name || '';
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find(category => category.id === categoryId)?.name || '';
  };

  if (products.length === 0) {
    return (
      <Alert variant="info">
        Henüz ürün eklenmedi. Yukarıdaki formu kullanarak yeni ürünler ekleyebilirsiniz.
      </Alert>
    );
  }

  return (
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
  );
}; 