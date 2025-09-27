# ============================================================================
#                        Python XML Parsing Examples
# ============================================================================

import xml.etree.ElementTree as ET
import xml.sax
import xml.sax.handler
import xml.dom.minidom
from io import StringIO
import json
from collections import defaultdict

# ============================================================================
# Sample XML Data
# ============================================================================
BOOKS_XML = """<?xml version="1.0" encoding="UTF-8"?>
<library name="Tech Library">
    <book id="1" category="programming">
        <title>Clean Code</title>
        <author>Robert C. Martin</author>
        <price currency="USD">29.99</price>
        <published>2008</published>
        <description>A guide to writing readable, maintainable code</description>
    </book>
    <book id="2" category="database">
        <title>SQL Fundamentals</title>
        <author>John Smith</author>
        <price currency="EUR">24.50</price>
        <published>2020</published>
        <description>Complete guide to SQL and database design</description>
    </book>
    <book id="3" category="web">
        <title>Modern JavaScript</title>
        <author>Sarah Johnson</author>
        <price currency="USD">34.99</price>
        <published>2021</published>
        <description>ES6+ features and modern development practices</description>
    </book>
</library>"""

# ============================================================================
# ElementTree Examples (Python's Most Common XML Parser)
# ============================================================================
class ElementTreeExamples:
    """
    ElementTree is Python's built-in DOM-like parser
    Similar to DOM but more Pythonic and memory-efficient
    """
    
    @staticmethod
    def basic_parsing():
        """Basic ElementTree parsing and navigation"""
        print("ElementTree Basic Parsing:")
        print("-" * 40)
        
        try:
            # Parse XML string
            root = ET.fromstring(BOOKS_XML)
            
            # Get root element info
            print(f"Library: {root.get('name')}")
            print(f"Total books: {len(root.findall('book'))}")
            
            # Iterate through books
            for book in root.findall('book'):
                book_id = book.get('id')
                category = book.get('category')
                title = book.find('title').text
                author = book.find('author').text
                price = book.find('price').text
                currency = book.find('price').get('currency')
                
                print(f"Book {book_id} [{category}]: {title} by {author} - {price} {currency}")
                
        except ET.ParseError as e:
            print(f"ElementTree parsing error: {e}")
    
    @staticmethod
    def advanced_operations():
        """Advanced ElementTree operations - modify XML tree"""
        print("\nElementTree Advanced Operations:")
        print("-" * 40)
        
        try:
            root = ET.fromstring(BOOKS_XML)
            
            # Add new book
            new_book = ET.SubElement(root, 'book', id='4', category='ai')
            ET.SubElement(new_book, 'title').text = 'Machine Learning Basics'
            ET.SubElement(new_book, 'author').text = 'AI Expert'
            price_elem = ET.SubElement(new_book, 'price', currency='USD')
            price_elem.text = '39.99'
            ET.SubElement(new_book, 'published').text = '2023'
            
            # Modify existing element
            first_book = root.find('book')
            first_title = first_book.find('title')
            first_title.text = 'Clean Code: Updated Edition'
            
            # Remove element
            first_desc = first_book.find('description')
            if first_desc is not None:
                first_book.remove(first_desc)
            
            # Convert to string and display
            xml_str = ET.tostring(root, encoding='unicode')
            print("Modified XML structure created successfully")
            print(f"Total books after modification: {len(root.findall('book'))}")
            
        except Exception as e:
            print(f"ElementTree modification error: {e}")
    
    @staticmethod
    def xpath_like_queries():
        """XPath-like queries using ElementTree"""
        print("\nElementTree XPath-like Queries:")
        print("-" * 40)
        
        try:
            root = ET.fromstring(BOOKS_XML)
            
            # Find books by category
            programming_books = [book for book in root.findall('book') 
                               if book.get('category') == 'programming']
            print(f"Programming books: {len(programming_books)}")
            
            # Find books published after 2010
            recent_books = [book for book in root.findall('book')
                          if int(book.find('published').text) > 2010]
            print(f"Books published after 2010: {len(recent_books)}")
            
            # Find expensive books (price > 30)
            expensive_books = []
            for book in root.findall('book'):
                price = float(book.find('price').text)
                if price > 30:
                    expensive_books.append(book.find('title').text)
            print(f"Expensive books (>$30): {expensive_books}")
            
        except Exception as e:
            print(f"ElementTree query error: {e}")

