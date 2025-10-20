/* eslint-disable react/prop-types */

const Breadcrumb = ({ pageName, children }) => {
  return (
    <div className="mb-6 flex gap-3 items-center md:items-start justify-between ">
      <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white">
        {pageName}
      </h2>
      {children}
    </div>
  );
};

export default Breadcrumb;
