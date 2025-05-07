import { Flex, Spacer, Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Flex bg="gray.700" color="white" p={3} align="center">
      <Text fontWeight="bold">🧺 Laundry App</Text>
      <Spacer />

      {user ? (
        <>
          <Text mr={4}>{user.email}</Text>
          <Button
            size="sm"
            colorScheme="orange"
            onClick={() => {
              logout();           // clear token
              navigate('/login'); // go to sign-in screen
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <Button
          size="sm"
          onClick={() => navigate('/login')}
        >
          Sign in
        </Button>
      )}
    </Flex>
  );
}