# ============================================================================
# SAX Parser Examples (Python)
# ============================================================================
class BookSAXHandler(xml.sax.ContentHandler):
    """Custom SAX handler for parsing books"""
    
    def __init__(self):
        self.books = []
        self.current_book = {}
        self.current_tag = ""
        self.current_content = ""
        
    def startElement(self, name, attrs):
        self.current_tag = name
        self.current_content = ""
        
        if name == "book":
            self.current_book = {
                'id': attrs.get('id'),
                'category': attrs.get('category')
            }
        elif name == "price":
            self.current_book['currency'] = attrs.get('currency')
            
    def characters(self, content):
        self.current_content += content.strip()
        
    def endElement(self, name):
        if name == "book":
            self.books.append(self.current_book.copy())
            self.current_book = {}
        elif name in ["title", "author", "published", "description"]:
            self.current_book[name] = self.current_content
        elif name == "price":
            self.current_book['price'] = float(self.current_content)
            
        self.current_content = ""

class StatisticsSAXHandler(xml.sax.ContentHandler):
    """SAX handler for collecting statistics"""
    
    def __init__(self):
        self.stats = {
            'total_books': 0,
            'categories': defaultdict(int),
            'total_value': 0.0,
            'newest_year': 0,
            'authors': set()
        }
        self.current_tag = ""
        self.current_content = ""
        self.current_category = ""
        
    def startElement(self, name, attrs):
        self.current_tag = name
        self.current_content = ""
        
        if name == "book":
            self.stats['total_books'] += 1
            self.current_category = attrs.get('category', 'unknown')
            self.stats['categories'][self.current_category] += 1
            
    def characters(self, content):
        self.current_content += content.strip()
        
    def endElement(self, name):
        if name == "price":
            self.stats['total_value'] += float(self.current_content)
        elif name == "published":
            year = int(self.current_content)
            self.stats['newest_year'] = max(self.stats['newest_year'], year)
        elif name == "author":
            self.stats['authors'].add(self.current_content)
            
        self.current_content = ""

class SAXExamples:
    """Python SAX parsing examples"""
    
    @staticmethod
    def basic_sax_parsing():
        """Basic SAX parsing with custom handler"""
        print("\nSAX Basic Parsing:")
        print("-" * 30)
        
        try:
            handler = BookSAXHandler()
            xml.sax.parseString(BOOKS_XML, handler)
            
            print("SAX Parsing Results:")
            for book in handler.books:
                print(f"Book {book['id']} [{book['category']}]: {book['title']} "
                      f"by {book['author']} - ${book['price']} {book['currency']}")
                
        except xml.sax.SAXException as e:
            print(f"SAX parsing error: {e}")
    
    @staticmethod
    def statistics_sax_parsing():
        """Advanced SAX parsing for statistics"""
        print("\nSAX Statistics Parsing:")
        print("-" * 30)
        
        try:
            handler = StatisticsSAXHandler()
            xml.sax.parseString(BOOKS_XML, handler)
            
            stats = handler.stats
            print(f"Total books: {stats['total_books']}")
            print(f"Total value: ${stats['total_value']:.2f}")
            print(f"Newest publication: {stats['newest_year']}")
            print(f"Categories: {dict(stats['categories'])}")
            print(f"Unique authors: {len(stats['authors'])}")
            
        except xml.sax.SAXException as e:
            print(f"SAX statistics error: {e}")

