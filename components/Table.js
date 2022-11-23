import { useState, Fragment } from "react";
import Link from "next/link";
import Moment from "react-moment";
import clsx from "clsx";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";

export default function Table(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [jobData, setJobData] = useState(data.data);
  const itemCount = jobData.length;
  const currentItems = jobData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const fields = ["posted by", "title", "time", "batch", "link"];

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function for previous and next buttons
  const nextPage = () => {
    if (currentPage < Math.ceil(itemCount / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function handleItemCount(e) {
    setCurrentPage(1);
    setItemsPerPage(e.target.value);
  }
  function handleSearch(e) {
    // debouncing the search
    setTimeout(() => {
      const keyword = e.target.value.toLowerCase();
      const filteredData = data.data.filter((item) => {
        return item.title.toLowerCase().includes(keyword);
      });
      setCurrentPage(1);
      setJobData(filteredData);
    }, 200);
  }
  return (
    <div className="container mx-auto px-4 sm:px-8 mb-10">
      <div className="py-4">
        <div className="flex justify-center md:justify-between items-center">
          <h2 className="text-3xl font-semibold leading-tight text-orange-400  tracking-widest md:tracking-wider">
            YC <span className="text-zinc-300">Job Board</span>
          </h2>
          <h2 className="text-3xl bg-white p-2 rounded-lg font-semibold leading-tight animate-gradient bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300 bg-clip-text text-transparent tracking-widest md:tracking-wider hidden md:flex">
            Making your job search easier
          </h2>
        </div>
        <div className="mt-12 mb-4 md:mt-16 md:mb-8 flex flex-row md:justify-between justify-center">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                onChange={handleItemCount}
                className="h-full rounded-l md:rounded border block appearance-none w-full bg-grey-100 border-gray-300 text-gray-600 py-2 px-4 pr-8 leading-tight focus:outline-none"
              >
                <option value="10">Show 10</option>
                <option value="20">Show 20</option>
                <option value="50">Show 50</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <HiChevronDown />
              </div>
            </div>
          </div>
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <HiSearch className="stroke-1 stroke-slate-300" />
            </span>
            <input
              placeholder="Search"
              onChange={handleSearch}
              className="appearance-none rounded-r md:rounded border-y border-r md:border-x border-gray-300 block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <TableHead fields={fields} />
              <tbody>
                {currentItems.length !== 0 &&
                  currentItems.map((job) => (
                    <tr key={job.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell text-center underline md:hover:decoration-orange-500">
                        <Link
                          href={`https://news.ycombinator.com/user?id=${job.by}`}
                          className="text-gray-900 whitespace-no-wrap"
                        >
                          {job.by}
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm md:text-center md:table-cell hidden">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {job.title}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm md:text-center decoration-blue-500 md:hidden">
                        <Link
                          href={job.url}
                          className="text-gray-900 whitespace-no-wrap underline"
                        >
                          {job.title}
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <Moment fromNow unix>
                            {job.time}
                          </Moment>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  hidden md:table-cell text-center">
                        {job.title && (
                          <span className="relative inline-block px-3 py-1 font-semibold text-orange-600 leading-tight whitespace-no-wrap">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {job.batch}
                            </span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell text-center">
                        <Link
                          href={job.url}
                          className="text-gray-900 flex justify-center"
                        >
                          <FiExternalLink className="stroke-2 stroke-slate-500 h-5 w-5 md:hover:stroke-orange-500" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Navigation
          itemCount={itemCount}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
}

function Navigation({
  itemCount,
  indexOfFirstItem,
  indexOfLastItem,
  currentPage,
  prevPage,
  nextPage,
}) {
  return (
    <Fragment>
      {itemCount != 0 ? (
        <div className="px-5 gap-y-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing {indexOfFirstItem + 1} to{" "}
            {itemCount % 10 === 0
              ? indexOfLastItem
              : itemCount < currentPage * 10
              ? itemCount
              : indexOfLastItem}{" "}
            of {itemCount} Entries
          </span>
          {itemCount > 10 && (
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={prevPage}
                className="text-sm bg-gray-200 md:hover:bg-gray-300 text-gray-800 font-semibold py-2 px-8 rounded-l"
              >
                Prev
              </button>
              <button
                onClick={nextPage}
                className="text-sm border-l border-orange-300 bg-gray-200 md:hover:bg-gray-300 text-gray-800 font-semibold py-2 px-8 rounded-r"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-2xl text-gray-500">
          No Jobs Found
        </div>
      )}
    </Fragment>
  );
}

function TableHead({ fields }) {
  const className =
    "px-5 py-3 border-b-2 border-gray-200 bg-orange-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider";
  return (
    <thead>
      <tr>
        {fields.map((field, index) => (
          <th
            key={field}
            className={
              field === "title" || field === "time"
                ? className
                : clsx(className, "hidden md:table-cell")
            }
          >
            {field}
          </th>
        ))}
      </tr>
    </thead>
  );
}
