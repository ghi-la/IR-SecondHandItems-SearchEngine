from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
import pyterrier as pt
import pandas as pd
from utils.pyterrier_utils import Indexer
from fastapi.middleware.cors import CORSMiddleware

if not pt.started():
    pt.init()

DATA_PATHS = ["../data/shpock_output.jsonl", "../data/hand2hand_output.jsonl", "../data/secondhand_output.jsonl"]
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
    documents = []
    start_idx = 0
    for path in DATA_PATHS:
        dataset_documents = indexer.load_dataset(path, start_idx=start_idx)
        documents += dataset_documents
        start_idx += len(dataset_documents)

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

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers,
)

@app.get("/")
def read_root():
    return {"message": "Welcome to IR Project backend!"}

@app.get("/health")
def health_check():
    return {"status": "Healthy"}

@app.get("/api/all")
async def get_all_docs():
    global df
    indexer = Indexer(INDEX_PATH)
    documents = df.to_dict(orient="records")
    clusters = indexer.cluster_documents(documents)
    # return ORJSONResponse(
    #     {"documents": documents, "clusters": clusters},
    # )
    return ORJSONResponse(clusters)

@app.get("/api/retrieve")
async def retrieve_top(top: int = MAX_DOCUMENTS):
    global df
    indexer = Indexer(INDEX_PATH)
    documents = df.to_dict(orient="records")

    # Select only the top results
    top = min(top, len(documents))
    documents = documents[:top]

    clusters = indexer.cluster_documents(documents)
    # return ORJSONResponse(
    #     {"documents": documents, "clusters": clusters},
    # )
    return ORJSONResponse(clusters)

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
    
    # Cluster the documents
    indexer = Indexer(INDEX_PATH)
    documents = ordered_docs.to_dict(orient="records")
    clusters = indexer.cluster_documents(documents)
    
    # Return the documents and clusters as JSON
    # return ORJSONResponse(
    #     {"documents": documents, "clusters": clusters},
    # )
    return ORJSONResponse(clusters)

@app.get("/api/cluster")
async def cluster_documents(n_clusters: int = 10):
    global df
    indexer = Indexer(INDEX_PATH)
    documents = df.to_dict(orient="records")
    clusters = indexer.cluster_documents(documents, n_clusters=n_clusters)
    # Convert cluster keys to strings
    clusters = {str(key): value for key, value in clusters.items()}
    return ORJSONResponse(clusters)