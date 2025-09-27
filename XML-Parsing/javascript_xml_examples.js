// ============================================================================
//                        JavaScript XML Parsing Examples
// ============================================================================

// Sample XML Data
const BOOKS_XML = `<?xml version="1.0" encoding="UTF-8"?>
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
</library>`;

// ============================================================================
// DOM Parser Examples (Browser & Node.js)
// ============================================================================
class DOMParserExamples {
    
    /**
     * Basic DOM parsing using DOMParser (browser) or xmldom (Node.js)
     */
    static basicDOMParsing() {
        console.log("DOM Basic Parsing:");
        console.log("-".repeat(30));
        
        try {
            // Create parser - works in browser and Node.js with xmldom
            const parser = this.createParser();
            const xmlDoc = parser.parseFromString(BOOKS_XML, "text/xml");
            
            // Check for parsing errors
            const parseErrors = xmlDoc.getElementsByTagName("parsererror");
            if (parseErrors.length > 0) {
                throw new Error("XML parsing failed");
            }
            
            // Get root element
            const library = xmlDoc.documentElement;
            console.log(`Library: ${library.getAttribute("name")}`);
            
            // Get all books
            const books = xmlDoc.getElementsByTagName("book");
            console.log(`Total books: ${books.length}`);
            
            // Process each book
            for (let i = 0; i < books.length; i++) {
                const book = books[i];
                const id = book.getAttribute("id");
                const category = book.getAttribute("category");
                const title = this.getElementText(book, "title");
                const author = this.getElementText(book, "author");
                const price = this.getElementText(book, "price");
                const currency = book.getElementsByTagName("price")[0].getAttribute("currency");
                
                console.log(`Book ${id} [${category}]: ${title} by ${author} - ${price} ${currency}`);
            }
            
        } catch (error) {
            console.error("DOM parsing error:", error.message);
        }
    }
    
    /**
     * Advanced DOM operations - modify XML tree
     */
    static advancedDOMOperations() {
        console.log("\nDOM Advanced Operations:");
        console.log("-".repeat(30));
        
        try {
            const parser = this.createParser();
            const xmlDoc = parser.parseFromString(BOOKS_XML, "text/xml");
            const library = xmlDoc.documentElement;
            
            // Add new book
            const newBook = xmlDoc.createElement("book");
            newBook.setAttribute("id", "4");
            newBook.setAttribute("category", "ai");
            
            // Add child elements
            this.addElementWithText(xmlDoc, newBook, "title", "Machine Learning Basics");
            this.addElementWithText(xmlDoc, newBook, "author", "AI Expert");
            
            const priceElement = xmlDoc.createElement("price");
            priceElement.setAttribute("currency", "USD");
            priceElement.textContent = "39.99";
            newBook.appendChild(priceElement);
            
            this.addElementWithText(xmlDoc, newBook, "published", "2023");
            
            library.appendChild(newBook);
            
            // Modify existing element
            const firstTitle = xmlDoc.getElementsByTagName("title")[0];
            firstTitle.textContent = "Clean Code: Updated Edition";
            
            // Remove element
            const firstBook = xmlDoc.getElementsByTagName("book")[0];
            const description = firstBook.getElementsByTagName("description")[0];
            if (description) {
                firstBook.removeChild(description);
            }
            
            console.log("DOM modifications completed successfully");
            console.log(`Total books after modification: ${xmlDoc.getElementsByTagName("book").length}`);
            
        } catch (error) {
            console.error("DOM modification error:", error.message);
        }
    }
    
    /**
     * XPath-like queries using DOM methods
     */
    static domQueries() {
        console.log("\nDOM Query Examples:");
        console.log("-".repeat(30));
        
        try {
            const parser = this.createParser();
            const xmlDoc = parser.parseFromString(BOOKS_XML, "text/xml");
            
            // Find books by category
            const books = Array.from(xmlDoc.getElementsByTagName("book"));
            const programmingBooks = books.filter(book => 
                book.getAttribute("category") === "programming"
            );
            console.log(`Programming books: ${programmingBooks.length}`);
            
            // Find books published after 2010
            const recentBooks = books.filter(book => {
                const year = parseInt(this.getElementText(book, "published"));
                return year > 2010;
            });
            console.log(`Books published after 2010: ${recentBooks.length}`);
            
            // Find expensive books (price > 30)
            const expensiveBooks = books.filter(book => {
                const price = parseFloat(this.getElementText(book, "price"));
                return price > 30;
            }).map(book => this.getElementText(book, "title"));
            
            console.log(`Expensive books (>$30): ${expensiveBooks.join(", ")}`);
            
        } catch (error) {
            console.error("DOM query error:", error.message);
        }
    }
    
