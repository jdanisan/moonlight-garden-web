import { useState } from "react";
import HeroSearch from "../organism/HeroSearch";
import { GoTopBTN } from "../atoms/GoTopBTN";

export default function SearchPage() {

  const [filters, setFilters] = useState({
    search: "",
    typeProduct: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleTypeChange = (value) => {
    setFilters((prev) => ({ ...prev, typeProduct: value }));
  };

  return (
    <>
      <HeroSearch classname="mt-10"/>

      <GoTopBTN />
    </>
  );
}