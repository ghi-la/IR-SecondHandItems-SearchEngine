import { toggleIsSearching } from '@/store/actions';
import { Button, TextField } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Filters from './Filters';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const oldQuery = searchParams.get('query');
  const [query, setQuery] = useState(oldQuery || '');
  const [showFilters, setShowFilters] = useState(false);

  function handleSearch() {
    // if already on the results page, just update the query
    dispatch(toggleIsSearching());
    router.push(`/results?query=${query}`);
    // router.push(`/results?query=${query}`);
  }

  // function toggleFilters() {
  //   setShowFilters(!showFilters);
  //   dispatch(setUseFilters(!showFilters));
  // }

  // useEffect(() => {
  //   setShowFilters(false);
  //   console.log('useEffect');
  //   dispatch(setUseFilters(false));
  // }, []);
  return (
    <>
      <h1>Search</h1>
      <TextField
        label="Search"
        value={query}
        variant="outlined"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button onClick={handleSearch}>Search</Button>
      <Filters />
    </>
  );
};

export default Search;
