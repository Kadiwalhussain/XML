# 📐 XML Schema (XSD) - Modern XML Validation

## What is XML Schema?

**XML Schema Definition (XSD)** is a powerful, modern schema language for defining the structure, data types, and constraints of XML documents. Unlike DTD, XSD is written in XML syntax itself and provides much more sophisticated validation capabilities.

## Why Choose XSD over DTD?

### ✅ XSD Advantages:
| Feature | DTD | XSD |
|---------|-----|-----|
| **Data Types** | Limited (CDATA only) | Rich (50+ built-in types) |
| **Namespaces** | No support | Full support |
| **Syntax** | Unique syntax | XML syntax |
| **Complex Types** | Basic | Advanced (inheritance, extension) |
| **Constraints** | Basic | Advanced (patterns, ranges, restrictions) |
| **Documentation** | Limited | Rich annotation support |
| **Reusability** | Limited | High (import, include, redefine) |

### XSD Benefits:
- **Strong Typing**: Validate data types (dates, numbers, strings, etc.)
- **Namespace Awareness**: Full namespace support
- **Extensibility**: Inherit and extend existing schemas
- **Better Error Messages**: More detailed validation feedback
- **Industry Standard**: Widely supported and used

## Basic XSD Structure

### Simple Schema Example
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/library"
           xmlns:lib="http://example.com/library"
           elementFormDefault="qualified">

    <!-- Root element definition -->
    <xs:element name="library">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="book" maxOccurs="unbounded">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="title" type="xs:string"/>
                            <xs:element name="author" type="xs:string"/>
                            <xs:element name="isbn" type="xs:string"/>
                            <xs:element name="price" type="xs:decimal"/>
                        </xs:sequence>
                        <xs:attribute name="id" type="xs:ID" use="required"/>
                        <xs:attribute name="format" use="required">
                            <xs:simpleType>
                                <xs:restriction base="xs:string">
                                    <xs:enumeration value="hardcover"/>
                                    <xs:enumeration value="paperback"/>
                                    <xs:enumeration value="ebook"/>
                                </xs:restriction>
                            </xs:simpleType>
                        </xs:attribute>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>
```

### Corresponding XML Document
```xml
<?xml version="1.0" encoding="UTF-8"?>
<lib:library xmlns:lib="http://example.com/library"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://example.com/library library.xsd">
    
    <lib:book id="B001" format="paperback">
        <lib:title>XML Processing Guide</lib:title>
        <lib:author>John Smith</lib:author>
        <lib:isbn>978-0123456789</lib:isbn>
        <lib:price>29.99</lib:price>
    </lib:book>
    
    <lib:book id="B002" format="ebook">
        <lib:title>Advanced XML Techniques</lib:title>
        <lib:author>Jane Doe</lib:author>
        <lib:isbn>978-0987654321</lib:isbn>
        <lib:price>19.99</lib:price>
    </lib:book>
    
</lib:library>
```

## XSD Data Types

### 1. Built-in Simple Types
```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <!-- String types -->
    <xs:element name="title" type="xs:string"/>
    <xs:element name="description" type="xs:normalizedString"/>  <!-- No tabs/newlines -->
    <xs:element name="token" type="xs:token"/>                   <!-- No extra whitespace -->

    <!-- Numeric types -->
    <xs:element name="price" type="xs:decimal"/>
    <xs:element name="quantity" type="xs:int"/>
    <xs:element name="id" type="xs:positiveInteger"/>
    <xs:element name="rating" type="xs:float"/>
    <xs:element name="percentage" type="xs:double"/>

    <!-- Date/Time types -->
    <xs:element name="publish-date" type="xs:date"/>          <!-- 2024-01-15 -->
    <xs:element name="last-updated" type="xs:dateTime"/>      <!-- 2024-01-15T10:30:00Z -->
    <xs:element name="duration" type="xs:duration"/>          <!-- P1Y2M3DT10H30M -->

    <!-- Boolean and other types -->
    <xs:element name="available" type="xs:boolean"/>          <!-- true/false -->
    <xs:element name="homepage" type="xs:anyURI"/>            <!-- URLs -->
    <xs:element name="encoded-data" type="xs:base64Binary"/>  <!-- Base64 data -->

