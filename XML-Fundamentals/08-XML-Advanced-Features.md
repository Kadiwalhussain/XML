# 🚀 XML Advanced Features - Professional XML Techniques

## Advanced XML Concepts Overview

This section covers sophisticated XML features used in enterprise applications, complex data processing, and advanced system integration. These techniques are essential for professional XML development.

## 1. Advanced Namespace Techniques

### Namespace Versioning and Evolution
```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:v1="http://company.com/schema/2023/v1"
          xmlns:v2="http://company.com/schema/2024/v2"
          xmlns:common="http://company.com/schema/common">
    
    <!-- Backward compatibility: Support both versions -->
    <v1:legacy-data>
        <v1:old-format>Legacy content</v1:old-format>
    </v1:legacy-data>
    
    <!-- New version with enhanced features -->
    <v2:enhanced-data>
        <v2:new-format type="advanced">
            <common:shared-element>Common content</common:shared-element>
            <v2:metadata>
                <v2:version>2.0</v2:version>
                <v2:compatibility>v1-compatible</v2:compatibility>
            </v2:metadata>
        </v2:new-format>
    </v2:enhanced-data>
    
</document>
```

### Namespace Context Management
```xml
<?xml version="1.0" encoding="UTF-8"?>
<system-config xmlns="http://company.com/config"
               xmlns:db="http://company.com/config/database"
               xmlns:cache="http://company.com/config/cache"
               xmlns:sec="http://company.com/config/security">
    
    <!-- Database configuration with its own namespace -->
    <db:cluster name="primary">
        <db:nodes>
            <db:node id="node1" role="master">
                <db:host>db1.company.com</db:host>
                <db:port>5432</db:port>
                <db:credentials>
                    <sec:username>${DB_USER}</sec:username>
                    <sec:password encrypted="true">${DB_PASS_ENCRYPTED}</sec:password>
                </db:credentials>
            </db:node>
            <db:node id="node2" role="slave">
                <db:host>db2.company.com</db:host>
                <db:port>5432</db:port>
                <db:replication-lag>max-2s</db:replication-lag>
            </db:node>
        </db:nodes>
        
        <db:connection-pool>
            <db:min-connections>10</db:min-connections>
            <db:max-connections>100</db:max-connections>
            <db:idle-timeout>300</db:idle-timeout>
        </db:connection-pool>
    </db:cluster>
    
    <!-- Cache configuration -->
    <cache:redis-cluster>
        <cache:nodes>
            <cache:node redis://cache1.company.com:6379/>
            <cache:node redis://cache2.company.com:6379/>
            <cache:node redis://cache3.company.com:6379/>
        </cache:nodes>
        <cache:settings>
            <cache:ttl-default>3600</cache:ttl-default>
            <cache:max-memory>2gb</cache:max-memory>
            <cache:eviction-policy>lru</cache:eviction-policy>
        </cache:settings>
    </cache:redis-cluster>
    
</system-config>
```

## 2. Advanced Schema Patterns

