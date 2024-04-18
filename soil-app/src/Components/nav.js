import Grid from "@mui/material/Grid";
import { removeItem } from "../Utils/storageHelper";
import ShoppingCart from "./ShoppingCart";

const NavBar = ({
  setView,
  loggedInUser,
  logOut,
  cartItems,
  removeFromCart,
  checkout,
}) => {
  const handleSignClick = () => {
    if (loggedInUser) {
      removeItem("loggedInUser");
      logOut();
    } else {
      setView("signIn");
    }
  };

  return (
    <nav style={{ paddingBottom: "10px" }}>
      <Grid container>
        <Grid item sm={2}>
          <h1>SOIL</h1>
        </Grid>
        <Grid item sm={7}>
          <div className="links">
            <ul>
              <li onClick={() => setView("home")}>Home</li>
              {loggedInUser && (
                <li onClick={() => setView("profile")}>Profile</li>
              )}
              {loggedInUser && (
                <li onClick={() => setView("diet")}>Diet Profiles</li>
              )}
              {!loggedInUser && (
                <li onClick={() => setView("signUp")}>Sign Up</li>
              )}
            </ul>
          </div>
        </Grid>
        <Grid item sm={3}>
          <ul>
            <li
              onClick={handleSignClick}
              style={{ textAlign: "right", textDecoration: "underline" }}
            >
              {loggedInUser ? "Sign Out" : "Sign In"}
            </li>
          </ul>
        </Grid>
      </Grid>
      {loggedInUser && (
        <ShoppingCart
          items={cartItems}
          removeFromCart={removeFromCart}
          checkout={checkout}
          setView={setView}
        />
      )}
    </nav>
  );
};

export default NavBar;
