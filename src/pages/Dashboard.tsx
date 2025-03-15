import { useEffect, useState } from "react";
import { getUser } from "../services/authService";
import { fetchCategories, fetchArticles, fetchAuthors, fetchSources } from "../services/articleService";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserInfo from "../components/UserInfo";
import Filters from "../components/Filters";
import ArticlesList from "../components/ArticlesList";
import ArticleModal from "../components/ArticleModal";
import NewsNestTitle from "../components/NewsNestTitle";
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
    getUser().then(setUser).catch(() => navigate("/login"));
    Promise.all([fetchArticles(), fetchCategories(), fetchSources(), fetchAuthors()])
      .then(([a, c, s, au]) => {
        setArticles(a);
        setFilteredArticles(a);
        setCategories(c);
        setSources(s);
        setAuthors(au);
      })
      .finally(() => setIsLoading(false));
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

  return isLoading ? <Spinner /> : (
    <div className="container mt-4">
      <UserInfo user={user} />
      <NewsNestTitle />
      <Filters {...{ searchTerm, setSearchTerm, categories, setSelectedCategory, sources, setSelectedSource, authors, setSelectedAuthor, setSelectedDate }} />
      <ArticlesList articles={filteredArticles} setModalArticle={setModalArticle} />
      {modalArticle && <ArticleModal modalArticle={modalArticle} setModalArticle={setModalArticle} />}
    </div>
  );
};

export default Dashboard;
