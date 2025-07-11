import { useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Grid } from "@mui/material";
import "./Stash.css";
import React from "react";
import Navbar from "./NavBar";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Stash = ({ stash, setStash }) => {
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get('accountId'); //id passed through URL
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const removePatent = (patentId) => {
    setStash((prevStash) =>
      prevStash.filter((patent) => patent[1] !== patentId)
    );
  };

  //calls endpoint to save the patents to database
  async function stashPatent(accountId, selectedPatent) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/handlePatents/${accountId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patent: selectedPatent }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log("Patent successfully stashed:", data);
      } else if (response.status === 409) {
        console.log("Patent already in stash:", data.message);
      } else {
        console.error("Failed to stash patent:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error sending patent to backend:", error);
    }
  }
  const handleSave = async () => {
    if (stash.length === 0) return;
    for (const patent of stash) {
      await stashPatent(accountId, patent);
    }
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
    setStash([]);
  };
  
//does the stars background, using useMemo so it doesnt re-render every time  
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

      <div className="stashContainer">
        <img
          className="circleMoonProfile"
          src="../src/assets/CircleMoon.png"
          alt="Circle Moon"
        />
        <div className="starsBackground">
          <div className="starsContainer">{starsBackground}</div>
        </div>

        <div className="stashContent">
          <header className="stashHeader">
            <div className="pageInfo">
              <div className="pageDetails">
                <h1 className="welcome">Your</h1>
                <h1 className="stashTitle">Patent Stash</h1>
                <p className="stashTagline">
                  Review and confirm your selected patents
                </p>
              </div>
            </div>
            <div className="stashActions">
              <button className="confirmButton" onClick={handleSave}>
                <CheckCircle size={20} />
                <span>Confirm and Save Patents</span>
              </button>
            </div>
          </header>

          <main className="stashMainContent">
            <div className="stashSummary">
              <div className="stashCount">
                <h3>
                  Patents in stash: <span>{stash.length}</span>
                </h3>
              </div>
            </div>

            <Grid container spacing={3} className="stashGridContainer">
              {stash.length > 0 ? (
                stash.map((patent, index) => { //place all the patents
                  const cleanTitle = patent[2].replace(/<[^>]*>/g, "").slice(0, 65) + 
                    (patent[2].replace(/<[^>]*>/g, "").length > 65 ? "..." : ""); // clean title by removing HTML tags and limiting length because NASA api does weird stuff with the title
                  
                  const formattedCategory = patent[5]
                    .split(" ")
                    .map((word) =>
                      word.length > 3
                        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
                        : word
                    )
                    .join(" ");

                  return (
                    <Grid item xs={4} sm={4} md={4} key={patent[1]}>
                      <div className="stashedPatentCard">
                        <div className="patentCardHeader">
                          <div
                            className="stashedPatentImage"
                            style={{
                              backgroundImage: `url('${patent[10]}')`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                            }}
                          />
                        </div>
                        <div className="patentCardContent">
                          <div className="patentMetadata">
                            <span className="patentCategory">
                              Category: {formattedCategory}
                            </span>
                            <span className="patentId">ID: {patent[1]}</span>
                          </div>
                          <h3 className="stashedPatentTitle">{cleanTitle}</h3>
                          <p className="patentCenter">
                            Developed at: {patent[9]}
                          </p>
                          <p className="patentDescription">
                            {patent[3].replace(/<[^>]*>/g, "").slice(0, 120)}
                            {patent[3].replace(/<[^>]*>/g, "").length > 120
                              ? "..."
                              : ""}
                          </p>
                        </div>
                        <div className="patentCardActions">
                          <button
                            className="removeButton"
                            onClick={() => removePatent(patent[1])}
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <div className="emptyStash">
                    <p>
                      Your stash is empty. Browse patents and add them to your
                      stash.
                    </p>
                  </div>
                </Grid>
              )}
            </Grid>
          </main>
        </div>
      </div>
      {showSaveNotification && (
        <div className="stashedNotification">Patents Saved!</div>
      )}
    </div>
  );
};

export default Stash;