### Complex Type Hierarchies
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://company.com/hr"
           xmlns:hr="http://company.com/hr"
           elementFormDefault="qualified">

    <!-- Abstract base type for all personnel -->
    <xs:complexType name="PersonnelType" abstract="true">
        <xs:sequence>
            <xs:element name="personal-info">
                <xs:complexType>
                    <xs:sequence>
                        <xs:element name="first-name" type="xs:string"/>
                        <xs:element name="last-name" type="xs:string"/>
                        <xs:element name="birth-date" type="xs:date"/>
                        <xs:element name="ssn" type="hr:SSNType"/>
                    </xs:sequence>
                </xs:complexType>
            </xs:element>
            <xs:element name="contact-info" type="hr:ContactInfoType"/>
            <xs:element name="emergency-contact" type="hr:EmergencyContactType"/>
        </xs:sequence>
        <xs:attribute name="id" type="xs:ID" use="required"/>
        <xs:attribute name="hire-date" type="xs:date" use="required"/>
    </xs:complexType>

    <!-- Employee type - extends PersonnelType -->
    <xs:complexType name="EmployeeType">
        <xs:complexContent>
            <xs:extension base="hr:PersonnelType">
                <xs:sequence>
                    <xs:element name="employment-info">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="department" type="xs:string"/>
                                <xs:element name="position" type="xs:string"/>
                                <xs:element name="salary" type="hr:SalaryType"/>
                                <xs:element name="benefits" type="hr:BenefitsType"/>
                                <xs:element name="performance-reviews" 
                                          type="hr:PerformanceReviewsType" minOccurs="0"/>
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                </xs:sequence>
                <xs:attribute name="employee-type" type="hr:EmployeeTypeEnum" use="required"/>
                <xs:attribute name="status" type="hr:EmploymentStatusEnum" default="active"/>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <!-- Manager type - extends EmployeeType -->
    <xs:complexType name="ManagerType">
        <xs:complexContent>
            <xs:extension base="hr:EmployeeType">
                <xs:sequence>
                    <xs:element name="management-info">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="direct-reports" type="hr:DirectReportsType"/>
                                <xs:element name="budget-responsibility" type="xs:decimal"/>
                                <xs:element name="management-level" type="hr:ManagementLevelType"/>
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                </xs:sequence>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <!-- Contractor type - extends PersonnelType -->
    <xs:complexType name="ContractorType">
        <xs:complexContent>
            <xs:extension base="hr:PersonnelType">
                <xs:sequence>
                    <xs:element name="contract-info">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="company" type="xs:string"/>
                                <xs:element name="contract-start" type="xs:date"/>
                                <xs:element name="contract-end" type="xs:date"/>
                                <xs:element name="hourly-rate" type="xs:decimal"/>
                                <xs:element name="max-hours-per-week" type="xs:int"/>
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                </xs:sequence>
                <xs:attribute name="contract-type" type="hr:ContractTypeEnum" use="required"/>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <!-- Advanced custom types -->
    <xs:simpleType name="SSNType">
        <xs:restriction base="xs:string">
            <xs:pattern value="[0-9]{3}-[0-9]{2}-[0-9]{4}"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:complexType name="SalaryType">
        <xs:sequence>
            <xs:element name="base-salary" type="xs:decimal"/>
            <xs:element name="bonus-eligible" type="xs:boolean"/>
            <xs:element name="stock-options" type="xs:int" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="currency" type="xs:string" default="USD"/>
        <xs:attribute name="pay-frequency" type="hr:PayFrequencyEnum" default="monthly"/>
    </xs:complexType>

    <!-- Enumerations -->
    <xs:simpleType name="EmployeeTypeEnum">
        <xs:restriction base="xs:string">
            <xs:enumeration value="full-time"/>
            <xs:enumeration value="part-time"/>
            <xs:enumeration value="intern"/>
            <xs:enumeration value="temporary"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:simpleType name="EmploymentStatusEnum">
        <xs:restriction base="xs:string">
            <xs:enumeration value="active"/>
            <xs:enumeration value="on-leave"/>
            <xs:enumeration value="terminated"/>
            <xs:enumeration value="retired"/>
        </xs:restriction>
    </xs:simpleType>

</xs:schema>
```

### Polymorphic XML with Substitution Groups
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://company.com/notifications"
           xmlns:notif="http://company.com/notifications"
           elementFormDefault="qualified">

    <!-- Abstract notification base -->
    <xs:element name="notification" type="notif:NotificationType" abstract="true"/>

    <!-- Concrete notification types -->
    <xs:element name="email-notification" 
                type="notif:EmailNotificationType" 
                substitutionGroup="notif:notification"/>
                
    <xs:element name="sms-notification" 
                type="notif:SMSNotificationType" 
                substitutionGroup="notif:notification"/>
                
    <xs:element name="push-notification" 
                type="notif:PushNotificationType" 
                substitutionGroup="notif:notification"/>

    <xs:element name="webhook-notification" 
                type="notif:WebhookNotificationType" 
                substitutionGroup="notif:notification"/>

    <!-- Base notification type -->
    <xs:complexType name="NotificationType" abstract="true">
        <xs:sequence>
            <xs:element name="id" type="xs:string"/>
            <xs:element name="timestamp" type="xs:dateTime"/>
            <xs:element name="priority" type="notif:PriorityLevel"/>
            <xs:element name="message" type="xs:string"/>
        </xs:sequence>
    </xs:complexType>

    <!-- Email notification -->
    <xs:complexType name="EmailNotificationType">
        <xs:complexContent>
            <xs:extension base="notif:NotificationType">
                <xs:sequence>
                    <xs:element name="recipients">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="to" type="notif:EmailAddressType" maxOccurs="unbounded"/>
                                <xs:element name="cc" type="notif:EmailAddressType" minOccurs="0" maxOccurs="unbounded"/>
                                <xs:element name="bcc" type="notif:EmailAddressType" minOccurs="0" maxOccurs="unbounded"/>
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                    <xs:element name="subject" type="xs:string"/>
                    <xs:element name="body">
                        <xs:complexType>
                            <xs:choice>
                                <xs:element name="text" type="xs:string"/>
                                <xs:element name="html" type="xs:string"/>
                            </xs:choice>
                        </xs:complexType>
                    </xs:element>
                    <xs:element name="attachments" minOccurs="0">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="attachment" maxOccurs="unbounded">
                                    <xs:complexType>
                                        <xs:sequence>
                                            <xs:element name="filename" type="xs:string"/>
                                            <xs:element name="content-type" type="xs:string"/>
                                            <xs:element name="data" type="xs:base64Binary"/>
                                        </xs:sequence>
                                    </xs:complexType>
                                </xs:element>
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                </xs:sequence>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <!-- SMS notification -->
    <xs:complexType name="SMSNotificationType">
        <xs:complexContent>
            <xs:extension base="notif:NotificationType">
                <xs:sequence>
                    <xs:element name="phone-numbers">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="number" type="notif:PhoneNumberType" maxOccurs="unbounded"/>
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                    <xs:element name="short-message" type="notif:SMSMessageType"/>
                </xs:sequence>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>

    <!-- Notification system root -->
    <xs:element name="notification-batch">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="metadata">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="batch-id" type="xs:string"/>
                            <xs:element name="created" type="xs:dateTime"/>
                            <xs:element name="total-notifications" type="xs:int"/>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
                <!-- This can accept any type of notification -->
                <xs:element ref="notif:notification" maxOccurs="unbounded"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>
```

