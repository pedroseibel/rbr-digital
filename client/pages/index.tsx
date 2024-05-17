import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => console.error('Error fetching employees:', error)); // Catch and log any fetch errors
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const openDialog = (id) => {
    setEmployeeToDelete(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setEmployeeToDelete(null);
    setIsDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/employees/${employeeToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEmployees(employees.filter(emp => emp._id !== employeeToDelete));
        closeDialog();
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedEmployees = [...employees].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setEmployees(sortedEmployees);
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4} flexDirection={{ base: 'column', md: 'row' }}>
        <Input
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          mb={{ base: 2, md: 0 }}
          width={{ base: '100%', md: 'auto' }}
        />
        <Link href="/add-employee">
          <Button size={buttonSize} colorScheme="teal">Add Employee</Button>
        </Link>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple" size={buttonSize}>
          <Thead>
            <Tr>
              <Th onClick={handleSort} cursor="pointer">
                Name {sortOrder === 'asc' ? '▲' : '▼'}
              </Th>
              <Th>Title</Th>
              <Th>Department</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees.map(emp => (
              <Tr key={emp._id}>
                <Td>{emp.name}</Td>
                <Td>{emp.title}</Td>
                <Td>{emp.department}</Td>
                <Td>
                  <Flex justify="flex-start">
                    <Link href={`/edit-employee/${emp._id}`} passHref>
                      <Button as="a" colorScheme="blue" mr={2}>Edit</Button>
                    </Link>
                    <Button colorScheme="red" onClick={() => openDialog(emp._id)}>Delete</Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Dashboard;
