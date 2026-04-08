import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store/store'

// This function wraps the component in all necessary Providers
function renderWithProviders(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>): React.JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }
  return { ...render(ui, { wrapper: Wrapper }) };
}

export { renderWithProviders };