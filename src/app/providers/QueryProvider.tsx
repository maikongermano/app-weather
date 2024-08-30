"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
    },
  },
});

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default QueryProvider;