## 3. XML Processing Patterns

### Streaming XML Processing
```java
import javax.xml.stream.*;
import javax.xml.namespace.QName;
import java.io.*;
import java.util.*;

public class StreamingXMLProcessor {
    
    // Process large XML files efficiently
    public static void processLargeInventoryFile(String filename) {
        XMLInputFactory factory = XMLInputFactory.newInstance();
        
        try (FileInputStream fis = new FileInputStream(filename)) {
            XMLStreamReader reader = factory.createXMLStreamReader(fis);
            
            ProductProcessor processor = new ProductProcessor();
            Product currentProduct = null;
            String currentElement = null;
            
            while (reader.hasNext()) {
                int event = reader.next();
                
                switch (event) {
                    case XMLStreamConstants.START_ELEMENT:
                        String localName = reader.getLocalName();
                        
                        if ("product".equals(localName)) {
                            currentProduct = new Product();
                            currentProduct.setId(reader.getAttributeValue(null, "id"));
                            currentProduct.setSku(reader.getAttributeValue(null, "sku"));
                        }
                        currentElement = localName;
                        break;
                        
                    case XMLStreamConstants.CHARACTERS:
                        if (currentProduct != null && currentElement != null) {
                            String text = reader.getText().trim();
                            if (!text.isEmpty()) {
                                setProductField(currentProduct, currentElement, text);
                            }
                        }
                        break;
                        
                    case XMLStreamConstants.END_ELEMENT:
                        if ("product".equals(reader.getLocalName())) {
                            // Process the complete product
                            processor.processProduct(currentProduct);
                            currentProduct = null;
                        }
                        currentElement = null;
                        break;
                }
            }
            
            processor.finalize();
            
        } catch (Exception e) {
            throw new RuntimeException("Error processing XML file", e);
        }
    }
    
    // Advanced streaming with namespace handling
    public static void processMultiNamespaceDocument(String filename) {
        XMLInputFactory factory = XMLInputFactory.newInstance();
        factory.setProperty(XMLInputFactory.IS_NAMESPACE_AWARE, Boolean.TRUE);
        
        try (FileInputStream fis = new FileInputStream(filename)) {
            XMLStreamReader reader = factory.createXMLStreamReader(fis);
            
            Map<String, String> namespaceMap = new HashMap<>();
            
            while (reader.hasNext()) {
                int event = reader.next();
                
                switch (event) {
                    case XMLStreamConstants.START_ELEMENT:
                        QName elementName = reader.getName();
                        String uri = elementName.getNamespaceURI();
                        String localName = elementName.getLocalPart();
                        String prefix = elementName.getPrefix();
                        
                        System.out.printf("Element: {%s}%s (prefix: %s)%n", 
                                        uri, localName, prefix);
                        
                        // Process attributes
                        for (int i = 0; i < reader.getAttributeCount(); i++) {
                            QName attrName = reader.getAttributeName(i);
                            String attrValue = reader.getAttributeValue(i);
                            System.out.printf("  Attribute: {%s}%s = %s%n",
                                            attrName.getNamespaceURI(),
                                            attrName.getLocalPart(),
                                            attrValue);
                        }
                        
                        // Process namespace declarations
                        for (int i = 0; i < reader.getNamespaceCount(); i++) {
                            String nsPrefix = reader.getNamespacePrefix(i);
                            String nsUri = reader.getNamespaceURI(i);
                            namespaceMap.put(nsPrefix != null ? nsPrefix : "", nsUri);
                        }
                        break;
                }
            }
            
        } catch (Exception e) {
            throw new RuntimeException("Error processing namespace-aware XML", e);
        }
    }
    
    private static void setProductField(Product product, String field, String value) {
        switch (field) {
            case "name":
                product.setName(value);
                break;
            case "price":
                product.setPrice(Double.parseDouble(value));
                break;
            case "category":
                product.setCategory(value);
                break;
            case "description":
                product.setDescription(value);
                break;
        }
    }
}

class ProductProcessor {
    private int processedCount = 0;
    private double totalValue = 0.0;
    
    public void processProduct(Product product) {
        // Process individual product (e.g., save to database)
        System.out.println("Processing: " + product.getName());
        
        processedCount++;
        totalValue += product.getPrice();
        
        // Batch processing every 1000 products
        if (processedCount % 1000 == 0) {
            System.out.println("Processed " + processedCount + " products");
            System.out.println("Running total value: $" + totalValue);
        }
    }
    
    public void finalize() {
        System.out.println("Final count: " + processedCount + " products");
        System.out.println("Total inventory value: $" + totalValue);
    }
}

class Product {
    private String id;
    private String sku;
    private String name;
    private double price;
    private String category;
    private String description;
    
    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
```

