import { useState, Fragment } from "react";
import Link from "next/link";
import Moment from "react-moment";

export default function Table(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [userdata, setUserdata] = useState(data.data);
  const itemCount = userdata.length;
  const currentItems = userdata.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
      setUserdata(filteredData);
    }, 200);
  }

  function getYC(string) {
    const regex = /\((YC\s\S+)\)/;
    const match = string.match(regex);
    if (match) {
      return match[0]
        .replace("(", "")
        .replace(")", "")
        .replace("YC", "");
    } else {
      return "";
    }
  }
  function getTitle(string) {
    return string.replace(/\(YC\s\S+/, "");
  }
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight text-orange-400  tracking-widest md:tracking-wider">
            YC <span className="text-zinc-300">Job Client</span>
          </h2>
          <div className="rounded-xl bg-gradient-to-r p-1 from-orange-400 via-red-400 to-orange-300 hidden md:flex">
            <h2 className="text-xl bg-white p-2 rounded-lg font-semibold leading-tight text-zinc-400/80 tracking-widest md:tracking-wider">
              Making your job search easier
            </h2>
          </div>
        </div>
        <div className="mt-12 mb-4 md:mt-16 md:mb-8 flex flex-row md:justify-between justify-center">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                onChange={handleItemCount}
                className="h-full rounded-l md:rounded border block appearance-none w-full bg-grey-100 border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none"
              >
                <option value="10">Show 10</option>
                <option value="20">Show 20</option>
                <option value="50">Show 50</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              placeholder="Search"
              onChange={handleSearch}
              className="appearance-none rounded-r md:rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-orange-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Posted By
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-orange-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-orange-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-orange-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    YC
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-orange-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length !== 0 &&
                  currentItems.map((user) => (
                    <tr key={user.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell text-center underline">
                        <Link
                          href={`https://news.ycombinator.com/user?id=${user.by}`}
                          className="text-gray-900 whitespace-no-wrap"
                        >
                          {user.by}
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm md:text-center md:table-cell hidden">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {getTitle(user.title)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm md:text-center decoration-orange-500 md:hidden">
                        <Link
                          href={user.url}
                          className="text-gray-900 whitespace-no-wrap underline"
                        >
                          {getTitle(user.title)}
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <Moment fromNow unix>
                            {user.time}
                          </Moment>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  hidden md:table-cell text-center">
                        {getYC(user.title) && (
                          <span className="relative inline-block px-3 py-1 font-semibold text-orange-600 leading-tight whitespace-no-wrap">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {getYC(user.title)}
                            </span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell text-center">
                        <Link
                          href={user.url}
                          className="text-gray-900 flex justify-center md:hover:text-orange-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-box-arrow-up-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                            />
                          </svg>
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
                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
              >
                Prev
              </button>
              <button
                onClick={nextPage}
                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-2xl text-gray-500">
          No Data Found
        </div>
      )}
    </Fragment>
  );
}