    // Helper methods
    static createParser() {
        // Browser environment
        if (typeof DOMParser !== 'undefined') {
            return new DOMParser();
        }
        
        // Node.js environment (requires xmldom package)
        try {
            const { DOMParser } = require('xmldom');
            return new DOMParser();
        } catch (error) {
            console.warn("xmldom package not found. Install with: npm install xmldom");
            throw new Error("No XML parser available");
        }
    }
    
    static getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : "";
    }
    
    static addElementWithText(doc, parent, tagName, text) {
        const element = doc.createElement(tagName);
        element.textContent = text;
        parent.appendChild(element);
    }
}

// ============================================================================
// SAX-like Parser Examples (Event-driven approach)
// ============================================================================
class SAXLikeParser {
    constructor() {
        this.books = [];
        this.currentBook = null;
        this.currentElement = "";
        this.textBuffer = "";
    }
    
    /**
     * SAX-like parsing using regex and manual parsing
     * JavaScript doesn't have built-in SAX parser
     */
    static saxLikeParsing() {
        console.log("\nSAX-like Parsing:");
        console.log("-".repeat(30));
        
        try {
            const parser = new SAXLikeParser();
            parser.parseXML(BOOKS_XML);
            
            console.log("SAX-like Parsing Results:");
            parser.books.forEach(book => {
                console.log(`Book ${book.id} [${book.category}]: ${book.title} by ${book.author} - ${book.price} ${book.currency}`);
            });
            
        } catch (error) {
            console.error("SAX-like parsing error:", error.message);
        }
    }
    
    parseXML(xmlString) {
        // Simple state-machine based XML parser
        const tagRegex = /<\/?([^>\s]+)([^>]*)>/g;
        const textRegex = />([^<]+)</g;
        
        let match;
        let lastIndex = 0;
        
        while ((match = tagRegex.exec(xmlString)) !== null) {
            const [fullMatch, tagName, attributes] = match;
            const isClosingTag = fullMatch.startsWith('</');
            
            // Extract text content between tags
            if (match.index > lastIndex) {
                const text = xmlString.substring(lastIndex, match.index).trim();
                if (text && this.currentElement) {
                    this.characters(text);
                }
            }
            
            if (isClosingTag) {
                this.endElement(tagName);
            } else {
                const attrs = this.parseAttributes(attributes);
                this.startElement(tagName, attrs);
            }
            
            lastIndex = tagRegex.lastIndex;
        }
    }
    
    parseAttributes(attrString) {
        const attributes = {};
        const attrRegex = /(\w+)=["']([^"']*)["']/g;
        let match;
        
        while ((match = attrRegex.exec(attrString)) !== null) {
            attributes[match[1]] = match[2];
        }
        
        return attributes;
    }
    
    startElement(name, attributes) {
        this.currentElement = name;
        this.textBuffer = "";
        
        if (name === "book") {
            this.currentBook = {
                id: attributes.id,
                category: attributes.category
            };
        } else if (name === "price" && this.currentBook) {
            this.currentBook.currency = attributes.currency;
        }
    }
    
    characters(text) {
        this.textBuffer += text;
    }
    
    endElement(name) {
        if (name === "book" && this.currentBook) {
            this.books.push({ ...this.currentBook });
            this.currentBook = null;
        } else if (this.currentBook && this.textBuffer.trim()) {
            switch (name) {
                case "title":
                case "author":
                case "published":
                    this.currentBook[name] = this.textBuffer.trim();
                    break;
                case "price":
                    this.currentBook.price = parseFloat(this.textBuffer.trim());
                    break;
            }
        }
        
        this.currentElement = "";
        this.textBuffer = "";
    }
}

// ============================================================================
// JavaScript-specific XML Utilities
// ============================================================================
class JavaScriptXMLUtilities {
    