</xs:schema>
```

### 2. Restricted Simple Types
```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <!-- String length restrictions -->
    <xs:element name="short-title">
        <xs:simpleType>
            <xs:restriction base="xs:string">
                <xs:minLength value="1"/>
                <xs:maxLength value="50"/>
            </xs:restriction>
        </xs:simpleType>
    </xs:element>

    <!-- Pattern restrictions (regex) -->
    <xs:element name="isbn">
        <xs:simpleType>
            <xs:restriction base="xs:string">
                <xs:pattern value="978-[0-9]{10}"/>
            </xs:restriction>
        </xs:simpleType>
    </xs:element>

    <!-- Enumeration restrictions -->
    <xs:element name="category">
        <xs:simpleType>
            <xs:restriction base="xs:string">
                <xs:enumeration value="fiction"/>
                <xs:enumeration value="non-fiction"/>
                <xs:enumeration value="technical"/>
                <xs:enumeration value="reference"/>
            </xs:restriction>
        </xs:simpleType>
    </xs:element>

    <!-- Numeric range restrictions -->
    <xs:element name="rating">
        <xs:simpleType>
            <xs:restriction base="xs:decimal">
                <xs:minInclusive value="0.0"/>
                <xs:maxInclusive value="5.0"/>
                <xs:fractionDigits value="1"/>  <!-- One decimal place -->
            </xs:restriction>
        </xs:simpleType>
    </xs:element>

    <!-- Date range restrictions -->
    <xs:element name="publish-date">
        <xs:simpleType>
            <xs:restriction base="xs:date">
                <xs:minInclusive value="1900-01-01"/>
                <xs:maxInclusive value="2030-12-31"/>
            </xs:restriction>
        </xs:simpleType>
    </xs:element>

</xs:schema>
```

## Complex Types

### 1. Sequence (Elements in Order)
```xml
<xs:complexType name="BookType">
    <xs:sequence>
        <xs:element name="title" type="xs:string"/>
        <xs:element name="author" type="xs:string" maxOccurs="unbounded"/>
        <xs:element name="isbn" type="xs:string"/>
        <xs:element name="publication-date" type="xs:date"/>
        <xs:element name="price" type="xs:decimal" minOccurs="0"/>
        <xs:element name="description" type="xs:string" minOccurs="0"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:ID" use="required"/>
    <xs:attribute name="format" type="xs:string" default="paperback"/>
</xs:complexType>

<!-- Usage -->
<xs:element name="book" type="BookType"/>
```

### 2. Choice (One of Several Elements)
```xml
<xs:complexType name="ContactType">
    <xs:choice>
        <xs:element name="email" type="xs:string"/>
        <xs:element name="phone" type="xs:string"/>
        <xs:element name="address" type="xs:string"/>
    </xs:choice>
</xs:complexType>

<!-- Valid XML -->
<contact>
    <email>john@example.com</email>  <!-- Only one choice allowed -->
</contact>
```

### 3. All (Elements in Any Order)
```xml
<xs:complexType name="PersonType">
    <xs:all>
        <xs:element name="first-name" type="xs:string"/>
        <xs:element name="last-name" type="xs:string"/>
        <xs:element name="birth-date" type="xs:date" minOccurs="0"/>
    </xs:all>
</xs:complexType>

<!-- Valid XML - any order -->
<person>
    <last-name>Smith</last-name>
    <first-name>John</first-name>
    <birth-date>1985-05-15</birth-date>
</person>
```

### 4. Mixed Content
```xml
<xs:complexType name="ParagraphType" mixed="true">
    <xs:choice minOccurs="0" maxOccurs="unbounded">
        <xs:element name="emphasis" type="xs:string"/>
        <xs:element name="strong" type="xs:string"/>
        <xs:element name="link" type="xs:string"/>
    </xs:choice>
</xs:complexType>

<!-- Valid XML -->
<paragraph>
    This is a <emphasis>mixed content</emphasis> paragraph with 
    <strong>bold text</strong> and regular text.
</paragraph>
```

## Advanced Schema Features

### 1. Type Inheritance and Extension
```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <!-- Base type -->
    <xs:complexType name="ProductType">
        <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="description" type="xs:string"/>
            <xs:element name="price" type="xs:decimal"/>
        </xs:sequence>
        <xs:attribute name="id" type="xs:ID" use="required"/>
    </xs:complexType>

    <!-- Extended type -->
    <xs:complexType name="BookType">
        <xs:complexContent>
            <xs:extension base="ProductType">
                <xs:sequence>
                    <xs:element name="author" type="xs:string" maxOccurs="unbounded"/>
                    <xs:element name="isbn" type="xs:string"/>
                    <xs:element name="pages" type="xs:positiveInteger"/>
                </xs:sequence>
                <xs:attribute name="format" type="xs:string" default="paperback"/>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <!-- Electronic product type -->
    <xs:complexType name="ElectronicsType">
        <xs:complexContent>
            <xs:extension base="ProductType">
                <xs:sequence>
                    <xs:element name="manufacturer" type="xs:string"/>
                    <xs:element name="model" type="xs:string"/>
                    <xs:element name="warranty-years" type="xs:positiveInteger"/>
                </xs:sequence>
                <xs:attribute name="energy-rating" type="xs:string"/>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

