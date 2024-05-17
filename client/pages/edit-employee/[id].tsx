import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FormControl, FormLabel, Input, Button, Box, Heading, VStack } from '@chakra-ui/react';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({ name: '', title: '', department: '', hireDate: '' });
  const router = useRouter();
  const { isReady, query: { id } } = router;

  useEffect(() => {
    if (isReady && id) {
      fetch(`/api/employees/${id}`)
        .then(res => res.json())
        .then(data => {
          setEmployee(data);
        })
        .catch(error => console.error('Error fetching employee:', error));
    }
  }, [isReady, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
    if (res.ok) router.push('/');
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderRadius="md" shadow="md" bg="white">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>Edit Employee</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              placeholder="Enter name"
              borderRadius="md"
              shadow="sm"
            />
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={employee.title}
              onChange={(e) => setEmployee({ ...employee, title: e.target.value })}
              placeholder="Enter title"
              borderRadius="md"
              shadow="sm"
            />
          </FormControl>
          <FormControl id="department" isRequired>
            <FormLabel>Department</FormLabel>
            <Input
              value={employee.department}
              onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
              placeholder="Enter department"
              borderRadius="md"
              shadow="sm"
            />
          </FormControl>
          <FormControl id="hireDate" isRequired>
            <FormLabel>Hire Date</FormLabel>
            <Input
              type="date"
              value={employee.hireDate}
              onChange={(e) => setEmployee({ ...employee, hireDate: e.target.value })}
              placeholder="Select hire date"
              borderRadius="md"
              shadow="sm"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            borderRadius="md"
            shadow="sm"
          >
            Update Employee
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditEmployee;
