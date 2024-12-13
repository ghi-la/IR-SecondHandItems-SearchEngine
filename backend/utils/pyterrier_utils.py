import json
import os

import pandas as pd
import pyterrier as pt

# Define the file path for the JSONL file
FILE_PATH = "../data/output.jsonl"  # Adjust this path if needed
INDEX_PATH = "../data/index"


def load_jsonl(file_path):
    """
    Load a JSONL file into a pandas DataFrame.
    Each line in the JSONL file should be a valid JSON object.
    """
    data = []
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for idx, line in enumerate(file):
                # Add ID to the JSON object
                json_obj = json.loads(line)
                json_obj['id'] = idx
                data.append(json_obj)

    except Exception as e:
        print(f"Error loading JSONL file: {e}")
        return pd.DataFrame()

    return pd.DataFrame(data)


def create_index(dataframe, index_path):
    """
    Create an index using PyTerrier from a pandas DataFrame.
    The DataFrame must have at least 'id' and 'text' columns.
    """
    if 'id' not in dataframe.columns or 'text' not in dataframe.columns:
        raise ValueError("The DataFrame must contain 'id' and 'text' columns.")

    # Rename columns to PyTerrier's expected format
    dataframe = dataframe.rename(columns={"id": "docno", "text": "text"})

    # Initialize the indexer
    indexer = pt.IterDictIndexer(index_path)

    # Index the documents
    index_ref = indexer.index(dataframe.to_dict(orient="records"))
    print(f"Index created at: {index_path}")
    return index_ref
