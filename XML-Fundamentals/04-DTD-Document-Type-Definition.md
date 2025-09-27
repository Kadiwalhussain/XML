# 📜 DTD (Document Type Definition) - Defining XML Structure

## What is a DTD?

**DTD (Document Type Definition)** is a schema language that defines the structure, elements, and attributes allowed in an XML document. Think of it as a blueprint or contract that specifies what elements can appear, in what order, and with what attributes.

## Why Use DTDs?

### ✅ Benefits:
- **Validation**: Ensure XML documents follow a specific structure
- **Documentation**: Clearly define what elements and attributes are allowed
- **Standardization**: Create consistent document formats across systems
- **Error Prevention**: Catch structural errors early

### ❌ Limitations:
- Limited data type support (compared to XML Schema)
- No namespace awareness
- Older technology (XML Schema is more modern)
- Less flexible than newer schema languages

## DTD Syntax Overview

### Basic Structure
```xml
<!DOCTYPE root-element [
    <!ELEMENT element-name element-content>
    <!ATTLIST element-name attribute-name attribute-type default-value>
]>
```

### Internal vs External DTDs
```xml
<!-- Internal DTD -->
<!DOCTYPE books [
    <!ELEMENT books (book+)>
    <!ELEMENT book (title, author)>
    <!ELEMENT title (#PCDATA)>
    <!ELEMENT author (#PCDATA)>
]>
<books>
    <book>
        <title>XML Guide</title>
        <author>John Smith</author>
    </book>
</books>
```

```xml
<!-- External DTD -->
<!DOCTYPE books SYSTEM "books.dtd">
<books>
    <book>
        <title>XML Guide</title>
        <author>John Smith</author>
    </book>
</books>
```

## Element Declarations

### 1. Empty Elements
```xml
<!ELEMENT br EMPTY>
<!ELEMENT hr EMPTY>
<!ELEMENT img EMPTY>

<!-- Usage -->
<br/>
<hr/>
<img src="image.jpg" alt="Description"/>
```

### 2. Text-Only Elements (PCDATA)
```xml
<!ELEMENT title (#PCDATA)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT description (#PCDATA)>

<!-- Usage -->
<title>XML Processing Guide</title>
<author>John Smith</author>
<description>A comprehensive guide to XML processing techniques.</description>
```

### 3. Mixed Content (Text + Elements)
```xml
<!ELEMENT paragraph (#PCDATA | emphasis | strong | link)*>
<!ELEMENT emphasis (#PCDATA)>
<!ELEMENT strong (#PCDATA)>
<!ELEMENT link (#PCDATA)>

<!-- Usage -->
<paragraph>
    This is a <emphasis>mixed content</emphasis> paragraph with 
    <strong>bold text</strong> and a <link>hyperlink</link>.
</paragraph>
```

### 4. Element-Only Content
```xml
<!ELEMENT book (title, author, isbn, price, description?)>
<!ELEMENT title (#PCDATA)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT isbn (#PCDATA)>
<!ELEMENT price (#PCDATA)>
<!ELEMENT description (#PCDATA)>

<!-- Usage -->
<book>
    <title>XML Fundamentals</title>
    <author>Jane Doe</author>
    <isbn>978-0123456789</isbn>
    <price>29.99</price>
    <description>Learn XML from basics to advanced topics.</description>
</book>
```

## Content Model Operators

### 1. Sequence (,)
Elements must appear in the specified order:
```xml
<!ELEMENT book (title, author, publisher, date)>

<!-- ✅ Valid -->
<book>
    <title>XML Guide</title>
    <author>John Smith</author>
    <publisher>Tech Books</publisher>
    <date>2024</date>
</book>

<!-- ❌ Invalid - wrong order -->
<book>
    <author>John Smith</author>  <!-- Should come after title -->
    <title>XML Guide</title>
    <publisher>Tech Books</publisher>
    <date>2024</date>
</book>
```

