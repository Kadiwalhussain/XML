# 🔄 XSLT (XSL Transformations) - Transforming XML Documents

## What is XSLT?

**XSLT (Extensible Stylesheet Language Transformations)** is a language for transforming XML documents into other formats like HTML, text, or different XML structures. Think of it as a powerful template system that can restructure, filter, sort, and format XML data.

## Why Use XSLT?

### ✅ Benefits:
- **Data Transformation**: Convert XML to HTML, JSON, text, or other XML formats
- **Separation of Concerns**: Keep data (XML) separate from presentation (XSLT)
- **Reusability**: One XML document can be transformed multiple ways
- **Dynamic Content**: Generate different outputs based on data
- **Standards-Based**: W3C standard with wide tool support

### Common Use Cases:
- Converting XML data to HTML web pages
- Generating reports from XML data
- Data migration between XML formats
- Creating RSS feeds from XML content
- Generating configuration files

## XSLT Basics

### Simple Transformation Example
```xml
<!-- books.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<library>
    <book id="B001" format="paperback">
        <title>XML Processing Guide</title>
        <author>John Smith</author>
        <price>29.99</price>
        <year>2024</year>
    </book>
    <book id="B002" format="ebook">
        <title>Advanced XML Techniques</title>
        <author>Jane Doe</author>
        <price>19.99</price>
        <year>2024</year>
    </book>
</library>
```

```xsl
<!-- books-to-html.xsl -->
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Output format -->
    <xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01//EN"/>

    <!-- Root template -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Book Library</title>
                <style>
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Our Book Collection</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Format</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="library/book">
                            <tr>
                                <td><xsl:value-of select="@id"/></td>
                                <td><xsl:value-of select="title"/></td>
                                <td><xsl:value-of select="author"/></td>
                                <td>$<xsl:value-of select="price"/></td>
                                <td><xsl:value-of select="@format"/></td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
```

### Output Result:
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
    <title>Book Library</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Our Book Collection</h1>
    <table>
        <thead>
            <tr><th>ID</th><th>Title</th><th>Author</th><th>Price</th><th>Format</th></tr>
        </thead>
        <tbody>
            <tr><td>B001</td><td>XML Processing Guide</td><td>John Smith</td><td>$29.99</td><td>paperback</td></tr>
            <tr><td>B002</td><td>Advanced XML Techniques</td><td>Jane Doe</td><td>$19.99</td><td>ebook</td></tr>
        </tbody>
    </table>
</body>
</html>
```

## Core XSLT Elements

### 1. Templates and Matching
```xsl
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Match root element -->
    <xsl:template match="/">
        <html>
            <head><title>Product Catalog</title></head>
            <body>
                <xsl:apply-templates select="catalog/product"/>
            </body>
        </html>
    </xsl:template>

    <!-- Match product elements -->
    <xsl:template match="product">
        <div class="product">
            <h3><xsl:value-of select="name"/></h3>
            <p>Price: $<xsl:value-of select="price"/></p>
            <p>Category: <xsl:value-of select="category"/></p>
            <xsl:if test="@featured = 'true'">
                <p><strong>Featured Product!</strong></p>
            </xsl:if>
        </div>
    </xsl:template>

    <!-- Match specific product categories -->
    <xsl:template match="product[category='electronics']">
        <div class="product electronics">
            <h3>🔌 <xsl:value-of select="name"/></h3>
            <p>Price: $<xsl:value-of select="price"/></p>
            <p>Tech Specs: <xsl:value-of select="specs"/></p>
        </div>
    </xsl:template>

