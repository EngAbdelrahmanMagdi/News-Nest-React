import { Card, Button } from "react-bootstrap";

const ArticleCard = ({ article, setModalArticle }: any) => (
  <div className="col-md-4 mb-4">
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
          {article.summary.length > 100 ? article.summary.substring(0, 100) + "..." : article.summary}
        </Card.Text>
        <Button variant="primary" onClick={() => setModalArticle(article)}>Show More</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Published at: {article.published_at}</small>
      </Card.Footer>
    </Card>
  </div>
);

export default ArticleCard;
