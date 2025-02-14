import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  FormControl,
  Flex,
  Input,
  Button,
  Box,
  Text,
  Stack,
  Heading,
  Center,
  Spinner,
  FormLabel,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getErrorMessageByCode } from "../helpers/getErrorMessageByCode";
import { Pages } from "../types/Pages";
import axios from "axios";
import { Request } from "../types/Request";
import { Select } from "chakra-react-select";
import { UserCityRole } from "../types/User";
import {
  createUser,
  getAllProvinces,
  getCitiesByProvinceId,
} from "../services/UserService";

import { getAllRoles } from "../services/UserService";
import { Province } from "../types/Location/Province";
import { Role } from "../types/Role";
import { City } from "../types/Location/City";

//import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Importamos los iconos

interface Option {
  label: string;
  value: string;
}

interface User {
  userName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  cityName: string;
  provinceName: string;
  roleName: string;
}

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    userName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    cityName: "",
    provinceName: "",
    roleName: "",
  });
  const [role, setRole] = useState<{ label: string; value: string } | null>(
    null
  );
  const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);
  const [provinces, setProvinces] = useState<
    { label: string; value: string }[]
  >([]);
  const [province, setProvince] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [city, setCity] = useState<{ label: string; value: string } | null>(
    null
  );
  const toast = useToast();

  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  useEffect(() => {
    getProvinces();
    getRoles();
  }, []);

  const getProvinces = async () => {
    try {
      const response = await getAllProvinces();
      const formatProvinces = response.map((province: Province) => ({
        label: province.provinceName,
        value: String(province.idProvince),
      }));
      setProvinces(formatProvinces);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      const response = await getAllRoles();
      const formatRoles = response.map((role: Role) => ({
        label: role.roleName,
        value: String(role.idRole),
      }));
      setRoles(formatRoles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getCities = async (idProvince: number) => {
    try {
      const response = await getCitiesByProvinceId(Number(idProvince));
      const formatCities = response.map((city: City) => ({
        label: city.cityName,
        value: String(city.idCity),
      }));
      setCities(formatCities);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      const userData = {
        userName: user.userName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        cityName: city ? city.label : "",
        provinceName: province ? province.label : "",
        phoneNumber: user.phoneNumber,
        address: user.address,
        roleName: role ? role.label : "",
      };

      const createdUser = await createUser(userData);
      if (createdUser) {
        setIsLoading(false);
        toast({
          title: "Registración",
          description: "Usuario creado con éxito.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });

        setUser({
          userName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          cityName: "",
          provinceName: "",
          roleName: "",
        });
        setRole(null);
        setProvince(null);
        setCity(null);
      }
    } catch (error: any) {
      const message = getErrorMessageByCode(error.code);
      setError(message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Center backgroundColor="gray.200" w="100vw" h="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Flex
      flexDirection="column"
      width="100%"
      minH="100vh"
      bg="gray.200"
      justifyContent="center"
      alignItems="center"
      overflowY="auto"
      p={4}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">Registrar usuario</Heading>

        <Box minW={{ base: "100%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              {/*
              Estos componentes estan aca porque chrome autocompleta siempre
              cuando hay un input de user y otro de password a pesar
              de que autocomplete sea off. Con estos inputs fake se evita el autocompletado
              */}
              <input
                type="text"
                name="prevent_autofill"
                id="prevent_autofill"
                value=""
                style={{ display: "none" }}
              />
              <input
                type="password"
                name="password_fake"
                id="password_fake"
                value=""
                style={{ display: "none" }}
              />
              <HStack align="start" spacing={4}>
                <FormControl isRequired flex="1">
                  <FormLabel htmlFor="name">Nombre de usuario</FormLabel>
                  <Input
                    type="text"
                    id="userName"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                </FormControl>
                <FormControl isRequired flex="1">
                  <FormLabel htmlFor="surname">Nombre y Apellido</FormLabel>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </FormControl>
              </HStack>
              <HStack align="start" spacing={4}>
                <FormControl isRequired flex="1">
                  <FormLabel htmlFor="phoneNumber">Teléfono</FormLabel>
                  <Input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired flex="1">
                  <FormLabel htmlFor="address">Dirección</FormLabel>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                  />
                </FormControl>
              </HStack>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="passwordRepeat">
                  Repetir contraseña
                </FormLabel>
                <Input
                  type="password"
                  id="passwordRepeat"
                  name="passwordRepeat"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="role">Rol</FormLabel>
                <Select
                  isSearchable={false}
                  noOptionsMessage={() => "No hay opciones"}
                  required
                  placeholder="Seleccione un rol"
                  useBasicStyles
                  isClearable
                  value={role}
                  onChange={(selectedOption) => {
                    setRole(selectedOption);
                    setUser((prevUser) => ({
                      ...prevUser,
                      roleName: selectedOption ? selectedOption.label : "",
                    }));
                  }}
                  options={roles}
                />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="province">Provincia</FormLabel>
                <Select
                  id="province"
                  name="province"
                  isSearchable={false}
                  noOptionsMessage={() => "No hay opciones"}
                  required
                  placeholder="Seleccione una provincia"
                  useBasicStyles
                  value={province}
                  options={provinces}
                  onChange={(selectedOption) => {
                    setProvince(selectedOption);
                    setUser((prevUser) => ({
                      ...prevUser,
                      provinceName: selectedOption ? selectedOption.label : "",
                    }));
                    if (selectedOption) getCities(Number(selectedOption.value));
                    else setCities([]);
                  }}
                  isClearable
                />
              </FormControl>

              <FormControl isRequired flex="1">
                <FormLabel htmlFor="city">Ciudad</FormLabel>
                <Select
                  id="cityName"
                  name="cityName"
                  isSearchable={false}
                  noOptionsMessage={() => "No hay opciones"}
                  required
                  placeholder="Seleccione una ciudad"
                  useBasicStyles
                  isClearable
                  options={cities}
                  value={city}
                  onChange={(selectedOption) => {
                    setCity(selectedOption);
                    setUser((prevUser) => ({
                      ...prevUser,
                      cityName: selectedOption ? selectedOption.label : "",
                    }));
                  }}
                  isDisabled={!province}
                />
              </FormControl>

              <Button
                textShadow="0.4px 0.4px 0.4px black"
                fontFamily="Raleway"
                bg="#1A865F"
                color="#FFFFFF"
                _hover={{ bg: "teal.500" }}
              >
                Registrarse
              </Button>
              <Button
                textShadow="0.4px 0.4px 0.4px black"
                fontFamily="Raleway"
                color="#4F4F4F"
                bg="#FFFFFF"
                variant="outline"
                width="full"
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
            </Stack>
          </form>
        </Box>
        {error && (
          <Text fontSize={"xl"} color="red" mt={8}>
            {error}
          </Text>
        )}
      </Stack>
    </Flex>
  );
};

export default Register;