### XML Transformation Pipeline
```java
import javax.xml.transform.*;
import javax.xml.transform.stream.*;
import java.io.*;
import java.util.*;

public class XMLTransformationPipeline {
    
    private List<TransformationStep> steps = new ArrayList<>();
    
    public XMLTransformationPipeline addStep(String xslFile, Map<String, Object> parameters) {
        steps.add(new TransformationStep(xslFile, parameters));
        return this;
    }
    
    public void execute(String inputFile, String outputFile) throws Exception {
        TransformerFactory factory = TransformerFactory.newInstance();
        
        Source currentSource = new StreamSource(new File(inputFile));
        
        for (int i = 0; i < steps.size(); i++) {
            TransformationStep step = steps.get(i);
            
            // Create transformer
            Transformer transformer = factory.newTransformer(
                new StreamSource(new File(step.getXslFile()))
            );
            
            // Set parameters
            for (Map.Entry<String, Object> param : step.getParameters().entrySet()) {
                transformer.setParameter(param.getKey(), param.getValue());
            }
            
            // Determine output for this step
            Result result;
            if (i == steps.size() - 1) {
                // Final step - output to file
                result = new StreamResult(new File(outputFile));
            } else {
                // Intermediate step - output to string for next step
                StringWriter writer = new StringWriter();
                result = new StreamResult(writer);
                
                // Perform transformation
                transformer.transform(currentSource, result);
                
                // Prepare for next step
                currentSource = new StreamSource(new StringReader(writer.toString()));
                continue;
            }
            
            // Perform transformation
            transformer.transform(currentSource, result);
        }
    }
    
    // Example usage
    public static void demonstratePipeline() throws Exception {
        XMLTransformationPipeline pipeline = new XMLTransformationPipeline();
        
        // Step 1: Filter data
        Map<String, Object> filterParams = new HashMap<>();
        filterParams.put("category", "electronics");
        filterParams.put("min-price", "50.00");
        pipeline.addStep("filter-products.xsl", filterParams);
        
        // Step 2: Sort data
        Map<String, Object> sortParams = new HashMap<>();
        sortParams.put("sort-by", "price");
        sortParams.put("sort-order", "ascending");
        pipeline.addStep("sort-products.xsl", sortParams);
        
        // Step 3: Format output
        Map<String, Object> formatParams = new HashMap<>();
        formatParams.put("output-format", "html");
        formatParams.put("include-images", "true");
        pipeline.addStep("format-products.xsl", formatParams);
        
        // Execute pipeline
        pipeline.execute("products.xml", "filtered-products.html");
    }
    
    private static class TransformationStep {
        private String xslFile;
        private Map<String, Object> parameters;
        
        public TransformationStep(String xslFile, Map<String, Object> parameters) {
            this.xslFile = xslFile;
            this.parameters = parameters != null ? parameters : new HashMap<>();
        }
        
        public String getXslFile() { return xslFile; }
        public Map<String, Object> getParameters() { return parameters; }
    }
}
```

## 4. Advanced XPath and XSLT

### Complex XPath Expressions
```xml
<!-- Sample XML for XPath examples -->
<?xml version="1.0" encoding="UTF-8"?>
<company xmlns="http://company.com/hr" 
         xmlns:finance="http://company.com/finance">
    <departments>
        <department id="eng" name="Engineering" budget="1000000">
            <employees>
                <employee id="E001" level="senior" salary="95000">
                    <name>John Smith</name>
                    <skills>
                        <skill level="expert">Java</skill>
                        <skill level="advanced">Python</skill>
                        <skill level="intermediate">JavaScript</skill>
                    </skills>
                </employee>
                <employee id="E002" level="junior" salary="65000">
                    <name>Jane Doe</name>
                    <skills>
                        <skill level="advanced">Python</skill>
                        <skill level="expert">Machine Learning</skill>
                    </skills>
                </employee>
            </employees>
        </department>
        <department id="sales" name="Sales" budget="750000">
            <employees>
                <employee id="E003" level="senior" salary="85000">
                    <name>Bob Wilson</name>
                    <skills>
                        <skill level="expert">Sales</skill>
                        <skill level="advanced">CRM</skill>
                    </skills>
                </employee>
            </employees>
        </department>
    </departments>
    <finance:budgets>
        <finance:department-budget dept-id="eng" allocated="1000000" spent="850000"/>
        <finance:department-budget dept-id="sales" allocated="750000" spent="620000"/>
    </finance:budgets>
</company>
```

