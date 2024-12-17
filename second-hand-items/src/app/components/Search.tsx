import { setUseFilters } from "@/store/actions";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Filters from "./Filters";

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  function handleSearch() {
    router.push(`/results?query=${query}`);
  }

  function toggleFilters() {
    setShowFilters(!showFilters);
    dispatch(setUseFilters(!showFilters));
  }

  useEffect(() => {
    setShowFilters(false);
    console.log("useEffect");
    dispatch(setUseFilters(false));
  }, []);
  return (
    <>
      <h1>Search</h1>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <Filters />
    </>
  );
};

export default Search;
