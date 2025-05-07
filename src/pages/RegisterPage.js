// src/pages/RegisterPage.js
import { useState, useContext } from 'react';
import {
  Box,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from '../contexts/authContext';   // <- exact case
import { useNavigate } from 'react-router-dom';

/** <<< central API base >>> */
const API_BASE_URL = 'https://localhost:7223';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const passwordsMatch = password === confirm || confirm === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      toast({ status: 'warning', title: 'Passwords do not match' });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/Account/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          confirmPassword: confirm,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Registration failed');
      }

      // backend returns { token: '...' }
      const { token } = await res.json();
      login(token);                               // store JWT
      toast({ status: 'success', title: 'Account created. Welcome!' });
      navigate('/');                              // goto Orders
    } catch (err) {
      toast({ status: 'error', title: err.message });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={20} p={6} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Create Account</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl mb={3} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4} isRequired isInvalid={!passwordsMatch}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {!passwordsMatch && (
            <FormErrorMessage>Passwords do not match.</FormErrorMessage>
          )}
        </FormControl>

        <Button colorScheme="teal" type="submit" width="full">
          Register
        </Button>
      </form>

      <Button variant="link" mt={4} onClick={() => navigate('/login')} width="full">
        Already have an account? Sign in
      </Button>
    </Box>
  );
}
