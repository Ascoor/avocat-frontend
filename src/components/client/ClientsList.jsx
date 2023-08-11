import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  Switch,
  Button,
  Alert,
  TextField,
  InputAdornment,
  Typography,
  CardHeader,
} from "@mui/material";

import {  ClientIcon } from "../../assets/icons/index.js";
import { TiArrowBackOutline } from "react-icons/ti";
import { FcPlus } from "react-icons/fc";
import API_CONFIG from "../../config";
import {
  lighten,
  TablePagination,
} from "@mui/material";
import { Modal, Row, Col } from "react-bootstrap";
import { styled } from "@mui/system";

const ClientsList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [clients, setClients] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentAlertMessage, setCurrentAlertMessage] = useState("");
  const [dense, setDense] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.alertMessage &&
      location.state.alertVariant
    ) {
      setCurrentAlertMessage(location.state.alertMessage);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMessage("");
      }, 3000);
    }
  }, [location]);

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
        client.identity_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredClients(filteredClients);
    setPage(0); // reset to first page when new search is performed
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredClients.length - page * rowsPerPage);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <CardHeader
          title="قائمة العملاء"
          avatar={<img src={ClientIcon} alt="Icon" className="court-icon" />}
        />
        <Row>
          <Col className="text-start">
            <Link className="btn btn-lg btn-primary  btn-add" to={"/client/create"}>
              <FcPlus size={20} />
              إضافة موكل
            </Link>
          </Col>
          <Col className="text-end">
            <Button
              variant="warning"
              className="btn-back btn-lg"
              type="button"
              onClick={() => window.history.back()}
            >
              <TiArrowBackOutline size={25} style={{ marginRight: "0.5rem" }} />
              رجوع
            </Button>
          </Col>
        </Row>
        <hr />
        {showAlert && (
          <Alert className="mt-4" variant="success">
            {currentAlertMessage}
          </Alert>
        )}

        <Box sx={{ width: "50%", mb: 2 }}>
          <TextField
            label="البحث عن موكلين"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" onClick={handleSearch}>
                    بحث
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell>رقم المكتب</TableCell>
                <TableCell>اسم العميل</TableCell>
                <TableCell>رقم القومى</TableCell>
                <TableCell>العنوان</TableCell>
                <TableCell>رقم الهاتف</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell>التحكم</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => (
                  <TableRow
                    hover
                    role="checkbox"
                    key={client.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      onClick={() => {
                        setSelectedClient(client);
                        setShowModal(true);
                      }}
                    >
                      {client.slug}
                    </TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.identity_number}</TableCell>
                    <TableCell>{client.address}</TableCell>
                    <TableCell>{client.phone_number}</TableCell>
                    <TableCell>
                      {client.status === "active" ? (
                        <span className="text-success">نشط</span>
                      ) : (
                        <span className="text-danger">غير نشط</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={
                          client.status === "active" ? "success" : "warning"
                        }
                        onClick={() => handleToggleStatus(client.id)}
                      >
                        {client.status === "active" ? "إلغاء التنشيط" : "تنشيط"}
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleEditClient(client.id)}
                      >
                        تعديل
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteClient(client.id)}
                      >
                        حذف
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredClients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={() => setDense(!dense)} />}
        label="تقديم الحشوة"
      />
    </Box>
  );
};

export default ClientsList;
