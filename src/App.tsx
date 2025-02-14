import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Pages, SearchParam } from "./types/Pages";
import { DataProvider } from "./context/dataContext";
import {
  QueryParamConfigMap,
  QueryParamProvider,
  StringParam,
} from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { FilterName } from "./types/Filter";
import Home from "./pages/Home";
import FormProject from "./pages/FormProject";
import EditProject from "./pages/EditProject";
import TreeList from "./pages/TreeList";
import ManageCampaign from "./pages/ManageCampaign";
import EditCampaign from "./pages/EditCampaign";
import TreeDetails from "./pages/TreeDetails";
import { MapComponent } from "./components/Map/MapComponent";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/authContext";
import ManageUnitWorks from "./pages/ManageUnitWorks";
import CityLayout from "./pages/CityLayout";
import NuevoMapaPrueba from "./components/Map/NuevoMapaPrueba";
import TreeLayout from "./pages/Tree";
import NeighborhoodLayout from "./pages/NeighborhoodLayout";
import AssignUsers from "./pages/AssignUsers";

const getAllQueryParamsOptions = (): QueryParamConfigMap => {
  const searchParams = Object.values(SearchParam);
  const filterNameParams = Object.keys(FilterName);
  const obj: QueryParamConfigMap = [...searchParams, ...filterNameParams].reduce(
    (acc: QueryParamConfigMap, key) => {
      acc[key] = StringParam;
      return acc;
    },
    {}
  );
  return obj;
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <QueryParamProvider
          adapter={ReactRouter6Adapter}
          options={{ params: getAllQueryParamsOptions() }}
        >
          <AuthProvider>
            <DataProvider>
              <Header />
              <Routes>
                {/* Rutas públicas */}
                <Route path={Pages.Login} element={<Login />} />
                <Route path={Pages.Register} element={<Register />} />
                <Route path={Pages.NuevoMapaPrueba} element={<NuevoMapaPrueba />} />
                <Route path={Pages.TreeLayout} element={<TreeLayout />} />
                <Route path={Pages.NeighborhoodLayout} element={<NeighborhoodLayout />} />
              

                {/* Rutas protegidas */}
                <Route path={Pages.AssignUsers} element={<AssignUsers />} />
                <Route path={Pages.CityLayout} element={<CityLayout />} />
                <Route path={Pages.Home} element={<Home />} />
                <Route path={Pages.FormProject} element={<FormProject />} />
                <Route path={Pages.EditProject} element={<EditProject />} />
                <Route path={Pages.TreeList} element={<TreeList tipo="individual" />} />
                <Route path={Pages.TreeList} element={<TreeList tipo="muestreo" />} />
                <Route path={Pages.ManageCampaign} element={<ManageCampaign />} />
                <Route path={Pages.EditCampaign} element={<EditCampaign />} />
                
                <Route path={Pages.TreeDetail} element={<TreeDetails />} />
                <Route path={Pages.ManageUnitWorks} element={<ManageUnitWorks />} />
              </Routes>
            </DataProvider>
          </AuthProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
