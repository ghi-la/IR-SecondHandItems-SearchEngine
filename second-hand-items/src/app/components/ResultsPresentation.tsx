'use client';

import { Document } from '@/store/models';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPresentation from './DocumentPresentation';

const ResultsPresentation = () => {
  const dispatch = useDispatch();
  const documents: Document[] = useSelector(
    (state: any) => state.documents.resultDocuments
  );

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const categories = documents.reduce((acc: any, doc: Document) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {});

  const categoryKeys = Object.keys(categories);

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
          {categoryKeys.map((category, index) => (
            <Tab
              key={category}
              label={`${category} (${categories[category].length})`}
            />
          ))}
        </Tabs>
      </Box>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ width: '100%', margin: '0 auto' }}
      >
        {categories[categoryKeys[value]]
          .slice(0, 9)
          .map((document: Document) => (
            <Grid key={document.docno}>
              <DocumentPresentation document={document} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ResultsPresentation;