</xsl:stylesheet>
```

### 2. Loops and Iteration
```xsl
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
            <body>
                <h1>Employee Directory</h1>
                
                <!-- Simple for-each loop -->
                <ul>
                    <xsl:for-each select="company/employees/employee">
                        <li>
                            <xsl:value-of select="first-name"/>
                            <xsl:text> </xsl:text>
                            <xsl:value-of select="last-name"/>
                            (<xsl:value-of select="department"/>)
                        </li>
                    </xsl:for-each>
                </ul>

                <!-- Sorted iteration -->
                <h2>Employees by Department</h2>
                <ul>
                    <xsl:for-each select="company/employees/employee">
                        <xsl:sort select="department"/>
                        <xsl:sort select="last-name"/>
                        <li>
                            <strong><xsl:value-of select="department"/>:</strong>
                            <xsl:value-of select="last-name"/>, 
                            <xsl:value-of select="first-name"/>
                        </li>
                    </xsl:for-each>
                </ul>

            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
```

### 3. Conditional Logic
```xsl
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="product">
        <div class="product">
            <h3><xsl:value-of select="name"/></h3>
            
            <!-- Simple if condition -->
            <xsl:if test="@featured = 'true'">
                <span class="featured-badge">⭐ Featured</span>
            </xsl:if>

            <!-- Choose/when/otherwise (like switch/case) -->
            <xsl:choose>
                <xsl:when test="price &lt; 10">
                    <p class="price budget">Budget: $<xsl:value-of select="price"/></p>
                </xsl:when>
                <xsl:when test="price &lt; 50">
                    <p class="price mid-range">Mid-range: $<xsl:value-of select="price"/></p>
                </xsl:when>
                <xsl:when test="price &lt; 100">
                    <p class="price premium">Premium: $<xsl:value-of select="price"/></p>
                </xsl:when>
                <xsl:otherwise>
                    <p class="price luxury">Luxury: $<xsl:value-of select="price"/></p>
                </xsl:otherwise>
            </xsl:choose>

            <!-- Complex conditions -->
            <xsl:if test="stock-quantity &gt; 0 and @available = 'true'">
                <button>Add to Cart</button>
            </xsl:if>

            <xsl:if test="stock-quantity = 0 or @available = 'false'">
                <p class="out-of-stock">Out of Stock</p>
            </xsl:if>

        </div>
    </xsl:template>

</xsl:stylesheet>
```

## Advanced XSLT Features

### 1. Variables and Parameters
```xsl
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Global parameter (can be passed from outside) -->
    <xsl:param name="show-prices" select="'true'"/>
    <xsl:param name="currency" select="'USD'"/>

    <!-- Global variable -->
    <xsl:variable name="company-name" select="'Acme Corporation'"/>
    <xsl:variable name="total-products" select="count(//product)"/>

    <xsl:template match="/">
        <html>
            <head>
                <title><xsl:value-of select="$company-name"/> - Catalog</title>
            </head>
            <body>
                <h1><xsl:value-of select="$company-name"/> Product Catalog</h1>
                <p>Total Products: <xsl:value-of select="$total-products"/></p>
                
                <xsl:apply-templates select="catalog/product"/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="product">
        <!-- Local variable -->
        <xsl:variable name="discount">
            <xsl:choose>
                <xsl:when test="@featured = 'true'">0.10</xsl:when>
                <xsl:otherwise>0.05</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>

        <div class="product">
            <h3><xsl:value-of select="name"/></h3>
            
            <xsl:if test="$show-prices = 'true'">
                <p>Original Price: <xsl:value-of select="price"/> <xsl:value-of select="$currency"/></p>
                <p>Discounted Price: 
                    <xsl:value-of select="format-number(price * (1 - $discount), '#.##')"/> 
                    <xsl:value-of select="$currency"/>
                </p>
            </xsl:if>
        </div>
    </xsl:template>

