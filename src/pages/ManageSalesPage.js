import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import axios from "axios";

const ManageSalesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const response = await axios.get("/api/inventory/sales");
      setSales(response.data);
    };
    fetchSales();
  }, []);

  return (
    <Box>
      <Heading>Manage Sales</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sales.map((sale) => (
            <Tr key={sale._id}>
              <Td>{sale.item.name}</Td>
              <Td>{sale.quantity}</Td>
              <Td>{new Date(sale.date).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ManageSalesPage;