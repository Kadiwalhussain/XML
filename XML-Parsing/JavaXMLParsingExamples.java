// ============================================================================
//                        Java XML Parsing Examples
// ============================================================================

import java.io.*;
import java.util.*;
import javax.xml.parsers.*;
import javax.xml.stream.*;
import org.w3c.dom.*;
import org.xml.sax.*;
import org.xml.sax.helpers.DefaultHandler;

/**
 * Comprehensive Java examples for all XML parsing approaches
 * Includes: DOM, SAX, StAX with practical use cases
 */

// ============================================================================
// Sample XML Data
// ============================================================================
class SampleXMLData {
    public static final String BOOKS_XML = """
        <?xml version="1.0" encoding="UTF-8"?>
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
        </library>
        """;
}

// ============================================================================
// DOM Parser Examples
// ============================================================================
class DOMParserExamples {
    
    /**
     * Basic DOM parsing - Load and navigate entire XML tree
     */
    public static void basicDOMParsing() {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            
            // Parse from string (in real world, use FileInputStream)
            Document document = builder.parse(
                new ByteArrayInputStream(SampleXMLData.BOOKS_XML.getBytes())
            );
            
            // Get root element
            Element root = document.getDocumentElement();
            System.out.println("Library: " + root.getAttribute("name"));
            
            // Get all books
            NodeList books = document.getElementsByTagName("book");
            System.out.println("Total books: " + books.getLength());
            
            // Process each book
            for (int i = 0; i < books.getLength(); i++) {
                Element book = (Element) books.item(i);
                
                String id = book.getAttribute("id");
                String category = book.getAttribute("category");
                String title = getElementText(book, "title");
                String author = getElementText(book, "author");
                String price = getElementText(book, "price");
                
                System.out.printf("Book %s [%s]: %s by %s - %s%n", 
                    id, category, title, author, price);
            }
            
        } catch (Exception e) {
            System.err.println("DOM parsing error: " + e.getMessage());
        }
    }
    
    /**
     * Advanced DOM operations - Modify XML tree
     */
    public static void advancedDOMOperations() {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(
                new ByteArrayInputStream(SampleXMLData.BOOKS_XML.getBytes())
            );
            
            // Add new book
            Element library = document.getDocumentElement();
            Element newBook = document.createElement("book");
            newBook.setAttribute("id", "4");
            newBook.setAttribute("category", "ai");
            
            // Add child elements
            addElementWithText(document, newBook, "title", "Machine Learning Basics");
            addElementWithText(document, newBook, "author", "AI Expert");
            addElementWithText(document, newBook, "price", "39.99");
            addElementWithText(document, newBook, "published", "2023");
            
            library.appendChild(newBook);
            
            // Modify existing element
            NodeList titles = document.getElementsByTagName("title");
            Element firstTitle = (Element) titles.item(0);
            firstTitle.setTextContent("Clean Code: Updated Edition");
            
            // Remove element
            NodeList descriptions = document.getElementsByTagName("description");
            if (descriptions.getLength() > 0) {
                Element desc = (Element) descriptions.item(0);
                desc.getParentNode().removeChild(desc);
            }
            
            System.out.println("DOM modifications completed successfully");
            
        } catch (Exception e) {
            System.err.println("DOM modification error: " + e.getMessage());
        }
    }
    
    // Helper methods
    private static String getElementText(Element parent, String tagName) {
        NodeList nodeList = parent.getElementsByTagName(tagName);
        return nodeList.getLength() > 0 ? nodeList.item(0).getTextContent() : "";
    }
    
    private static void addElementWithText(Document doc, Element parent, String tagName, String text) {
        Element element = doc.createElement(tagName);
        element.setTextContent(text);
        parent.appendChild(element);
    }
}

// ============================================================================
// SAX Parser Examples  
// ============================================================================
class SAXParserExamples {
    
    /**
     * Basic SAX parsing with custom handler
     */
    public static void basicSAXParsing() {
        try {
            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser parser = factory.newSAXParser();
            BookHandler handler = new BookHandler();
            
            parser.parse(
                new ByteArrayInputStream(SampleXMLData.BOOKS_XML.getBytes()),
                handler
            );
            
            // Display results
            System.out.println("SAX Parsing Results:");
            for (Book book : handler.getBooks()) {
                System.out.println(book);
            }
            
        } catch (Exception e) {
            System.err.println("SAX parsing error: " + e.getMessage());
        }
    }
    
