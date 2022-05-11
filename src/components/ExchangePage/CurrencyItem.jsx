const CurrencyItem = ({ icon, name, onClick }) => {
  return (
    <div
      className="my-4 flex cursor-pointer items-center space-x-6"
      onClick={onClick}
    >
      <img src={icon} alt={name} className="h-6 w-6 rounded-full" />
      <span className="text-sm font-semibold uppercase leading-6 text-primary-darkText">
        {name}
      </span>
    </div>
  );
};

export default CurrencyItem;