### 2. Choice (|)
Only one of the specified elements can appear:
```xml
<!ELEMENT contact (email | phone | address)>

<!-- ✅ Valid - only email -->
<contact>
    <email>john@example.com</email>
</contact>

<!-- ✅ Valid - only phone -->
<contact>
    <phone>555-1234</phone>
</contact>

<!-- ❌ Invalid - multiple choices -->
<contact>
    <email>john@example.com</email>
    <phone>555-1234</phone>  <!-- Can't have both -->
</contact>
```

### 3. Optional (?)
Element can appear zero or one time:
```xml
<!ELEMENT book (title, author, subtitle?, description?)>

<!-- ✅ Valid - with optional elements -->
<book>
    <title>XML Guide</title>
    <author>John Smith</author>
    <subtitle>A Beginner's Approach</subtitle>
    <description>Learn XML step by step.</description>
</book>

<!-- ✅ Valid - without optional elements -->
<book>
    <title>XML Guide</title>
    <author>John Smith</author>
</book>
```

### 4. One or More (+)
Element must appear at least once:
```xml
<!ELEMENT library (book+)>
<!ELEMENT book (title, author+)>  <!-- Book must have at least one author -->

<!-- ✅ Valid -->
<library>
    <book>
        <title>XML Processing</title>
        <author>John Smith</author>
        <author>Jane Doe</author>  <!-- Multiple authors OK -->
    </book>
    <book>
        <title>Advanced XML</title>
        <author>Bob Wilson</author>
    </book>
</library>

<!-- ❌ Invalid - no books -->
<library>
</library>
```

### 5. Zero or More (*)
Element can appear any number of times (including zero):
```xml
<!ELEMENT article (title, author, section*)>
<!ELEMENT section (heading, paragraph*)>

<!-- ✅ Valid - with sections -->
<article>
    <title>XML Tutorial</title>
    <author>John Smith</author>
    <section>
        <heading>Introduction</heading>
        <paragraph>XML basics...</paragraph>
        <paragraph>Getting started...</paragraph>
    </section>
    <section>
        <heading>Advanced Topics</heading>
    </section>
</article>

<!-- ✅ Valid - no sections -->
<article>
    <title>Short Article</title>
    <author>Jane Doe</author>
</article>
```

## Complex Content Models

### 1. Nested Groups
```xml
<!ELEMENT book (metadata, (content | chapters), appendix*)>
<!ELEMENT metadata (title, author+, date, isbn?)>
<!ELEMENT content (#PCDATA)>
<!ELEMENT chapters (chapter+)>
<!ELEMENT chapter (title, paragraph+)>
<!ELEMENT appendix (title, paragraph+)>

<!-- Usage -->
<book>
    <metadata>
        <title>XML Processing</title>
        <author>John Smith</author>
        <author>Jane Doe</author>
        <date>2024-01-15</date>
        <isbn>978-0123456789</isbn>
    </metadata>
    
    <chapters>
        <chapter>
            <title>Introduction</title>
            <paragraph>Welcome to XML...</paragraph>
        </chapter>
        <chapter>
            <title>Basic Concepts</title>
            <paragraph>XML elements are...</paragraph>
        </chapter>
    </chapters>
    
    <appendix>
        <title>Reference</title>
        <paragraph>Quick reference guide...</paragraph>
    </appendix>
</book>
```

### 2. Complex Choices
```xml
<!ELEMENT product (
    basic-info,
    (digital-product | physical-product),
    pricing,
    availability?
)>

<!ELEMENT basic-info (name, description, category)>
<!ELEMENT digital-product (download-url, file-size, format)>
<!ELEMENT physical-product (weight, dimensions, shipping-class)>
<!ELEMENT pricing (price, currency, tax-rate?)>
<!ELEMENT availability (in-stock, quantity, reorder-level?)>

<!-- Digital product -->
<product>
    <basic-info>
        <name>XML Processing Software</name>
        <description>Professional XML toolkit</description>
        <category>Software</category>
    </basic-info>
    <digital-product>
        <download-url>https://example.com/download</download-url>
        <file-size>150MB</file-size>
        <format>ZIP</format>
    </digital-product>
    <pricing>
        <price>99.99</price>
        <currency>USD</currency>
        <tax-rate>8.25</tax-rate>
    </pricing>
</product>
```

