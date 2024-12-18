import { toggleIsSearching } from "@/store/actions";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const oldQuery = searchParams.get("query");
  const [query, setQuery] = useState(oldQuery || "");

  function handleSearch() {
    dispatch(toggleIsSearching());
    router.push(`/results?query=${query}`);
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <TextField
        label="Search"
        style={{ width: "100%" }}
        value={query}
        variant="outlined"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Button onClick={handleSearch} style={{ height: "56px" }}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