</xs:schema>
```

### 2. Type Restriction
```xml
<xs:complexType name="RestrictedBookType">
    <xs:complexContent>
        <xs:restriction base="BookType">
            <xs:sequence>
                <xs:element name="name" type="xs:string"/>
                <xs:element name="description" type="xs:string"/>
                <xs:element name="price">
                    <xs:simpleType>
                        <xs:restriction base="xs:decimal">
                            <xs:minInclusive value="0.01"/>
                            <xs:maxInclusive value="99.99"/>
                        </xs:restriction>
                    </xs:simpleType>
                </xs:element>
                <xs:element name="author" type="xs:string"/>  <!-- Only one author allowed -->
                <xs:element name="isbn" type="xs:string"/>
            </xs:sequence>
            <xs:attribute name="id" type="xs:ID" use="required"/>
            <!-- format attribute removed (restricted) -->
        </xs:restriction>
    </xs:complexContent>
</xs:complexType>
```

### 3. Abstract Types and Substitution Groups
```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

    <!-- Abstract base type -->
    <xs:complexType name="MediaType" abstract="true">
        <xs:sequence>
            <xs:element name="title" type="xs:string"/>
            <xs:element name="release-date" type="xs:date"/>
        </xs:sequence>
    </xs:complexType>

    <!-- Concrete implementations -->
    <xs:complexType name="BookMediaType">
        <xs:complexContent>
            <xs:extension base="MediaType">
                <xs:sequence>
                    <xs:element name="author" type="xs:string"/>
                    <xs:element name="pages" type="xs:positiveInteger"/>
                </xs:sequence>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <xs:complexType name="MovieMediaType">
        <xs:complexContent>
            <xs:extension base="MediaType">
                <xs:sequence>
                    <xs:element name="director" type="xs:string"/>
                    <xs:element name="duration" type="xs:duration"/>
                </xs:sequence>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <!-- Substitution group -->
    <xs:element name="media" type="MediaType" abstract="true"/>
    <xs:element name="book" type="BookMediaType" substitutionGroup="media"/>
    <xs:element name="movie" type="MovieMediaType" substitutionGroup="media"/>

    <!-- Collection can contain any media type -->
    <xs:element name="media-collection">
        <xs:complexType>
            <xs:sequence>
                <xs:element ref="media" maxOccurs="unbounded"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>
