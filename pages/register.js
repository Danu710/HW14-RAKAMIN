import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { registerUser } from "../modules/fetch";
import Wrapper from "../component/Wrapper";
import axios from "axios";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        toast({
          title: "Registered",
          description: "You have successfully registered.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <Wrapper>
      <Box w="full" py={4} px={24} mx="auto" mt={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Register
        </Text>

        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <form onSubmit={handleSubmit}>
            {error && (
              <Box color="red.500" mb={4}>
                {error}
              </Box>
            )}

            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                name="name"
                placeholder="Enter your mame"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
              {password !== confirmPassword && (
                <Text fontSize="xs" color="red.500">
                  The password does not match
                </Text>
              )}
            </FormControl>

            <Button mt={6} colorScheme="teal" type="submit">
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default register;
