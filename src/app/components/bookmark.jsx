const Bookmark = ({ id, handleBookmark, bookmark }) => {
  return (
    <button
      onClick={() => handleBookmark(id)}
      className="btn btn-success d-block m-auto"
    >
      <i className={`bi bi-bookmark${bookmark ? "-fill" : ""}`}></i>
    </button>
  );
};

export default Bookmark;
