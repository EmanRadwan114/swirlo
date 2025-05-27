import React, { useState } from "react";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import {
  Container,
  Typography,
  Avatar,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Badge,
  CircularProgress,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocalCafe as CoffeeIcon,
  Person as PersonIcon,
  History as HistoryIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Lock as PasswordIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import userServices from "../../services/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deepOrange, green, red } from "@mui/material/colors";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useAuth();

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // *validation
  // Profile data validation schema
  const profileValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string()
      .min(3, "Address must be at least 3 characters")
      .required("Address is required"),
  });

  // Password change validation schema
  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Current password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
        "Must contain uppercase, lowercase, number, and special character"
      ),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
        "Must contain uppercase, lowercase, number, and special character"
      )
      .notOneOf(
        [Yup.ref("oldPassword"), null],
        "New password must be different from current password"
      ),
  });

  // * get profile data

  const { data: { data: profileData = {} } = {}, isLoading: isProfileLoading } =
    useQuery({
      queryKey: ["profile"],
      queryFn: () => userServices.fetchProfileData(),
      keepPreviousData: true,
    });

  // * get user orders

  const {
    data: { data: userOrders = [], totalPages } = {},
    isLoading: isOrdersLoading,
  } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: () => userServices.fetchUserOrders(currentPage),
    keepPreviousData: true,
  });

  // * update user profile
  const queryClient = useQueryClient();

  const { mutateAsync: updateUserData, isPending } = useMutation({
    mutationFn: (data) => userServices.changeUserData(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      console.log(error);

      toast.error(
        error.response.data.errors?.[0].message || error.response.data.message
      );
    },
  });

  // * logout

  const { mutateAsync: logout } = useMutation({
    mutationFn: () => userServices.logout(),
    onError: (error) => {
      toast.error(`Failed to logout: ${error.response.data.message}`);
    },
  });

  const navigate = useNavigate();

  const personalDataForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profileData.name || "",
      email: profileData.email || "",
      address: profileData.address?.[profileData?.address?.length - 1] || "",
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      await updateUserData(values);
      setEditMode(false);
      toast.success("Profile updated successfully!");
      if (values?.email !== profileData?.email) {
        await logout();
        navigate("/login");
      }
    },
  });

  const passwordForm = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      if (values.newPassword !== confirmPassword) {
        toast.error("New passwords do not match!");
        return;
      }
      await updateUserData({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      await logout();
      values.oldPassword = "";
      values.newPassword = "";
      setOpenPasswordDialog(false);
      toast.success("Password changed successfully!");
      setConfirmPassword("");
      navigate("/login");
    },
  });

  const handlePasswordDialogOpen = () => {
    setOpenPasswordDialog(true);
  };

  const handlePasswordDialogClose = () => {
    setOpenPasswordDialog(false);
    setConfirmPassword("");
  };

  const renderProfileSection = () => (
    <Card>
      {isProfileLoading ? (
        <LoadingSpinner height="300px" />
      ) : (
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">Personal Information</Typography>
            {!editMode && (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={handleEditClick}
                size={isMobile ? "small" : "medium"}
                sx={{
                  border: "2px solid var(--primary)",
                  color: "var(--primary)",
                  "&:hover": {
                    backgroundColor: "var(--main-background)",
                  },
                }}
              >
                Edit
              </Button>
            )}
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: editMode ? "start" : "center",
                  mb: 2,
                }}
              >
                <EmailIcon color="action" sx={{ mr: 1 }} />
                {editMode ? (
                  <TextField
                    name="email"
                    label="Email"
                    value={personalDataForm.values.email || ""}
                    onChange={personalDataForm.handleChange}
                    onBlur={personalDataForm.handleBlur}
                    error={
                      personalDataForm.touched.email &&
                      personalDataForm.errors.email
                    }
                    helperText={
                      personalDataForm.touched.email &&
                      personalDataForm.errors.email
                    }
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "var(--green-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--green-color)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "var(--green-color)",
                        "&.Mui-focused": {
                          color: "var(--green-color)",
                        },
                      },
                    }}
                  />
                ) : (
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    {profileData?.email}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: editMode ? "start" : "center",
                  mb: 2,
                }}
              >
                <LocationIcon color="action" sx={{ mr: 1 }} />
                {editMode ? (
                  <TextField
                    name="address"
                    label="Address"
                    value={personalDataForm.values.address || ""}
                    onChange={personalDataForm.handleChange}
                    onBlur={personalDataForm.handleBlur}
                    error={
                      personalDataForm.touched.address &&
                      personalDataForm.errors.address
                    }
                    helperText={
                      personalDataForm.touched.address &&
                      personalDataForm.errors.address
                    }
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "var(--green-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--green-color)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "var(--green-color)",
                        "&.Mui-focused": {
                          color: "var(--green-color)",
                        },
                      },
                    }}
                  />
                ) : (
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {profileData?.address?.[profileData.address.length - 1]}
                  </Typography>
                )}
              </Box>
            </Grid>
            {editMode ? (
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                  }}
                >
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "var(--green-color)",
                      "&:hover": {
                        backgroundColor: "var(--main-background)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      personalDataForm.handleSubmit();
                    }}
                    variant="contained"
                    disabled={isProfileLoading}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "white",
                      backgroundColor: "var(--primary)",
                      "&:hover": {
                        backgroundColor: "var(--light-color)",
                      },
                    }}
                  >
                    {isPending ? (
                      <CircularProgress
                        size={24}
                        sx={{ color: "var(--main-background)" }}
                      />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Box>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          {!user?.iss ? (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ mb: 4 }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <PasswordIcon color="action" sx={{ mr: 1 }} />
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    sx={{ mr: 2 }}
                  >
                    Password
                  </Typography>
                  <Button
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    onClick={handlePasswordDialogOpen}
                    sx={{
                      mt: isMobile ? 1 : 0,
                      border: "2px solid var(--primary)",
                      color: "var(--primary)",
                      "&:hover": {
                        backgroundColor: "var(--main-background)",
                      },
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </CardContent>
      )}
    </Card>
  );

  const renderOrderHistory = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order History
        </Typography>

        {isOrdersLoading ? (
          <LoadingSpinner height="300px" />
        ) : userOrders?.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CoffeeIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No orders yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Your coffee adventures will appear here
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                color: "white",
                backgroundColor: "var(--primary)",
                "&:hover": {
                  backgroundColor: "var(--light-color)",
                },
              }}
              size={isMobile ? "small" : "medium"}
            >
              Browse Menu
            </Button>
          </Box>
        ) : isMobile ? (
          <List sx={{ width: "100%" }}>
            {userOrders?.map((order) => (
              <React.Fragment key={order._id}>
                <ListItem
                  secondaryAction={
                    <Chip
                      label={`${order.totalPrice.toFixed(2)} EGP`}
                      size="small"
                      sx={{ color: "var(--light-color)" }}
                    />
                  }
                  onClick={() => toggleOrderExpand(order._id)}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    mb: 1,
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    {expandedOrder === order._id ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={order._id.slice(19, 24)}
                    secondary={formatDate(order.createdAt)}
                    primaryTypographyProps={{ variant: "body2" }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItem>
                <Collapse
                  in={expandedOrder === order._id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {order.orderItems.map((item, index) => (
                      <ListItem key={index} sx={{ pl: 4 }}>
                        <ListItemText
                          primary={item.product.title}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    ))}
                    <ListItem sx={{ pl: 4 }}>
                      <Chip
                        label={order.shippingStatus}
                        size="small"
                        sx={{
                          width: !isMobile ? "100%" : "content-fit",
                          px: !isMobile ? 0 : 3,
                          backgroundColor:
                            order.shippingStatus === "shipped"
                              ? green[500]
                              : order.shippingStatus === "prepared"
                              ? deepOrange[400]
                              : red[600],
                          color: "white",
                        }}
                      />
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                      <Typography
                        component={Link}
                        to={`/order-confirmation/${order._id}`}
                        sx={{
                          textDecoration: "none",
                          color: "var(--green-color)",
                        }}
                      >
                        Show Details
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Shipping Status</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrders?.map((order) => (
                    <TableRow key={order._id} hover>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {order._id.slice(19, 24)}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {formatDate(order.createdAt)}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {order.orderItems.map((item, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{ marginBottom: "5px" }}
                          >
                            {item.product.title}
                          </Typography>
                        ))}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {order.totalPrice.toFixed(2)} EGP
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Chip
                          label={order.paymentMethod}
                          size="small"
                          sx={{ width: "100%" }}
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Chip
                          label={order.shippingStatus}
                          size="small"
                          sx={{
                            width: "100%",
                            backgroundColor:
                              order.shippingStatus === "shipped"
                                ? green[500]
                                : order.shippingStatus === "prepared"
                                ? deepOrange[400]
                                : red[600],
                            color: "white",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Typography
                          component={Link}
                          to={`/order-confirmation/${order._id}`}
                          sx={{ textDecoration: "none" }}
                        >
                          <RemoveRedEyeOutlined
                            sx={{ color: "var(--green-color)" }}
                          ></RemoveRedEyeOutlined>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              handlePagination={handlePagination}
            ></PaginationComponent>
          </>
        )}
      </CardContent>
    </Card>
  );
  return (
    <Container fixed sx={{ py: isMobile ? 2 : 8 }}>
      {isProfileLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Grid container spacing={isMobile ? 2 : 4}>
            {/* Left Side - Profile Card */}
            <Grid size={{ xs: 12, lg: 3 }}>
              <Card sx={{ height: "100%", minHeight: { md: "400px" } }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "var(--light-color)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "var(--secondary)",
                            color: "var(--primary)",
                          },
                        }}
                        disabled={isProfileLoading || isOrdersLoading}
                      >
                        {editMode ? (
                          isPending ? (
                            <CircularProgress
                              size={14}
                              sx={{ color: "var(--main-background)" }}
                            />
                          ) : (
                            <SaveIcon
                              fontSize="small"
                              onClick={(e) => {
                                e.preventDefault();
                                personalDataForm.handleSubmit();
                              }}
                            />
                          )
                        ) : (
                          <EditIcon
                            fontSize="small"
                            onClick={handleEditClick}
                          />
                        )}
                      </IconButton>
                    }
                  >
                    <Avatar
                      src={profileData?.image}
                      sx={{
                        width: isMobile ? 80 : 120,
                        height: isMobile ? 80 : 120,
                        mb: 2,
                        border: `3px solid var(--green-color)`,
                      }}
                    />
                  </Badge>

                  {editMode ? (
                    <TextField
                      name="name"
                      label="Name"
                      value={personalDataForm.values.name || ""}
                      onChange={personalDataForm.handleChange}
                      onBlur={personalDataForm.handleBlur}
                      error={
                        personalDataForm.touched.name &&
                        personalDataForm.errors.name
                      }
                      helperText={
                        personalDataForm.touched.name &&
                        personalDataForm.errors.name
                      }
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "var(--green-color)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--green-color)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "var(--green-color)",
                          "&.Mui-focused": {
                            color: "var(--green-color)",
                          },
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      component="h1"
                      gutterBottom
                      sx={{ textTransform: "capitalize" }}
                    >
                      {profileData.name}
                    </Typography>
                  )}

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Member since{" "}
                    {new Date(profileData?.createdAt).toLocaleDateString()}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={async () => {
                      await logout();
                      toast.success("Logged Out Successfully!");
                      navigate("/login");
                    }}
                    sx={{
                      border: `2px solid ${red[700]}`,
                      marginTop: "20px",
                      width: "80%",
                      color: red[700],
                      "&:hover": {
                        backgroundColor: red[700],
                        color: "white",
                      },
                    }}
                  >
                    Sign Out
                  </Button>

                  <Divider sx={{ my: 3, width: "100%" }} />

                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant={isMobile ? "fullWidth" : "standard"}
                    sx={{
                      width: "100%",
                      "& .MuiTabs-indicator": {
                        backgroundColor: "var(--green-color)", // Change the indicator color
                      },
                    }}
                  >
                    <Tab
                      icon={<PersonIcon sx={{ color: "var(--green-color)" }} />}
                      label="Profile"
                      sx={{
                        width: "50%",
                        color: "var(--light-color)",
                        "&.Mui-selected": {
                          color: "var(--primary)",
                          borderColor: "var(--primary)",
                        },
                      }}
                    />
                    <Tab
                      icon={
                        <HistoryIcon sx={{ color: "var(--green-color)" }} />
                      }
                      label="Orders"
                      sx={{
                        width: "50%",
                        color: "var(--primary)",
                        "&.Mui-selected": {
                          color: "var(--primary)",
                          borderColor: "var(--primary)",
                        },
                      }}
                    />
                  </Tabs>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Side - Content */}
            <Grid size={{ xs: 12, lg: 9 }}>
              {activeTab === 0 ? renderProfileSection() : renderOrderHistory()}
            </Grid>
          </Grid>

          {/* Change Password Dialog */}
          {!user?.iss ? (
            <Dialog
              open={openPasswordDialog}
              onClose={handlePasswordDialogClose}
              fullScreen={isMobile}
            >
              <DialogTitle>Change Password</DialogTitle>
              <DialogContent>
                {/* Current Password Field */}
                <TextField
                  autoFocus
                  margin="dense"
                  label="Current Password"
                  type={showPassword.old ? "text" : "password"}
                  name="oldPassword"
                  fullWidth
                  variant="outlined"
                  value={passwordForm.values.oldPassword}
                  onChange={passwordForm.handleChange}
                  onBlur={passwordForm.handleBlur}
                  error={
                    passwordForm.touched.oldPassword &&
                    passwordForm.errors.oldPassword
                  }
                  helperText={
                    passwordForm.touched.oldPassword &&
                    passwordForm.errors.oldPassword
                  }
                  size={isMobile ? "small" : "medium"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => toggleShowPassword("old")}
                          edge="end"
                        >
                          {showPassword.old ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "var(--green-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--green-color)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--green-color)",
                      "&.Mui-focused": {
                        color: "var(--green-color)",
                      },
                    },
                  }}
                />

                {/* New Password Field */}
                <TextField
                  margin="dense"
                  label="New Password"
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  fullWidth
                  variant="outlined"
                  value={passwordForm.values.newPassword}
                  onChange={passwordForm.handleChange}
                  onBlur={passwordForm.handleBlur}
                  error={
                    passwordForm.touched.newPassword &&
                    passwordForm.errors.newPassword
                  }
                  helperText={
                    passwordForm.touched.newPassword &&
                    passwordForm.errors.newPassword
                  }
                  size={isMobile ? "small" : "medium"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => toggleShowPassword("new")}
                          edge="end"
                        >
                          {showPassword.new ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "var(--green-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--green-color)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--green-color)",
                      "&.Mui-focused": {
                        color: "var(--green-color)",
                      },
                    },
                  }}
                />

                {/* Confirm Password Field */}
                <TextField
                  margin="dense"
                  label="Confirm New Password"
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  fullWidth
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  error={
                    confirmPasswordTouched &&
                    confirmPassword !== passwordForm.values.newPassword
                  }
                  helperText={
                    confirmPasswordTouched &&
                    confirmPassword !== passwordForm.values.newPassword
                      ? "Passwords do not match"
                      : ""
                  }
                  size={isMobile ? "small" : "medium"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => toggleShowPassword("confirm")}
                          edge="end"
                        >
                          {showPassword.confirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "var(--green-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--green-color)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--green-color)",
                      "&.Mui-focused": {
                        color: "var(--green-color)",
                      },
                    },
                  }}
                />
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button
                  onClick={handlePasswordDialogClose}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    color: "var(--green-color)",
                    "&:hover": {
                      backgroundColor: "var(--main-background)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault;
                    passwordForm.handleSubmit();
                  }}
                  variant="contained"
                  disabled={
                    isProfileLoading || isOrdersLoading || !confirmPassword
                  }
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    color: "white",
                    backgroundColor: "var(--primary)",
                    "&:hover": {
                      backgroundColor: "var(--light-color)",
                    },
                  }}
                >
                  {isPending ? (
                    <CircularProgress
                      size={24}
                      sx={{ color: "var(--main-background)" }}
                    />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            <></>
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;