### Advanced XPath Examples
```java
public class AdvancedXPathExamples {
    
    public static void demonstrateComplexXPath() throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse("company.xml");
        
        XPath xpath = XPathFactory.newInstance().newXPath();
        
        // Set up namespace context
        xpath.setNamespaceContext(new NamespaceContext() {
            @Override
            public String getNamespaceURI(String prefix) {
                switch (prefix) {
                    case "hr": return "http://company.com/hr";
                    case "finance": return "http://company.com/finance";
                    default: return XMLConstants.NULL_NS_URI;
                }
            }
            
            @Override
            public String getPrefix(String namespaceURI) {
                return null; // Not needed for this example
            }
            
            @Override
            public Iterator<String> getPrefixes(String namespaceURI) {
                return null; // Not needed for this example
            }
        });
        
        // Complex XPath expressions
        
        // 1. Find all senior employees earning more than $80,000
        String expr1 = "//hr:employee[@level='senior' and @salary > 80000]";
        NodeList seniorHighEarners = (NodeList) xpath.evaluate(expr1, doc, XPathConstants.NODESET);
        System.out.println("Senior employees earning > $80k: " + seniorHighEarners.getLength());
        
        // 2. Find employees with expert-level Java skills
        String expr2 = "//hr:employee[hr:skills/hr:skill[@level='expert' and text()='Java']]";
        NodeList javaExperts = (NodeList) xpath.evaluate(expr2, doc, XPathConstants.NODESET);
        System.out.println("Java experts: " + javaExperts.getLength());
        
        // 3. Calculate average salary by department
        String expr3 = "//hr:department[@id='eng']//hr:employee/@salary";
        NodeList engSalaries = (NodeList) xpath.evaluate(expr3, doc, XPathConstants.NODESET);
        double engAvgSalary = 0;
        for (int i = 0; i < engSalaries.getLength(); i++) {
            engAvgSalary += Double.parseDouble(engSalaries.item(i).getNodeValue());
        }
        engAvgSalary /= engSalaries.getLength();
        System.out.println("Engineering average salary: $" + engAvgSalary);
        
        // 4. Find departments with budget utilization > 80%
        String expr4 = "//finance:department-budget[@spent div @allocated > 0.8]/@dept-id";
        NodeList highUtilDepts = (NodeList) xpath.evaluate(expr4, doc, XPathConstants.NODESET);
        System.out.println("High budget utilization departments:");
        for (int i = 0; i < highUtilDepts.getLength(); i++) {
            System.out.println("  " + highUtilDepts.item(i).getNodeValue());
        }
        
        // 5. Complex predicate: employees in departments with > 1 employee
        String expr5 = "//hr:employee[count(../hr:employee) > 1]";
        NodeList employeesInLargeDepts = (NodeList) xpath.evaluate(expr5, doc, XPathConstants.NODESET);
        System.out.println("Employees in departments with > 1 employee: " + employeesInLargeDepts.getLength());
        
        // 6. Following-sibling example: skills after 'Java'
        String expr6 = "//hr:skill[text()='Java']/following-sibling::hr:skill";
        NodeList skillsAfterJava = (NodeList) xpath.evaluate(expr6, doc, XPathConstants.NODESET);
        System.out.println("Skills listed after Java:");
        for (int i = 0; i < skillsAfterJava.getLength(); i++) {
            System.out.println("  " + skillsAfterJava.item(i).getTextContent());
        }
    }
}
```

