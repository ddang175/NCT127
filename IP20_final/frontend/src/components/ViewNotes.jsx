import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Navbar from "./NavBar";
import "./ViewNotes.css";
import { useLocation, useSearchParams } from "react-router-dom";

const ViewNotes = () => {
  const { id } = useParams(); //id passed through the URL
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");
  const patentId = searchParams.get("patentId");
  const [patent, setPatent] = useState(null);

  //pull a certain patent from the account
  async function fetchSinglePatent(accountId, patentId) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/handlePatents/${accountId}/${patentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch patent: ${response.status}`);
      }

      const patent = await response.json();
      console.log("Fetched patent:", patent);
      return patent;
    } catch (error) {
      console.error("Error fetching patent:", error);
      return null;
    }
  }
//fetch the patent on load
  useEffect(() => {
    fetchSinglePatent(accountId, patentId).then((patent) => {
      if (patent) {
        setPatent(patent);
      }
    });
  }, []);

  console.log("Fetched patent:", patent);
 

  return (
    <div className="notesViewContainer">
      <nav>
        <Navbar />
      </nav>

      <div className="nebula nebulaRed"></div>
      <div className="nebula nebulaOrange"></div>
      <img
        className="circleMoonNotes"
        src="../src/assets/CircleMoon.png"
        alt="Circle Moon"
      />

      <div className="notesViewContent">
        <div className="notesViewHeader">
          <Button
            className="backButton"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back to Patents
          </Button>
        </div>

        <Typography variant="h1" className="notesViewTitle">
          {/* nasa patent returns weird string with html sometimes so this fixes that */}
          {patent ? patent.data[2].replace(/<[^>]*>/g, "") : "Loading..."} 
        </Typography>

        {patent ? (
          <img
            src={patent.data[10]}
            alt="Patent"
            className="patentImageNotes"
          />
        ) : (
          <div className="patentImageContainer">
            <div className="patentImagePlaceholder">
              No Patent Image Available
            </div>
          </div>
        )}

        <div className="notesSection">
          <div className="sectionTitle">
            <DescriptionIcon className="sectionIcon" />
            <Typography>Notes</Typography>
          </div>
          <div className="notesContent">
            <Typography className="notesText">
              {patent ? patent.notes : "Loading..."}
            </Typography>
          </div>
        </div>

        <div className="urlsSection">
          <div className="sectionTitle">
            <LinkIcon className="sectionIcon" />
            <Typography>Related URLs</Typography>
          </div>
          <div className="urlsContent">
            {patent ? (patent.urls.length > 0 ? (
              <ul className="urlsList">
                {/* map the urls for the patent */}
                {patent.urls.map((url, index) => (
                  <li key={index} className="urlItem">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="urlLink"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography className="noContentText">No URLs added</Typography>
            )) : "Loading..."}
          </div>
        </div>

        <div className="tagsSection">
          <div className="sectionTitle">
            <LocalOfferIcon className="sectionIcon" />
            <Typography>Tags</Typography>
          </div>
          <div className="tagsContent">
            {patent ? (patent.tags.length > 0 ? (
              <div className="tagsList">
                {/* map the tags given to the patent */}
                {patent.tags.map((tag, index) => (
                  <Chip key={index} label={tag} className="tagChip" />
                ))}
              </div>
            ) : (
              <Typography className="noContentText">No tags added</Typography>
            )) : "Loading..."}
          </div>
        </div>

        <Button
          className="editButton"
          onClick={() =>
            navigate(`/notes?accountId=${accountId}&patentId=${patent.id}`)
          }
        >
          Edit Note
        </Button>
      </div>
    </div>
  );
};

export default ViewNotes;
