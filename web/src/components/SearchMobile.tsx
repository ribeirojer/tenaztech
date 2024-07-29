import React, { useRef, useState } from "react";
import Input from "./core/Input";
import { useRouter } from "next/router";
import SearchIcon from "./icons/SearchIcon";

type Props = {};

const SearchMobile = (props: Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchTermRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    if (searchTerm) {
      router.push(`/produtos?search=${searchTerm}`);
    } else {
      searchTermRef.current?.focus();
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchTermRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="relative flex items-center">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-2 my-4 transition-opacity duration-300 ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <Input
          id="searchTerm"
          type="text"
          ref={searchTermRef}
          placeholder="Pesquisar produtos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=""
          name="searchTerm"
        />
      </form>
      <button onClick={toggleSearch} className="absolute top-6 right-2">
        <SearchIcon className={`${isSearchOpen ? 'fill-midnight' : 'fill-glow-tech'} size-8 transition-colors duration-300`} />
      </button>
    </div>
  );
};

export default SearchMobile;
