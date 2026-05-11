# MacroDesk-AI Business Requirements Document (BRD)

## Document Information

| Field | Value |
|---|---|
| Project Name | MacroDesk-AI |
| Product Type | AI-Native Natural Gas, Energy, Macroeconomic, and Institutional Research Intelligence Platform |
| Document Type | Business Requirements Document (BRD) |
| Version | 1.0 |
| Status | Draft / Canonical Working Version |

---

## 1. Executive Summary

MacroDesk-AI is a graph-native, multimodal, institutional research intelligence platform focused on:

- Natural gas markets
- AI-driven energy demand
- LNG flows
- Weather-driven volatility
- Macroeconomic analysis
- Derivatives and volatility analytics
- Agentic AI research systems
- Graph-native context engineering

The platform combines:

- Knowledge graphs
- GraphRAG
- Real-time context engineering
- Multi-agent orchestration
- Econometrics
- Time series forecasting
- Streaming architectures
- Explainable AI
- Human-in-the-loop workflows
- Multimodal ingestion and analytics

---

## 2. Business Goals

| ID | Goal | Description |
|---|---|---|
| BG-001 | Institutional Research Intelligence | Build institutional-grade AI-native research infrastructure |
| BG-002 | Trade Signal Generation | Generate explainable trading signals and strategies |
| BG-003 | Graph-Native Context | Maintain durable semantic market context |
| BG-004 | Agentic Automation | Enable autonomous and supervised AI agents |
| BG-005 | Explainability | Provide lineage and reasoning transparency |
| BG-006 | Real-Time Intelligence | Continuously process evolving market conditions |
| BG-007 | Recursive Learning | Evolve playbooks and strategies over time |
| BG-008 | Multimodal Understanding | Analyze charts, filings, audio, and video |
| BG-009 | Human Oversight | Support analyst approvals and governance |

---

## 3. Strategic Vision

| Area | Vision |
|---|---|
| Energy Intelligence | AI-native energy and macroeconomic research platform |
| Graph Intelligence | Neo4j-centered semantic reasoning architecture |
| Agentic Research | Autonomous research and synthesis workflows |
| Context Engineering | Continuously evolving semantic context |
| Explainable AI | Transparent and auditable reasoning |
| Institutional Memory | Long-term knowledge retention and strategy evolution |

---

## 4. In-Scope Capabilities

| Capability Area | Description |
|---|---|
| Natural Gas Analytics | Storage, LNG, spreads, volatility, weather |
| Macroeconomics | Inflation, rates, industrial production |
| AI Energy Demand | Data center and AI power demand forecasting |
| Knowledge Graphs | Semantic, lexical, ontological, and decision graphs |
| GraphRAG | Hybrid graph + vector retrieval |
| Agentic AI | Multi-agent orchestration |
| Econometrics | Regression, panel data, factor analysis |
| Forecasting | Statistical and ML forecasting |
| Technical Analysis | Candlestick and chart pattern analysis |
| Streaming Systems | Kafka and Flink-based architectures |
| Explainability | Decision lineage and provenance |
| Tacit Knowledge Capture | Obsidian integration |

---

## 5. Key Functional Requirements

### 5.1 Data Sources

| ID | Requirement |
|---|---|
| FR-001 | Ingest EIA WNGSR |
| FR-002 | Ingest Natural Gas Monthly |
| FR-003 | Ingest STEO |
| FR-004 | Ingest NOAA HDD/CDD data |
| FR-005 | Ingest LNG feedgas data |
| FR-006 | Ingest TradingView OHLC data |
| FR-007 | Ingest SEC filings |
| FR-008 | Ingest FRED macroeconomic data |
| FR-009 | Ingest YouTube and podcast transcripts |
| FR-010 | Ingest regulations and policy data |

---

### 5.2 Knowledge Graph and Semantic Layer

| ID | Requirement |
|---|---|
| FR-020 | Implement multilayered graph architecture |
| FR-021 | Support semantic graph layer |
| FR-022 | Support lexical graph layer |
| FR-023 | Support ontology layer |
| FR-024 | Support decision lineage graph |
| FR-025 | Support GraphRAG retrieval |
| FR-026 | Support hybrid vector + graph retrieval |
| FR-027 | Integrate Neo4j |
| FR-028 | Support graph embeddings |
| FR-029 | Support Graph Data Science |

---

### 5.3 Agentic AI

| ID | Requirement |
|---|---|
| FR-040 | Support multi-agent orchestration |
| FR-041 | Support GOAP-style planning |
| FR-042 | Support planner-executor-critic loops |
| FR-043 | Support persistent agent memory |
| FR-044 | Support Temporal durable execution |
| FR-045 | Support Embabel integration |
| FR-046 | Support LangGraph interoperability |
| FR-047 | Support Spring AI integration |
| FR-048 | Support autonomous research agents |
| FR-049 | Support supervised agent workflows |

---

### 5.4 Quantitative Analytics

