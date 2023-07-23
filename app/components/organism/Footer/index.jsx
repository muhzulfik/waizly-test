import { Box, Container, Stack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="blue-tertiary" zIndex="1">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "row" }}
        spacing={4}
        justify={{ base: "space-between" }}
      >
        <Text color="blue-primary" textStyle="subtitle-small">
          © Zul
        </Text>
      </Container>
    </Box>
  );
}
