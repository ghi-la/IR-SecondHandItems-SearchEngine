# SecondHand Items Search Engine

## An Information Retrieval Project

**Authors**: Ghilardini Matteo & Toscano Sasha

**Files**: All project files are publicly available in our repository: [https://github.com/ghi-la/IR-SecondHandItems-SearchEngine](https://github.com/ghi-la/IR-SecondHandItems-SearchEngine)

---

## How to Run

### Setting Up Scrapy

1. Create and activate a Python virtual environment:

```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install scrapy
```

2. Run a spider:

```bash
   cd crawler/secondhand_scraper/spiders 
   scrapy crawl spiderName
```

---

## Technologies

### Backend

- **Python**: Core programming language.
- **FastAPI**: For building RESTful APIs.
- **PyTerrier**: Responsible for indexing and retrieval processes.
- **Scrapy**: Used for web scraping.

### Frontend

- **React** and **TypeScript**: Framework and language for the user interface.
- **MaterialUI**: Provides styled React components to improve design and usability.

---

## Steps

### Design

**To Do**:

- Include a diagram or mockup to illustrate the application's design and functionality.
- Provide details about the backend design:
  - How indexing is handled using **PyTerrier**.
  - How data is stored, structured, and retrieved.
- Document the communication between backend and frontend:
  - Provide REST API endpoint descriptions for better clarity.

---

### Crawler (Scrapy)

We use **Scrapy** to implement a web scraper that collects data from [secondhand.org.uk](https://www.secondhand.org.uk). The scraper has been successfully implemented and tested.

#### Current Functionality

1. Extracts all unique category links from the website.
2. Visits each category page and retrieves:
   - The name of the article.
   - Its price.
   - A link to its image.

#### Output Format

The data is saved in JSON format (`output.json`) with the following structure:

 ``` json
[{
    "category": "Name of the category", 
    "items": 
        [{
            "title": "name of the item", 
            "price": "price of the item", 
            "image": "link to the image"
        }, {
            "title": "name of the item", 
            "price": "price of the item", 
            "image": "link to the image"
        }, 
        {...}]},
{
    "category": "Name of the category", 
    "items":[...]
}]
 ```

### Search Engine Implementation

**To Do**:

- Provide a detailed explanation of how the search engine is built:
  - The integration of **PyTerrier** for indexing.
  - Steps for processing queries and ranking results.
- Explain how data is passed to the frontend for display.
- Document REST API endpoints for searching and retrieving results.

---

### Search Interface Implementation

**To Do**:

- Document the implementation of the **React** and **TypeScript** frontend.
- Highlight key design choices and features implemented using **MaterialUI**.

---

### Evaluation

**To Do**:

- Define the methods used for evaluating the system.
- Highlight the factors influencing system performance.
- Specify the metrics and criteria for evaluating search engine quality.
