import { useEffect, useState } from "react";
import { getUser, logout } from "../services/authService";
import { fetchCategories, fetchArticles, fetchAuthors, fetchSources } from "../services/articleService";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Card, Form } from "react-bootstrap";
import "./spinner.css";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [modalArticle, setModalArticle] = useState<any>(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        setUser(userData);

        // Fetch articles based on user preferences
      const articlesData = await fetchArticles();
      const categoriesData = await fetchCategories();
      const sourcesData = await fetchSources();
      const authorsData = await fetchAuthors();

      setArticles(articlesData);
      setFilteredArticles(articlesData);
      setCategories(categoriesData);
      setSources(sourcesData);
      setAuthors(authorsData);
      
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle filtering
  useEffect(() => {
    let filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter(
        (article) => article.category.name === selectedCategory
      );
    }

    if (selectedSource) {
      filtered = filtered.filter(
        (article) => article.source.name === selectedSource
      );
    }

    if (selectedAuthor) {
      filtered = filtered.filter(
        (article) => article.author.name === selectedAuthor
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (article) => article.published_at.split(" ")[0] === selectedDate
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, selectedSource, selectedAuthor, selectedDate, articles]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
      ) : (
        <>
          <h2>Welcome, {user?.name}</h2>
          <p>Email: {user?.email}</p>
          <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>

          <h3>Articles</h3>

          {/* Search and Filters */}
        <div className="row mb-3 g-3 align-items-center">
            <div className="col-md-3">
              <Form.Control
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
            </div>
            
            <div className="col-md-3">
              <select className="form-select" onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Filter by Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select className="form-select" onChange={(e) => setSelectedSource(e.target.value)}>
                <option value="">Filter by Source</option>
                {sources.map((src) => (
                  <option key={src.id} value={src.name}>{src.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select className="form-select" onChange={(e) => setSelectedAuthor(e.target.value)}>
                <option value="">Filter by Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.name}>{author.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <Form.Control
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="row">
            {filteredArticles.map((article) => (
              <div className="col-md-4 mb-4" key={article.id}>
                <Card className="h-100">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <Card.Img
                      variant="top"
                      src={article.image_url || "/NewsNest.jpg"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </a>
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      {article.category.name.charAt(0).toUpperCase() + article.category.name.slice(1)}
                      | {article.author.name} | {article.source.name}
                    </Card.Subtitle>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text style={{ fontSize: "14px" }}>
                      {article.summary.length > 100
                        ? article.summary.substring(0, 100) + "..."
                        : article.summary}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => setModalArticle(article)}
                    >
                      Show More
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Published at: {article.published_at}
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>

          {/* Article Modal */}
          {modalArticle && (
            <Modal show={true} onHide={() => setModalArticle(null)}>
              <Modal.Header closeButton>
                <Modal.Title>{modalArticle.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Category:</strong> {modalArticle.category.name}</p>
                <p><strong>Author:</strong> {modalArticle.author.name}</p>
                <p><strong>Source:</strong> {modalArticle.source.name}</p>
                <p><strong>Published At:</strong> {modalArticle.published_at}</p>
                <p><strong>API Source:</strong> {modalArticle.api_source}</p>
                <p>{modalArticle.summary}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalArticle(null)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
