import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TextContent() {
  return (
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
  <textarea className="form-control" rows="10"></textarea>
</div>
  );
}

export default TextContent;