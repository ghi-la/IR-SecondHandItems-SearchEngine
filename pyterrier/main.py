from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
import pyterrier as pt
import pandas as pd
from utils.pyterrier_utils import Indexer

if not pt.started():
    pt.init()

DATA_PATH = "../data/output.jsonl"
INDEX_PATH = "../data/index"
MAX_DOCUMENTS = 1000

index = None
index_ref = None
df = None
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global index_ref, df, model, index
    indexer = Indexer(INDEX_PATH)

    # Load the dataset
    print("Loading dataset...")
    documents = indexer.load_dataset(DATA_PATH)

    # Load documents inside dataframe
    df = pd.DataFrame(documents)

    # Use column "docno" as index
    df.set_index("docno")

    # Count nan / null values
    print(df.dtypes)
    print(df.isnull().sum())

    # Create the index
    print("Creating index...")
    index_ref = indexer.create_index(documents, overwrite=True)

    # Confirm index creation
    print(f"Index created at {index_ref}")
    # Print statistics
    print("Index statistics:")
    print(Indexer.retrieve_index(index_ref).getCollectionStatistics().toString())
    print("Index built successfully!")

    index = pt.IndexFactory.of(index_ref)
    model = pt.BatchRetrieve(index, wmodel="BM25") % MAX_DOCUMENTS

    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan, response_class=ORJSONResponse)

origins = [
    "http://localhost:3000"
]

@app.get("/")
def read_root():
    return {"Message": "Welcome to IR Project backend!"}

@app.get("/health")
def health_check():
    return {"Status": "Healthy"}

@app.get("/api/all")
async def get_all_docs():
    return ORJSONResponse(
        df.to_dict(orient="records"),
    )

# Example URL: http://localhost:8000/api/search?query=iphone&top=10
# The query looks for documents whoose values contain the given string (case-insensitive),
# no filter by field is applied.
@app.get("/api/search")
async def search(query: str, top: int = MAX_DOCUMENTS):
    global df, model
    
    if top > MAX_DOCUMENTS:
        raise ValueError("Top cannot be higher than " + str(MAX_DOCUMENTS))
    
    # Search documents by query
    results = model.search(query)

    # Retrieve the document ids from the results
    ids = results["docno"].tolist()

    # Select only the top results
    top = min(top, len(ids))
    ids = ids[:top]

    # Create a DataFrame for ordering
    order_df = pd.DataFrame({"docno": ids, "order": range(len(ids))})

    # Merge with the original DataFrame
    merged_docs = order_df.merge(df, on="docno").sort_values(by="order")

    # Drop the temporary ordering column and reset index
    ordered_docs = merged_docs.drop(columns=["order"]).reset_index(drop=True)
    
    # Return the documents as JSON
    return ORJSONResponse(
        ordered_docs.to_dict(orient="records"),
    )