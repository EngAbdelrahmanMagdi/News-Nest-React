import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchSources, fetchAuthors, saveUserPreferences } from "./../services/articleService";
import { PreferenceItem } from "../types/types";

const PreferencesForm = () => {
  const [categories, setCategories] = useState<PreferenceItem[]>([]);
  const [sources, setSources] = useState<PreferenceItem[]>([]);
  const [authors, setAuthors] = useState<PreferenceItem[]>([]);
  
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSources, setSelectedSources] = useState<number[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchSources().then(setSources);
    fetchAuthors().then(setAuthors);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelection = (id: number, type: "categories" | "sources" | "authors") => {
    let setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    let selected: number[];

    switch (type) {
      case "categories":
        setSelected = setSelectedCategories;
        selected = selectedCategories;
        break;
      case "sources":
        setSelected = setSelectedSources;
        selected = selectedSources;
        break;
      case "authors":
        setSelected = setSelectedAuthors;
        selected = selectedAuthors;
        break;
      default:
        return;
    }
    
    setSelected(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveUserPreferences({
        categories: selectedCategories,
        sources: selectedSources,
        authors: selectedAuthors,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Failed to save preferences.");
    }
    setLoading(false);
  };

  const formatSelectedItems = (items: number[], allItems: PreferenceItem[], type: string) => {
    if (items.length) {
      return allItems.filter(i => items.includes(i.id)).map(i => i.name).join(", ");
    }

    switch (type) {
      case "categories":
        return "Choose your preferred categories";
      case "sources":
        return "Choose your preferred sources";
      case "authors":
        return "Choose your preferred authors";
      default:
        return "Choose your preferences";
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <h2 className="text-center">Preferences</h2>
        <form onSubmit={handleSubmit}>
          {/* Dropdowns */}
          <div ref={dropdownRef}>
            {["categories", "sources", "authors"].map((type) => (
              <div key={type} className="dropdown mb-3 w-100 w-md-50">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle w-100 text-truncate"
                  style={{ maxWidth: "100%" }}
                  onClick={() => toggleDropdown(type)}
                >
                  {formatSelectedItems(
                    type === "categories" ? selectedCategories :
                    type === "sources" ? selectedSources : selectedAuthors,
                    type === "categories" ? categories :
                    type === "sources" ? sources : authors,
                    type
                  )}
                </button>
                <ul
                  className={`dropdown-menu w-100 ${openDropdown === type ? "show" : ""}`}
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {(type === "categories" ? categories :
                    type === "sources" ? sources : authors).map((item) => (
                    <li key={item.id} className="dropdown-item">
                      <label className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          checked={
                            (type === "categories" ? selectedCategories :
                            type === "sources" ? selectedSources : selectedAuthors).includes(item.id)
                          }
                          onChange={() => toggleSelection(item.id, type as any)}
                        />
                        <span className="ms-2">{item.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100 w-md-50 mt-3" disabled={loading}>
            {loading ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreferencesForm;
