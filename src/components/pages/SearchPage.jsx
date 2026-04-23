import { useContext, useState } from "react";
import { Filters } from "../organism/Filters";
import { Cards } from "../molecules/Cards";
import { GoTopBTN } from "../atoms/GoTopBTN";
import { AppContext } from "../context/AppContext";
import { Button } from "../atoms/Button";

// const initialFilters = {
//   name: "",
//   species: "",
//   status: "",
//   gender: "",
//   order: "",
// };

export default function SearchPage() {
  //   const {
  //     characters,
  //     speciesOptions,
  //     statusOptions,
  //     genderOptions,
  //     loading,
  //     filters,
  //     setFilters,
  //     loadMore,
  //     nextIndex,
  //   } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // const filteredCharacters = (characters || [])
  //   .filter((char) => {
  //     return (
  //       (!filters.name ||
  //         char.name.toLowerCase().includes(filters.name.toLowerCase())) &&
  //       (!filters.species || char.species === filters.species) &&
  //       (!filters.status || char.status === filters.status) &&
  //       (!filters.gender || char.gender === filters.gender)
  //     );
  //   })
  //   .sort((a, b) => {
  //     if (!filters.order) return 0;

  //     if (filters.order === "asc") {
  //       return a.name.localeCompare(b.name);
  //     }

  //     if (filters.order === "desc") {
  //       return b.name.localeCompare(a.name);
  //     }

  //     return 0;
  //   });

  // const resetFilters = () => {
  //   setFilters(initialFilters);
  // };
  // const visibleCharacters = filteredCharacters.slice(0, nextIndex);

  return (
    <>
      <h1 className="flex items-center justify-center font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
        ¿Cuál es tu próximo proyecto de cultivo?
      </h1>

      {/* <Filters
        filterType="characters"
        filters={filters}
        handleChange={handleChange}
        resetFilters={resetFilters}
        options={{
          species: speciesOptions,
          status: statusOptions,
          gender: genderOptions,
          order: [
            { label: "Ascendancy", value: "asc" },
            { label: "Descendant", value: "desc" },
          ],
        }}
      /> */}

      {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] mt-8 gap-2.5 py-2.5 px-5 items-stretch">
        {visibleCharacters.map((char) => (
          <Cards key={char.id} character={char} />
        ))}
      </div>*/}

      {/* {visibleCharacters.length < filteredCharacters.length && ( 
        <div className="w-full flex justify-center ">
          <div className=" flex w-4/5 justify-center items-center flex-row">
         
            <Button
              className={
                "flex justify-center "
              }
              variant="loadMore"
              onClick={""}
              disabled={loading}
              label={loading ? "Loading..." : "Load More"}
            />
          </div>
        </div>
       )} */}

      <GoTopBTN />
    </>
  );
}
