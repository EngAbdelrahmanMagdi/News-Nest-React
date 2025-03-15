import ArticleCard from "./ArticleCard";

const ArticlesList = ({ articles, setModalArticle }: any) => (
  <div className="row">
    {articles.map((article: any) => (
      <ArticleCard key={article.id} article={article} setModalArticle={setModalArticle} />
    ))}
  </div>
);

export default ArticlesList;
