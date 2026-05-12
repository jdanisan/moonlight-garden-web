import { useState } from "react";
import HeroSearch from "../organism/HeroSearch";
import { ProductList } from "../organism/ProductList";
import { Filters } from "../organism/Filters";
import { GoTopBTN } from "../atoms/GoTopBTN";

export default function SearchPage() {
  const [filters, setFilters] = useState({
    search: "",
    typeProduct: "",
    atentionLvl: { min: 1, max: 10 },
    maxDuration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      typeProduct: "",
      atentionLvl: { min: 1, max: 10 },
      maxDuration: "",
    });
  };

  return (
    <>
      <HeroSearch 
        filters={filters} 
        onSearchChange={handleSearchChange} 
        handleChange={handleChange}
        classname="mt-10"
      />
      
      

      <ProductList filters={filters} />
      <GoTopBTN />
    </>
  );
}