```

## Comprehensive E-commerce Schema Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/ecommerce"
           xmlns:ec="http://example.com/ecommerce"
           elementFormDefault="qualified">

    <!-- Custom simple types -->
    <xs:simpleType name="EmailType">
        <xs:restriction base="xs:string">
            <xs:pattern value="[^@]+@[^@]+\.[^@]+"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:simpleType name="PhoneType">
        <xs:restriction base="xs:string">
            <xs:pattern value="\+?[0-9\-\(\)\s]+"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:simpleType name="MoneyType">
        <xs:restriction base="xs:decimal">
            <xs:fractionDigits value="2"/>
            <xs:minInclusive value="0.00"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:simpleType name="StatusType">
        <xs:restriction base="xs:string">
            <xs:enumeration value="pending"/>
            <xs:enumeration value="processing"/>
            <xs:enumeration value="shipped"/>
            <xs:enumeration value="delivered"/>
            <xs:enumeration value="cancelled"/>
        </xs:restriction>
    </xs:simpleType>

    <!-- Address type -->
    <xs:complexType name="AddressType">
        <xs:sequence>
            <xs:element name="street" type="xs:string"/>
            <xs:element name="city" type="xs:string"/>
            <xs:element name="state" type="xs:string"/>
            <xs:element name="postal-code" type="xs:string"/>
            <xs:element name="country" type="xs:string"/>
        </xs:sequence>
    </xs:complexType>

    <!-- Customer type -->
    <xs:complexType name="CustomerType">
        <xs:sequence>
            <xs:element name="first-name" type="xs:string"/>
            <xs:element name="last-name" type="xs:string"/>
            <xs:element name="email" type="EmailType"/>
            <xs:element name="phone" type="PhoneType" minOccurs="0"/>
            <xs:element name="billing-address" type="AddressType"/>
            <xs:element name="shipping-address" type="AddressType" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="id" type="xs:ID" use="required"/>
        <xs:attribute name="vip" type="xs:boolean" default="false"/>
    </xs:complexType>

    <!-- Product type -->
    <xs:complexType name="ProductType">
        <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="description" type="xs:string"/>
            <xs:element name="category" type="xs:string"/>
            <xs:element name="price" type="MoneyType"/>
            <xs:element name="stock-quantity" type="xs:nonNegativeInteger"/>
            <xs:element name="weight" type="xs:decimal" minOccurs="0"/>
            <xs:element name="dimensions" minOccurs="0">
                <xs:complexType>
                    <xs:sequence>
                        <xs:element name="length" type="xs:decimal"/>
                        <xs:element name="width" type="xs:decimal"/>
                        <xs:element name="height" type="xs:decimal"/>
                    </xs:sequence>
                    <xs:attribute name="unit" type="xs:string" default="cm"/>
                </xs:complexType>
            </xs:element>
        </xs:sequence>
        <xs:attribute name="id" type="xs:ID" use="required"/>
        <xs:attribute name="sku" type="xs:string" use="required"/>
    </xs:complexType>

    <!-- Order item type -->
    <xs:complexType name="OrderItemType">
        <xs:sequence>
            <xs:element name="product-ref" type="xs:IDREF"/>
            <xs:element name="quantity" type="xs:positiveInteger"/>
            <xs:element name="unit-price" type="MoneyType"/>
            <xs:element name="total-price" type="MoneyType"/>
        </xs:sequence>
    </xs:complexType>

    <!-- Order type -->
    <xs:complexType name="OrderType">
        <xs:sequence>
            <xs:element name="customer-ref" type="xs:IDREF"/>
            <xs:element name="order-date" type="xs:dateTime"/>
            <xs:element name="items">
                <xs:complexType>
                    <xs:sequence>
                        <xs:element name="item" type="OrderItemType" maxOccurs="unbounded"/>
                    </xs:sequence>
                </xs:complexType>
            </xs:element>
            <xs:element name="subtotal" type="MoneyType"/>
            <xs:element name="tax" type="MoneyType"/>
            <xs:element name="shipping" type="MoneyType"/>
            <xs:element name="total" type="MoneyType"/>
            <xs:element name="status" type="StatusType"/>
            <xs:element name="tracking-number" type="xs:string" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="id" type="xs:ID" use="required"/>
        <xs:attribute name="currency" type="xs:string" default="USD"/>
    </xs:complexType>

    <!-- Root element -->
    <xs:element name="ecommerce-system">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="customers">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="customer" type="CustomerType" maxOccurs="unbounded"/>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
                <xs:element name="products">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="product" type="ProductType" maxOccurs="unbounded"/>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
                <xs:element name="orders">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="order" type="OrderType" maxOccurs="unbounded"/>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>

        <!-- Key constraints for referential integrity -->
        <xs:key name="CustomerKey">
            <xs:selector xpath="ec:customers/ec:customer"/>
            <xs:field xpath="@id"/>
        </xs:key>

        <xs:key name="ProductKey">
            <xs:selector xpath="ec:products/ec:product"/>
            <xs:field xpath="@id"/>
        </xs:key>

        <xs:keyref name="OrderCustomerRef" refer="CustomerKey">
            <xs:selector xpath="ec:orders/ec:order"/>
            <xs:field xpath="ec:customer-ref"/>
        </xs:keyref>

        <xs:keyref name="OrderItemProductRef" refer="ProductKey">
            <xs:selector xpath="ec:orders/ec:order/ec:items/ec:item"/>
            <xs:field xpath="ec:product-ref"/>
        </xs:keyref>
    </xs:element>

</xs:schema>
```

## Schema Validation Techniques

### 1. Using Programming Languages

#### Java Validation
```java
import javax.xml.XMLConstants;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import javax.xml.transform.stream.StreamSource;
import java.io.File;

public class XSDValidator {
    public static boolean validate(String xmlFile, String xsdFile) {
        try {
            // Create schema factory
            SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            
            // Load schema
            Schema schema = factory.newSchema(new File(xsdFile));
            
            // Create validator
            Validator validator = schema.newValidator();
            
            // Validate
            validator.validate(new StreamSource(new File(xmlFile)));
            
            System.out.println("Validation successful!");
            return true;
            
        } catch (Exception e) {
            System.out.println("Validation failed: " + e.getMessage());
            return false;
        }
    }
}
```

