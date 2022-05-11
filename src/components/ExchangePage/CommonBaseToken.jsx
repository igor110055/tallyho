const CommonBaseToken = ({ icon, name, onClick }) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-white p-2 transition-colors duration-200 hover:bg-[#f2f6fc]"
      onClick={onClick}
    >
      <img src={icon} alt={name} className="h-6 w-6 rounded-full shadow-md" />
      <span className="text-sm font-semibold uppercase text-primary-darkText">
        {name}
      </span>
    </div>
  );
};

export default CommonBaseToken;
