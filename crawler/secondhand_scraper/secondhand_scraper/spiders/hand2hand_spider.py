import scrapy


class Hand2HandSpider(scrapy.Spider):
    name = "hand2hand"
    allowed_domains = ["hand2hand.com"]
    start_urls = ["https://www.hand2hand.com/Shop/All/"]

    custom_settings = {
        "FEEDS": {
            "../../../../data/hand2hand_output.jsonl": {
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

        # Extract basic data - page title
        title = response.css(
            "h1.product-detail-name.mb-4[itemprop='name']::text"
        ).extract_first()
        if title:
            title = title.strip()  # Remove leading/trailing whitespace
        itemURI = response.url  # The current page URL

        # Extract the subcategory from breadcrumb
        subcategory = response.css(
            "a.breadcrumb-link.is-active span.breadcrumb-title::text"
        ).extract_first()

        # Extract the price
        price = response.css(
            "meta[itemprop='price']::attr(content)").extract_first()

        # Extract image URL (item URI from the image source)
        imageURI = response.css(
            "img.js-magnifier-image::attr(src)").extract_first()

        # Only yield the data if all required fields are present
        if title and subcategory and price and imageURI:
            yield {
                "title": title,
                "itemURI": itemURI,
                "subcategory": subcategory,
                "price": price,
                "imageURI": imageURI,
                "url": itemURI,
            }

        # Extract normal links on the page (i.e., <a> tags) and follow them
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

        # Extract pagination links from the page (i.e., <label> tags with class 'page-link')
        pagination_links = response.css("label.page-link::attr(for)").extract()
        for page in pagination_links:
            # Construct the URL for the next page (assuming the page number is embedded in the 'for' attribute)
            next_page_url = self.construct_pagination_url(response, page)

            # Avoid revisiting the same page
            if next_page_url not in self.visited_urls:
                self.visited_urls.add(
                    next_page_url)  # Mark the next page as visited
                yield scrapy.Request(
                    next_page_url, callback=self.parse
                )  # Follow the pagination link and continue parsing

    def construct_pagination_url(self, response, page):
        """
        Construct the next page URL based on the 'p' parameter in the pagination label.
        """
        page_number = page[1:]  # Removes the 'p' from 'p2' to get '2'

        # Construct the full URL for pagination
        next_page_url = f"{response.url.split('?')[0]}?order=latest&p={page_number}"

        # Return the full URL for the next page
        return response.urljoin(next_page_url)
