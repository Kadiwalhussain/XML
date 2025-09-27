# 🎯 Module 1: Advanced XML Namespaces

**Duration**: 3-5 days | **Difficulty**: Advanced | **Prerequisites**: Basic XML Namespaces

## 📚 Table of Contents

1. [Namespace Fundamentals Review](#namespace-fundamentals-review)
2. [Advanced Prefix Management](#advanced-prefix-management)
3. [Namespace Collision Resolution](#namespace-collision-resolution)
4. [Default Namespace Strategies](#default-namespace-strategies)
5. [Enterprise Namespace Design](#enterprise-namespace-design)
6. [Namespace Versioning](#namespace-versioning)
7. [Performance Considerations](#performance-considerations)
8. [Real-World Examples](#real-world-examples)
9. [Common Pitfalls](#common-pitfalls)
10. [Exercises & Practice](#exercises--practice)

---

## 🎯 Namespace Fundamentals Review

### What Are XML Namespaces?

XML Namespaces provide a method to avoid element name conflicts by qualifying names with a URI. They enable mixing vocabularies from different XML applications.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root xmlns:book="http://example.com/books" 
      xmlns:music="http://example.com/music">
    <book:title>Advanced XML</book:title>
    <music:title>Classical Symphony</music:title>
</root>
```

### Key Components

- **Namespace URI**: Unique identifier (not necessarily a web address)
- **Prefix**: Short alias for the namespace URI
- **Local Name**: The element name without prefix
- **Qualified Name (QName)**: prefix:localname

---

## 🔧 Advanced Prefix Management

### Multiple Prefix Strategies

**Problem**: Different parts of your application use different prefixes for the same namespace.

```xml
<!-- Document 1 -->
<catalog xmlns:bk="http://example.com/books">
    <bk:book id="1">
        <bk:title>XML Guide</bk:title>
    </bk:book>
</catalog>

<!-- Document 2 -->
<library xmlns:book="http://example.com/books">
    <book:item id="1">
        <book:name>XML Guide</book:name>
    </book:item>
</library>
```

**Solution**: Namespace-aware processing focuses on URI, not prefix.

### Python Example: Handling Multiple Prefixes

```python
from lxml import etree

def process_books(xml_content):
    """Process books regardless of prefix used"""
    root = etree.fromstring(xml_content)
    
    # Use namespace URI in XPath, not prefix
    books_ns = "http://example.com/books"
    books = root.xpath(f".//*[namespace-uri()='{books_ns}']")
    
    for book in books:
        print(f"Found book element: {book.tag}")
        # Get local name without prefix
        local_name = etree.QName(book).localname
        print(f"Local name: {local_name}")

# Test with both documents
xml1 = '''<catalog xmlns:bk="http://example.com/books">
    <bk:book><bk:title>XML Guide</bk:title></bk:book>
</catalog>'''

xml2 = '''<library xmlns:book="http://example.com/books">
    <book:item><book:name>XML Guide</book:name></book:item>
</library>'''

process_books(xml1)
process_books(xml2)
```

### Java Example: Namespace-Aware Processing

```java
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Element;

public class AdvancedNamespaceHandler {
    
    public static void processNamespaceAware(String xmlContent) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            // Enable namespace awareness
            factory.setNamespaceAware(true);
            
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xmlContent.getBytes()));
            
            String booksNS = "http://example.com/books";
            NodeList elements = doc.getElementsByTagNameNS(booksNS, "*");
            
            for (int i = 0; i < elements.getLength(); i++) {
                Element element = (Element) elements.item(i);
                System.out.println("Namespace URI: " + element.getNamespaceURI());
                System.out.println("Local Name: " + element.getLocalName());
                System.out.println("Prefix: " + element.getPrefix());
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

## ⚔️ Namespace Collision Resolution

### Common Collision Scenarios

#### 1. Same Element Names, Different Meanings

```xml
<document xmlns:html="http://www.w3.org/1999/xhtml"
          xmlns:doc="http://example.com/document">
    <!-- HTML table -->
    <html:table>
        <html:tr><html:td>Data</html:td></html:tr>
    </html:table>
    
    <!-- Document table (e.g., table of contents) -->
    <doc:table>
        <doc:chapter>Introduction</doc:chapter>
        <doc:page>1</doc:page>
    </doc:table>
</document>
```

#### 2. Namespace URI Conflicts

```xml
<!-- Problematic: Same prefix, different URIs -->
<root>
    <section xmlns:app="http://oldversion.com/app">
        <app:config>Old Config</app:config>
    </section>
    <section xmlns:app="http://newversion.com/app">
        <app:config>New Config</app:config>
    </section>
</root>
```

### Resolution Strategies

#### Strategy 1: Hierarchical Namespace Design

```xml
<enterprise xmlns:base="http://company.com/xml/base"
           xmlns:hr="http://company.com/xml/hr"
           xmlns:finance="http://company.com/xml/finance">
    
    <base:metadata>
        <base:created>2024-01-01</base:created>
    </base:metadata>
    
    <hr:employee>
        <hr:name>John Doe</hr:name>
        <hr:department>Engineering</hr:department>
    </hr:employee>
    
    <finance:budget>
        <finance:department>Engineering</finance:department>
        <finance:amount>100000</finance:amount>
    </finance:budget>
</enterprise>
```

#### Strategy 2: Version-Aware Namespaces

```xml
<application xmlns:v1="http://company.com/app/v1"
            xmlns:v2="http://company.com/app/v2">
    
    <!-- Legacy support -->
    <v1:user>
        <v1:name>John</v1:name>
    </v1:user>
    
    <!-- New version with additional fields -->
    <v2:user>
        <v2:firstName>John</v2:firstName>
        <v2:lastName>Doe</v2:lastName>
        <v2:email>john@example.com</v2:email>
    </v2:user>
</application>
```

---

## 🌐 Default Namespace Strategies

### When to Use Default Namespaces

**Good for**: Primary content vocabulary
**Avoid for**: Mixed vocabularies requiring frequent switching

### Example: Document with Default Namespace

```xml
<?xml version="1.0" encoding="UTF-8"?>
<book xmlns="http://example.com/books"
      xmlns:meta="http://example.com/metadata"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    
    <!-- Default namespace - no prefix needed -->
    <title>Advanced XML Techniques</title>
    <author>Jane Smith</author>
    
    <!-- Metadata namespace -->
    <meta:created>2024-01-01</meta:created>
    <meta:version>1.0</meta:version>
    
    <!-- Schema instance namespace -->
    <chapters xsi:nil="false">
        <chapter>
            <number>1</number>
            <title>Introduction</title>
        </chapter>
    </chapters>
</book>
```

### JavaScript Example: Processing Default Namespaces

```javascript
// Node.js with xml2js
const xml2js = require('xml2js');
const { DOMParser } = require('xmldom');

function processDefaultNamespace(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    
    // Get elements by namespace URI
    const bookNS = "http://example.com/books";
    const metaNS = "http://example.com/metadata";
    
    function getElementsInNamespace(node, namespaceURI) {
        const result = [];
        
        function traverse(node) {
            if (node.nodeType === 1 && node.namespaceURI === namespaceURI) {
                result.push(node);
            }
            for (let child = node.firstChild; child; child = child.nextSibling) {
                traverse(child);
            }
        }
        
        traverse(node);
        return result;
    }
    
    // Get all book elements
    const bookElements = getElementsInNamespace(doc, bookNS);
    console.log("Book elements found:", bookElements.length);
    
    // Get all metadata elements
    const metaElements = getElementsInNamespace(doc, metaNS);
    console.log("Metadata elements found:", metaElements.length);
}
```

---

## 🏢 Enterprise Namespace Design

### Design Principles

1. **Hierarchical Organization**: `http://company.com/domain/subdomain`
2. **Version Management**: Include version in URI or use separate URIs
3. **Meaningful Names**: Clear, descriptive namespace identifiers
4. **Stability**: Avoid changing namespace URIs

### Enterprise Namespace Architecture Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<enterprise-data xmlns="http://acme.com/enterprise/core/v2"
                 xmlns:hr="http://acme.com/enterprise/hr/v1"
                 xmlns:finance="http://acme.com/enterprise/finance/v2"
                 xmlns:security="http://acme.com/enterprise/security/v1"
                 xmlns:audit="http://acme.com/enterprise/audit/v1">
    
    <!-- Core enterprise elements (default namespace) -->
    <document-id>DOC-2024-001</document-id>
    <created-date>2024-01-15T10:30:00Z</created-date>
    
    <!-- Security context -->
    <security:classification level="internal">
        <security:clearance-required>false</security:clearance-required>
        <security:access-groups>
            <security:group>HR-Managers</security:group>
            <security:group>Finance-Team</security:group>
        </security:access-groups>
    </security:classification>
    
    <!-- HR data -->
    <hr:employee-record>
        <hr:employee-id>EMP-12345</hr:employee-id>
        <hr:personal-info>
            <hr:name>
                <hr:first>John</hr:first>
                <hr:last>Doe</hr:last>
            </hr:name>
            <hr:hire-date>2020-03-15</hr:hire-date>
        </hr:personal-info>
        
        <!-- Finance data within HR context -->
        <hr:compensation>
            <finance:salary currency="USD">75000</finance:salary>
            <finance:bonus-eligible>true</finance:bonus-eligible>
        </hr:compensation>
    </hr:employee-record>
    
    <!-- Audit trail -->
    <audit:trail>
        <audit:event>
            <audit:timestamp>2024-01-15T10:30:00Z</audit:timestamp>
            <audit:user>hr.system</audit:user>
            <audit:action>CREATE_EMPLOYEE_RECORD</audit:action>
        </audit:event>
    </audit:trail>
</enterprise-data>
```

### Schema Design for Enterprise Namespaces

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://acme.com/enterprise/core/v2"
           xmlns:tns="http://acme.com/enterprise/core/v2"
           xmlns:hr="http://acme.com/enterprise/hr/v1"
           xmlns:finance="http://acme.com/enterprise/finance/v2"
           elementFormDefault="qualified">
    
    <!-- Import related schemas -->
    <xs:import namespace="http://acme.com/enterprise/hr/v1" 
               schemaLocation="hr-v1.xsd"/>
    <xs:import namespace="http://acme.com/enterprise/finance/v2" 
               schemaLocation="finance-v2.xsd"/>
    
    <!-- Core elements -->
    <xs:element name="enterprise-data" type="tns:EnterpriseDataType"/>
    
    <xs:complexType name="EnterpriseDataType">
        <xs:sequence>
            <xs:element name="document-id" type="xs:string"/>
            <xs:element name="created-date" type="xs:dateTime"/>
            <xs:element ref="hr:employee-record"/>
        </xs:sequence>
    </xs:complexType>
</xs:schema>
```

---

## 📈 Namespace Versioning

### Versioning Strategies

#### 1. Version in Namespace URI

```xml
<!-- Version 1 -->
<config xmlns="http://company.com/config/v1">
    <setting name="timeout">30</setting>
</config>

<!-- Version 2 -->
<config xmlns="http://company.com/config/v2">
    <setting name="timeout" unit="seconds">30</setting>
    <setting name="max-retries">3</setting>
</config>
```

#### 2. Parallel Namespace Support

```xml
<application xmlns:v1="http://company.com/app/v1"
            xmlns:v2="http://company.com/app/v2">
    
    <!-- Support both versions -->
    <v1:legacy-config>
        <v1:timeout>30</v1:timeout>
    </v1:legacy-config>
    
    <v2:new-config>
        <v2:timeout unit="seconds">30</v2:timeout>
        <v2:retries>3</v2:retries>
    </v2:new-config>
</application>
```

### Python Version Detection Example

```python
from lxml import etree

class NamespaceVersionHandler:
    
    VERSION_MAP = {
        "http://company.com/app/v1": "1.0",
        "http://company.com/app/v2": "2.0",
        "http://company.com/app/v3": "3.0"
    }
    
    def detect_version(self, xml_content):
        """Detect namespace version from XML content"""
        root = etree.fromstring(xml_content)
        
        # Get all namespace declarations
        namespaces = root.nsmap
        
        detected_versions = []
        for prefix, uri in namespaces.items():
            if uri in self.VERSION_MAP:
                detected_versions.append({
                    'prefix': prefix,
                    'uri': uri,
                    'version': self.VERSION_MAP[uri]
                })
        
        return detected_versions
    
    def process_by_version(self, xml_content):
        """Process XML based on detected version"""
        versions = self.detect_version(xml_content)
        root = etree.fromstring(xml_content)
        
        for version_info in versions:
            uri = version_info['uri']
            version = version_info['version']
            
            if version == "1.0":
                self._process_v1(root, uri)
            elif version == "2.0":
                self._process_v2(root, uri)
            elif version == "3.0":
                self._process_v3(root, uri)
    
    def _process_v1(self, root, namespace_uri):
        """Handle version 1.0 processing"""
        elements = root.xpath(f".//*[namespace-uri()='{namespace_uri}']")
        print(f"Processing {len(elements)} v1.0 elements")
    
    def _process_v2(self, root, namespace_uri):
        """Handle version 2.0 processing"""
        elements = root.xpath(f".//*[namespace-uri()='{namespace_uri}']")
        print(f"Processing {len(elements)} v2.0 elements")
    
    def _process_v3(self, root, namespace_uri):
        """Handle version 3.0 processing"""
        elements = root.xpath(f".//*[namespace-uri()='{namespace_uri}']")
        print(f"Processing {len(elements)} v3.0 elements")

# Example usage
handler = NamespaceVersionHandler()

xml_v1 = '''<config xmlns="http://company.com/app/v1">
    <timeout>30</timeout>
</config>'''

xml_mixed = '''<app xmlns:v1="http://company.com/app/v1"
                   xmlns:v2="http://company.com/app/v2">
    <v1:old-setting>value1</v1:old-setting>
    <v2:new-setting>value2</v2:new-setting>
</app>'''

print("Version 1 detection:", handler.detect_version(xml_v1))
print("Mixed version detection:", handler.detect_version(xml_mixed))
```

---

## ⚡ Performance Considerations

### Namespace Processing Overhead

```python
import time
from lxml import etree

def performance_comparison():
    """Compare namespace-aware vs namespace-unaware processing"""
    
    xml_with_ns = '''<?xml version="1.0"?>
    <root xmlns:a="http://example.com/a" xmlns:b="http://example.com/b">
        <a:item>Value 1</a:item>
        <b:item>Value 2</b:item>
    </root>'''
    
    xml_without_ns = '''<?xml version="1.0"?>
    <root>
        <item1>Value 1</item1>
        <item2>Value 2</item2>
    </root>'''
    
    iterations = 10000
    
    # Test namespace-aware processing
    start = time.time()
    for _ in range(iterations):
        root = etree.fromstring(xml_with_ns)
        items = root.xpath(".//*[namespace-uri()='http://example.com/a']")
    ns_time = time.time() - start
    
    # Test simple processing
    start = time.time()
    for _ in range(iterations):
        root = etree.fromstring(xml_without_ns)
        items = root.xpath(".//item1")
    simple_time = time.time() - start
    
    print(f"Namespace processing: {ns_time:.4f}s")
    print(f"Simple processing: {simple_time:.4f}s")
    print(f"Overhead: {((ns_time - simple_time) / simple_time) * 100:.1f}%")

# performance_comparison()
```

### Optimization Strategies

#### 1. Prefix Caching

```java
public class NamespaceCache {
    private final Map<String, String> prefixToUri = new HashMap<>();
    private final Map<String, String> uriToPrefix = new HashMap<>();
    
    public void cacheNamespace(String prefix, String uri) {
        prefixToUri.put(prefix, uri);
        uriToPrefix.put(uri, prefix);
    }
    
    public String getUri(String prefix) {
        return prefixToUri.get(prefix);
    }
    
    public String getPrefix(String uri) {
        return uriToPrefix.get(uri);
    }
    
    public boolean isKnownNamespace(String uri) {
        return uriToPrefix.containsKey(uri);
    }
}
```

#### 2. Lazy Namespace Resolution

```python
class LazyNamespaceResolver:
    def __init__(self):
        self._namespace_cache = {}
        self._resolved = False
    
    def resolve_namespaces(self, element):
        """Resolve namespaces only when needed"""
        if not self._resolved:
            self._build_namespace_cache(element)
            self._resolved = True
        
        return self._namespace_cache
    
    def _build_namespace_cache(self, element):
        """Build namespace cache from element tree"""
        # Walk up the tree to collect all namespace declarations
        current = element
        while current is not None:
            if hasattr(current, 'nsmap'):
                self._namespace_cache.update(current.nsmap)
            current = current.getparent()
```

---

## 🌍 Real-World Examples

### Example 1: SOAP Web Service

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:web="http://company.com/webservice/v1"
               xmlns:types="http://company.com/types/v1">
    
    <soap:Header>
        <web:authentication>
            <web:token>abc123def456</web:token>
        </web:authentication>
    </soap:Header>
    
    <soap:Body>
        <web:getUserProfile>
            <web:userId>12345</web:userId>
            <web:includePreferences>true</web:includePreferences>
        </web:getUserProfile>
    </soap:Body>
</soap:Envelope>
```

### Example 2: RSS with Multiple Namespaces

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
    
    <channel>
        <title>Tech Blog</title>
        <atom:link href="http://example.com/feed" rel="self" type="application/rss+xml"/>
        
        <item>
            <title>Advanced XML Techniques</title>
            <dc:creator>Jane Smith</dc:creator>
            <dc:date>2024-01-15T10:00:00Z</dc:date>
            <content:encoded><![CDATA[
                <p>In this article, we explore...</p>
            ]]></content:encoded>
        </item>
    </channel>
</rss>
```

### Example 3: Office Open XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
    
    <w:body>
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Heading1"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:b/>
                    <w:sz w:val="24"/>
                </w:rPr>
                <w:t>Advanced XML Namespaces</w:t>
            </w:r>
        </w:p>
        
        <w:p>
            <w:r>
                <w:t>This document demonstrates namespace usage in Office formats.</w:t>
            </w:r>
        </w:p>
    </w:body>
</w:document>
```

---

## ⚠️ Common Pitfalls

### 1. Prefix Assumptions

❌ **Wrong**: Hardcoding prefix in code
```python
# DON'T DO THIS
books = root.xpath("//book:title")  # Assumes 'book' prefix
```

✅ **Correct**: Use namespace URI
```python
# DO THIS INSTEAD
namespaces = {'book': 'http://example.com/books'}
books = root.xpath("//book:title", namespaces=namespaces)
```

### 2. Default Namespace Confusion

❌ **Wrong**: Ignoring default namespace
```python
# This won't work with default namespace
titles = root.xpath("//title")
```

✅ **Correct**: Handle default namespace explicitly
```python
# Register default namespace with a prefix
namespaces = {'def': 'http://example.com/books'}
titles = root.xpath("//def:title", namespaces=namespaces)
```

### 3. Namespace URI Typos

Common mistake: Small typos in namespace URIs
```xml
<!-- Correct -->
<book xmlns="http://example.com/books/v1">

<!-- Wrong - typo in URI -->
<book xmlns="http://example.com/book/v1">  <!-- Missing 's' -->
```

### 4. Mixed Content Issues

```xml
<!-- Problematic: Mixing default and prefixed namespaces -->
<document xmlns="http://example.com/doc">
    <title>Document Title</title>
    <!-- This element is NOT in the default namespace -->
    <section xmlns="">  
        <title>Section Title</title>  <!-- Different namespace! -->
    </section>
</document>
```

---

## 🧪 Exercises & Practice

### Exercise 1: Namespace Detection

Write a function that analyzes an XML document and reports:
- All namespace declarations
- Elements using each namespace
- Potential namespace conflicts

```python
def analyze_namespaces(xml_content):
    """
    Analyze XML document for namespace usage
    Return a report of namespace declarations and usage
    """
    # Your implementation here
    pass

# Test with this XML
test_xml = '''<?xml version="1.0"?>
<root xmlns="http://default.com"
      xmlns:a="http://example.com/a"
      xmlns:b="http://example.com/b">
    <title>Default NS Title</title>
    <a:item>Item A</a:item>
    <b:item xmlns:a="http://different.com/a">
        <a:nested>Different A namespace</a:nested>
    </b:item>
</root>'''

analyze_namespaces(test_xml)
```

### Exercise 2: Namespace Migration

Create a tool that migrates XML documents from old namespace URIs to new ones:

```python
def migrate_namespaces(xml_content, namespace_mapping):
    """
    Migrate XML document from old namespaces to new ones
    
    Args:
        xml_content: XML string
        namespace_mapping: dict of old_uri -> new_uri
    
    Returns:
        Migrated XML string
    """
    # Your implementation here
    pass

# Test migration
migration_map = {
    "http://old.company.com/v1": "http://new.company.com/v2",
    "http://legacy.system.com": "http://modern.system.com/v1"
}

old_xml = '''<data xmlns="http://old.company.com/v1"
                  xmlns:legacy="http://legacy.system.com">
    <item>Test</item>
    <legacy:config>Old Config</legacy:config>
</data>'''

new_xml = migrate_namespaces(old_xml, migration_map)
```

### Exercise 3: Enterprise Namespace Validator

Build a validator that checks enterprise namespace conventions:

```python
class EnterpriseNamespaceValidator:
    def __init__(self, company_domain, allowed_versions):
        self.company_domain = company_domain
        self.allowed_versions = allowed_versions
    
    def validate(self, xml_content):
        """
        Validate namespace URIs against company conventions
        
        Returns:
            List of validation errors
        """
        # Your implementation here
        pass
    
    def check_uri_format(self, uri):
        """Check if URI follows company format"""
        # Format: http://company.com/division/domain/version
        pass
    
    def check_version_compliance(self, uri):
        """Check if version is in allowed list"""
        pass

# Test validator
validator = EnterpriseNamespaceValidator(
    company_domain="acme.com",
    allowed_versions=["v1", "v2", "v2.1"]
)

test_enterprise_xml = '''<data xmlns="http://acme.com/hr/employees/v2"
                              xmlns:finance="http://acme.com/finance/payroll/v1"
                              xmlns:external="http://external.com/api/v1">
    <employee-data/>
</data>'''

errors = validator.validate(test_enterprise_xml)
```

---

## 🎯 Key Takeaways

✅ **Remember**: Focus on namespace URIs, not prefixes  
✅ **Always**: Use namespace-aware XML parsers in production  
✅ **Design**: Hierarchical namespace schemes for enterprise applications  
✅ **Plan**: Namespace versioning strategy from the beginning  
✅ **Avoid**: Hardcoding prefixes in application code  
✅ **Test**: Namespace collision scenarios thoroughly  
✅ **Cache**: Namespace resolution for performance  

---

## 💡 Pro Tips for Interviews

**Q: "Explain the difference between a namespace URI and a namespace prefix."**
**A:** The namespace URI is the unique identifier that defines the namespace (like `http://example.com/books`). The prefix is just a short alias (`book:`) used to avoid repeating the full URI. Multiple prefixes can point to the same URI, and the same prefix can be redefined in different scopes.

**Q: "How do you handle namespace conflicts in XML?"**
**A:** Use namespace-aware parsers, focus on URIs not prefixes, design hierarchical namespace schemes, implement version-aware processing, and establish enterprise namespace governance policies.

**Q: "When would you use a default namespace vs prefixed namespaces?"**
**A:** Use default namespaces when most content belongs to one vocabulary (like HTML documents). Use prefixed namespaces when mixing multiple vocabularies frequently or when you need clear visual separation of different domains.

---

🎉 **Congratulations!** You've mastered advanced XML namespaces. 

**Next**: [Advanced XSD Design](./02-Advanced-XSD.md) - Learn complex schema patterns and constraints.