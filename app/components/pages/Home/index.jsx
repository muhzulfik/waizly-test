"use client";
import {
  Text,
  Center,
  Container,
  Input,
  Button,
  VStack,
  IconButton,
  Flex,
  Stack,
  Spacer,
  HStack,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { showAlert } from "../../molecules/Swal";
import SearchInput from "../../molecules/Search";
import { Modals } from "../../molecules/Modal";

export default function MainPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // add task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, isDone: false }]);
      setTask("");
      showAlert("Success", "Success add task", "success");
    }
  };

  // delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    showAlert("Success", "Success delete task", "success");
  };

  // edit task
  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
    onOpen();
  };

  const handleEditSubmit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editedTask;
    setTasks(updatedTasks);
    showAlert("Success", "Success edit task", "success");
    onClose();
  };

  // mark done
  const handleToggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isDone = !updatedTasks[index].isDone;
    setTasks(updatedTasks);
  };

  // search
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="7xl" minH={"100vh"} py="10">
      <Center>
        <Text textStyle={"title-medium"} fontWeight={"extrabold"}>
          Todo Application
        </Text>
      </Center>
      <VStack spacing={4} mt={8}>
        <SearchInput onSearch={handleSearch} />
        <Stack
          borderWidth="2px"
          borderRadius={"lg"}
          p="2"
          width={"full"}
          spacing={"4"}
          maxH="300px"
          overflowY="scroll"
        >
          {filteredTasks.length !== 0 ? (
            <>
              {filteredTasks.map((task, index) => (
                <HStack
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg={task.isDone ? "#0BB783" : "none"}
                >
                  <Text>{task.text}</Text>
                  <Spacer />
                  <Tooltip label={task.isDone ? "Cancel" : "Done Task"}>
                    <IconButton
                      icon={task.isDone ? <CloseIcon /> : <CheckIcon />}
                      variant="ghost"
                      onClick={() => handleToggleDone(index)}
                      cursor="pointer"
                    />
                  </Tooltip>
                  <Tooltip label="Edit Task">
                    <IconButton
                      icon={<EditIcon />}
                      variant="ghost"
                      onClick={() => handleEditTask(index)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete Task">
                    <IconButton
                      icon={<DeleteIcon />}
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => deleteTask(index)}
                    />
                  </Tooltip>
                </HStack>
              ))}{" "}
            </>
          ) : (
            <Center>
              <Text>Data Not Found.</Text>
            </Center>
          )}
        </Stack>
        <Modals
          modalHeader={"Edit Task"}
          isOpen={isOpen}
          onClose={onClose}
          submit={handleEditSubmit}
        >
          <Input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </Modals>
        <Flex>
          <Input
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            mr={2}
          />
          <Button onClick={addTask} variant="blue">
            Add Task
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
}
