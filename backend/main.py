from contextlib import asynccontextmanager

from fastapi import FastAPI
from utils.pyterrier_utils import create_index, load_jsonl

DATA_PATH = "../data/output.jsonl"
INDEX_PATH = "../data/index"


@asynccontextmanager
async def lifespan(app: FastAPI):
    dataframe = load_jsonl(DATA_PATH)
    create_index(dataframe, INDEX_PATH)
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)


@app.get("/data")
def read_root():

    dataframe = load_jsonl(DATA_PATH)

    if dataframe.empty:
        return {"message": "No data to display."}

    return {"data": dataframe.to_dict(orient="records")}
