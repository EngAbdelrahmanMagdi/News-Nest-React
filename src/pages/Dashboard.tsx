import { useEffect, useState } from "react";
import { getUser, logout } from "../services/authService";
import { fetchArticles } from "../services/articleService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);

        // Fetch articles based on user preferences
        const articlesData = await fetchArticles();
        setArticles(articlesData);
      } catch (error) {
        navigate("/login");
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
    </div>
  );
};

export default Dashboard;
