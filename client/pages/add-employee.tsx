import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, FormLabel, Input, Button, Box, Heading, VStack } from '@chakra-ui/react';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [hireDate, setHireDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, title, department, hireDate }),
    });
    if (res.ok) router.push('/');
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderRadius="md" shadow="md" bg="white">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>Add Employee</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              borderRadius="md"
              shadow="sm"
            />
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              borderRadius="md"
              shadow="sm"
            />
          </FormControl>
          <FormControl id="department" isRequired>
            <FormLabel>Department</FormLabel>
            <Input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department"
              borderRadius="md"
              shadow="sm"
            />
          </FormControl>
          <FormControl id="hireDate" isRequired>
            <FormLabel>Hire Date</FormLabel>
            <Input
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
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
            Add Employee
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddEmployee;
