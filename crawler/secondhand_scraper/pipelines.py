# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class SecondhandScraperPipeline:

    def process_item(self, item, spider):
        return item


# Pipeline to write items to a JSON Lines file
import json


class JsonLinesPipeline:

    def open_spider(self, spider):
        self.file = open('../../../data/output.jsonl', 'w', encoding='utf8')

    def close_spider(self, spider):
        self.file.close()

    def process_item(self, item, spider):
        line = json.dumps(dict(item)) + '\n'
        self.file.write(line)
        return item
