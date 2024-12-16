# SecondHand Items Search Engine

## An Information Retrieval Project

**Authors**: Ghilardini Matteo & Toscano Sasha

## How to run

To setup Scrapy:

```bash
python -m venv py_venv
source py_venv/bin/activate
pip install scrapy
```

To run a spider `spiderName` run:

```bash
cd crawler/secondhand_scraper/secondhand_scraper/spiders
scrapy crawl spiderName
```

The output of the scraper will be automatically put in `data` folder in a jsonL file.

## Technologies

### Backend

Our backend relies on a **Python** base using **fastAPI**; indexing is done by **PyTerrier**. To run it use the following commands:

```bash
    # from the root
    cd pyterrier
    pip install -r requirements.txt
    uvicorn main:app --reload
```

This will run the backend by default on port `8000`

### Frontend

As the main core of our frontend, we use **Next.js** together with **React** and **TypeScript**. To enhance the interface, we also use the React components provided by **MaterialUI**. To run it use the following commands:

```bash
    # from the root
    cd second-hand-items
    npm install
    npm run dev
```

This will run the frontend by default on port `3000`

## Steps

### Design
<!-- TODO: Add a picture of the design and the working of the application.
How backend will work (backend itself with PyTerrier), how data are handled, structured, and stored. Show also how frontend and backend will communicate together providing a "documentation-like" fo the RestAPI -->

### Search Engine Implementation
<!-- TODO: how the search engine is actually implemented. Related with the design providing more details related with the implementation; also how the data are provided to the frontend.
<!-- TODO: have a look at scrapy.org
RELATED WITH THE BACKEND -->

### Search Interface Implementation
<!-- TODO: how the frontend is implemented -->

### Evaluation
<!-- TODO: How we perform the userEvaluation, what this influence our system,... -->