## Attribute Declarations

### 1. Basic Attribute Types
```xml
<!ELEMENT book EMPTY>
<!ATTLIST book
    id          ID          #REQUIRED
    title       CDATA       #REQUIRED
    pages       CDATA       #IMPLIED
    available   (true|false) "true"
    category    CDATA       #FIXED "technical"
>

<!-- Usage -->
<book id="B001" title="XML Guide" pages="350" available="true"/>
<book id="B002" title="Advanced XML"/>  <!-- pages and available use defaults -->
```

### 2. Attribute Types

#### CDATA (Character Data)
```xml
<!ATTLIST product
    name        CDATA   #REQUIRED
    description CDATA   #IMPLIED
>

<product name="Widget A" description="High-quality widget for all purposes"/>
```

#### ID (Unique Identifier)
```xml
<!ATTLIST book id ID #REQUIRED>
<!ATTLIST author id ID #REQUIRED>

<!-- ✅ Valid - unique IDs -->
<book id="B001">...</book>
<book id="B002">...</book>
<author id="A001">...</author>

<!-- ❌ Invalid - duplicate ID -->
<book id="B001">...</book>
<book id="B001">...</book>  <!-- Error: ID already used -->
```

#### IDREF (Reference to ID)
```xml
<!ATTLIST book author-ref IDREF #REQUIRED>
<!ATTLIST author id ID #REQUIRED>

<!-- Usage -->
<library>
    <authors>
        <author id="A001">John Smith</author>
        <author id="A002">Jane Doe</author>
    </authors>
    <books>
        <book author-ref="A001">XML Guide</book>      <!-- References A001 -->
        <book author-ref="A002">Advanced XML</book>   <!-- References A002 -->
    </books>
</library>
```

#### IDREFS (Multiple References)
```xml
<!ATTLIST book author-refs IDREFS #REQUIRED>
<!ATTLIST author id ID #REQUIRED>

<!-- Usage -->
<book author-refs="A001 A002 A003">Multi-Author Book</book>
```

#### Enumerated Values
```xml
<!ATTLIST book
    format      (hardcover|paperback|ebook)    #REQUIRED
    language    (en|es|fr|de)                  "en"
    status      (available|out-of-print|preorder) #IMPLIED
>

<!-- Usage -->
<book format="paperback" language="en" status="available"/>
<book format="ebook"/>  <!-- language defaults to "en" -->
```

### 3. Default Value Types

#### #REQUIRED
```xml
<!ATTLIST book id ID #REQUIRED>
<!-- Must be provided -->
<book id="B001"/>  <!-- ✅ Valid -->
<book/>            <!-- ❌ Invalid - missing required id -->
```

#### #IMPLIED
```xml
<!ATTLIST book pages CDATA #IMPLIED>
<!-- Optional attribute -->
<book pages="300"/>  <!-- ✅ Valid -->
<book/>              <!-- ✅ Valid - no pages attribute -->
```

#### Default Value
```xml
<!ATTLIST book language CDATA "en">
<!-- Has default value -->
<book language="fr"/>  <!-- ✅ Uses "fr" -->
<book/>                <!-- ✅ Uses default "en" -->
```

#### #FIXED
```xml
<!ATTLIST book version CDATA #FIXED "1.0">
<!-- Fixed value - cannot be changed -->
<book version="1.0"/>  <!-- ✅ Valid -->
<book/>                <!-- ✅ Valid - assumes "1.0" -->
<book version="2.0"/>  <!-- ❌ Invalid - can't change fixed value -->
```

