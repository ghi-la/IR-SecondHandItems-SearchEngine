'use client';

import { fetchRetrieveDocuments, searchItems } from '@/services/documents';
import { isLoaded, isLoading, setResultDocuments } from '@/store/actions';
import { Filter } from '@/store/models';
import { filterDocuments } from '@/utils/documentsUtils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResultsPresentation from '../components/ResultsPresentation';

const Results = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); // Access the query parameter
  const documents = useSelector((state: any) => state.documents);
  const filters: Filter = useSelector((state: any) => state.filter);

  const [resultNumber, setResultNumber] = useState(0);

  useEffect(() => {
    dispatch(isLoading());
    console.log(documents.useFilters, filters);

    if (query) {
      // Call the searchItems function from the documents service
      // Set the results state with the response
      searchItems(query)
        .then((response) => {
          console.log(response);
          setResultNumber(
            response.reduce((acc, cluster) => acc + cluster.documents.length, 0)
          );
          const filteredDocuments = filterDocuments(
            response,
            documents.useFilters,
            filters
          );
          dispatch(setResultDocuments(filteredDocuments));
        })
        .catch((error) => {
          console.error('Error searching items:', error);
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    } else {
      fetchRetrieveDocuments()
        .then((response) => {
          console.log(response);
          setResultNumber(
            response.reduce((acc, cluster) => acc + cluster.documents.length, 0)
          );
          const filteredDocuments = filterDocuments(
            response,
            documents.useFilters,
            filters
          );
          dispatch(setResultDocuments(filteredDocuments));
        })
        .catch((error) => {
          console.error('Error searching items:', error);
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    }
  }, [query]);

  return (
    <>
      {/* <div>
        <h1>Query Parameter Page</h1>
        <span>Query: {query}</span>
        <span>Results count: {resultNumber}</span>
      </div> */}

      {resultNumber > 0 ? (
        <ResultsPresentation />
      ) : (
        <div>No results found for your Query "{query}"</div>
      )}
    </>
  );
};

export default Results;
