"use client";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import "@fontsource/montserrat";
import "@fontsource/inter";
import Nav from "./components/organism/Navbar";
import Footer from "./components/organism/Footer";
import theme from "./theme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <Flex flexDirection="column" bg="mecord-main-2">
            <Nav />
            {children}
            <Footer />
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