| ID | Requirement |
|---|---|
| FR-060 | Support econometric regression |
| FR-061 | Support HC3 robust estimators |
| FR-062 | Support panel data analysis |
| FR-063 | Support time series forecasting |
| FR-064 | Support spread analysis |
| FR-065 | Support gamma and volatility analysis |
| FR-066 | Support factor modeling |
| FR-067 | Support PCA/eigenvector analysis |
| FR-068 | Support AI-assisted feature engineering |
| FR-069 | Support graph-derived features |

---

### 5.5 Real-Time Context Engineering

| ID | Requirement |
|---|---|
| FR-090 | Support Kafka streaming |
| FR-091 | Support Flink stream processing |
| FR-092 | Support Confluent real-time context concepts |
| FR-093 | Continuously update semantic graphs |
| FR-094 | Support event-driven graph updates |
| FR-095 | Support streaming embeddings |
| FR-096 | Support streaming feature engineering |

---

### 5.6 User Experience

| ID | Requirement |
|---|---|
| FR-100 | Provide Next.js web application |
| FR-101 | Provide responsive UI |
| FR-102 | Provide PWA support |
| FR-103 | Support mobile applications |
| FR-104 | Support React Native or Flutter |
| FR-105 | Support natural language interaction |
| FR-106 | Provide graph exploration UI |
| FR-107 | Provide ontology explorer UI |

---

### 5.7 Explainability and Governance

| ID | Requirement |
|---|---|
| FR-130 | Track reasoning lineage |
| FR-131 | Track provenance |
| FR-132 | Support audit trails |
| FR-133 | Maintain decision graphs |
| FR-134 | Track overrides and exceptions |
| FR-135 | Provide explainable recommendations |

---

## 6. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-001 | Horizontal scalability |
| NFR-002 | High availability |
| NFR-003 | Durable workflows |
| NFR-004 | Observability and tracing |
| NFR-005 | Low-latency analytics |
| NFR-006 | Enterprise security |
| NFR-007 | Explainable AI |
| NFR-008 | Modular extensibility |
| NFR-009 | Local-first development support |

---

## 7. Proposed Technology Stack

| Layer | Technologies |
|---|---|
| Front-End | Next.js, React, TypeScript |
| Mobile | React Native / Flutter |
| Backend | Spring Boot, Spring AI, Java |
| Graph Database | Neo4j |
| Lakehouse | Iceberg |
| Streaming | Kafka, Flink, Confluent |
| Workflow Orchestration | Temporal, Airflow |
| Storage | AWS S3, MinIO |
| Query Engines | Athena, Trino, DuckDB |
| Agent Frameworks | Embabel, LangGraph |
| Knowledge Capture | Obsidian |
| Security | OAuth2, OIDC, JWT |

---

## 8. Multi-Agent Architecture

| Agent | Responsibility |
|---|---|
| Data Sourcing Agent | Retrieve structured and unstructured data |
| Context Agent | Maintain semantic context |
| Knowledge Graph Agent | Build and evolve graph structures |
| Ontology Agent | Manage ontologies |
| Feature Engineering Agent | Generate predictive features |
| Econometrics Agent | Run statistical analysis |
| Forecasting Agent | Produce forecasts |
| Trade Analysis Agent | Generate trade recommendations |
| Explainability Agent | Generate reasoning lineage |
| Risk Agent | Evaluate exposures and scenarios |
| Memory Agent | Maintain long-term memory |
| Compliance Agent | Support governance and auditing |

---

## 9. Delivery Phases

### 9.1 Proof of Concept (POC)

| Capability |
|---|
| Initial ingestion pipelines |
| Neo4j graph |
| Basic GraphRAG |
| WNGSR analytics |
| Initial Next.js UI |

### 9.2 Prototype

| Capability |
|---|
| Streaming ingestion |
| Real-time context updates |
| Ontology explorer |
| Agent orchestration |
| Decision lineage |

### 9.3 MVP

| Capability |
|---|
| Multi-agent orchestration |
| Econometric forecasting |
| Feature engineering |
| Explainability dashboards |
| Human approval workflows |

### 9.4 Enterprise Platform

| Capability |
|---|
| Recursive strategy evolution |
| Advanced multimodal analytics |
| Institutional governance |
| Autonomous research workflows |

---

## 10. Strategic Differentiators

| Differentiator | Description |
|---|---|
| Graph-Native AI | Semantic graph-grounded reasoning |
| Recursive Learning | Self-improving strategy playbooks |
| Real-Time Context | Continuously evolving market context |
| Explainable AI | Transparent reasoning and provenance |
| Institutional Memory | Durable knowledge preservation |
| Human + AI Collaboration | Supervised autonomous workflows |

---

## 11. Conclusion

MacroDesk-AI is designed to become a graph-native institutional intelligence platform combining:

- Real-time context engineering
- Semantic reasoning
- Agentic AI
- Econometrics
- Streaming architectures
- Explainable AI
- Human expertise
- Knowledge graphs

The platform aims to provide durable, explainable, and recursively improving research and trading intelligence for natural gas and macroeconomic analysis.
