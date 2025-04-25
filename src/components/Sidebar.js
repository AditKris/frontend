import React from "react";
import { Box, VStack, Text, Button, Icon, Link } from "@chakra-ui/react";
import { FaTachometerAlt, FaBox, FaChartLine,   FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ onLogout }) => {
  return (
    <Box
      bg="gray.900" 
      color="white"
      minH="100vh"
      width="250px"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack align="start" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          BR BR PATAPIM
        </Text>
        <Link href="/dashboard" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaTachometerAlt} />}
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            color="white"
            variant="solid"
            width="100%"
            justifyContent="flex-start"
          >
            Dashboard
          </Button>
        </Link>
        <Link href="/inventory" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaBox} />}
            bg="gray.800" 
            _hover={{ bg: "gray.700" }}
            color="white"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            Add Product
          </Button>
        </Link>
        <Link href="/manage-products" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaBox} />}
            bg="gray.800" 
            _hover={{ bg: "gray.700" }} 
            color="white"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            Manage Stock
          </Button>
        </Link>
        <Link href="/manage-sales" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaChartLine} />}
            bg="gray.800" 
            _hover={{ bg: "gray.700" }} 
            color="white"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            Manage Sales
          </Button>
        </Link>
      </VStack>
      <Button
        leftIcon={<Icon as={FaSignOutAlt} />}
        bg="blue.500" // Updated logout button color
        _hover={{ bg: "blue.400" }} // Hover effect
        color="white"
        variant="solid"
        width="100%"
        onClick={onLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;