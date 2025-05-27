import { memo, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Checkbox,
  FormControlLabel,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  Slider,
  Typography,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  FilterList as FilterIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const FilterationSideNav = ({ onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // State for expanded category (only one can be open at a time)
  const [expandedCategory, setExpandedCategory] = useState(null);

  // State for selected filters
  const [localFilters, setLocalFilters] = useState({
    // Coffee
    coffee: false,
    icedCoffee: false,
    espresso: false,
    latte: false,
    cappuccino: false,
    // Cold Drinks
    icedTea: false,
    lemonade: false,
    smoothies: false,
    frappes: false,
    softDrinks: false,
    // Pastries
    croissants: false,
    muffins: false,
    danishes: false,
    scones: false,
    // Cakes
    cupcakes: false,
    cheesecakes: false,
    // Breakfast
    bagels: false,
    pancakes: false,
    oatmeal: false,
    combo: false,
    // Price
    price: 200, // Default max price
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExpand = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleFilterChange = (filterName) => (event) => {
    const newFilters = {
      ...localFilters,
      [filterName]: event.target.checked,
    };
    setLocalFilters(newFilters);
    buildAndSendQuery(newFilters);
  };

  const handlePriceChange = (event, newValue) => {
    const newFilters = {
      ...localFilters,
      price: newValue,
    };
    setLocalFilters(newFilters);
    buildAndSendQuery(newFilters);
  };

  const buildAndSendQuery = (currentFilters) => {
    const selectedFilters = [];

    // Coffee filters
    if (currentFilters.coffee) selectedFilters.push("coffee");
    if (currentFilters.icedCoffee) selectedFilters.push("iced coffee");
    if (currentFilters.espresso) selectedFilters.push("espres");
    if (currentFilters.latte) selectedFilters.push("latte");
    if (currentFilters.cappuccino) selectedFilters.push("cappuccino");

    // Cold drinks filters
    if (currentFilters.icedTea) selectedFilters.push("iced tea");
    if (currentFilters.lemonade) selectedFilters.push("lemonad");
    if (currentFilters.smoothies) selectedFilters.push("smooth");
    if (currentFilters.frappes) selectedFilters.push("frappe");
    if (currentFilters.softDrinks) selectedFilters.push("soft drink");

    // Pastries
    if (currentFilters.croissants) selectedFilters.push("croissant");
    if (currentFilters.muffins) selectedFilters.push("muffin");
    if (currentFilters.danishes) selectedFilters.push("danish");
    if (currentFilters.scones) selectedFilters.push("scon");

    // Cakes
    if (currentFilters.cupcakes) selectedFilters.push("cupcake");
    if (currentFilters.cheesecakes) selectedFilters.push("cheesecake");

    // Breakfast
    if (currentFilters.bagels) selectedFilters.push("bagel");
    if (currentFilters.pancakes) selectedFilters.push("pancake");
    if (currentFilters.oatmeal) selectedFilters.push("oatmeal");

    if (currentFilters.combo) selectedFilters.push("combo");

    const query = {
      title: selectedFilters.join(", "),
      price: currentFilters.price,
    };

    onFilterChange(query);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Mobile filter button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open filters"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 1200,
            backgroundColor: "var(--light-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "var(--accent)",
              color: "var(--primary)",
            },
            width: "50px",
            height: "50px",
          }}
        >
          <FilterIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      )}

      {/* The actual drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        anchor="left"
        elevation={24}
        sx={{
          maxWidth: isMobile ? "80%" : "280px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            position: !isMobile ? "absolute" : "fixed",
            zIndex: !isMobile ? "5" : "200000",
            width: isMobile ? { xs: "80%", md: "50%" } : "280px",
            boxSizing: "border-box",
            backgroundColor: "var(--light-bg)",
            padding: "16px",
            marginTop: isMobile ? 0 : "100px",
            height: "100%",
            ...(!isMobile && {
              boxShadow: "2px 0 10px 0px rgba(0, 0, 0, 0.2)",
            }),
          },
        }}
      >
        {isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <ListItemText
              primary="Filter Menu"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            />
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <ListItemText
              primary="Filter Menu"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            />
          </Box>
        )}
        <Divider />

        {/* Price Filter */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Maximum Price: {localFilters.price} EGP
          </Typography>
          <Slider
            value={localFilters.price}
            onChange={handlePriceChange}
            onChangeCommitted={(e, val) => handlePriceChange(e, val)}
            min={25}
            max={600}
            step={10}
            valueLabelDisplay="auto"
            aria-labelledby="price-slider"
            sx={{ color: "var(--light-color)" }}
          />
        </Box>

        <List component="nav" sx={{ width: "100%", overflowY: "auto" }}>
          {/* Coffee */}
          <ListItem button onClick={() => handleExpand("coffee")}>
            <ListItemText primary="Coffee" sx={{ fontWeight: "bold" }} />
            {expandedCategory === "coffee" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedCategory === "coffee"} timeout="auto">
            <List component="div" disablePadding>
              {["coffee", "icedCoffee", "espresso", "latte", "cappuccino"].map(
                (item) => (
                  <ListItem key={item} sx={{ pl: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={localFilters[item]}
                          onChange={handleFilterChange(item)}
                          size="small"
                          sx={{
                            color: "var(--light-color)",
                            "&.Mui-checked": {
                              color: "var(--light-color)",
                            },
                          }}
                        />
                      }
                      label={item
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    />
                  </ListItem>
                )
              )}
            </List>
          </Collapse>
          <Divider />

          {/* Cold Drinks */}
          <ListItem button onClick={() => handleExpand("coldDrinks")}>
            <ListItemText primary="Cold Drinks" sx={{ fontWeight: "bold" }} />
            {expandedCategory === "coldDrinks" ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          <Collapse in={expandedCategory === "coldDrinks"} timeout="auto">
            <List component="div" disablePadding>
              {[
                "icedTea",
                "lemonade",
                "smoothies",
                "frappes",
                "softDrinks",
              ].map((item) => (
                <ListItem key={item} sx={{ pl: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localFilters[item]}
                        onChange={handleFilterChange(item)}
                        size="small"
                        sx={{
                          color: "var(--light-color)",
                          "&.Mui-checked": {
                            color: "var(--light-color)",
                          },
                        }}
                      />
                    }
                    label={item
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />

          {/* Pastries */}
          <ListItem button onClick={() => handleExpand("pastries")}>
            <ListItemText primary="Pastries" sx={{ fontWeight: "bold" }} />
            {expandedCategory === "pastries" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedCategory === "pastries"} timeout="auto">
            <List component="div" disablePadding>
              {["croissants", "muffins", "danishes", "scones"].map((item) => (
                <ListItem key={item} sx={{ pl: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localFilters[item]}
                        onChange={handleFilterChange(item)}
                        size="small"
                        sx={{
                          color: "var(--light-color)",
                          "&.Mui-checked": {
                            color: "var(--light-color)",
                          },
                        }}
                      />
                    }
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />

          {/* Cakes */}
          <ListItem button onClick={() => handleExpand("cakes")}>
            <ListItemText primary="Cakes" sx={{ fontWeight: "bold" }} />
            {expandedCategory === "cakes" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedCategory === "cakes"} timeout="auto">
            <List component="div" disablePadding>
              {["cupcakes", "cheesecakes"].map((item) => (
                <ListItem key={item} sx={{ pl: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localFilters[item]}
                        onChange={handleFilterChange(item)}
                        size="small"
                        sx={{
                          color: "var(--light-color)",
                          "&.Mui-checked": {
                            color: "var(--light-color)",
                          },
                        }}
                      />
                    }
                    label={item
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />

          {/* Breakfast */}
          <ListItem button onClick={() => handleExpand("breakfast")}>
            <ListItemText primary="Breakfast" sx={{ fontWeight: "bold" }} />
            {expandedCategory === "breakfast" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedCategory === "breakfast"} timeout="auto">
            <List component="div" disablePadding>
              {["bagels", "pancakes", "oatmeal"].map((item) => (
                <ListItem key={item} sx={{ pl: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localFilters[item]}
                        onChange={handleFilterChange(item)}
                        size="small"
                        sx={{
                          color: "var(--light-color)",
                          "&.Mui-checked": {
                            color: "var(--light-color)",
                          },
                        }}
                      />
                    }
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />

          {/* combo */}
          {/* Breakfast */}
          <ListItem button onClick={() => handleExpand("combo")}>
            <ListItemText primary="Combo" sx={{ fontWeight: "bold" }} />
            {expandedCategory === "combo" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedCategory === "combo"} timeout="auto">
            <List component="div" disablePadding>
              {["combo"].map((item) => (
                <ListItem key={item} sx={{ pl: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localFilters[item]}
                        onChange={handleFilterChange(item)}
                        size="small"
                        sx={{
                          color: "var(--light-color)",
                          "&.Mui-checked": {
                            color: "var(--light-color)",
                          },
                        }}
                      />
                    }
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
};

export default memo(FilterationSideNav);
