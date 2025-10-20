const Profilbar = ({ isActive, setisActive }) => {
  const handleClick = (component) => {
    setisActive(component);
  };

  const getHeadingClassName = (componentName) => {
    return isActive === componentName
      ? "text-[16px] md:text-[17px] lg:text-[18px] font-bold text-[#4880ff] bg-[#e7eeff] rounded-lg text-left w-full cursor-pointer py-3 px-7 md:px-7 md:py-4 lg:px-8 xl:px-10"
      : "text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-black text-left w-full cursor-pointer py-3 px-7 md:px-7 md:py-4 lg:px-8 xl:px-10 ";
  };

  return (
    <div className="w-full flex flex-col bg-white gap-3 py-10 px-5 md:px-6 lg:px-7 xl:px-8 rounded-xl">
      {[
        { label: "Persönliche Daten", key: "personliche" },
        { label: "Versicherungsdaten", key: "versicherungsdaten" },
        { label: "Pflegekasse", key: "pflegekasse" },
        { label: "Kontaktperson vom Kunden", key: "kontaktperson" },
      ].map((value) => (
        <h2
          key={value}
          className={getHeadingClassName(value.key)}
          onClick={() => handleClick(value.key)}
        >
          {value.label}
        </h2>
      ))}
    </div>
  );
};

export default Profilbar;