    /**
     * Advanced SAX parsing with filtering and statistics
     */
    public static void advancedSAXParsing() {
        try {
            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser parser = factory.newSAXParser();
            StatisticsHandler handler = new StatisticsHandler();
            
            parser.parse(
                new ByteArrayInputStream(SampleXMLData.BOOKS_XML.getBytes()),
                handler
            );
            
            // Display statistics
            System.out.println("SAX Statistics:");
            handler.printStatistics();
            
        } catch (Exception e) {
            System.err.println("Advanced SAX parsing error: " + e.getMessage());
        }
    }
}

// SAX Handler for basic book parsing
class BookHandler extends DefaultHandler {
    private List<Book> books = new ArrayList<>();
    private Book currentBook;
    private StringBuilder currentText = new StringBuilder();
    private boolean inTitle = false, inAuthor = false, inPrice = false, inPublished = false;
    
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) {
        currentText.setLength(0); // Reset text buffer
        
        switch (qName) {
            case "book":
                currentBook = new Book();
                currentBook.id = attributes.getValue("id");
                currentBook.category = attributes.getValue("category");
                break;
            case "title": inTitle = true; break;
            case "author": inAuthor = true; break;
            case "price": 
                inPrice = true; 
                currentBook.currency = attributes.getValue("currency");
                break;
            case "published": inPublished = true; break;
        }
    }
    
    @Override
    public void characters(char[] ch, int start, int length) {
        currentText.append(ch, start, length);
    }
    
    @Override
    public void endElement(String uri, String localName, String qName) {
        String text = currentText.toString().trim();
        
        switch (qName) {
            case "book":
                books.add(currentBook);
                currentBook = null;
                break;
            case "title":
                currentBook.title = text;
                inTitle = false;
                break;
            case "author":
                currentBook.author = text;
                inAuthor = false;
                break;
            case "price":
                currentBook.price = Double.parseDouble(text);
                inPrice = false;
                break;
            case "published":
                currentBook.published = Integer.parseInt(text);
                inPublished = false;
                break;
        }
    }
    
    public List<Book> getBooks() { return books; }
}

// SAX Handler for statistics and filtering
class StatisticsHandler extends DefaultHandler {
    private int totalBooks = 0;
    private int programmingBooks = 0;
    private double totalValue = 0.0;
    private int newestYear = 0;
    private Map<String, Integer> categoryCount = new HashMap<>();
    
    private boolean inPrice = false;
    private boolean inPublished = false;
    private StringBuilder currentText = new StringBuilder();
    private String currentCategory;
    
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) {
        currentText.setLength(0);
        
        if ("book".equals(qName)) {
            totalBooks++;
            currentCategory = attributes.getValue("category");
            categoryCount.put(currentCategory, categoryCount.getOrDefault(currentCategory, 0) + 1);
            
            if ("programming".equals(currentCategory)) {
                programmingBooks++;
            }
        } else if ("price".equals(qName)) {
            inPrice = true;
        } else if ("published".equals(qName)) {
            inPublished = true;
        }
    }
    
    @Override
    public void characters(char[] ch, int start, int length) {
        currentText.append(ch, start, length);
    }
    
    @Override
    public void endElement(String uri, String localName, String qName) {
        String text = currentText.toString().trim();
        
        if (inPrice && "price".equals(qName)) {
            totalValue += Double.parseDouble(text);
            inPrice = false;
        } else if (inPublished && "published".equals(qName)) {
            int year = Integer.parseInt(text);
            newestYear = Math.max(newestYear, year);
            inPublished = false;
        }
    }
    
    public void printStatistics() {
        System.out.println("Total books: " + totalBooks);
        System.out.println("Programming books: " + programmingBooks);
        System.out.println("Total value: $" + String.format("%.2f", totalValue));
        System.out.println("Newest publication: " + newestYear);
        System.out.println("Categories: " + categoryCount);
    }
}

// ============================================================================
// StAX Parser Examples
// ============================================================================
class StAXParserExamples {
    
