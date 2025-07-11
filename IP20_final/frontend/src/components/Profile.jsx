import { useState, useMemo, useEffect } from "react";
import { Star, Rocket, ChevronDown, X, Edit, Eye, Info } from "lucide-react";
import { Grid, Modal, Box } from "@mui/material";
import "./Profile.css";
import React from "react";
import Navbar from "./NavBar";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ patents: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const buildLink = (path, patentId) => { //use build link
    return accountId
      ? `${path}?accountId=${accountId}&patentId=${patentId}`
      : path;
  };

  async function handleRemovePatent(patentId) { //calls delete endpoint to remove patent from the user
    try {
      const response = await fetch(
        `http://localhost:8080/api/handlePatents/${accountId}/${patentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("Patent deleted:", data);

      setUserData((prevData) => ({
        ...prevData,
        patents: prevData.patents.filter((item) => item.data[0] !== patentId),
      }));
    } catch (error) {
      console.error("Error deleting patent:", error);
    }
  }


  async function fetchUserData() { //gets all the user data this houses the patent s too
    try {
      const response = await fetch(
        `http://localhost:8080/api/nctaccount/${accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setUserData(data);
      console.log("Fetched user data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [accountId]);

  const uniqueTags = useMemo(() => { //get the unique tags to not have dupes and use useMemo to not have to recalculate every time
    if (!userData.patents || userData.patents.length === 0) {
      return ["All Tags", "None"];
    }

    const allTags = userData.patents.reduce((acc, patent) => {
      if (patent.tags && patent.tags.length > 0) {
        return [...acc, ...patent.tags];
      }
      return acc;
    }, []);

    const uniqueTagsSet = new Set(allTags);
    return ["All Tags", ...Array.from(uniqueTagsSet), "None"];
  }, [userData.patents]);

  const filteredPatents = useMemo(() => {
    if (!userData.patents) return [];
    
    if (selectedTag === "All Tags") {
      return userData.patents;
    } else if (selectedTag === "None") {
      return userData.patents.filter(patent => !patent.tags || patent.tags.length === 0);
    } else {
      return userData.patents.filter(patent => 
        patent.tags && patent.tags.includes(selectedTag)
      );
    }
  }, [userData.patents, selectedTag]);

  const openModal = (patent) => {
    setSelectedPatent(patent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatent(null);
  };

  const starsBackground = useMemo(() => {
    return [...Array(150)].map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`,
          opacity: Math.random() * 0.8 + 0.2,
          animation: `twinkle ${Math.random() * 5 + 5}s infinite`,
        }}
      />
    ));
  }, []);

  return (
    <div className="backgroundContainer">
      <nav>
        <Navbar />
      </nav>

      <div className="profileContainer">
        <img
          className="circleMoonProfile"
          src="../src/assets/CircleMoon.png"
          alt="Circle Moon"
        />
        <div className="starsBackground">
          <div className="starsContainer">{starsBackground}</div>
        </div>

        <div className="profileContent">
          <header className="profileHeader">
            <div className="userInfo">
              <div className="userDetails">
                <h1 className="welcome">Welcome</h1>
                <h1 className="username">{userData.username}</h1>
                <p className="userTagline">Your Patent Collection</p>
              </div>
            </div>
          </header>

          <div className="sectionHeader">
            <h2 className="sectionTitle">Saved Patents</h2>
            <div className="filterContainer">
              <div
                className="filterDropdown"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedTag}</span>
                <ChevronDown
                  size={16}
                  className={`dropdownIcon ${isDropdownOpen ? "open" : ""}`}
                />

                {isDropdownOpen && (
                  <div className="dropdownMenu">
                    {uniqueTags.map((tag) => ( //display the tags in the dropdown menu
                      <div
                        key={tag}
                        className="dropdownItem"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <main className="mainContent">
            <div className="contentSection">
              <Grid container spacing={3} className="patentGridContainer">
                {filteredPatents.length > 0 ? (
                  filteredPatents.map((item) => (
                    <Grid item xs={4} md={4} key={item.data[0]}>
                      <div className="savedPatentCard">
                        <button
                          className="removePatentButton"
                          onClick={() => handleRemovePatent(item.data[0])}
                          aria-label="Remove patent"
                        >
                          <X size={20} />
                        </button>

                        <div
                          className="patentImageContainer"
                          style={{
                            backgroundImage: `url('${item.data[10]}')`,
                          }}
                        ></div>

                        <div className="patentCardContent">
                          <div className="patentMetadata">
                            <span className="patentCategory">
                              {item.data[5] &&
                                item.data[5]
                                  .split(" ")
                                  .map((word) =>
                                    word.length > 3
                                      ? word[0].toUpperCase() +
                                        word.slice(1).toLowerCase()
                                      : word
                                  )
                                  .join(" ")}
                            </span>
                            <span className="patentId">ID: {item.data[1]}</span>
                          </div>

                          <h3 className="patentTitle">
                            {item.data[2] &&
                              item.data[2].replace(/<[^>]*>/g, "").slice(0, 65) + //remove html tags and limit to 65 characters
                                (item.data[2].replace(/<[^>]*>/g, "").length > 65
                                  ? "..."
                                  : "")}
                          </h3>
                        </div>

                        <div className="patentActionButtons">
                          <button
                            className="patentActionButton viewInfo"
                            onClick={() => openModal(item.data)} 
                          >
                            <Info size={16} />
                            <span>View Info</span>
                          </button>
                          <button
                            className="patentActionButton viewNotes"
                            onClick={() =>
                              navigate(buildLink("/viewnotes", item.data[0]))
                            }
                          >
                            <Eye size={16} />
                            <span>View Notes</span>
                          </button>

                          <button
                            className="patentActionButton editNotes"
                            onClick={() =>
                              navigate(buildLink("/notes", item.data[0]))
                            }
                          >
                            <Edit size={16} />
                            <span>Edit Notes</span>
                          </button>
                        </div>
                      </div>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <div className="emptyCollection">
                      <p>
                        {userData.patents && userData.patents.length > 0 
                          ? `No patents found with the selected tag: ${selectedTag}`
                          : "You haven't saved any patents yet. Browse and stash patents to see them here."
                        }
                      </p>
                    </div>
                  </Grid>
                )}
              </Grid>
            </div>
          </main>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="patent-modal-title"
        aria-describedby="patent-modal-description"
        className="modal"
      >
        <Box className="modalBox">
          <div className="modalImageContainer">
            <img
              className="modalImage"
              src={selectedPatent ? selectedPatent[10] : ""}
              alt="Patent"
            />
          </div>
          <div className="modalContent">
            <div className="modalHeader">
              <h3 className="patentTitleModal">
                {selectedPatent
                  ? selectedPatent[2].replace(/<[^>]*>/g, "")
                  : ""}
              </h3>
            </div>
            <div className="smallModalTextContainer">
              <div className="smallModalText">
                ID: {selectedPatent ? selectedPatent[1] : ""}
              </div>
              <div className="smallModalText">
                Category:{" "}
                {selectedPatent
                  ? selectedPatent[5]
                      .split(" ")
                      .map((word) =>
                        word.length > 3
                          ? word[0].toUpperCase() + word.slice(1).toLowerCase()
                          : word
                      )
                      .join(" ")
                  : ""}
              </div>
              <div className="smallModalText">
                Developed At: {selectedPatent ? selectedPatent[9] : ""}
              </div>
            </div>
          </div>
          <div className="modalDescriptionContainer">
            <p className="modalDescription">
              {selectedPatent ? selectedPatent[3].replace(/<[^>]*>/g, "") : ""}
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;