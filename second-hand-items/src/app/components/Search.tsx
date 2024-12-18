import { toggleIsSearching } from "@/store/actions";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const oldQuery = searchParams.get('query');
  const [query, setQuery] = useState(oldQuery || '');

  function handleSearch() {
    dispatch(toggleIsSearching());
    router.push(`/results?query=${query}`);
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
        width: 'calc(90% - 20px)',
        // maxWidth: '100%',
        justifyContent: 'space-around',
      }}
    >
      <TextField
        label="Search"
        style={{ width: '100%' }}
        value={query}
        variant="outlined"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleSearch}
                  style={{ height: '56px', borderRadius: '100px' }}
                >
                  <SearchIcon />
                </Button>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default Search;
