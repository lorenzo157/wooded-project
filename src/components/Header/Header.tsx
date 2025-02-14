import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pages } from "../../types/Pages";
import { useAuth } from "../../context/authContext";

const Header: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex bg="#4CB383" gap={4} px={6} py={6} padding={4} color="white">
      {!location.pathname.includes(`home`) && (
        <Button
          textShadow="0.4px 0.4px 0.4px black"
          fontFamily="Raleway"
          bg="#4F4F4F"
          color="white"
          onClick={() => navigate(-1)}
          alignSelf={"left"}
        >
          Atrás
        </Button>
      )}
      <Heading color="white" size="lg" fontWeight="light">
        ArboGest
      </Heading>

      <Spacer />
      <Flex gap={4} align="center">
        {user && (
          <Text color="white" textShadow="1px 1px 1px black">
            {user.email}
          </Text>
        )}

        {location.pathname.includes(`home`) && (
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={() => navigate(`/formproject/${user?.idUser}`)}
          >
            Crear Proyecto
          </Button>
        )}

        {location.pathname.includes(`home`) && (
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={() => navigate(`/register`)}
          >
            Registrar nuevo usuario
          </Button>
        )}

        {location.pathname.includes(`home`) && (
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={() => navigate(Pages.FormProject)}
          >
            Ver perfil
          </Button>
        )}

        {location.pathname.includes(`unitwork`) && (
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={() =>
              navigate(`/city/${location.pathname.split("/").at(2)}/0`)
            }
          >
            Ver ciudad
          </Button>
        )}

        {location.pathname.includes(`treelist`) && (
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={() =>
              navigate(`/trees/${location.pathname.split("/").at(2)}`)
            }
          >
            Ver mapa
          </Button>
        )}

        {!location.pathname.includes(`home`) && (
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={() => navigate(`/home/${user?.idUser}`)}
            variant="solid"
          >
            Inicio
          </Button>
        )}

        <Button
          textShadow="0.4px 0.4px 0.4px black"
          fontFamily="Raleway"
          bg="#1A865F"
          color="#FFFFFF"
          _hover={{ bg: "teal.500" }}
          onClick={() => navigate(`/login`)}
          colorScheme="red"
          variant="solid"
        >
          Salir
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
