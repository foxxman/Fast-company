const SearchStatus = ({ usersNumber }) => {
  const renderPhrase = (number) => {
    const plural = [2, 3, 4];

    let human = "человек";
    if (plural.includes(number % 10)) human = "человекa";
    if (number > 10 && number < 20) human = "человек";

    return number !== 0 ? (
      <h1 className="badge fs-4 bg-primary m-2">
        С тобой хотят встретиться {number} {human}.
      </h1>
    ) : (
      <h1 className="badge fs-4 bg-danger m-2">
        С тобой ещё никто не захотел встретиться.
      </h1>
    );
  };
  return <>{renderPhrase(usersNumber)}</>;
};

export default SearchStatus;
