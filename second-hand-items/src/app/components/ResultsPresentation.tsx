'use client';

import { Document, ParsedCluster } from '@/store/models';
import { Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPresentation from './DocumentPresentation';

const ITEMS_PER_PAGE = 10;

const ResultsPresentation = () => {
  const dispatch = useDispatch();
  const clusters: ParsedCluster[] = useSelector(
    (state: any) => state.documents.resultDocuments
  );

  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);
  const [sortOption, setSortOption] = useState('priceAsc');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setPage(0); // Reset to the first page
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber - 1);
  };

  const sortDocuments = (documents: Document[]) => {
    switch (sortOption) {
      case 'priceAsc':
        return documents.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return documents.sort((a, b) => b.price - a.price);
      case 'alphaAsc':
        return documents.sort((a, b) => a.title.localeCompare(b.title));
      case 'alphaDesc':
        return documents.sort((a, b) => b.title.localeCompare(a.title));
      case 'auction':
        // boolean sorting by isAuction
        return documents.sort((a, b) => (a.isAuction ? -1 : 1));
      case 'buyNow':
        // boolean sorting by isAuction
        return documents.sort((a, b) => (a.isAuction ? 1 : -1));
      default:
        return documents;
    }
  };

  const allDocuments = sortDocuments(
    clusters.flatMap((cluster) => cluster.documents)
  );

  const categories = clusters.reduce((acc: any, cluster: ParsedCluster) => {
    if (!acc[cluster.label]) {
      acc[cluster.label] = [];
    }
    acc[cluster.label].push(...cluster.documents);
    return acc;
  }, {});

  const sortedCategoryKeys = Object.keys(categories).sort(
    (a, b) => categories[b].length - categories[a].length
  );

  const totalPages =
    value === 0
      ? Math.ceil(allDocuments.length / ITEMS_PER_PAGE)
      : sortedCategoryKeys.length > 0 &&
        categories[sortedCategoryKeys[value - 1]]
      ? Math.ceil(
          categories[sortedCategoryKeys[value - 1]].length / ITEMS_PER_PAGE
        )
      : 0;

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab key="all" label={`All (${allDocuments.length})`} />
          {sortedCategoryKeys.map((category, index) => (
            <Tab
              key={category}
              label={`${category} (${categories[category].length})`}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
        <Select value={sortOption} onChange={handleSortChange}>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
          <MenuItem value="alphaAsc">Alphabetic: A to Z</MenuItem>
          <MenuItem value="alphaDesc">Alphabetic: Z to A</MenuItem>
          <MenuItem value="auction">Auctions Before</MenuItem>
          <MenuItem value="buyNow">Buy Now before</MenuItem>
        </Select>
      </Box>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ width: '100%', margin: '0 auto' }}
      >
        {value === 0
          ? allDocuments
              .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
              .map((document: Document) => (
                <Grid key={document.docno}>
                  <DocumentPresentation document={document} />
                </Grid>
              ))
          : sortedCategoryKeys.length > 0 &&
            sortDocuments(categories[sortedCategoryKeys[value - 1]])
              .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
              .map((document: Document) => (
                <Grid key={document.docno}>
                  <DocumentPresentation document={document} />
                </Grid>
              ))}
      </Grid>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Stack spacing={2}>
          <Pagination
            variant="outlined"
            color="primary"
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </div>
  );
};

export default ResultsPresentation;