</xsl:stylesheet>
```

### 2. Functions and String Manipulation
```xsl
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="employee">
        <div class="employee">
            <!-- String functions -->
            <h3>
                <!-- Concatenate strings -->
                <xsl:value-of select="concat(first-name, ' ', last-name)"/>
            </h3>
            
            <!-- Substring operations -->
            <p>Initials: 
                <xsl:value-of select="substring(first-name, 1, 1)"/>
                <xsl:value-of select="substring(last-name, 1, 1)"/>
            </p>
            
            <!-- String length and position -->
            <p>Name length: <xsl:value-of select="string-length(first-name)"/> characters</p>
            
            <!-- Case conversion -->
            <p>Email: 
                <xsl:value-of select="translate(
                    concat(first-name, '.', last-name, '@company.com'),
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    'abcdefghijklmnopqrstuvwxyz'
                )"/>
            </p>

            <!-- Contains function -->
            <xsl:if test="contains(department, 'Engineering')">
                <p>🔧 Engineering Department</p>
            </xsl:if>

            <!-- Normalize space -->
            <p>Clean Department: <xsl:value-of select="normalize-space(department)"/></p>

        </div>
    </xsl:template>

</xsl:stylesheet>
```

### 3. Grouping and Aggregation
```xsl
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:key name="products-by-category" match="product" use="category"/>

    <xsl:template match="/">
        <html>
            <body>
                <h1>Products by Category</h1>

                <!-- Group by category using Muenchian method -->
                <xsl:for-each select="catalog/product[generate-id() = 
                                    generate-id(key('products-by-category', category)[1])]">
                    <xsl:sort select="category"/>
                    
                    <xsl:variable name="category" select="category"/>
                    
                    <h2><xsl:value-of select="$category"/></h2>
                    <ul>
                        <xsl:for-each select="key('products-by-category', $category)">
                            <xsl:sort select="name"/>
                            <li>
                                <xsl:value-of select="name"/> - 
                                $<xsl:value-of select="price"/>
                            </li>
                        </xsl:for-each>
                    </ul>
                    
                    <!-- Calculate category totals -->
                    <p>
                        <strong>Category Summary:</strong>
                        <xsl:value-of select="count(key('products-by-category', $category))"/> products, 
                        Total value: $<xsl:value-of select="sum(key('products-by-category', $category)/price)"/>
                    </p>
                </xsl:for-each>

                <!-- Overall statistics -->
                <h2>Overall Statistics</h2>
                <ul>
                    <li>Total Products: <xsl:value-of select="count(catalog/product)"/></li>
                    <li>Total Value: $<xsl:value-of select="sum(catalog/product/price)"/></li>
                    <li>Average Price: $<xsl:value-of select="format-number(sum(catalog/product/price) div count(catalog/product), '#.##')"/></li>
                    <li>Most Expensive: $<xsl:value-of select="catalog/product[not(price &lt; ../product/price)]/price"/></li>
                    <li>Least Expensive: $<xsl:value-of select="catalog/product[not(price &gt; ../product/price)]/price"/></li>
                </ul>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
```

## Practical XSLT Examples

### Example 1: XML to JSON Conversion
```xml
<!-- data.xml -->
<customers>
    <customer id="C001">
        <name>John Doe</name>
        <email>john@example.com</email>
        <orders>
            <order id="O001" total="99.99"/>
            <order id="O002" total="149.50"/>
        </orders>
    </customer>
</customers>
```

```xsl
<!-- xml-to-json.xsl -->
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>

    <xsl:template match="/">
{
  "customers": [
    <xsl:for-each select="customers/customer">
      <xsl:if test="position() > 1">,</xsl:if>
    {
      "id": "<xsl:value-of select="@id"/>",
      "name": "<xsl:value-of select="name"/>",
      "email": "<xsl:value-of select="email"/>",
      "orders": [
        <xsl:for-each select="orders/order">
          <xsl:if test="position() > 1">,</xsl:if>
        {
          "id": "<xsl:value-of select="@id"/>",
          "total": <xsl:value-of select="@total"/>
        }
        </xsl:for-each>
      ]
    }
    </xsl:for-each>
  ]
}
    </xsl:template>