    /**
     * Convert XML to JavaScript object
     */
    static xmlToObject() {
        console.log("\nXML to Object Conversion:");
        console.log("-".repeat(40));
        
        try {
            const parser = DOMParserExamples.createParser();
            const xmlDoc = parser.parseFromString(BOOKS_XML, "text/xml");
            
            const obj = this.domToObject(xmlDoc.documentElement);
            console.log(JSON.stringify(obj, null, 2));
            
        } catch (error) {
            console.error("XML to object conversion error:", error.message);
        }
    }
    
    static domToObject(element) {
        const obj = {};
        
        // Add attributes
        if (element.attributes && element.attributes.length > 0) {
            obj['@attributes'] = {};
            for (let i = 0; i < element.attributes.length; i++) {
                const attr = element.attributes[i];
                obj['@attributes'][attr.name] = attr.value;
            }
        }
        
        // Add child elements
        const children = Array.from(element.children);
        if (children.length === 0) {
            // Leaf node - return text content
            const text = element.textContent.trim();
            return text || (obj['@attributes'] ? obj : null);
        }
        
        // Group children by tag name
        const childGroups = {};
        children.forEach(child => {
            const tagName = child.tagName;
            if (!childGroups[tagName]) {
                childGroups[tagName] = [];
            }
            childGroups[tagName].push(this.domToObject(child));
        });
        
        // Convert groups to object properties
        Object.keys(childGroups).forEach(tagName => {
            const group = childGroups[tagName];
            obj[tagName] = group.length === 1 ? group[0] : group;
        });
        
        return obj;
    }
    
    /**
     * Convert JavaScript object back to XML
     */
    static objectToXML() {
        console.log("\nObject to XML Conversion:");
        console.log("-".repeat(40));
        
        const bookData = {
            id: "5",
            category: "testing",
            title: "JavaScript Testing",
            author: "Test Master",
            price: { value: "25.99", currency: "USD" },
            published: "2023"
        };
        
        const xml = this.objectToDOMString("book", bookData);
        console.log(xml);
    }
    
    static objectToDOMString(tagName, obj, indent = 0) {
        const spaces = "  ".repeat(indent);
        let xml = `${spaces}<${tagName}`;
        
        // Add attributes
        if (obj['@attributes']) {
            Object.keys(obj['@attributes']).forEach(attr => {
                xml += ` ${attr}="${obj['@attributes'][attr]}"`;
            });
        }
        
        // Handle simple values
        if (typeof obj === 'string' || typeof obj === 'number') {
            xml += `>${obj}</${tagName}>`;
            return xml;
        }
        
        xml += ">";
        
        // Add child elements
        Object.keys(obj).forEach(key => {
            if (key === '@attributes') return;
            
            const value = obj[key];
            if (Array.isArray(value)) {
                value.forEach(item => {
                    xml += "\n" + this.objectToDOMString(key, item, indent + 1);
                });
            } else if (typeof value === 'object' && value.value !== undefined) {
                // Special handling for objects with value property
                xml += `\n${spaces}  <${key}`;
                Object.keys(value).forEach(attr => {
                    if (attr !== 'value') {
                        xml += ` ${attr}="${value[attr]}"`;
                    }
                });
                xml += `>${value.value}</${key}>`;
            } else if (typeof value === 'object') {
                xml += "\n" + this.objectToDOMString(key, value, indent + 1);
            } else {
                xml += `\n${spaces}  <${key}>${value}</${key}>`;
            }
        });
        
        xml += `\n${spaces}</${tagName}>`;
        return xml;
    }
    
    /**
     * Performance comparison between different approaches
     */
    static performanceComparison() {
        console.log("\nPerformance Comparison:");
        console.log("-".repeat(40));
        
        // Create larger XML for testing
        let largeXML = BOOKS_XML.replace('</library>', '');
        for (let i = 0; i < 100; i++) {
            largeXML += `
            <book id="${i + 4}" category="test">
                <title>Test Book ${i + 1}</title>
                <author>Test Author ${i + 1}</author>
                <price currency="USD">${(20 + (i % 50))}.99</price>
                <published>${2000 + (i % 23)}</published>
            </book>`;
        }
        largeXML += '</library>';
        
        // DOM parsing timing
        const startDOM = performance.now();
        try {
            const parser = DOMParserExamples.createParser();
            const xmlDoc = parser.parseFromString(largeXML, "text/xml");
            const books = xmlDoc.getElementsByTagName("book");
            const domTime = performance.now() - startDOM;
            
            // SAX-like parsing timing
            const startSAX = performance.now();
            const saxParser = new SAXLikeParser();
            saxParser.parseXML(largeXML);
            const saxTime = performance.now() - startSAX;
            
            console.log(`DOM parsing: ${domTime.toFixed(2)}ms (${books.length} books)`);
            console.log(`SAX-like parsing: ${saxTime.toFixed(2)}ms (${saxParser.books.length} books)`);
            console.log(`SAX-like is ${(domTime / saxTime).toFixed(1)}x faster`);
            
        } catch (error) {
            console.log("Performance test skipped - parser not available");
        }
    }
}

