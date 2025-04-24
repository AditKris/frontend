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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";

const InventoryList = ({
  items,
  onDelete,
  onEdit,
  onSell,
  onAddStock,
  categories,
  brands,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [editValues, setEditValues] = useState({}); // To store edited values

  // Filter items based on search term, category, and brand
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category?.name === selectedCategory;
    const matchesBrand = !selectedBrand || item.brand?.name === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Handle input changes for editing
  const handleEditChange = (id, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Save the edited values
  const handleSave = (id) => {
    const updatedValues = editValues[id];
    if (updatedValues) {
      onEdit(id, updatedValues); // Call the onEdit function with the updated values
      setEditValues((prev) => {
        const newValues = { ...prev };
        delete newValues[id];
        return newValues;
      });
    }
  };

  return (
    <Box>
      {/* Filters */}
      <HStack spacing={4} mb={4}>
        {/* Search by Product Name */}
        <Input
          placeholder="Search by Product Name"
          value={searchTerm}
          bg="gray.700"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter by Category */}
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

        {/* Filter by Brand */}
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

      {/* Product Table */}
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Purchase From</Th>
            <Th>Edit</Th> {/* New Edit Column */}
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
              <Td>
                {/* Edit Fields */}
                <HStack spacing={2}>
                  <Input
                    size="sm"
                    placeholder="Edit Price"
                    value={editValues[item._id]?.price || ""}
                    onChange={(e) => handleEditChange(item._id, "price", e.target.value)}
                  />
                  <Input
                    size="sm"
                    placeholder="Edit Stock"
                    value={editValues[item._id]?.stock || ""}
                    onChange={(e) => handleEditChange(item._id, "stock", e.target.value)}
                  />
                  <IconButton
                    size="sm"
                    icon={<CheckIcon />}
                    colorScheme="green"
                    onClick={() => handleSave(item._id)}
                  />
                </HStack>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => onSell(item)}
                  >
                    Sell
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => onAddStock(item)}
                  >
                    Add Stock
                  </Button>
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    colorScheme="yellow"
                    onClick={() => console.log("Edit clicked")}
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