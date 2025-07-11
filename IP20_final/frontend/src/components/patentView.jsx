import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import VerticalCarousel from "./verticalCarousel";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Navbar from "./NavBar";
import "./patentView.css";

const PatentView = ({ stash, setStash }) => {
  const [patents, setPatents] = useState([]); //useState for patents that are displayed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const location = useLocation();
  async function getPatents(searchQuery) {
    try { //fetch from nasa api
      const response = await fetch(
        `http://localhost:8080/api/nasaApi/${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPatents(data);
      console.log("Fetched patents:", data);
    } catch (error) {
      console.error("Error fetching patents:", error);
    }
  }
  const handleStash = () => {
    if (!selectedPatent) return;

    const alreadyStashed = stash.some(
      (patent) => patent[0] === selectedPatent[0]
    );

    if (!alreadyStashed) {
      setStash((prev) => [...prev, selectedPatent]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");

    getPatents(searchQuery);

    // const gettingFromAPI = async (query) => {
    //   try {
    //     const response = await fetch(
    //       `https://api.nasa.gov/techtransfer/patent/?${query}&api_key=${apiKey}`
    //     );
    //     const jsonResponse = await response.json();
    //     setPatents(jsonResponse);
    //     console.log("Fetched patents:", jsonResponse);
    //   } catch (error) {
    //     console.error("Error fetching patents:", error);
    //   }
    // };

    // if (searchQuery) {
    //   gettingFromAPI(searchQuery);
    // }
  }, [location.search]);

  const [carouselData1, setCarouselData1] = useState([]); //we have three carousels so i have to split it up
  const [carouselData2, setCarouselData2] = useState([]);
  const [carouselData3, setCarouselData3] = useState([]);
//modal logic
  const openModal = (patent) => {
    console.log("Selected patent:", patent);
    setSelectedPatent(patent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatent(null);
  };

  useEffect(() => {
    setCarouselData1([]);
    setCarouselData2([]);
    setCarouselData3([]);

    console.log("Patents:", patents.count);
    for (let i = 0; i < patents.count; i++) {
      const cleanString =
        patents.results[i][2].replace(/<[^>]*>/g, "").slice(0, 65) + //cleaning the string to remove html tags and limit length
        (patents.results[i][2].replace(/<[^>]*>/g, "").length > 65
          ? "..."
          : "");
      const patentCard = (
        <div className="patentCard" key={i}>
          <div
            className="patentImage"
            style={{
              backgroundImage: `url('${patents.results[i][10]}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="patentTextContainer">
            <div className="patentTextContainerTop">
              <p className="patentCategory">
                Category:{" "}
                {patents.results[i][5]
                  .split(" ")
                  .map((word) =>
                    word.length > 3
                      ? word[0].toUpperCase() + word.slice(1).toLowerCase()
                      : word
                  )
                  .join(" ")}
              </p>
              <p className="patentId">ID: {patents.results[i][1]}</p>
            </div>

            <h3 className="patentTitle">{cleanString}</h3>
          </div>
          <button
            className="patentButton"
            onClick={() => openModal(patents.results[i])}
          >
            View More
          </button>
        </div>
      );
      if (i % 3 == 0) {
        setCarouselData2((prev) => [...prev, patentCard]);
      } else if (i % 3 == 1) {
        setCarouselData1((prev) => [...prev, patentCard]);
      } else if (i % 3 == 2) {
        setCarouselData3((prev) => [...prev, patentCard]);
      }
    }
  }, [patents]);

  const queryParams = new URLSearchParams(location.search);
  const forTitle = queryParams.get("search");

  return (
    <div className="patentViewContainer">
      <nav>
        <Navbar />
      </nav>
      <div className="patentView">
        <div className="nebula nebulaOrange"></div>
        <div className="nebula nebulaRedish"></div>

        <img
          className="circleMoonPatent"
          src="../src/assets/CircleMoon.png"
          alt="Circle Moon"
        />

        <div className="patentViewBigTextContainer">
          <div className="resultsFor">Results For</div>
          <h2 className="patentViewBigText">
            {forTitle
              .split(" ")
              .map((word) =>
                word.length > 3
                  ? word[0].toUpperCase() + word.slice(1).toLowerCase()
                  : word
              )
              .join(" ")}
          </h2>
        </div>

        <div className="carousels-container">
          <div className="carousel-section">
            <VerticalCarousel items={carouselData1} />
          </div>

          <div className="carousel-section">
            <VerticalCarousel items={carouselData2} />
          </div>

          <div className="carousel-section">
            <VerticalCarousel items={carouselData3} />
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
                <button className="savePatentButton" onClick={handleStash}>
                  Stash Patent
                </button>
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
                            ? word[0].toUpperCase() +
                              word.slice(1).toLowerCase()
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
                {selectedPatent
                  ? selectedPatent[3].replace(/<[^>]*>/g, "")
                  : ""}
              </p>
            </div>
          </Box>
        </Modal>
        {showNotification && (
          <div className="stashedNotification">Stashed!</div>
        )}
      </div>
    </div>
  );
};

export default PatentView;