// ============================================================================
// Error Handling Examples
// ============================================================================
class ErrorHandlingExamples {
    
    static malformedXMLHandling() {
        console.log("\nError Handling Examples:");
        console.log("-".repeat(30));
        
        const malformedXML = `<?xml version="1.0"?>
        <library>
            <book id="1">
                <title>Unclosed Title
                <author>Missing End Tag</author>
            </book>
        </library>`;
        
        try {
            const parser = DOMParserExamples.createParser();
            const xmlDoc = parser.parseFromString(malformedXML, "text/xml");
            
            // Check for parsing errors
            const parseErrors = xmlDoc.getElementsByTagName("parsererror");
            if (parseErrors.length > 0) {
                console.log("DOM ParseError detected:");
                console.log(parseErrors[0].textContent);
            } else {
                console.log("No parsing errors detected (this might be unexpected)");
            }
            
        } catch (error) {
            console.log(`DOM parsing error: ${error.message}`);
        }
    }
    
    static asyncXMLLoading() {
        console.log("\nAsync XML Loading Example:");
        console.log("-".repeat(30));
        
        // Simulate async XML loading
        const simulateXMLFetch = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(BOOKS_XML);
                }, 100);
            });
        };
        
        simulateXMLFetch()
            .then(xmlString => {
                console.log("XML loaded asynchronously");
                const parser = DOMParserExamples.createParser();
                const xmlDoc = parser.parseFromString(xmlString, "text/xml");
                const bookCount = xmlDoc.getElementsByTagName("book").length;
                console.log(`Parsed ${bookCount} books asynchronously`);
            })
            .catch(error => {
                console.error("Async XML loading error:", error.message);
            });
    }
}

// ============================================================================
// Main execution function
// ============================================================================
function runAllExamples() {
    console.log("=".repeat(60));
    console.log("JAVASCRIPT XML PARSING EXAMPLES");
    console.log("=".repeat(60));
    
    // DOM Examples
    console.log("\n1. DOM PARSER EXAMPLES:");
    DOMParserExamples.basicDOMParsing();
    DOMParserExamples.advancedDOMOperations();
    DOMParserExamples.domQueries();
    
    // SAX-like Examples
    console.log("\n2. SAX-LIKE PARSER EXAMPLES:");
    SAXLikeParser.saxLikeParsing();
    
    // JavaScript Utilities
    console.log("\n3. JAVASCRIPT XML UTILITIES:");
    JavaScriptXMLUtilities.xmlToObject();
    JavaScriptXMLUtilities.objectToXML();
    JavaScriptXMLUtilities.performanceComparison();
    
    // Error Handling
    console.log("\n4. ERROR HANDLING:");
    ErrorHandlingExamples.malformedXMLHandling();
    ErrorHandlingExamples.asyncXMLLoading();
}

// Run examples if this file is executed directly
if (typeof window === 'undefined' && typeof module !== 'undefined') {
    // Node.js environment
    runAllExamples();
} else if (typeof window !== 'undefined') {
    // Browser environment - attach to window for manual execution
    window.XMLParsingExamples = {
        runAllExamples,
        DOMParserExamples,
        SAXLikeParser,
        JavaScriptXMLUtilities,
        ErrorHandlingExamples
    };
    console.log("XML Parsing examples loaded. Run XMLParsingExamples.runAllExamples() to start.");
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runAllExamples,
        DOMParserExamples,
        SAXLikeParser,
        JavaScriptXMLUtilities,
        ErrorHandlingExamples
    };
}