## Complete DTD Examples

### Example 1: Library System
```xml
<!-- library.dtd -->
<!ELEMENT library (info, authors, books, borrowers?)>

<!-- Library information -->
<!ELEMENT info (name, address, phone, email)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT address (#PCDATA)>
<!ELEMENT phone (#PCDATA)>
<!ELEMENT email (#PCDATA)>

<!-- Authors -->
<!ELEMENT authors (author+)>
<!ELEMENT author (first-name, last-name, bio?)>
<!ELEMENT first-name (#PCDATA)>
<!ELEMENT last-name (#PCDATA)>
<!ELEMENT bio (#PCDATA)>
<!ATTLIST author id ID #REQUIRED>

<!-- Books -->
<!ELEMENT books (book+)>
<!ELEMENT book (title, isbn, publication-date, pages, summary?)>
<!ELEMENT title (#PCDATA)>
<!ELEMENT isbn (#PCDATA)>
<!ELEMENT publication-date (#PCDATA)>
<!ELEMENT pages (#PCDATA)>
<!ELEMENT summary (#PCDATA)>
<!ATTLIST book
    id          ID                              #REQUIRED
    author-ref  IDREF                          #REQUIRED
    format      (hardcover|paperback|ebook)   #REQUIRED
    available   (true|false)                  "true"
    category    CDATA                         #IMPLIED
>

<!-- Borrowers -->
<!ELEMENT borrowers (borrower+)>
<!ELEMENT borrower (name, member-id, borrowed-books?)>
<!ELEMENT member-id (#PCDATA)>
<!ELEMENT borrowed-books (book-ref+)>
<!ELEMENT book-ref EMPTY>
<!ATTLIST book-ref ref IDREF #REQUIRED>
<!ATTLIST borrower id ID #REQUIRED>

<!-- Usage -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE library SYSTEM "library.dtd">
<library>
    <info>
        <name>Central Public Library</name>
        <address>123 Main Street, Anytown</address>
        <phone>555-0123</phone>
        <email>info@centrallibrary.org</email>
    </info>
    
    <authors>
        <author id="A001">
            <first-name>John</first-name>
            <last-name>Smith</last-name>
            <bio>Expert in XML technologies with over 10 years experience.</bio>
        </author>
        <author id="A002">
            <first-name>Jane</first-name>
            <last-name>Doe</last-name>
        </author>
    </authors>
    
    <books>
        <book id="B001" author-ref="A001" format="paperback" category="technical">
            <title>XML Processing Guide</title>
            <isbn>978-0123456789</isbn>
            <publication-date>2024-01-15</publication-date>
            <pages>450</pages>
            <summary>Comprehensive guide to XML processing techniques.</summary>
        </book>
        
        <book id="B002" author-ref="A002" format="ebook" available="true">
            <title>Advanced XML Patterns</title>
            <isbn>978-0987654321</isbn>
            <publication-date>2024-02-01</publication-date>
            <pages>320</pages>
        </book>
    </books>
    
    <borrowers>
        <borrower id="BR001">
            <name>Alice Johnson</name>
            <member-id>M2024001</member-id>
            <borrowed-books>
                <book-ref ref="B001"/>
            </borrowed-books>
        </borrower>
    </borrowers>
</library>
```

