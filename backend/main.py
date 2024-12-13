from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
import pyterrier as pt
from utils.pyterrier_utils import Indexer

if not pt.started():
    pt.init()

DATA_PATH = "../data/output.jsonl"
INDEX_PATH = "../data/index"
MAX_DOCUMENTS = 1000

index = None
index_ref = None
documents = None
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global index_ref, documents, model, index
    indexer = Indexer(INDEX_PATH)

    # Load the dataset
    print("Loading dataset...")
    documents = indexer.load_dataset(DATA_PATH)

    # Create the index
    print("Creating index...")
    index_ref = indexer.create_index(documents, overwrite=True)

    # Confirm index creation
    print(f"Index created at {index_ref}")

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

@app.get("/dataset")
def dataset():
    # Load the indexed dataset without any processing
    global index_ref, model
    result = model.search(query="")
    result_json = result.to_dict(orient="records")  # Convert DataFrame to list of dictionaries
    return ORJSONResponse(result_json)
