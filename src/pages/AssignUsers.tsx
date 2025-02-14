import React, { useState, useEffect } from "react";
import {
  getUserByProject,
  getUserByEmail,
  associateUserWithProject,
  deleteUserFromProject,
} from "../services/UserService";
import { User } from "../types/Project";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Button } from "@chakra-ui/react";

function AssignUsers() {
  const { idProject } = useParams<{ idProject: string }>();
  const navigate = useNavigate();
  const projectId = Number(idProject);
  const [email, setEmail] = useState("");
  const [existingUsers, setExistingUsers] = useState<User[]>([]);
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const fetchedUsers = await getUserByProject(projectId);
        const mappedUsers = fetchedUsers.map((user: any) => ({
          idUser: Number(user.idUser),
          userName: user.userName,
          lastName: user.lastName,
          email: user.email,
        })) as User[];

        // Verificar si el usuario logueado ya está en la lista
        if (user && user.idUser) {
          const loggedInUser: User = {
            idUser: Number(user.idUser),
            userName: user.userName,
            lastName: user.lastName,
            email: user.email,
          };

          const isUserAlreadyInList = mappedUsers.some(
            (existingUser) => existingUser.idUser === loggedInUser.idUser
          );

          if (!isUserAlreadyInList) {
            mappedUsers.unshift(loggedInUser);
          }
        }

        setExistingUsers(mappedUsers);
      } catch (error) {
        console.error("Error fetching users for project:", error);
      }
    };

    fetchAssignedUsers();
  }, [projectId, user]);

  const addUser = async () => {
    if (!email) return;

    try {
      const userData = await getUserByEmail(email);

      if (userData && userData.idUser !== undefined) {
        const newUser = {
          idUser: userData.idUser,
          userName: userData.userName,
          lastName: userData.lastName,
          email: userData.email,
        } as User;

        setExistingUsers([...existingUsers, newUser]);
        setAddedUsers([...addedUsers, newUser]);
        setEmail("");
      } else {
        alert("Usuario no encontrado o el ID del usuario es inválido");
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete && userToDelete.idUser) {
      try {
        await deleteUserFromProject(projectId, userToDelete.idUser);
        setExistingUsers(
          existingUsers.filter((user) => user.idUser !== userToDelete.idUser)
        );
        setAddedUsers(
          addedUsers.filter((user) => user.idUser !== userToDelete.idUser)
        );
        alert("Usuario eliminado exitosamente del proyecto");
      } catch (error) {
        console.error("Error al eliminar usuario del proyecto:", error);
        alert("Ocurrió un error al intentar eliminar el usuario");
      } finally {
        setShowDeleteConfirmModal(false);
        setUserToDelete(null);
      }
    }
  };

  const confirmAssignment = async () => {
    try {
      await Promise.all(
        addedUsers.map(async (user) => {
          if (user.idUser !== undefined) {
            await associateUserWithProject(projectId, user.idUser);
          }
        })
      );
      alert("Usuarios agregados correctamente");
      setAddedUsers([]);
    } catch (error) {
      console.error("Error al confirmar usuarios:", error);
      alert("Ocurrió un error inesperado al confirmar los usuarios.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#EFF2F9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Gestionar Asociación de Usuarios</h2>

      <input
        type="email"
        placeholder="Ingrese el email del usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "70%", marginRight: "10px" }}
      />
      <Button
        textShadow="0.4px 0.4px 0.4px black"
        fontFamily="Raleway"
        bg="#1A865F"
        color="#FFFFFF"
        _hover={{ bg: "teal.500" }}
        onClick={addUser}
        style={{ padding: "10px" }}
      >
        Agregar Nuevo Usuario
      </Button>

      <div style={{ paddingTop: "20px" }}>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {existingUsers.length === 0 ? (
            <p>No hay usuarios asociados a este proyecto.</p>
          ) : (
            existingUsers.map((user) => (
              <li
                key={user.idUser}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Nombre:</strong> {user.userName} <br />
                  <strong>Apellido:</strong> {user.lastName}
                </div>
                <Button
                  textShadow="0.4px 0.4px 0.4px black"
                  fontFamily="Raleway"
                  bg="#1A865F"
                  color="#FFFFFF"
                  _hover={{ bg: "teal.500" }}
                  onClick={() => handleDeleteUser(user)}
                  style={{ marginLeft: "10px" }}
                >
                  Eliminar
                </Button>
              </li>
            ))
          )}
        </ul>
        <Button
          textShadow="0.4px 0.4px 0.4px black"
          fontFamily="Raleway"
          bg="#1A865F"
          color="#FFFFFF"
          _hover={{ bg: "teal.500" }}
          onClick={confirmAssignment}
          style={{ padding: "10px", marginTop: "20px" }}
        >
          Confirmar
        </Button>
      </div>

      {showDeleteConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <h3>¿Desea confirmar la eliminación del usuario?</h3>
            <Button
              textShadow="0.4px 0.4px 0.4px black"
              fontFamily="Raleway"
              bg="#1A865F"
              color="#FFFFFF"
              _hover={{ bg: "teal.500" }}
              onClick={confirmDeleteUser}
              style={{ padding: "10px", marginRight: "10px" }}
            >
              Sí
            </Button>
            <Button
              textShadow="0.4px 0.4px 0.4px black"
              fontFamily="Raleway"
              bg="#1A865F"
              color="#FFFFFF"
              _hover={{ bg: "teal.500" }}
              onClick={() => setShowDeleteConfirmModal(false)}
              style={{ padding: "10px" }}
            >
              No
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignUsers;
