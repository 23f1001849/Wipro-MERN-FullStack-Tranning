import { createContext, useContext } from 'react';

const DependencyContext = createContext(null);

export function DependencyProvider({ children }) {
  const notificationService = {
    notify: (message) => console.info(`[DI] ${message}`),
  };

  return <DependencyContext.Provider value={{ notificationService }}>{children}</DependencyContext.Provider>;
}

export function useDependencies() {
  const ctx = useContext(DependencyContext);
  if (!ctx) {
    throw new Error('DependencyProvider missing');
  }
  return ctx;
}
