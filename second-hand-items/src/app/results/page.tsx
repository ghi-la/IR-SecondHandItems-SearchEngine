"use client";

import { fetchRetrieveDocuments, searchItems } from "@/services/documents";
import { isLoaded, isLoading, setResultDocuments } from "@/store/actions";
import { Filter, ParsedCluster } from "@/store/models";
import { filterDocuments } from "@/utils/documentsUtils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../components/Filters";
import ResultsPresentation from "../components/ResultsPresentation";
import Search from "../components/Search";

const Results = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // Access the query parameter
  const documents = useSelector((state: any) => state.documents);
  const filters: Filter = useSelector((state: any) => state.filter);

  const [resultNumber, setResultNumber] = useState(0);

  function setCategoriedByResponse(response: ParsedCluster[]) {
    const categories = response.map((cluster: ParsedCluster) => cluster.label);
    // Sort in alphabetical order
    categories.sort();
    // remove duplicates using sets
    const uniqueCategories = new Set(categories);
    dispatch({ type: "SET_CATEGORIES", payload: Array.from(uniqueCategories) });
  }

  function elaborateResponse(response: any) {
    setCategoriedByResponse(response);
    setResultNumber(
      response.reduce(
        (acc: any, cluster: { documents: string | any[] }) =>
          acc + cluster.documents.length,
        0
      )
    );
    const filteredDocuments = filterDocuments(response, filters);
    dispatch(setResultDocuments(filteredDocuments));
  }

  useEffect(() => {
    dispatch(isLoading());

    if (query) {
      searchItems(query)
        .then((response) => {
          elaborateResponse(response);
        })
        .catch((error) => {
          console.error("Error searching items:", error);
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    } else {
      fetchRetrieveDocuments()
        .then((response) => {
          elaborateResponse(response);
        })
        .catch((error) => {
          console.error("Error searching items:", error);
        })
        .finally(() => {
          dispatch(isLoaded());
        });
    }
  }, [query, documents.isSearching]);

  return (
    <>
      <h1>
        Second Hand <i>{query}(s)</i>
      </h1>
      <Search />
      <Filters showCategoryFilter={false} alignRight={true} />

      {resultNumber > 0 ? (
        <ResultsPresentation />
      ) : (
        <div>No results found for your Query "{query}"</div>
      )}
    </>
  );
};

export default Results;