### Advanced XSLT Techniques
```xsl
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:fn="http://www.w3.org/2005/xpath-functions"
                xmlns:hr="http://company.com/hr"
                xmlns:finance="http://company.com/finance"
                exclude-result-prefixes="xs fn hr finance">

    <xsl:output method="html" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
                doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"/>

    <!-- Global parameters -->
    <xsl:param name="report-date" select="current-date()"/>
    <xsl:param name="include-finance" select="'true'"/>
    <xsl:param name="salary-threshold" select="70000"/>

    <!-- Keys for efficient lookups -->
    <xsl:key name="employee-by-id" match="hr:employee" use="@id"/>
    <xsl:key name="employees-by-department" match="hr:employee" use="ancestor::hr:department/@id"/>
    <xsl:key name="budget-by-dept" match="finance:department-budget" use="@dept-id"/>

    <!-- Global variables -->
    <xsl:variable name="total-employees" select="count(//hr:employee)"/>
    <xsl:variable name="average-salary" select="sum(//hr:employee/@salary) div $total-employees"/>

    <!-- Custom functions (XSLT 2.0) -->
    <xsl:function name="fn:calculate-utilization" as="xs:decimal">
        <xsl:param name="spent" as="xs:decimal"/>
        <xsl:param name="allocated" as="xs:decimal"/>
        <xsl:sequence select="if ($allocated > 0) then ($spent div $allocated) * 100 else 0"/>
    </xsl:function>

    <xsl:function name="fn:salary-grade" as="xs:string">
        <xsl:param name="salary" as="xs:decimal"/>
        <xsl:choose>
            <xsl:when test="$salary >= 100000">A</xsl:when>
            <xsl:when test="$salary >= 80000">B</xsl:when>
            <xsl:when test="$salary >= 60000">C</xsl:when>
            <xsl:otherwise>D</xsl:otherwise>
        </xsl:choose>
    </xsl:function>

    <!-- Main template -->
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Advanced Company Report - <xsl:value-of select="$report-date"/></title>
                <style type="text/css">
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    table { border-collapse: collapse; width: 100%; margin: 10px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .high-earner { background-color: #d4edda; }
                    .dept-header { background-color: #e9ecef; font-weight: bold; }
                    .summary { background-color: #fff3cd; }
                </style>
            </head>
            <body>
                <h1>Company Report</h1>
                <p>Report Date: <xsl:value-of select="format-date($report-date, '[D] [MNn] [Y]')"/></p>
                
                <!-- Executive Summary -->
                <xsl:call-template name="executive-summary"/>
                
                <!-- Department Analysis -->
                <xsl:call-template name="department-analysis"/>
                
                <!-- Employee Details -->
                <xsl:call-template name="employee-details"/>
                
                <!-- Financial Analysis (if enabled) -->
                <xsl:if test="$include-finance = 'true'">
                    <xsl:call-template name="financial-analysis"/>
                </xsl:if>
                
            </body>
        </html>
    </xsl:template>

    <!-- Executive Summary Template -->
    <xsl:template name="executive-summary">
        <h2>Executive Summary</h2>
        <table>
            <tr><th>Metric</th><th>Value</th></tr>
            <tr><td>Total Employees</td><td><xsl:value-of select="$total-employees"/></td></tr>
            <tr><td>Average Salary</td><td>$<xsl:value-of select="format-number($average-salary, '#,##0')"/></td></tr>
            <tr><td>Departments</td><td><xsl:value-of select="count(//hr:department)"/></td></tr>
            <tr><td>High Earners (>${<xsl:value-of select="$salary-threshold"/>})</td>
                <td><xsl:value-of select="count(//hr:employee[@salary > $salary-threshold])"/></td></tr>
        </table>
    </xsl:template>

    <!-- Department Analysis Template -->
    <xsl:template name="department-analysis">
        <h2>Department Analysis</h2>
        <table>
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Employees</th>
                    <th>Avg Salary</th>
                    <th>Total Payroll</th>
                    <th>Skills Summary</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="//hr:department">
                    <xsl:sort select="@name"/>
                    
                    <xsl:variable name="dept-employees" select="key('employees-by-department', @id)"/>
                    <xsl:variable name="dept-avg-salary" 
                                  select="sum($dept-employees/@salary) div count($dept-employees)"/>
                    
                    <tr>
                        <td><xsl:value-of select="@name"/></td>
                        <td><xsl:value-of select="count($dept-employees)"/></td>
                        <td>$<xsl:value-of select="format-number($dept-avg-salary, '#,##0')"/></td>
                        <td>$<xsl:value-of select="format-number(sum($dept-employees/@salary), '#,##0')"/></td>
                        <td>
                            <xsl:call-template name="skills-summary">
                                <xsl:with-param name="employees" select="$dept-employees"/>
                            </xsl:call-template>
                        </td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>

    <!-- Skills Summary Template -->
    <xsl:template name="skills-summary">
        <xsl:param name="employees"/>
        
        <xsl:variable name="all-skills" select="$employees//hr:skill"/>
        <xsl:variable name="unique-skills" 
                      select="$all-skills[not(. = preceding::hr:skill)]"/>
        
        <xsl:for-each select="$unique-skills">
            <xsl:sort select="text()"/>
            <xsl:if test="position() > 1">, </xsl:if>
            <xsl:value-of select="text()"/>
        </xsl:for-each>
    </xsl:template>

    <!-- Employee Details Template -->
    <xsl:template name="employee-details">
        <h2>Employee Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Level</th>
                    <th>Salary</th>
                    <th>Grade</th>
                    <th>Skills</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="//hr:employee">
                    <xsl:sort select="ancestor::hr:department/@name"/>
                    <xsl:sort select="hr:name"/>
                    
                    <xsl:variable name="salary-grade" select="fn:salary-grade(@salary)"/>
                    
                    <tr>
                        <xsl:if test="@salary > $salary-threshold">
                            <xsl:attribute name="class">high-earner</xsl:attribute>
                        </xsl:if>
                        
                        <td><xsl:value-of select="hr:name"/></td>
                        <td><xsl:value-of select="ancestor::hr:department/@name"/></td>
                        <td><xsl:value-of select="@level"/></td>
                        <td>$<xsl:value-of select="format-number(@salary, '#,##0')"/></td>
                        <td><xsl:value-of select="$salary-grade"/></td>
                        <td>
                            <xsl:for-each select="hr:skills/hr:skill">
                                <xsl:if test="position() > 1">, </xsl:if>
                                <xsl:value-of select="text()"/>
                                (<xsl:value-of select="@level"/>)
                            </xsl:for-each>
                        </td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>

    <!-- Financial Analysis Template -->
    <xsl:template name="financial-analysis">
        <h2>Financial Analysis</h2>
        <table>
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Allocated Budget</th>
                    <th>Spent</th>
                    <th>Remaining</th>
                    <th>Utilization</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="//finance:department-budget">
                    <xsl:sort select="@dept-id"/>
                    
                    <xsl:variable name="utilization" 
                                  select="fn:calculate-utilization(@spent, @allocated)"/>
                    <xsl:variable name="remaining" select="@allocated - @spent"/>
                    
                    <tr>
                        <td><xsl:value-of select="key('employees-by-department', @dept-id)[1]/ancestor::hr:department/@name"/></td>
                        <td>$<xsl:value-of select="format-number(@allocated, '#,##0')"/></td>
                        <td>$<xsl:value-of select="format-number(@spent, '#,##0')"/></td>
                        <td>$<xsl:value-of select="format-number($remaining, '#,##0')"/></td>
                        <td><xsl:value-of select="format-number($utilization, '0.0')"/>%</td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="$utilization > 90">⚠️ High</xsl:when>
                                <xsl:when test="$utilization > 75">⚡ Medium</xsl:when>
                                <xsl:otherwise>✅ Low</xsl:otherwise>
                            </xsl:choose>
                        </td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>

</xsl:stylesheet>
```

