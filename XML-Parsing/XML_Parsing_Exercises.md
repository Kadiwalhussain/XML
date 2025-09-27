# 🎯 XML Parsing Practice Exercises

Complete these exercises to solidify your XML parsing knowledge. Solutions are provided for self-checking.

## 📚 Exercise Data

Use this sample XML for exercises:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ecommerce>
    <categories>
        <category id="1" name="Electronics">
            <subcategory id="11" name="Smartphones"/>
            <subcategory id="12" name="Laptops"/>
        </category>
        <category id="2" name="Books">
            <subcategory id="21" name="Fiction"/>
            <subcategory id="22" name="Non-Fiction"/>
        </category>
    </categories>
    <products>
        <product id="p1" category="11" featured="true">
            <name>iPhone 15 Pro</name>
            <price currency="USD">999.00</price>
            <stock>25</stock>
            <description>Latest iPhone with advanced features</description>
            <tags>
                <tag>smartphone</tag>
                <tag>premium</tag>
                <tag>5G</tag>
            </tags>
        </product>
        <product id="p2" category="12" featured="false">
            <name>MacBook Air M2</name>
            <price currency="USD">1199.00</price>
            <stock>15</stock>
            <description>Lightweight laptop with M2 chip</description>
            <tags>
                <tag>laptop</tag>
                <tag>premium</tag>
                <tag>portable</tag>
            </tags>
        </product>
        <product id="p3" category="21" featured="true">
            <name>The Great Gatsby</name>
            <price currency="USD">12.99</price>
            <stock>100</stock>
            <description>Classic American novel</description>
            <tags>
                <tag>fiction</tag>
                <tag>classic</tag>
                <tag>literature</tag>
            </tags>
        </product>
    </products>
    <orders>
        <order id="o1" customer="john@email.com" date="2024-01-15">
            <item product="p1" quantity="1"/>
            <item product="p3" quantity="2"/>
            <total currency="USD">1024.98</total>
        </order>
        <order id="o2" customer="jane@email.com" date="2024-01-16">
            <item product="p2" quantity="1"/>
            <total currency="USD">1199.00</total>
        </order>
    </orders>
</ecommerce>
```

---

## 🎯 Beginner Exercises

### Exercise 1: Basic DOM Parsing
**Task:** Parse the XML and extract all product names with their prices.

**Expected Output:**
```
iPhone 15 Pro: $999.00
MacBook Air M2: $1199.00
The Great Gatsby: $12.99
```

<details>
<summary>💡 Solution (Java)</summary>

```java
public class Exercise1Solution {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse("ecommerce.xml");
        
        NodeList products = doc.getElementsByTagName("product");
        
        for (int i = 0; i < products.getLength(); i++) {
            Element product = (Element) products.item(i);
            String name = product.getElementsByTagName("name").item(0).getTextContent();
            String price = product.getElementsByTagName("price").item(0).getTextContent();
            String currency = ((Element)product.getElementsByTagName("price").item(0)).getAttribute("currency");
            
            System.out.println(name + ": " + currency + price);
        }
    }
}
```
</details>

### Exercise 2: SAX Event Counting
**Task:** Use SAX to count total number of elements, attributes, and text nodes.

**Expected Output:**
```
Elements: 45
Attributes: 15
Text nodes: 30
```

<details>
<summary>💡 Solution (Java)</summary>

```java
public class Exercise2Solution extends DefaultHandler {
    private int elementCount = 0;
    private int attributeCount = 0;
    private int textNodeCount = 0;
    
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attrs) {
        elementCount++;
        attributeCount += attrs.getLength();
    }
    
    @Override
    public void characters(char[] ch, int start, int length) {
        String text = new String(ch, start, length).trim();
        if (!text.isEmpty()) {
            textNodeCount++;
        }
    }
    
    public static void main(String[] args) throws Exception {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        SAXParser parser = factory.newSAXParser();
        Exercise2Solution handler = new Exercise2Solution();
        
        parser.parse("ecommerce.xml", handler);
        
        System.out.println("Elements: " + handler.elementCount);
        System.out.println("Attributes: " + handler.attributeCount);
        System.out.println("Text nodes: " + handler.textNodeCount);
    }
}
```
</details>

### Exercise 3: StAX Selective Parsing
**Task:** Use StAX to extract only featured products (featured="true").

**Expected Output:**
```
Featured Products:
- iPhone 15 Pro ($999.00)
- The Great Gatsby ($12.99)
```

<details>
<summary>💡 Solution (Java)</summary>

```java
public class Exercise3Solution {
    public static void main(String[] args) throws Exception {
        XMLInputFactory factory = XMLInputFactory.newInstance();
        XMLStreamReader reader = factory.createXMLStreamReader(new FileInputStream("ecommerce.xml"));
        
        System.out.println("Featured Products:");
        
        while (reader.hasNext()) {
            if (reader.isStartElement() && "product".equals(reader.getLocalName())) {
                String featured = reader.getAttributeValue(null, "featured");
                
                if ("true".equals(featured)) {
                    // Parse this featured product
                    String name = "";
                    String price = "";
                    
                    while (reader.hasNext() && !(reader.isEndElement() && "product".equals(reader.getLocalName()))) {
                        reader.next();
                        if (reader.isStartElement()) {
                            if ("name".equals(reader.getLocalName())) {
                                name = reader.getElementText();
                            } else if ("price".equals(reader.getLocalName())) {
                                price = reader.getElementText();
                            }
                        }
                    }
                    
                    System.out.println("- " + name + " ($" + price + ")");
                }
            } else {
                reader.next();
            }
        }
        reader.close();
    }
}
```
</details>

---

## 🎯 Intermediate Exercises

### Exercise 4: Data Aggregation
**Task:** Calculate statistics from the XML:
- Total number of products per category
- Average price of all products
- Most expensive and cheapest products
- Total stock value

<details>
<summary>💡 Solution (Python)</summary>

```python
import xml.etree.ElementTree as ET
from collections import defaultdict

