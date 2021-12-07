const Quality = ({ quality }) => {
  return (
    <span className={`badge bg-${quality.color} m-1`}>{quality.name}</span>
  );
};

export default Quality;