## 5. XML Security Advanced Topics

### XXE Attack Prevention
```java
public class SecureXMLProcessor {
    
    public static DocumentBuilder createSecureDocumentBuilder() throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        
        // Disable external entity processing
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
        factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
        
        // Additional security features
        factory.setXIncludeAware(false);
        factory.setExpandEntityReferences(false);
        
        return factory.newDocumentBuilder();
    }
    
    public static XMLStreamReader createSecureStreamReader(InputStream input) throws Exception {
        XMLInputFactory factory = XMLInputFactory.newInstance();
        
        // Disable external entity resolution
        factory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, Boolean.FALSE);
        factory.setProperty(XMLInputFactory.SUPPORT_DTD, Boolean.FALSE);
        
        return factory.createXMLStreamReader(input);
    }
    
    public static Schema createSecureSchema(Source schemaSource) throws Exception {
        SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        
        // Disable external entity access
        factory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
        factory.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
        
        return factory.newSchema(schemaSource);
    }
}
```

### XML Encryption and Signing
```java
import javax.xml.crypto.dsig.*;
import javax.xml.crypto.dsig.dom.DOMSignContext;
import javax.xml.crypto.dsig.keyinfo.*;
import javax.xml.crypto.dsig.spec.C14NMethodParameterSpec;
import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class XMLSecurityAdvanced {
    
    public static void signXMLDocument(Document doc, KeyPair keyPair) throws Exception {
        // Create XML Signature Factory
        XMLSignatureFactory factory = XMLSignatureFactory.getInstance("DOM");
        
        // Create Reference to the entire document
        Reference ref = factory.newReference(
            "",  // Empty string signs the entire document
            factory.newDigestMethod(DigestMethod.SHA256, null),
            Collections.singletonList(
                factory.newTransform(Transform.ENVELOPED, (TransformParameterSpec) null)
            ),
            null,
            null
        );
        
        // Create SignedInfo
        SignedInfo signedInfo = factory.newSignedInfo(
            factory.newCanonicalizationMethod(
                CanonicalizationMethod.INCLUSIVE,
                (C14NMethodParameterSpec) null
            ),
            factory.newSignatureMethod(SignatureMethod.RSA_SHA256, null),
            Collections.singletonList(ref)
        );
        
        // Create KeyInfo
        KeyInfoFactory keyInfoFactory = factory.getKeyInfoFactory();
        KeyValue keyValue = keyInfoFactory.newKeyValue(keyPair.getPublic());
        KeyInfo keyInfo = keyInfoFactory.newKeyInfo(Collections.singletonList(keyValue));
        
        // Create XMLSignature
        XMLSignature signature = factory.newXMLSignature(signedInfo, keyInfo);
        
        // Create DOMSignContext
        DOMSignContext signContext = new DOMSignContext(keyPair.getPrivate(), doc.getDocumentElement());
        
        // Sign the document
        signature.sign(signContext);
    }
    
    public static boolean verifyXMLSignature(Document doc, KeyPair keyPair) throws Exception {
        // Find the signature element
        NodeList signatureNodes = doc.getElementsByTagNameNS(XMLSignature.XMLNS, "Signature");
        if (signatureNodes.getLength() == 0) {
            throw new Exception("No signature found in document");
        }
        
        // Create XMLSignatureFactory and unmarshal the signature
        XMLSignatureFactory factory = XMLSignatureFactory.getInstance("DOM");
        DOMValidateContext validateContext = new DOMValidateContext(
            keyPair.getPublic(),
            signatureNodes.item(0)
        );
        
        XMLSignature signature = factory.unmarshalXMLSignature(validateContext);
        
        // Verify the signature
        return signature.validate(validateContext);
    }
}
```

