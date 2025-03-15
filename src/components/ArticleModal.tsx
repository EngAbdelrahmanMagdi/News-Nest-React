import { Modal, Button } from "react-bootstrap";
import { ArticleModalProps } from "../types/types";

const ArticleModal : React.FC<ArticleModalProps> = ({ modalArticle, setModalArticle }) => (
  <Modal show={!!modalArticle} onHide={() => setModalArticle(null)}>
    <Modal.Header closeButton>
      <Modal.Title>{modalArticle?.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p><strong>Category:</strong> {modalArticle?.category.name}</p>
      <p><strong>Author:</strong> {modalArticle?.author.name}</p>
      <p><strong>Source:</strong> {modalArticle?.source.name}</p>
      <p><strong>Published At:</strong> {modalArticle?.published_at}</p>
      <p><strong>API Source:</strong> {modalArticle?.api_source}</p>
      <p>{modalArticle?.summary}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setModalArticle(null)}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default ArticleModal;
