import React from "react";
import { Drawer, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./DropDown.css";

//Information from Navbar useStates
//Preset information for the dropdown menu
const DropDown = ({
  anchor = "top",
  open,
  contentKey,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  //Routing init
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //For seaching up patents
  const [searchText, setSearchText] = React.useState("");

  //Get accountId from url
  const accountId = searchParams.get("accountId");

  //Add account to the url when signed in
  const buildLink = (search) => {
    return accountId
      ? `/patent?accountId=${accountId}&search=${search}`
      : `/patent?search=${path}`;
  };

  //Dropdown menus have preset searches, if clicked on, they will go ot the patent
  const handleClick = (text) => () => {
    navigate(buildLink(text));
  };
  const renderContent = () => {
    switch (contentKey) {
      case "technology":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Aeronautics")}
              >
                Aeronautics
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Propulsion")}
              >
                Propulsion
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Agricultural Technology")}
              >
                Agricultural Technology
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Aerospace")}
              >
                Aerospace
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Robotics")}
              >
                Robotics
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Architectural Technology")}
              >
                Architectural Technology
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Mechanical Systems")}
              >
                Mechanical Systems
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Biotechnology")}
              >
                Biotechnology
              </button>{" "}
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Fluid Systems")}
              >
                Fluid Systems
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Artificial Intelligence")}
              >
                Artificial Intelligence
              </button>
            </div>
          </div>
        );
      case "electronics":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Communications")}
              >
                Communications
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Computer Engineering")}
              >
                Computer Engineering
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Optics")}
              >
                Optics
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Control Engineering")}
              >
                Control Engineering
              </button>
            </div>
            <div className="subdiv">
              <button className="navSmallButton" onClick={handleClick("IT")}>
                IT
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Microelectronics ")}
              >
                Microelectronics
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Software")}
              >
                Software
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Signal Processing ")}
              >
                Signal Processing
              </button>
            </div>
          </div>
        );
      case "health":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Health")}
              >
                Health
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Healthcare Operations")}
              >
                Healthcare Operations
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Medicine")}
              >
                Medicine
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Clinical research")}
              >
                Clinical Research
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Wearables")}
              >
                Wearables
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Health Information Systems")}
              >
                Health Information Systems
              </button>
            </div>
          </div>
        );
      case "environment":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Environment")}
              >
                Environment
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Atmosphere")}
              >
                Atmosphere
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Materials")}
              >
                Materials
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Coatings")}
              >
                Coatings
              </button>
            </div>
            <div className="subdiv">
              <button className="navSmallButton" onClick={handleClick("Water")}>
                Water
              </button>
            </div>
          </div>
        );
      case "manufacturing":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Manufacturing")}
              >
                Manufacturing
              </button>
              <button
                className="navSmallButton"
                onClick={handleClick("Machining")}
              >
                Machining
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Instrumentation")}
              >
                Instrumentation
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Metals")}
              >
                Metals
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("3D Printing")}
              >
                3D Printing
              </button>
            </div>
          </div>
        );
      case "energy":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Power Generation")}
              >
                Power Generation
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Chemical Energy")}
              >
                Chemical Energy
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Mechanical Energy")}
              >
                Mechanical Energy
              </button>
            </div>
            <div className="subdiv">
              <button
                className="navSmallButton"
                onClick={handleClick("Nuclear Energy")}
              >
                Nuclear Energy
              </button>
            </div>
          </div>
        );
      case "search":
        const handleSearchKeyDown = (e) => {
          if (e.key === "Enter" && searchText.trim() !== "") {
            navigate(
              accountId
                ? `/patent?accountId=${accountId}&search=${encodeURIComponent(
                    searchText
                  )}`
                : `/patent?search=${encodeURIComponent(searchText)}`
            );
          }
        };

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="subdiv"></div>
            <div className="subdiv">
              <TextField
                variant="standard"
                margin="normal"
                required
                id="fullWidth"
                autoFocus
                placeholder="Search NCT127.com"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                sx={{ input: { color: "white", fontSize: "1rem" } }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      size="medium"
                      sx={{ color: "whitesmoke", paddingRight: ".5rem" }}
                    />
                  ),
                  disableUnderline: true,
                }}
              />
            </div>
            <div className="subdiv"></div>
            <div className="subdiv"></div>
          </div>
        );
    }
  };

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={() => {}}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(.5rem)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        },
        paper: {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          sx: {
            background: "rgb(8, 8, 8)",
            color: "white",
            overflow: "hidden",
          },
        },
      }}
    >
      {renderContent()}
    </Drawer>
  );
};

export default DropDown;