### Example 2: Recipe Collection
```xml
<!-- recipes.dtd -->
<!ELEMENT recipe-collection (metadata, recipes)>

<!ELEMENT metadata (title, author, description, created-date)>
<!ELEMENT title (#PCDATA)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT description (#PCDATA)>
<!ELEMENT created-date (#PCDATA)>

<!ELEMENT recipes (recipe+)>
<!ELEMENT recipe (name, description?, ingredients, instructions, nutrition?)>
<!ELEMENT name (#PCDATA)>

<!ELEMENT ingredients (ingredient+)>
<!ELEMENT ingredient (#PCDATA)>
<!ATTLIST ingredient
    amount      CDATA   #REQUIRED
    unit        CDATA   #IMPLIED
    optional    (true|false) "false"
>

<!ELEMENT instructions (step+)>
<!ELEMENT step (#PCDATA)>
<!ATTLIST step number CDATA #REQUIRED>

<!ELEMENT nutrition (calories, protein, carbs, fat)>
<!ELEMENT calories (#PCDATA)>
<!ELEMENT protein (#PCDATA)>
<!ELEMENT carbs (#PCDATA)>
<!ELEMENT fat (#PCDATA)>

<!ATTLIST recipe
    id          ID                                  #REQUIRED
    difficulty  (easy|medium|hard)                 #REQUIRED
    prep-time   CDATA                              #REQUIRED
    cook-time   CDATA                              #IMPLIED
    serves      CDATA                              #REQUIRED
    cuisine     (italian|chinese|mexican|indian|other) #IMPLIED
>

<!-- Usage -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE recipe-collection SYSTEM "recipes.dtd">
<recipe-collection>
    <metadata>
        <title>Family Recipe Collection</title>
        <author>Maria Garcia</author>
        <description>Traditional recipes passed down through generations</description>
        <created-date>2024-01-15</created-date>
    </metadata>
    
    <recipes>
        <recipe id="R001" difficulty="easy" prep-time="15 min" 
                cook-time="30 min" serves="4" cuisine="italian">
            <name>Classic Spaghetti Carbonara</name>
            <description>Traditional Roman pasta dish with eggs, cheese, and pancetta</description>
            
            <ingredients>
                <ingredient amount="400" unit="g">spaghetti</ingredient>
                <ingredient amount="200" unit="g">pancetta or guanciale</ingredient>
                <ingredient amount="4">large eggs</ingredient>
                <ingredient amount="100" unit="g">Pecorino Romano cheese</ingredient>
                <ingredient amount="1" unit="tsp">black pepper</ingredient>
                <ingredient amount="1" unit="tsp" optional="true">salt</ingredient>
            </ingredients>
            
            <instructions>
                <step number="1">Bring a large pot of salted water to boil and cook spaghetti</step>
                <step number="2">Cook pancetta in a large pan until crispy</step>
                <step number="3">Whisk eggs and cheese in a bowl</step>
                <step number="4">Drain pasta and toss with pancetta</step>
                <step number="5">Remove from heat and mix in egg mixture quickly</step>
                <step number="6">Season with pepper and serve immediately</step>
            </instructions>
            
            <nutrition>
                <calories>520</calories>
                <protein>28g</protein>
                <carbs>65g</carbs>
                <fat>18g</fat>
            </nutrition>
        </recipe>
    </recipes>
</recipe-collection>
```

## DTD Validation

### Validating with Command Line Tools
```bash
# Using xmllint (Linux/Mac)
xmllint --valid --noout document.xml

# Using xml val (Windows)
xml val -d schema.dtd document.xml
```

### Validation Errors Examples
```xml
<!-- Invalid XML against library DTD -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE library SYSTEM "library.dtd">
<library>
    <!-- ❌ Missing required 'info' element -->
    <authors>
        <author id="A001">
            <first-name>John</first-name>
            <!-- ❌ Missing required 'last-name' element -->
        </author>
    </authors>
    
    <books>
        <!-- ❌ Missing required 'id' attribute -->
        <book author-ref="A001" format="paperback">
            <title>XML Guide</title>
            <!-- ❌ Missing required 'isbn' element -->
            <publication-date>2024-01-15</publication-date>
            <pages>450</pages>
        </book>
    </books>
</library>
```

## Entity Declarations