#### Python Validation
```python
from lxml import etree

def validate_xml(xml_file, xsd_file):
    try:
        # Load XSD
        with open(xsd_file, 'r') as xsd:
            schema_doc = etree.parse(xsd)
            schema = etree.XMLSchema(schema_doc)
        
        # Load XML
        with open(xml_file, 'r') as xml:
            xml_doc = etree.parse(xml)
        
        # Validate
        if schema.validate(xml_doc):
            print("Validation successful!")
            return True
        else:
            print("Validation errors:")
            for error in schema.error_log:
                print(f"Line {error.line}: {error.message}")
            return False
            
    except Exception as e:
        print(f"Error: {e}")
        return False
```

### 2. Command Line Tools
```bash
# Using xmllint (Linux/Mac)
xmllint --schema schema.xsd --noout document.xml

# Using XMLSpy (Windows)
xmlspy -validate schema.xsd document.xml

# Using Saxon (Java-based)
java -jar saxon9he.jar -s:document.xml -xsd:schema.xsd
```

## Namespaces in XSD

### 1. Target Namespace
```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/books"
           xmlns:books="http://example.com/books"
           elementFormDefault="qualified">

    <xs:element name="library">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="book" type="books:BookType" maxOccurs="unbounded"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

    <xs:complexType name="BookType">
        <xs:sequence>
            <xs:element name="title" type="xs:string"/>
            <xs:element name="author" type="xs:string"/>
        </xs:sequence>
    </xs:complexType>

</xs:schema>
```

### 2. Multiple Namespaces
```xml
<!-- main-schema.xsd -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/main"
           xmlns:main="http://example.com/main"
           xmlns:books="http://example.com/books"
           xmlns:authors="http://example.com/authors"
           elementFormDefault="qualified">

    <xs:import namespace="http://example.com/books" schemaLocation="books.xsd"/>
    <xs:import namespace="http://example.com/authors" schemaLocation="authors.xsd"/>

    <xs:element name="catalog">
        <xs:complexType>
            <xs:sequence>
                <xs:element ref="books:book-collection"/>
                <xs:element ref="authors:author-list"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>
```

## Schema Organization

### 1. Include (Same Namespace)
```xml
<!-- main.xsd -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/library">

    <xs:include schemaLocation="types.xsd"/>
    <xs:include schemaLocation="elements.xsd"/>

    <!-- Main schema content -->
    
</xs:schema>

<!-- types.xsd -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/library">

    <xs:complexType name="BookType">
        <!-- Type definition -->
    </xs:complexType>

</xs:schema>
```

### 2. Import (Different Namespace)
```xml
<!-- library.xsd -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/library"
           xmlns:common="http://example.com/common">

    <xs:import namespace="http://example.com/common" 
               schemaLocation="common-types.xsd"/>

    <xs:element name="library">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="info" type="common:ContactInfoType"/>
                <xs:element name="books" type="BookCollectionType"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>
```

## Best Practices for XSD Design

### ✅ Do:

#### 1. Use Meaningful Names
```xml
<!-- ✅ Good -->
<xs:element name="customer-birth-date" type="xs:date"/>
<xs:complexType name="ShippingAddressType"/>

<!-- ❌ Avoid -->
<xs:element name="dt1" type="xs:date"/>
<xs:complexType name="Type1"/>
```

#### 2. Design Reusable Types
```xml
<xs:complexType name="AddressType">
    <xs:sequence>
        <xs:element name="street" type="xs:string"/>
        <xs:element name="city" type="xs:string"/>
        <xs:element name="postal-code" type="xs:string"/>
    </xs:sequence>
</xs:complexType>

<!-- Reuse in multiple places -->
<xs:element name="billing-address" type="AddressType"/>
<xs:element name="shipping-address" type="AddressType"/>
```

#### 3. Use Appropriate Constraints
```xml
<xs:element name="age">
    <xs:simpleType>
        <xs:restriction base="xs:integer">
            <xs:minInclusive value="0"/>
            <xs:maxInclusive value="150"/>
        </xs:restriction>
    </xs:simpleType>
</xs:element>
```

