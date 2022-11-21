import Link from "next/link";
import clsx from "clsx";

import { BsTwitter, BsGithub } from "react-icons/bs";
import { FaPenSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function SocialLinkMobile({ className, icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon
        className={clsx(
          className,
          "h-5 w-5 fill-gray-400 transition"
        )}
      />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="container mx-auto p-6 sticky top-[100vh] border-t-2 border-orange-300 md:flex md:items-center md:justify-between md:py-10 space-y-6 md:space-y-0">
      <span className="text-sm md:text-base text-gray-500 flex justify-center tracking-widest">
        © 2022 Made with 🧡 by Rittik Basu.
      </span>
      <div className="md:flex hidden flex-wrap items-center mt-3 text-sm text-gray-500 md:text-base justify-center">
        <Link
          href="https://twitter.com/_rittik"
          className="mr-4 md:hover:text-orange-500 md:mr-6 "
        >
          Twitter
        </Link>
        <Link
          href="https://github.com/rittikbasu"
          className="mr-4 md:hover:text-orange-500 md:mr-6"
        >
          GitHub
        </Link>
        <Link
          href="https://www.rittikbasu.tech/blog"
          className="mr-4 md:hover:text-orange-500 md:mr-6"
        >
          Blog
        </Link>
        <Link
          href="mailto:contact@rittikbasu.tech"
          className="md:hover:text-orange-500"
        >
          Email
        </Link>
      </div>
      <div className="flex gap-x-16 md:hidden justify-center items-center">
        <SocialLinkMobile
          href="https://twitter.com/_rittik"
          aria-label="Follow on Twitter"
          icon={BsTwitter}
        />
        <SocialLinkMobile
          href="https://github.com/rittikbasu"
          aria-label="Follow on GitHub"
          icon={BsGithub}
        />
        <SocialLinkMobile
          href="https://www.rittikbasu.tech/blog"
          aria-label="Check out my blog"
          icon={FaPenSquare}
        />
        <SocialLinkMobile
          className="h-6 w-6"
          href="mailto:contact@rittikbasu.tech"
          icon={MdEmail}
        />
      </div>
    </footer>
  );
}
