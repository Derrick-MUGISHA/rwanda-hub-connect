'use client'; // Required for client-side providers

import { Toaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import queryClient from '@/lib/reactQueryClient';
import { store } from '@/lib/store';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}