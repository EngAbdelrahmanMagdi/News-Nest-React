import { Form } from "react-bootstrap";

const Filters = ({
  searchTerm,
  setSearchTerm,
  categories,
  setSelectedCategory,
  sources,
  setSelectedSource,
  authors,
  setSelectedAuthor,
  setSelectedDate
}: any) => (
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
        {categories.map((category: any) => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
    </div>

    <div className="col-md-3">
      <select className="form-select" onChange={(e) => setSelectedSource(e.target.value)}>
        <option value="">Filter by Source</option>
        {sources.map((src: any) => (
          <option key={src.id} value={src.name}>{src.name}</option>
        ))}
      </select>
    </div>

    <div className="col-md-3">
      <select className="form-select" onChange={(e) => setSelectedAuthor(e.target.value)}>
        <option value="">Filter by Author</option>
        {authors.map((author: any) => (
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
);

export default Filters;