#### 4. Add Documentation
```xml
<xs:element name="product">
    <xs:annotation>
        <xs:documentation>
            Represents a product in the catalog with pricing and inventory information.
            The product must have a unique SKU and valid price.
        </xs:documentation>
    </xs:annotation>
    <xs:complexType>
        <!-- Type definition -->
    </xs:complexType>
</xs:element>
```

### ❌ Don't:

#### 1. Overuse Complex Types
```xml
<!-- ❌ Too complex -->
<xs:element name="data">
    <xs:complexType>
        <xs:choice maxOccurs="unbounded">
            <xs:sequence>
                <xs:choice>
                    <xs:element name="a" type="xs:string"/>
                    <xs:element name="b" type="xs:int"/>
                </xs:choice>
                <xs:element name="c" minOccurs="0" maxOccurs="unbounded"/>
            </xs:sequence>
            <xs:element name="d" type="xs:boolean"/>
        </xs:choice>
    </xs:complexType>
</xs:element>
```

#### 2. Create Overly Restrictive Schemas
```xml
<!-- ❌ Too restrictive - hard to extend -->
<xs:element name="name">
    <xs:simpleType>
        <xs:restriction base="xs:string">
            <xs:length value="20"/>  <!-- Fixed length is inflexible -->
        </xs:restriction>
    </xs:simpleType>
</xs:element>
```

## Common Validation Patterns

### 1. Conditional Validation
```xml
<xs:complexType name="PersonType">
    <xs:sequence>
        <xs:element name="name" type="xs:string"/>
        <xs:element name="age" type="xs:int"/>
        <!-- If age >= 18, license-number is required -->
        <xs:element name="license-number" type="xs:string" minOccurs="0"/>
    </xs:sequence>
</xs:complexType>

<!-- Note: XSD 1.0 doesn't support conditional validation -->
<!-- Use XSD 1.1 or Schematron for complex conditions -->
```

### 2. Cross-field Validation with XSD 1.1
```xml
<xs:element name="order">
    <xs:complexType>
        <xs:sequence>
            <xs:element name="order-date" type="xs:date"/>
            <xs:element name="ship-date" type="xs:date"/>
            <xs:element name="total" type="xs:decimal"/>
        </xs:sequence>
    </xs:complexType>
    
    <!-- XSD 1.1 assertion -->
    <xs:assert test="ship-date >= order-date"/>
    <xs:assert test="total > 0"/>
</xs:element>
```

## Testing and Debugging Schemas

### 1. Schema Testing Checklist
- ✅ Valid documents pass validation
- ✅ Invalid documents are rejected with clear errors
- ✅ All constraints work as expected
- ✅ Optional elements behave correctly
- ✅ Default values are applied properly

### 2. Common Validation Errors
```xml
<!-- Error: Required element missing -->
<book id="B001">
    <title>XML Guide</title>
    <!-- Missing required 'author' element -->
</book>

<!-- Error: Wrong data type -->
<book id="B001">
    <title>XML Guide</title>
    <author>John Smith</author>
    <price>Not a number</price>  <!-- Should be decimal -->
</book>

<!-- Error: Constraint violation -->
<product>
    <rating>6.0</rating>  <!-- Exceeds maximum of 5.0 -->
</product>
```

## Next Steps

Now that you understand XML Schema (XSD), you're ready to learn about:
- **XSLT Transformations** - Converting XML documents
- **Advanced XML Processing** - Parsing and manipulation techniques
- **XML Security** - Protecting against attacks and vulnerabilities

## Practice Exercise

Create an XSD schema for a university system with the following requirements:

1. **Students**: ID, name, email, enrollment date, GPA (0.0-4.0), major
2. **Courses**: Course code, name, credits (1-6), description
3. **Enrollments**: Student ID reference, course code reference, semester, year, grade (A+, A, B+, B, C+, C, D, F)
4. **Professors**: ID, name, department, email, phone (optional)

**Constraints**:
- Student email must be valid format
- GPA must be between 0.0 and 4.0
- Course codes must follow pattern: [A-Z]{2,4}[0-9]{3}
- Grades must be from the specified enumeration
- Phone numbers must follow pattern: \d{3}-\d{3}-\d{4}

**Challenge**: Include referential integrity constraints and create sample valid/invalid XML documents!

---

**🎯 Key Takeaways:**
- XSD provides powerful validation with strong data typing
- Complex types enable sophisticated document structures
- Constraints and patterns ensure data quality
- Namespaces allow schema modularity and reuse
- XSD is the modern standard for XML validation

**➡️ Next:** Learn about XSLT for transforming XML documents!