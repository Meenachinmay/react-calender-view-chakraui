// components/Modal.tsx

import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import "../../App.css"; // import our custom css for the blur effect

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode,
}

const Model: React.FC<ModelProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Flex
      position="fixed"
      top="0"
      right="0"
      bottom="0"
      left="0"
      justifyContent="center"
      alignItems="center"
      className="model-overlay"
      onClick={onClose}
    >
      <Box
        bg="white"
        p={5}
        borderRadius="md"
        boxShadow="xl"
        onClick={(e) => e.stopPropagation()} // to prevent modal close when clicking inside
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Model;