def analyze_ecommerce_data(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # Category mapping
    categories = {}
    for cat in root.findall(".//category"):
        cat_id = cat.get("id")
        categories[cat_id] = cat.get("name")
    
    for subcat in root.findall(".//subcategory"):
        subcat_id = subcat.get("id")
        parent = subcat.getparent()
        categories[subcat_id] = f"{parent.get('name')} - {subcat.get('name')}"
    
    # Analyze products
    products = root.findall(".//product")
    category_counts = defaultdict(int)
    prices = []
    min_product = None
    max_product = None
    min_price = float('inf')
    max_price = 0
    total_stock_value = 0
    
    for product in products:
        cat_id = product.get("category")
        category_counts[categories.get(cat_id, "Unknown")] += 1
        
        name = product.find("name").text
        price = float(product.find("price").text)
        stock = int(product.find("stock").text)
        
        prices.append(price)
        total_stock_value += price * stock
        
        if price < min_price:
            min_price = price
            min_product = name
        if price > max_price:
            max_price = price
            max_product = name
    
    # Results
    print("=== E-commerce Data Analysis ===")
    print("\nProducts per category:")
    for category, count in category_counts.items():
        print(f"  {category}: {count}")
    
    print(f"\nAverage price: ${sum(prices) / len(prices):.2f}")
    print(f"Cheapest: {min_product} (${min_price})")
    print(f"Most expensive: {max_product} (${max_price})")
    print(f"Total stock value: ${total_stock_value:.2f}")

if __name__ == "__main__":
    analyze_ecommerce_data("ecommerce.xml")
```
</details>

### Exercise 5: XML Transformation
**Task:** Transform the XML to create a simplified product catalog (remove descriptions, keep only essential info).

<details>
<summary>💡 Solution (Java)</summary>

```java
public class Exercise5Solution {
    public static void main(String[] args) throws Exception {
        // Parse original
        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document doc = builder.parse("ecommerce.xml");
        
        // Create new simplified document
        Document newDoc = builder.newDocument();
        Element catalog = newDoc.createElement("catalog");
        newDoc.appendChild(catalog);
        
        NodeList products = doc.getElementsByTagName("product");
        
        for (int i = 0; i < products.getLength(); i++) {
            Element originalProduct = (Element) products.item(i);
            
            // Create simplified product
            Element newProduct = newDoc.createElement("product");
            newProduct.setAttribute("id", originalProduct.getAttribute("id"));
            
            // Copy essential elements only
            String name = originalProduct.getElementsByTagName("name").item(0).getTextContent();
            String price = originalProduct.getElementsByTagName("price").item(0).getTextContent();
            String currency = ((Element)originalProduct.getElementsByTagName("price").item(0)).getAttribute("currency");
            String stock = originalProduct.getElementsByTagName("stock").item(0).getTextContent();
            
            Element nameEl = newDoc.createElement("name");
            nameEl.setTextContent(name);
            newProduct.appendChild(nameEl);
            
            Element priceEl = newDoc.createElement("price");
            priceEl.setAttribute("currency", currency);
            priceEl.setTextContent(price);
            newProduct.appendChild(priceEl);
            
            Element stockEl = newDoc.createElement("stock");
            stockEl.setTextContent(stock);
            newProduct.appendChild(stockEl);
            
            catalog.appendChild(newProduct);
        }
        
        // Write to new file
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        
        DOMSource source = new DOMSource(newDoc);
        StreamResult result = new StreamResult(new File("simplified_catalog.xml"));
        transformer.transform(source, result);
        
        System.out.println("Simplified catalog created: simplified_catalog.xml");
    }
}
```
</details>

### Exercise 6: Memory Efficient Processing
**Task:** Process the XML using streaming parser to find all orders with total > $500 without loading entire document into memory.

<details>
<summary>💡 Solution (Java - StAX)</summary>

```java
public class Exercise6Solution {
    public static void main(String[] args) throws Exception {
        XMLInputFactory factory = XMLInputFactory.newInstance();
        XMLStreamReader reader = factory.createXMLStreamReader(new FileInputStream("ecommerce.xml"));
        
        System.out.println("High-value orders (>$500):");
        
        while (reader.hasNext()) {
            if (reader.isStartElement() && "order".equals(reader.getLocalName())) {
                String orderId = reader.getAttributeValue(null, "id");
                String customer = reader.getAttributeValue(null, "customer");
                String date = reader.getAttributeValue(null, "date");
                
                // Find total for this order
                double total = 0;
                while (reader.hasNext() && !(reader.isEndElement() && "order".equals(reader.getLocalName()))) {
                    reader.next();
                    if (reader.isStartElement() && "total".equals(reader.getLocalName())) {
                        total = Double.parseDouble(reader.getElementText());
                    }
                }
                
                if (total > 500) {
                    System.out.printf("Order %s: %s on %s - $%.2f%n", 
                        orderId, customer, date, total);
                }
            } else {
                reader.next();
            }
        }
        reader.close();
    }
}
```
</details>

---

## 🎯 Advanced Exercises

### Exercise 7: Custom Validation
**Task:** Create a custom validator that checks:
- All product prices are between $1 and $10,000
- Stock quantities are non-negative integers
- All order totals match the sum of item prices

<details>
<summary>💡 Solution (Java)</summary>

```java
public class Exercise7Solution {
    public static class ValidationError {
        String element;
        String message;
        
        public ValidationError(String element, String message) {
            this.element = element;
            this.message = message;
        }
        
        @Override
        public String toString() {
            return element + ": " + message;
        }
    }
    
    public static List<ValidationError> validateEcommerceXML(Document doc) {
        List<ValidationError> errors = new ArrayList<>();
        
        // Validate products
        NodeList products = doc.getElementsByTagName("product");
        for (int i = 0; i < products.getLength(); i++) {
            Element product = (Element) products.item(i);
            String productId = product.getAttribute("id");
            
            // Validate price
            Element priceEl = (Element) product.getElementsByTagName("price").item(0);
            double price = Double.parseDouble(priceEl.getTextContent());
            if (price < 1 || price > 10000) {
                errors.add(new ValidationError("Product " + productId, 
                    "Price $" + price + " is outside valid range ($1-$10,000)"));
            }
            
            // Validate stock
            Element stockEl = (Element) product.getElementsByTagName("stock").item(0);
            try {
                int stock = Integer.parseInt(stockEl.getTextContent());
                if (stock < 0) {
                    errors.add(new ValidationError("Product " + productId, 
                        "Stock " + stock + " cannot be negative"));
                }
            } catch (NumberFormatException e) {
                errors.add(new ValidationError("Product " + productId, 
                    "Stock must be a valid integer"));
            }
        }
        
        // Validate orders
        NodeList orders = doc.getElementsByTagName("order");
        for (int i = 0; i < orders.getLength(); i++) {
            Element order = (Element) orders.item(i);
            String orderId = order.getAttribute("id");
            
            // Calculate expected total
            double expectedTotal = 0;
            NodeList items = order.getElementsByTagName("item");
            for (int j = 0; j < items.getLength(); j++) {
                Element item = (Element) items.item(j);
                String productId = item.getAttribute("product");
                int quantity = Integer.parseInt(item.getAttribute("quantity"));
                
                // Find product price
                double productPrice = findProductPrice(doc, productId);
                expectedTotal += productPrice * quantity;
            }
            
            // Check actual total
            Element totalEl = (Element) order.getElementsByTagName("total").item(0);
            double actualTotal = Double.parseDouble(totalEl.getTextContent());
            
            if (Math.abs(expectedTotal - actualTotal) > 0.01) { // Allow small rounding differences
                errors.add(new ValidationError("Order " + orderId, 
                    String.format("Total mismatch: expected $%.2f, got $%.2f", 
                        expectedTotal, actualTotal)));
            }
        }
        
        return errors;
    }
    
    private static double findProductPrice(Document doc, String productId) {
        NodeList products = doc.getElementsByTagName("product");
        for (int i = 0; i < products.getLength(); i++) {
            Element product = (Element) products.item(i);
            if (productId.equals(product.getAttribute("id"))) {
                Element priceEl = (Element) product.getElementsByTagName("price").item(0);
                return Double.parseDouble(priceEl.getTextContent());
            }
        }
        return 0; // Product not found
    }
    
    public static void main(String[] args) throws Exception {
        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document doc = builder.parse("ecommerce.xml");
        
        List<ValidationError> errors = validateEcommerceXML(doc);
        
        if (errors.isEmpty()) {
            System.out.println("✅ Validation passed - no errors found!");
        } else {
            System.out.println("❌ Validation failed with " + errors.size() + " error(s):");
            for (ValidationError error : errors) {
                System.out.println("  - " + error);
            }
        }
    }
}
```
</details>

### Exercise 8: Security Assessment
**Task:** Create a security scanner that detects potential XXE vulnerabilities in XML parsers.

<details>
<summary>💡 Solution (Java)</summary>

```java
public class Exercise8Solution {
    
    public static void testParserSecurity() {
        String xxeXML = """
            <?xml version="1.0" encoding="UTF-8"?>
            <!DOCTYPE test [
              <!ENTITY xxe SYSTEM "file:///etc/passwd">
            ]>
            <test>&xxe;</test>
            """;
        
        System.out.println("=== XML Parser Security Test ===\n");
        
        // Test 1: Insecure DOM Parser
        System.out.println("1. Testing INSECURE DOM Parser:");
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xxeXML.getBytes()));
            
            String content = doc.getDocumentElement().getTextContent();
            if (content.contains("root:") || content.contains("daemon:")) {
                System.out.println("❌ VULNERABLE: XXE attack successful - file content leaked");
                System.out.println("   Content preview: " + content.substring(0, Math.min(100, content.length())) + "...");
            } else {
                System.out.println("✅ SAFE: XXE attack blocked");
            }
        } catch (Exception e) {
            System.out.println("✅ SAFE: Parser rejected malicious XML - " + e.getMessage());
        }
        
        // Test 2: Secure DOM Parser
        System.out.println("\n2. Testing SECURE DOM Parser:");
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            // Security features
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
            factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xxeXML.getBytes()));
            
            System.out.println("❌ ISSUE: Parser allowed DOCTYPE despite security settings");
        } catch (Exception e) {
            System.out.println("✅ SAFE: Secure parser blocked malicious XML - " + e.getMessage());
        }
        
        // Test 3: Billion Laughs Attack (XML Bomb)
        System.out.println("\n3. Testing XML Bomb Protection:");
        String xmlBomb = """
            <?xml version="1.0"?>
            <!DOCTYPE lolz [
              <!ENTITY lol "lol">
              <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
              <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
              <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
            ]>
            <lolz>&lol4;</lolz>
            """;
        
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            // Set entity expansion limit
            factory.setAttribute("http://www.oracle.com/xml/jaxp/properties/entityExpansionLimit", "100");
            
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xmlBomb.getBytes()));
            
            System.out.println("❌ VULNERABLE: XML bomb was not blocked");
        } catch (Exception e) {
            System.out.println("✅ SAFE: XML bomb blocked - " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        testParserSecurity();
    }
}
```
</details>

---

## 🏆 Challenge Exercises

### Challenge 1: Large File Processing
**Task:** Create a streaming parser that can process a 1GB XML file with millions of product records, extracting only products in the "Electronics" category with stock > 100, while using less than 100MB of memory.

### Challenge 2: XML Merge Tool
**Task:** Create a tool that merges multiple XML files with the same structure, handling conflicts (duplicate IDs, different values) and maintaining sorted order.

### Challenge 3: Real-time XML Stream Processor
**Task:** Build a system that processes infinite XML streams (like RSS feeds), maintaining a sliding window of the last 1000 items while extracting real-time analytics.

---

## 📊 Self-Assessment Checklist

After completing the exercises, check your understanding:

### Parsing Concepts ✅
- [ ] Can explain difference between DOM, SAX, and StAX
- [ ] Understand when to use each parser type
- [ ] Know memory implications of different approaches
- [ ] Can handle parsing errors gracefully

### Performance ✅
- [ ] Can optimize parsers for large files
- [ ] Understand memory usage patterns
- [ ] Know techniques for streaming processing
- [ ] Can implement resource limits

### Security ✅
- [ ] Recognize XXE vulnerability patterns
- [ ] Can configure secure parsers
- [ ] Understand input validation importance
- [ ] Know DoS attack prevention techniques

### Real-world Skills ✅
- [ ] Can validate XML against schemas
- [ ] Handle encoding issues properly
- [ ] Implement proper error handling
- [ ] Create maintainable parsing code

---

**🎉 Congratulations!** You've completed the XML parsing exercises. These practical challenges prepare you for real-world XML processing scenarios and technical interviews!