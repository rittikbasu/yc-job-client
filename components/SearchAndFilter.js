import { HiChevronDown, HiSearch } from "react-icons/hi";

export default function SearchAndFilter({
  handleSearch,
  handleItemCount,
}) {
  return (
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
  );
}
