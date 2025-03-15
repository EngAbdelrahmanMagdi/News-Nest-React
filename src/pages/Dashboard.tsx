import { useEffect, useState } from "react";
import { getUser, logout } from "../services/authService";
import { fetchArticles } from "../services/articleService";
import { useNavigate } from "react-router-dom";
import "./spinner.css";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        setUser(userData);

        // Fetch articles based on user preferences
        const articlesData = await fetchArticles();
        setArticles(articlesData);
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <h2>Welcome, {user?.name}</h2>
          <p>Email: {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>

          <h3>Articles</h3>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
