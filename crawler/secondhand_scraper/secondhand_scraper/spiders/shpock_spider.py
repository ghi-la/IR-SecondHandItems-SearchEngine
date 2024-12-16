import scrapy


class ShpockSpider(scrapy.Spider):
    name = "shpock"
    allowed_domains = ["shpock.com"]
    start_urls = ["https://www.shpock.com"]

    custom_settings = {
        "FEEDS": {
            "../../../../data/shpock_output.jsonl": {
                "format": "jsonlines",
                "encoding": "utf8",
                "overwrite": True,
            }
        },
        "DEPTH_LIMIT": None,  # Ensure crawling depth is not restricted
    }

    visited_urls = set()  # Set to track visited URLs and avoid duplicates

    def parse(self, response):
        # Log the current URL being crawled
        self.log(f"Crawling: {response.url}")

        # Add the current URL to visited set
        self.visited_urls.add(response.url)

        # Extract and yield all unique links on the page
        links = response.css("a::attr(href)").extract()
        for link in links:
            # Convert relative links to absolute URLs
            if link.startswith("/"):
                link = response.urljoin(link)

            # Skip links outside the allowed domain or already visited
            if link not in self.visited_urls and self.allowed_domains[
                    0] in link:
                self.visited_urls.add(link)  # Mark the link as visited
                yield scrapy.Request(link, callback=self.parse_category)

    def parse_category(self, response):
        # Extract the subcategory from the page
        subcategory = response.css(
            "ol.Breadcrumb__StyledBreadcrumb-sc-ewdpop-0.dkzlDO li:nth-of-type(2) a::text"
        ).extract_first()

        # Extract the title of the listing
        title = response.css(
            "h1.Heading__Component-sc-7kj2ix-0.llhWSy::text").extract_first()

        # Extract the price
        price = response.css(
            "p.Paragraph__P-sc-1n1h73f-0.gbyolN span.Text-sc-12c3ify-0.dqsfyh::text"
        ).extract_first()

        # Extract the image URI
        imageURI = response.css(
            "div.Gallerystyles__Image-sc-384mm6-4.hMFvFw img::attr(src)"
        ).extract_first()

        # Extract the item URI (this is the current page URL)
        itemURI = response.url

        # Check if all required fields are present before yielding data
        if subcategory and title and price and imageURI and itemURI:
            yield {
                "subcategory": subcategory,
                "title": title,
                "price": price,
                "imageURI": imageURI,
                "itemURI": itemURI,
            }
            # Now, also extract links from the product page and continue crawling
        links = response.css("a::attr(href)").extract()
        for link in links:
            # Convert relative links to absolute URLs
            if link.startswith("/"):
                link = response.urljoin(link)

            # Skip links outside the allowed domain or already visited
            if link not in self.visited_urls and self.allowed_domains[
                    0] in link:
                self.visited_urls.add(link)  # Mark the link as visited
                yield scrapy.Request(link, callback=self.parse)
