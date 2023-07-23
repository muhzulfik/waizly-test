import {
  Text,
  Box,
  Container,
  Spacer,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { axiosGet } from "@/app/config/api";
import { formatDateWorldTime } from "@/app/utils/formattedDate";
import { useEffect, useState } from "react";

export default function Nav() {
  const [timeData, setTimeData] = useState(null);

  useEffect(() => {
    async function getTimeData() {
      const data = await axiosGet(
        "http://worldtimeapi.org/api/timezone/Asia/Jakarta"
      );
      setTimeData(data);
    }
    getTimeData();
    const interval = setInterval(getTimeData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box bg="blue-primary">
      <Container as={HStack} maxW={"6xl"} py={4}>
        <Link href="/">
          <Text
            textStyle="title-small"
            fontWeight="bold"
            color="white"
            cursor="pointer"
          >
            Todo App
          </Text>
        </Link>
        <Spacer />
        {timeData ? (
          <HStack spacing={2}>
            <Text color={"white"}>World Time - Jakarta ,</Text>
            <Text color={"white"}>
              Time: {formatDateWorldTime(timeData.datetime.toString())}
            </Text>
          </HStack>
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.600"
            color="white"
            size="xl"
          />
        )}
      </Container>
    </Box>
  );
}
