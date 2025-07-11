import "./homePage.css";
import SatelliteImage from "./SatelliteImage.jsx";
import Navbar from "./NavBar.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const isLoggedIn = params.has("accountId");
  console.log(isLoggedIn);

  const handleLoginClick = () => {
    console.log("Login button clicked");
    navigate("/loginpage");
  };
  const handleSignUpClick = () => {
    navigate("/signuppage");
  };
  return (
    <div class="homePageContainer">
      <nav>
        <Navbar />
      </nav>
      <div className="homePage">
        <div className="landingPageBigTextContainer">
          <h2 className="landingPageBigText">
            Space-Age Innovation Real-World Impact
          </h2>
        </div>
        <div className="landingPageSmallTextContainer">
          <h3 className="landingPageSmallText">
            Discover NASA patents, spark ideas, and fuel progress.
          </h3>
        </div>
        <SatelliteImage />
        <div className="nebula nebulaRed"></div>
        <div className="nebula nebulaOrange"></div>
        {isLoggedIn ? null : (
          <div className="buttonsContainer">
            <button className="loginButton" onClick={handleLoginClick}>
              Log In
            </button>
            <button className="signUpButton" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