    /**
     * Basic StAX parsing with pull model
     */
    public static void basicStAXParsing() {
        try {
            XMLInputFactory factory = XMLInputFactory.newInstance();
            XMLStreamReader reader = factory.createXMLStreamReader(
                new StringReader(SampleXMLData.BOOKS_XML)
            );
            
            List<Book> books = new ArrayList<>();
            Book currentBook = null;
            
            while (reader.hasNext()) {
                int event = reader.next();
                
                switch (event) {
                    case XMLStreamConstants.START_ELEMENT:
                        String elementName = reader.getLocalName();
                        
                        if ("book".equals(elementName)) {
                            currentBook = new Book();
                            currentBook.id = reader.getAttributeValue(null, "id");
                            currentBook.category = reader.getAttributeValue(null, "category");
                        } else if (currentBook != null) {
                            switch (elementName) {
                                case "title":
                                    currentBook.title = reader.getElementText();
                                    break;
                                case "author":
                                    currentBook.author = reader.getElementText();
                                    break;
                                case "price":
                                    currentBook.currency = reader.getAttributeValue(null, "currency");
                                    currentBook.price = Double.parseDouble(reader.getElementText());
                                    break;
                                case "published":
                                    currentBook.published = Integer.parseInt(reader.getElementText());
                                    break;
                            }
                        }
                        break;
                        
                    case XMLStreamConstants.END_ELEMENT:
                        if ("book".equals(reader.getLocalName()) && currentBook != null) {
                            books.add(currentBook);
                            currentBook = null;
                        }
                        break;
                }
            }
            
            reader.close();
            
            // Display results
            System.out.println("StAX Parsing Results:");
            books.forEach(System.out::println);
            
        } catch (Exception e) {
            System.err.println("StAX parsing error: " + e.getMessage());
        }
    }
    
    /**
     * Advanced StAX parsing with selective processing
     */
    public static void selectiveStAXParsing() {
        try {
            XMLInputFactory factory = XMLInputFactory.newInstance();
            XMLStreamReader reader = factory.createXMLStreamReader(
                new StringReader(SampleXMLData.BOOKS_XML)
            );
            
            System.out.println("Selective StAX Parsing - Only Programming Books:");
            
            while (reader.hasNext()) {
                if (reader.isStartElement() && "book".equals(reader.getLocalName())) {
                    String category = reader.getAttributeValue(null, "category");
                    
                    if ("programming".equals(category)) {
                        // Process this book
                        processBook(reader);
                    } else {
                        // Skip this book entirely
                        skipElement(reader);
                    }
                } else {
                    reader.next();
                }
            }
            
            reader.close();
            
        } catch (Exception e) {
            System.err.println("Selective StAX parsing error: " + e.getMessage());
        }
    }
    
    private static void processBook(XMLStreamReader reader) throws XMLStreamException {
        String id = reader.getAttributeValue(null, "id");
        String title = "";
        String author = "";
        
        while (reader.hasNext() && !(reader.isEndElement() && "book".equals(reader.getLocalName()))) {
            reader.next();
            
            if (reader.isStartElement()) {
                String elementName = reader.getLocalName();
                if ("title".equals(elementName)) {
                    title = reader.getElementText();
                } else if ("author".equals(elementName)) {
                    author = reader.getElementText();
                }
            }
        }
        
        System.out.printf("Programming Book %s: %s by %s%n", id, title, author);
    }
    
    private static void skipElement(XMLStreamReader reader) throws XMLStreamException {
        int depth = 1;
        while (depth > 0 && reader.hasNext()) {
            reader.next();
            if (reader.isStartElement()) {
                depth++;
            } else if (reader.isEndElement()) {
                depth--;
            }
        }
    }
}

// ============================================================================
// Book Data Model
// ============================================================================
class Book {
    String id;
    String category;
    String title;
    String author;
    double price;
    String currency;
    int published;
    
    @Override
    public String toString() {
        return String.format("Book[id=%s, category=%s, title='%s', author='%s', price=%.2f %s, year=%d]",
            id, category, title, author, price, currency, published);
    }
}

// ============================================================================
// Main Class to Run Examples
// ============================================================================
public class JavaXMLParsingExamples {
    public static void main(String[] args) {
        System.out.println("=".repeat(60));
        System.out.println("JAVA XML PARSING EXAMPLES");
        System.out.println("=".repeat(60));
        
        // DOM Examples
        System.out.println("\n1. DOM PARSER EXAMPLES:");
        System.out.println("-".repeat(30));
        DOMParserExamples.basicDOMParsing();
        System.out.println();
        DOMParserExamples.advancedDOMOperations();
        
        // SAX Examples  
        System.out.println("\n2. SAX PARSER EXAMPLES:");
        System.out.println("-".repeat(30));
        SAXParserExamples.basicSAXParsing();
        System.out.println();
        SAXParserExamples.advancedSAXParsing();
        
        // StAX Examples
        System.out.println("\n3. STAX PARSER EXAMPLES:");
        System.out.println("-".repeat(30));
        StAXParserExamples.basicStAXParsing();
        System.out.println();
        StAXParserExamples.selectiveStAXParsing();
    }
}