## 6. Performance Optimization

### Memory-Efficient XML Processing
```java
public class OptimizedXMLProcessor {
    
    // Process large XML files with controlled memory usage
    public static void processLargeFileOptimized(String filename, int batchSize) {
        try {
            XMLInputFactory factory = XMLInputFactory.newInstance();
            
            // Configure for performance
            factory.setProperty(XMLInputFactory.IS_COALESCING, Boolean.FALSE);
            factory.setProperty(XMLInputFactory.IS_NAMESPACE_AWARE, Boolean.TRUE);
            factory.setProperty(XMLInputFactory.IS_VALIDATING, Boolean.FALSE);
            
            try (FileInputStream fis = new FileInputStream(filename);
                 BufferedInputStream bis = new BufferedInputStream(fis, 65536)) {
                
                XMLStreamReader reader = factory.createXMLStreamReader(bis);
                
                List<Product> batch = new ArrayList<>();
                Product currentProduct = null;
                String currentElement = null;
                
                while (reader.hasNext()) {
                    int event = reader.next();
                    
                    switch (event) {
                        case XMLStreamConstants.START_ELEMENT:
                            if ("product".equals(reader.getLocalName())) {
                                currentProduct = new Product();
                                // Process attributes efficiently
                                for (int i = 0; i < reader.getAttributeCount(); i++) {
                                    String attrName = reader.getAttributeLocalName(i);
                                    String attrValue = reader.getAttributeValue(i);
                                    setProductAttribute(currentProduct, attrName, attrValue);
                                }
                            }
                            currentElement = reader.getLocalName();
                            break;
                            
                        case XMLStreamConstants.CHARACTERS:
                            if (currentProduct != null && currentElement != null) {
                                String text = reader.getText().trim();
                                if (!text.isEmpty()) {
                                    setProductField(currentProduct, currentElement, text);
                                }
                            }
                            break;
                            
                        case XMLStreamConstants.END_ELEMENT:
                            if ("product".equals(reader.getLocalName())) {
                                batch.add(currentProduct);
                                currentProduct = null;
                                
                                // Process batch when full
                                if (batch.size() >= batchSize) {
                                    processBatch(batch);
                                    batch.clear(); // Clear for garbage collection
                                }
                            }
                            currentElement = null;
                            break;
                    }
                }
                
                // Process remaining items
                if (!batch.isEmpty()) {
                    processBatch(batch);
                }
                
                reader.close();
            }
            
        } catch (Exception e) {
            throw new RuntimeException("Error processing large XML file", e);
        }
    }
    
    private static void processBatch(List<Product> products) {
        // Batch processing logic - e.g., database insert
        System.out.println("Processing batch of " + products.size() + " products");
        
        // Simulate processing
        for (Product product : products) {
            // Process each product
            validateProduct(product);
        }
        
        // Force garbage collection periodically
        if (System.currentTimeMillis() % 10000 < 100) {
            System.gc();
        }
    }
    
    private static void validateProduct(Product product) {
        // Quick validation logic
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }
        if (product.getPrice() <= 0) {
            throw new IllegalArgumentException("Product price must be positive");
        }
    }
    
    private static void setProductAttribute(Product product, String name, String value) {
        switch (name) {
            case "id":
                product.setId(value);
                break;
            case "sku":
                product.setSku(value);
                break;
            // Add more attributes as needed
        }
    }
    
    private static void setProductField(Product product, String field, String value) {
        switch (field) {
            case "name":
                product.setName(value);
                break;
            case "price":
                try {
                    product.setPrice(Double.parseDouble(value));
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("Invalid price format: " + value);
                }
                break;
            case "category":
                product.setCategory(value);
                break;
            case "description":
                product.setDescription(value);
                break;
        }
    }
}
```

This concludes our comprehensive coverage of advanced XML features. These techniques enable you to handle complex enterprise scenarios, optimize performance, ensure security, and build robust XML processing systems.

## Next Steps

You're now ready to dive into:
- **XML Parsing Implementation** - Building parsers and processors
- **Real-world XML Applications** - SOAP, REST APIs, configuration systems
- **XML Integration Patterns** - Enterprise integration and data exchange

## Practice Challenge

Build an advanced XML processing system that:

1. **Processes large XML files** (>100MB) efficiently using streaming
2. **Validates against multiple schemas** with custom business rules  
3. **Transforms data through pipelines** with error handling
4. **Implements security measures** against XXE and other attacks
5. **Provides detailed reporting** on processing results and performance

**Enterprise Scenario**: Create a system that processes daily product catalog updates from multiple suppliers, validates them against company standards, transforms them into internal formats, and generates exception reports for data quality issues.

---

**🎯 Key Takeaways:**
- Advanced XML features enable enterprise-grade applications
- Streaming processing is essential for large XML files
- Security must be built into all XML processing
- Performance optimization requires careful memory management
- Complex transformations benefit from pipeline architectures

**➡️ Next:** Now let's explore XML Parsing techniques and implementations!