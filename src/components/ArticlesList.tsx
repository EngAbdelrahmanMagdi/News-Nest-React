import ArticleCard from "./ArticleCard";
import { ArticlesListProps } from "../types/types";

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, setModalArticle }) => (
  <div className="row">
    {articles.map((article) => (
      <ArticleCard key={article.id} article={article} setModalArticle={setModalArticle} />
    ))}
  </div>
);

export default ArticlesList;