</xsl:stylesheet>
```

### Example 2: Report Generation
```xml
<!-- sales-data.xml -->
<sales-report period="Q1-2024">
    <region name="North">
        <sale date="2024-01-15" amount="1200.00" product="Widget A"/>
        <sale date="2024-02-10" amount="800.50" product="Widget B"/>
        <sale date="2024-03-05" amount="1500.75" product="Widget C"/>
    </region>
    <region name="South">
        <sale date="2024-01-20" amount="950.00" product="Widget A"/>
        <sale date="2024-02-15" amount="1100.25" product="Widget B"/>
    </region>
</sales-report>
```

```xsl
<!-- sales-report.xsl -->
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Sales Report - <xsl:value-of select="sales-report/@period"/></title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .region { margin-bottom: 30px; border: 1px solid #ccc; padding: 15px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .summary { background-color: #e8f4fd; padding: 10px; margin: 10px 0; }
                    .total { font-weight: bold; color: #2c5aa0; }
                </style>
            </head>
            <body>
                <h1>Sales Report - <xsl:value-of select="sales-report/@period"/></h1>
                
                <xsl:for-each select="sales-report/region">
                    <div class="region">
                        <h2><xsl:value-of select="@name"/> Region</h2>
                        
                        <table>
                            <thead>
                                <tr><th>Date</th><th>Product</th><th>Amount</th></tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="sale">
                                    <xsl:sort select="@date"/>
                                    <tr>
                                        <td><xsl:value-of select="@date"/></td>
                                        <td><xsl:value-of select="@product"/></td>
                                        <td>$<xsl:value-of select="format-number(@amount, '#,##0.00')"/></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                        
                        <div class="summary">
                            <p>Region Summary:</p>
                            <ul>
                                <li>Total Sales: <span class="total">$<xsl:value-of select="format-number(sum(sale/@amount), '#,##0.00')"/></span></li>
                                <li>Number of Sales: <xsl:value-of select="count(sale)"/></li>
                                <li>Average Sale: $<xsl:value-of select="format-number(sum(sale/@amount) div count(sale), '#,##0.00')"/></li>
                            </ul>
                        </div>
                    </div>
                </xsl:for-each>

                <!-- Overall totals -->
                <div class="summary">
                    <h3>Overall Summary</h3>
                    <ul>
                        <li>Total Company Sales: <span class="total">$<xsl:value-of select="format-number(sum(//sale/@amount), '#,##0.00')"/></span></li>
                        <li>Total Transactions: <xsl:value-of select="count(//sale)"/></li>
                        <li>Average Transaction: $<xsl:value-of select="format-number(sum(//sale/@amount) div count(//sale), '#,##0.00')"/></li>
                    </ul>
                </div>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
```

### Example 3: RSS Feed Generation
```xsl
<!-- blog-to-rss.xsl -->
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <rss version="2.0">
            <channel>
                <title><xsl:value-of select="blog/title"/></title>
                <link><xsl:value-of select="blog/url"/></link>
                <description><xsl:value-of select="blog/description"/></description>
                <language>en-us</language>
                <pubDate><xsl:value-of select="blog/last-updated"/></pubDate>

                <xsl:for-each select="blog/posts/post">
                    <xsl:sort select="date" order="descending"/>
                    
                    <item>
                        <title><xsl:value-of select="title"/></title>
                        <link><xsl:value-of select="../../url"/>/post/<xsl:value-of select="@id"/></link>
                        <description><xsl:value-of select="summary"/></description>
                        <pubDate><xsl:value-of select="date"/></pubDate>
                        <guid><xsl:value-of select="../../url"/>/post/<xsl:value-of select="@id"/></guid>
                        
                        <xsl:if test="category">
                            <category><xsl:value-of select="category"/></category>
                        </xsl:if>
                    </item>
                </xsl:for-each>
            </channel>
        </rss>
    </xsl:template>

</xsl:stylesheet>
```

## Running XSLT Transformations

### 1. Command Line Tools
```bash
# Using xsltproc (Linux/Mac)
xsltproc stylesheet.xsl input.xml > output.html

# Using Saxon (Java-based)
java -jar saxon9he.jar -s:input.xml -xsl:stylesheet.xsl -o:output.html

# Using Microsoft's MSXSL (Windows)
msxsl input.xml stylesheet.xsl -o output.html
```

### 2. Programming Languages

#### Java
```java
import javax.xml.transform.*;
import javax.xml.transform.stream.*;
import java.io.*;

public class XSLTProcessor {
    public static void transform(String xmlFile, String xslFile, String outputFile) {
        try {
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer(new StreamSource(xslFile));
            
            // Set parameters
            transformer.setParameter("show-prices", "true");
            transformer.setParameter("currency", "EUR");
            
            transformer.transform(
                new StreamSource(xmlFile),
                new StreamResult(new File(outputFile))
            );
            
            System.out.println("Transformation completed!");
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### Python
```python
from lxml import etree

def transform_xml(xml_file, xsl_file, output_file):
    try:
        # Load XML and XSL
        xml_doc = etree.parse(xml_file)
        xsl_doc = etree.parse(xsl_file)
        
        # Create transformer
        transformer = etree.XSLT(xsl_doc)
        
        # Transform with parameters
        result = transformer(xml_doc, 
                           show_prices=etree.XSLT.strparam('true'),
                           currency=etree.XSLT.strparam('USD'))
        
        # Save result
        with open(output_file, 'wb') as f:
            f.write(etree.tostring(result, pretty_print=True))
            
        print("Transformation completed!")
        
    except Exception as e:
        print(f"Error: {e}")
```

#### JavaScript (Node.js)
```javascript
const xslt = require('xslt');
const fs = require('fs');

function transformXML(xmlFile, xslFile, outputFile) {
    try {
        const xmlSource = fs.readFileSync(xmlFile, 'utf8');
        const xslSource = fs.readFileSync(xslFile, 'utf8');
        
        const result = xslt(xmlSource, xslSource, {
            'show-prices': 'true',
            'currency': 'USD'
        });
        
        fs.writeFileSync(outputFile, result);
        console.log('Transformation completed!');
        
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## XSLT Best Practices

### ✅ Do:

#### 1. Use Meaningful Template Names
```xsl
<!-- ✅ Good -->
<xsl:template name="format-currency">
    <xsl:param name="amount"/>
    <xsl:param name="currency" select="'USD'"/>
    $<xsl:value-of select="format-number($amount, '#,##0.00')"/>
</xsl:template>

<!-- ❌ Avoid -->
<xsl:template name="temp1">
    <!-- unclear purpose -->
</xsl:template>
```

#### 2. Organize Complex Stylesheets
```xsl
<!-- main.xsl -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:include href="common-functions.xsl"/>
    <xsl:include href="product-templates.xsl"/>
    <xsl:include href="customer-templates.xsl"/>
    
    <!-- Main logic here -->
</xsl:stylesheet>
```

#### 3. Use Comments and Documentation
```xsl
<!--
    Template: product-summary
    Purpose: Generate a summary card for each product
    Parameters: 
      - show-price: boolean (default: true)
      - currency: string (default: 'USD')
    Author: John Smith
    Modified: 2024-01-15
-->
<xsl:template match="product" name="product-summary">
    <xsl:param name="show-price" select="'true'"/>
    <!-- Template implementation -->
</xsl:template>
```

### ❌ Don't:

#### 1. Create Overly Complex Templates
```xsl
<!-- ❌ Too complex -->
<xsl:template match="product">
    <xsl:choose>
        <xsl:when test="category = 'electronics'">
            <xsl:choose>
                <xsl:when test="price &lt; 100">
                    <xsl:choose>
                        <xsl:when test="@featured = 'true'">
                            <!-- Very nested logic -->
                        </xsl:when>
                    </xsl:choose>
                </xsl:when>
            </xsl:choose>
        </xsl:when>
    </xsl:choose>
</xsl:template>

<!-- ✅ Better: Break into smaller templates -->
<xsl:template match="product[@featured='true' and category='electronics' and price &lt; 100]">
    <!-- Specific template for this case -->
</xsl:template>
```

## Common XSLT Patterns

### 1. Identity Transform (Copy Everything)
```xsl
<xsl:template match="@*|node()">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>

<!-- Override specific elements -->
<xsl:template match="price">
    <price currency="USD">
        <xsl:value-of select="format-number(., '#.00')"/>
    </price>
</xsl:template>
```

### 2. Filtering Content
```xsl
<!-- Only include products over $50 -->
<xsl:template match="catalog">
    <filtered-catalog>
        <xsl:apply-templates select="product[price &gt; 50]"/>
    </filtered-catalog>
</xsl:template>
```

### 3. Cross-References
```xsl
<xsl:key name="author-by-id" match="author" use="@id"/>

<xsl:template match="book">
    <div class="book">
        <h3><xsl:value-of select="title"/></h3>
        <p>By: <xsl:value-of select="key('author-by-id', @author-ref)/name"/></p>
    </div>
</xsl:template>
```

## Debugging XSLT

### 1. Debug Output
```xsl
<xsl:template match="product">
    <!-- Debug information -->
    <xsl:comment>
        Processing product: <xsl:value-of select="name"/>
        Price: <xsl:value-of select="price"/>
        Category: <xsl:value-of select="category"/>
    </xsl:comment>
    
    <!-- Regular processing -->
    <div class="product">
        <xsl:value-of select="name"/>
    </div>
</xsl:template>
```

### 2. Conditional Debugging
```xsl
<xsl:param name="debug" select="'false'"/>

<xsl:template match="product">
    <xsl:if test="$debug = 'true'">
        <p style="color: red;">DEBUG: Processing <xsl:value-of select="@id"/></p>
    </xsl:if>
    
    <!-- Normal processing -->
</xsl:template>
```

## XSLT Limitations

### What XSLT Cannot Do:
- Generate random numbers
- Access external databases directly
- Perform complex mathematical operations
- Handle binary data
- Create recursive loops easily
- Access current date/time (XSLT 1.0)

### Workarounds:
- Use extension functions for advanced features
- Pre-process data in other languages
- Use XSLT 2.0/3.0 for more capabilities
- Pass calculated values as parameters

## Next Steps

Now that you understand XSLT, you're ready to learn about:
- **XML Validation Techniques** - Comprehensive validation strategies
- **XML Processing with Programming Languages** - Parsing and manipulation
- **Advanced XML Security** - Protecting against vulnerabilities

## Practice Exercise

Create an XSLT stylesheet that transforms an employee XML file into:

1. **HTML Directory Page** with employee cards showing photo, name, department, and contact info
2. **CSV Export** for spreadsheet import
3. **Organization Chart** showing department hierarchy
4. **Email List** grouped by department

**XML Structure**:
```xml
<company>
    <employees>
        <employee id="E001" department="Engineering">
            <name>John Smith</name>
            <title>Senior Developer</title>
            <email>john@company.com</email>
            <phone>555-0123</phone>
            <hire-date>2022-03-15</hire-date>
        </employee>
    </employees>
    <departments>
        <department id="Engineering" manager="E001"/>
    </departments>
</company>
```

**Challenge**: Create responsive HTML with CSS, handle missing data gracefully, and add sorting/filtering options!

---

**🎯 Key Takeaways:**
- XSLT transforms XML into other formats using template-based processing
- Templates match XML patterns and generate output
- Variables, parameters, and functions enable complex transformations
- Grouping and sorting create organized output
- XSLT separates data from presentation logic

**➡️ Next:** Learn comprehensive XML validation techniques!