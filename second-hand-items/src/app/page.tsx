"use client";

import Search from "@/app/components/Search";
import { fetchRetrieveDocuments } from "@/services/documents";
import { ParsedCluster } from "@/store/models";
import { Divider, Typography } from '@mui/material';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filters from "./components/Filters";

export default function Home() {
  const dispatch = useDispatch();

  function setCategoriedByResponse(response: ParsedCluster[]) {
    const categories = response.map((cluster: ParsedCluster) => cluster.label);
    // Sort in alphabetical order
    categories.sort();
    // remove duplicates using sets
    const uniqueCategories = new Set(categories);
    dispatch({ type: "SET_CATEGORIES", payload: Array.from(uniqueCategories) });
  }

  useEffect(() => {
    dispatch({ type: "IS_LOADING" });
    fetchRetrieveDocuments()
      .then((response) => {
        setCategoriedByResponse(response);
      })
      .finally(() => {
        dispatch({ type: "IS_LOADED" });
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h3" style={{ marginBottom: '5px' }}>
        Second-hand items search
      </Typography>
      <Search />
      <Divider style={{ width: '85%', margin: '5px' }} />
      <Filters showCategoryFilter={true} alignRight={false} />
    </div>
  );
}
