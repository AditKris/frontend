import React from "react";
import { Box, VStack, Text, Button, Icon, Link } from "@chakra-ui/react";
import { FaTachometerAlt, FaBox, FaChartLine, FaUsers, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ onLogout }) => {
  return (
    <Box
      bg="gray.900" // Updated to match the darker theme
      color="white"
      minH="100vh"
      width="250px"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Top Section */}
      <VStack align="start" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          BR BR PATAPIM
        </Text>
        <Link href="/dashboard" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaTachometerAlt} />}
            bg="gray.800" // Updated button background
            _hover={{ bg: "gray.700" }} // Hover effect
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
            bg="gray.800" // Updated button background
            _hover={{ bg: "gray.700" }} // Hover effect
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
            bg="gray.800" // Updated button background
            _hover={{ bg: "gray.700" }} // Hover effect
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
            bg="gray.800" // Updated button background
            _hover={{ bg: "gray.700" }} // Hover effect
            color="white"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            Manage Sales
          </Button>
        </Link>
        <Link href="/manage-sellers" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaUsers} />}
            bg="gray.800" // Updated button background
            _hover={{ bg: "gray.700" }} // Hover effect
            color="white"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            Manage Sellers
          </Button>
        </Link>
        <Link href="/manage-purchases" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaShoppingCart} />}
            bg="gray.800" // Updated button background
            _hover={{ bg: "gray.700" }} // Hover effect
            color="white"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            Manage Purchases
          </Button>
        </Link>
        <Link href="/profile" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            leftIcon={<Icon as={FaUser} />}
            bg="gray.800" // Updated button background
            _hover={{ bg: "gray.700" }} // Hover effect
            color="white"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            Profile
          </Button>
        </Link>
      </VStack>

      {/* Bottom Section */}
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