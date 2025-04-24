import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  Text
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const InventoryList = ({ 
  items,
  onDelete,
  onEdit,
  onAddStock,
  categories,
  brands,
  onPageChange,
  onSell,
  currentPage,
  totalPages,
}) => {
  const toast = useToast();
  const {isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [saleData, setSaleData] = useState({
    quantity: '',
    buyer: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSellClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleSellSubmit = () => {

    if (saleData.quantity > selectedItem.stock) {
      toast({
        title: "Insufficient stock",
        description: `Available stock: ${selectedItem.stock}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (saleData.quantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Quantity must be greater than 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSell(selectedItem._id, saleData);
    onClose();
    setSaleData({
      quantity: 1,
      buyer: "",
      date: new Date().toISOString().split('T')[0]
    });
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Filter items based on search term, category, and brand
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category?.name === selectedCategory;
    const matchesBrand = !selectedBrand || item.brand?.name === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const { 
    isOpen: isAddStockOpen, 
    onOpen: onAddStockOpen, 
    onClose: onAddStockClose 
  } = useDisclosure();
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const [stockData, setStockData] = useState({
    quantity: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddStockClick = (item) => {
    setSelectedStockItem(item);
    onAddStockOpen();
  };

  const handleAddStockSubmit = () => {
    if (stockData.quantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Quantity must be greater than 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onAddStock(selectedStockItem._id, stockData);
    onAddStockClose();
    setStockData({
      quantity: 1,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Input
          placeholder="Search by Product Name"
          value={searchTerm}
          bg="gray.700"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          placeholder="Filter by Category"
          value={selectedCategory}
          bg="gray.700"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option
              key={category._id}
              value={category.name}
              style={{
                backgroundColor: "#2D3748",
                color: "white",
              }}
            >
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Filter by Brand"
          value={selectedBrand}
          bg="gray.700"
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {brands.map((brand) => (
            <option
              key={brand._id}
              value={brand.name}
              style={{
                backgroundColor: "#2D3748",
                color: "white",
              }}
            >
              {brand.name}
            </option>
          ))}
        </Select>
      </HStack>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Purchase From</Th>
            <Th>Brand</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredItems.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category?.name || "N/A"}</Td>
              <Td>{item.price}</Td>
              <Td>{item.stock}</Td>
              <Td>{item.seller?.name || "N/A"}</Td>
              <Td>{item.brand?.name || "N/A"}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleSellClick(item)}
                  >
                    Sell
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleAddStockClick(item)}
                  >
                    Add Stock
                  </Button>
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    colorScheme="yellow"
                    onClick={() => onEdit(item)}
                  />
                  <IconButton
                    size="sm"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => onDelete(item._id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Sell {selectedItem?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isInvalid={saleData.quantity > selectedItem?.stock}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                value={saleData.quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > selectedItem?.stock) {
                    toast({
                      title: "Warning",
                      description: `Maximum available stock: ${selectedItem.stock}`,
                      status: "warning",
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                  setSaleData({ ...saleData, quantity: value });
                }}
                min={1}
                max={selectedItem?.stock}
                bg="gray.700"
              />
              {saleData.quantity > selectedItem?.stock && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  Insufficient stock available
                </Text>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Buyer</FormLabel>
              <Input
                value={saleData.buyer}
                onChange={(e) => setSaleData({ ...saleData, buyer: e.target.value })}
                placeholder="Enter buyer name"
                bg="gray.700"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={saleData.date}
                onChange={(e) => setSaleData({ ...saleData, date: e.target.value })}
                bg="gray.700"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleSellSubmit}
              isDisabled={saleData.quantity > selectedItem?.stock || saleData.quantity <= 0}
            >
              Confirm Sale
            </Button>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Stock Modal */}
      <Modal isOpen={isAddStockOpen} onClose={onAddStockClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Add Stock: {selectedStockItem?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                value={stockData.quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value <= 0) {
                    toast({
                      title: "Warning",
                      description: "Quantity must be greater than 0",
                      status: "warning",
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                  setStockData({ ...stockData, quantity: value });
                }}
                min={1}
                bg="gray.700"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={stockData.date}
                onChange={(e) => setStockData({ ...stockData, date: e.target.value })}
                bg="gray.700"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleAddStockSubmit}
              isDisabled={stockData.quantity <= 0}
            >
              Confirm Add Stock
            </Button>
            <Button colorScheme="orange" mr={3} onClick={onAddStockClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Pagination */}
      <HStack justifyContent="center" mt={4}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            size="sm"
            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default InventoryList;