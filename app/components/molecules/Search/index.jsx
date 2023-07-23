import {
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <InputGroup>
      <Input
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <InputRightElement>
        <IconButton
          icon={<SearchIcon />}
          colorScheme="gray"
          aria-label="Search"
          roundedLeft="md"
          size="sm"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
