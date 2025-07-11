import React, { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "./NavBar";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Star, Link as LinkIcon, Tag, Save, X, Plus } from "lucide-react";
import "./Notes.css";

const Notes = () => {
  const [note, setNote] = useState("");
  const [urls, setUrls] = useState([{ id: 1, url: "" }]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");
  const patentId = searchParams.get("patentId");
  const [patent, setPatent] = useState(null);

  async function fetchSinglePatent(accountId, patentId) { //pull single patent to be edited
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

  useEffect(() => { //fetches patent on load
    fetchSinglePatent(accountId, patentId).then((patent) => {
      if (patent) {
        setPatent(patent);

        if (patent.notes) setNote(patent.notes);
        if (Array.isArray(patent.urls)) {
          setUrls(patent.urls.map((url, index) => ({ id: index + 1, url })));
        }
        if (Array.isArray(patent.tags)) {
          setTags(patent.tags);
        }
      }
    });
  }, []);

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

  //everything below is used for adding stuff to the notes
  const addUrlField = () => {
    const newId =
      urls.length > 0 ? Math.max(...urls.map((url) => url.id)) + 1 : 1;
    setUrls([...urls, { id: newId, url: "" }]);
  };

  const updateUrl = (id, newUrl) => {
    setUrls(
      urls.map((urlItem) =>
        urlItem.id === id ? { ...urlItem, url: newUrl } : urlItem
      )
    );
  };

  const removeUrl = (id) => {
    setUrls(urls.filter((url) => url.id !== id));
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };
//this runs when save button is clicked to put the notes to database
  const saveNotes = async () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    console.log({ note, urls, tags });

    const payload = {
      notes: note,
      urls: urls.map((u) => u.url),
      tags: tags,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/handlePatents/${accountId}/${patentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("Update response:", result);
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  return (
    <div className="notesPage">
      <nav>
        <Navbar />
      </nav>
      <div className="notesContainer">
        <img
          className="circleMoonNotes"
          src="../src/assets/CircleMoon.png"
          alt="Circle Moon"
        />
        <div className="starsBackground">
          <div className="starsContainer">{starsBackground}</div>
        </div>

        <div className="nebula nebulaRed"></div>
        <div className="nebula nebulaOrange"></div>

        <div className="notesContent">
          <header className="notesHeader">
            <h1 className="notesTitle">Patent Notes</h1>
            <button className="saveButton" onClick={saveNotes}>
              <Save size={18} />
              <span>{isSaved ? "Saved!" : "Save"}</span>
            </button>
          </header>

          {patent ? (
            <img
              className="patentImageEditnotes"
              src={patent.data[10]}
              alt="Patent"
            />
          ) : (
            <div className="patentImageContainer">
              <div className="patentImagePlaceholder">
                Patent Image Not Available
              </div>
            </div>
          )}

          <div className="notesSection">
            <h2 className="sectionTitle">
              <Star className="sectionIcon" size={20} />
              Your Notes
            </h2>
            <textarea
              className="notesTextarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your notes about this patent..."
            />
          </div>

          <div className="urlsSection">
            <h2 className="sectionTitle">
              <LinkIcon className="sectionIcon" size={20} />
              Research Links
            </h2>
            <div className="urlsList">
              {urls.map((urlItem) => (
                <div key={urlItem.id} className="urlItem">
                  <input
                    type="text"
                    className="urlInput"
                    placeholder="Add a URL to a research paper or related website"
                    value={urlItem.url}
                    onChange={(e) => updateUrl(urlItem.id, e.target.value)}
                  />
                  <button
                    className="removeButton"
                    onClick={() => removeUrl(urlItem.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button className="addButton" onClick={addUrlField}>
                <Plus size={16} />
                <span>Add Another URL</span>
              </button>
            </div>
          </div>

          <div className="tagsSection">
            <h2 className="sectionTitle">
              <Tag className="sectionIcon" size={20} />
              Tags
            </h2>
            <div className="tagsContainer">
              <div className="tagsInput">
                <input
                  type="text"
                  className="tagInput"
                  placeholder="Add tags to categorize this patent"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                />
                <button className="addTagButton" onClick={addTag}>
                  <Plus size={16} />
                </button>
              </div>
              <div className="tagsList">
                {tags.map((tag, index) => (
                  <div key={index} className="tagItem">
                    <span>{tag}</span>
                    <button
                      className="removeTagButton"
                      onClick={() => removeTag(tag)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