# ============================================================================
# Python-specific parsing utilities
# ============================================================================
class PythonXMLUtilities:
    """Useful Python XML parsing utilities"""
    
    @staticmethod
    def xml_to_dict():
        """Convert XML to Python dictionary"""
        print("\nXML to Dictionary Conversion:")
        print("-" * 40)
        
        def xml_to_dict_recursive(element):
            """Recursively convert XML element to dict"""
            result = {}
            
            # Add attributes
            if element.attrib:
                result['@attributes'] = element.attrib
            
            # Add text content
            if element.text and element.text.strip():
                if len(element) == 0:  # No child elements
                    return element.text.strip()
                result['text'] = element.text.strip()
            
            # Add child elements
            for child in element:
                child_data = xml_to_dict_recursive(child)
                if child.tag in result:
                    # Multiple elements with same tag - convert to list
                    if not isinstance(result[child.tag], list):
                        result[child.tag] = [result[child.tag]]
                    result[child.tag].append(child_data)
                else:
                    result[child.tag] = child_data
            
            return result
        
        try:
            root = ET.fromstring(BOOKS_XML)
            xml_dict = {root.tag: xml_to_dict_recursive(root)}
            
            # Pretty print the dictionary
            print(json.dumps(xml_dict, indent=2))
            
        except Exception as e:
            print(f"XML to dict conversion error: {e}")
    
    @staticmethod
    def performance_comparison():
        """Compare performance of different Python parsers"""
        print("\nPerformance Comparison (Python):")
        print("-" * 40)
        
        import time
        
        # Simulate larger XML by repeating books
        large_xml = BOOKS_XML.replace('</library>', '')
        for i in range(100):  # Add 100 more books
            book_xml = f"""
            <book id="{i+4}" category="test">
                <title>Test Book {i+1}</title>
                <author>Test Author {i+1}</author>
                <price currency="USD">{20 + (i % 50)}.99</price>
                <published>{2000 + (i % 23)}</published>
            </book>"""
            large_xml += book_xml
        large_xml += '</library>'
        
        # ElementTree timing
        start_time = time.time()
        root = ET.fromstring(large_xml)
        books = root.findall('book')
        et_time = time.time() - start_time
        
        # SAX timing
        start_time = time.time()
        handler = BookSAXHandler()
        xml.sax.parseString(large_xml, handler)
        sax_time = time.time() - start_time
        
        print(f"ElementTree: {et_time:.4f}s ({len(books)} books)")
        print(f"SAX: {sax_time:.4f}s ({len(handler.books)} books)")
        print(f"SAX is {et_time/sax_time:.1f}x faster for this data size")

# ============================================================================
# Error Handling Examples
# ============================================================================
class ErrorHandlingExamples:
    """XML parsing error handling examples"""
    
    @staticmethod
    def malformed_xml_handling():
        """Handle malformed XML gracefully"""
        print("\nError Handling Examples:")
        print("-" * 30)
        
        malformed_xml = """<?xml version="1.0"?>
        <library>
            <book id="1">
                <title>Unclosed Title
                <author>Missing End Tag</author>
            </book>
        </library>"""
        
        # ElementTree error handling
        try:
            ET.fromstring(malformed_xml)
        except ET.ParseError as e:
            print(f"ElementTree ParseError: {e}")
        
        # SAX error handling
        try:
            handler = BookSAXHandler()
            xml.sax.parseString(malformed_xml, handler)
        except xml.sax.SAXException as e:
            print(f"SAX ParseError: {e}")
    
    @staticmethod
    def encoding_issues():
        """Handle encoding issues"""
        print("\nEncoding Issues:")
        print("-" * 20)
        
        # XML with special characters
        special_xml = """<?xml version="1.0" encoding="UTF-8"?>
        <book>
            <title>Pythön & XML Parsing</title>
            <description>Special chars: áéíóú, ñ, ü, ß</description>
        </book>"""
        
        try:
            root = ET.fromstring(special_xml.encode('utf-8'))
            title = root.find('title').text
            desc = root.find('description').text
            print(f"Title: {title}")
            print(f"Description: {desc}")
        except Exception as e:
            print(f"Encoding error: {e}")

# ============================================================================
# Main execution
# ============================================================================
def main():
    print("=" * 60)
    print("PYTHON XML PARSING EXAMPLES")
    print("=" * 60)
    
    # ElementTree examples
    ElementTreeExamples.basic_parsing()
    ElementTreeExamples.advanced_operations()
    ElementTreeExamples.xpath_like_queries()
    
    # SAX examples
    SAXExamples.basic_sax_parsing()
    SAXExamples.statistics_sax_parsing()
    
    # Python utilities
    PythonXMLUtilities.xml_to_dict()
    PythonXMLUtilities.performance_comparison()
    
    # Error handling
    ErrorHandlingExamples.malformed_xml_handling()
    ErrorHandlingExamples.encoding_issues()

if __name__ == "__main__":
    main()