### 1. Internal Entities
```xml
<!DOCTYPE document [
    <!ENTITY company "Acme Corporation">
    <!ENTITY phone "555-0123">
    <!ENTITY email "info@acme.com">
    
    <!ELEMENT document (header, content)>
    <!ELEMENT header (title, contact)>
    <!ELEMENT title (#PCDATA)>
    <!ELEMENT contact (#PCDATA)>
    <!ELEMENT content (#PCDATA)>
]>

<document>
    <header>
        <title>&company; Technical Documentation</title>
        <contact>Phone: &phone;, Email: &email;</contact>
    </header>
    <content>
        Welcome to &company;'s technical documentation portal.
        For support, contact us at &phone; or &email;.
    </content>
</document>
```

### 2. External Entities
```xml
<!-- entities.dtd -->
<!ENTITY header SYSTEM "header.xml">
<!ENTITY footer SYSTEM "footer.xml">
<!ENTITY copyright "© 2024 Acme Corporation. All rights reserved.">

<!-- main.xml -->
<!DOCTYPE document [
    <!ENTITY % entities SYSTEM "entities.dtd">
    %entities;
    <!ELEMENT document (content)>
    <!ELEMENT content ANY>
]>

<document>
    &header;
    <content>
        <h1>Main Content</h1>
        <p>This is the main content of the document.</p>
    </content>
    &footer;
</document>
```

## Limitations of DTDs

### 1. No Data Types
```xml
<!-- DTD can't specify that price should be a number -->
<!ELEMENT price (#PCDATA)>

<!-- Both of these are valid in DTD -->
<price>29.99</price>     <!-- ✅ Good -->
<price>Not a number</price>  <!-- ✅ Valid in DTD but logically wrong -->
```

### 2. No Namespace Support
```xml
<!-- DTD doesn't understand namespaces -->
<!ELEMENT book:title (#PCDATA)>  <!-- This won't work as expected -->
```

### 3. Limited Content Models
```xml
<!-- Can't specify "exactly 3 authors" -->
<!ELEMENT book (author, author, author)>  <!-- Too rigid -->
<!ELEMENT book (author+)>                 <!-- Too flexible -->
```

## When to Use DTDs

### ✅ Use DTDs When:
- Working with legacy systems
- Need simple document validation
- Document structure is relatively simple
- Namespace support is not required
- Working in XML-only environments (no schema processors)

### ❌ Consider XML Schema Instead When:
- Need strong data typing
- Working with namespaces
- Need complex validation rules
- Want better error messages
- Building modern XML applications

## Best Practices

### ✅ Do:
- Keep DTDs simple and readable
- Use meaningful element and attribute names
- Comment complex content models
- Validate your XML documents regularly
- Use appropriate default values
- Group related declarations together

### ❌ Don't:
- Create overly complex content models
- Use DTDs for modern applications (prefer XML Schema)
- Ignore validation errors
- Mix element content with mixed content unnecessarily
- Forget to declare all elements and attributes

## Next Steps

Now that you understand DTDs, you're ready to learn about:
- **XML Schema (XSD)** - Modern, powerful schema language
- **XSLT Transformations** - Converting XML documents
- **XML Processing** - Parsing and manipulating XML programmatically

## Practice Exercise

Create a DTD for a simple e-commerce system that includes:

1. **Products** with:
   - ID (required, unique)
   - Name (required)
   - Description (optional)
   - Price (required)
   - Category (electronics, clothing, books, other)
   - Available (true/false, default: true)

2. **Categories** with:
   - ID (required, unique)
   - Name (required)
   - Parent category (optional, references another category)

3. **Orders** with:
   - Order ID (required, unique)
   - Customer name (required)
   - Order date (required)
   - Line items (at least one, references products)

**Challenge**: Create both the DTD and a sample XML document that validates against it!

---

**🎯 Key Takeaways:**
- DTDs define the structure and rules for XML documents
- Element declarations specify content models using operators (+, *, ?, |, ,)
- Attribute declarations define types, defaults, and constraints
- DTDs provide validation but have limitations compared to XML Schema
- Use entities to reuse common text and content

**➡️ Next:** Learn about XML Schema (XSD) for more powerful validation!