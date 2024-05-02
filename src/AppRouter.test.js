import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import "@testing-library/jest-dom"
import configureStore from 'redux-mock-store';
import ProductCard from './components/ProductCard/ProductCard';
import Modal from "./components/Modal/Modal";

const mockProduct = {
  name: 'Test Product',
  price: 10,
  image: 'test-image.jpg',
  article: 12345,
  genre: 'Test Genre',
};

const initialState = {
  products: {},
  cart: [],
  favorites: [],
};

const mockStore = configureStore([]);

describe('ProductCard component', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('should renders product card correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('10$')).toBeInTheDocument();
    expect(getByText('Genre: Test Genre')).toBeInTheDocument();
    expect(getByText('Article: 12345')).toBeInTheDocument();
  });

  test('should Add to basket on button click', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
        <Modal isOpen={false} onClose={() => { }} message="" />
      </Provider>
    );

    fireEvent.click(getByText('Add to busket'));
    expect(queryByText('Add "Test Product" to the basket?')).toBeInTheDocument();
  });

  test('should remove from favorites and add to favourites on button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const isAlreadyFavorite = store.getState().favorites.some(
      (favProduct) => favProduct.article === mockProduct.article
    );

    if (isAlreadyFavorite) {
      fireEvent.click(getByText('★'));
      const actions = store.getActions();
      expect(actions).toEqual([{ type: 'favorites/removeFromFavorites', payload: mockProduct }]);
    }
  });
});
