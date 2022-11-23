export default function Navbar() {
  return (
    <div className="flex justify-center md:justify-between items-center">
      <h2 className="text-3xl font-semibold leading-tight text-orange-400  tracking-widest md:tracking-wider">
        YC <span className="text-zinc-300">Job Board</span>
      </h2>
      <h2 className="text-3xl bg-white p-2 rounded-lg font-semibold leading-tight animate-gradient bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300 bg-clip-text text-transparent tracking-widest md:tracking-wider hidden md:flex">
        Making your job search easier
      </h2>
    </div>
  );
}
