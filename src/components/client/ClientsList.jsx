import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { Box, Typography, Button } from "@mui/material";
import {
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import API_CONFIG from "../../config";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const ClientsList = () => {
  const theme = useTheme();
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currentAlertMessage, setCurrentAlertMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch clients here and set them in the state
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data);
      setFilteredClients(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };


  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(
        `${API_CONFIG.baseURL}/api/clients/${id}`
      );
      fetchClients();
      setCurrentAlertMessage(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMessage("");
      }, 3000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleEditClient = (id) => {
    navigate(`/client/edit/${id}`);
  };

  const handleToggleStatus = async (id) => {
    try {
      const client = clients.find((client) => client.id === id);
      const newStatus = client.status === "active" ? "inactive" : "active";

      const response = await axios.put(
        `${API_CONFIG.baseURL}/api/clients/${id}`,
        {
          ...client,
          status: newStatus,
        }
      );

      fetchClients();
      setCurrentAlertMessage(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMessage("");
      }, 3000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSearch = () => {
    const filteredClients = clients.filter((client) => {
      return (
        client.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.identity_number
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredClients(filteredClients);
   };
  const columns = [
    { field: "id", headerName: "رقم المكتب", width: 150 },
    { field: "name", headerName: "اسم العميل", width: 150 },
    { field: "identityNumber", headerName: "رقم القومى", width: 150 },
    { field: "address", headerName: "العنوان", width: 150 },
    { field: "phoneNumber", headerName: "رقم الهاتف", width: 150 },
    // New column for accessing client's access
    {
      field: "access",
      headerName: "Access",
      width: 150,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor:
                access === "Manager"
                  ? theme.palette.secondary.dark
                  : "#3da58a",
            }}
          >
            {/* Icons and typography for different access levels */}
            {access === "Manager" && (
              <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}

            {access === "User" && (
              <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "التحكم",
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            variant={params.row.status === "active" ? "success" : "warning"}
            onClick={() => handleToggleStatus(params.row.id)}
          >
            {params.row.status === "active" ? "إلغاء التنشيط" : "تنشيط"}
          </Button>
          <Button
            variant="primary"
            onClick={() => handleEditClient(params.row.id)}
          >
            تعديل
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteClient(params.row.id)}
          >
            حذف
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid rows={filteredClients} columns={columns} />
      </Box>
    </Box>
  );
};

export default ClientsList;
