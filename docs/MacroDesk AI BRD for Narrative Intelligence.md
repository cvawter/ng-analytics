# MacroDesk-AI — Narrative Intelligence Requirements Addendum

## Executive Summary

This addendum extends the MacroDesk-AI platform architecture to include:

- Narrative Intelligence
- Multimodal semantic ingestion
- Podcast and YouTube intelligence
- Conversational AI over narrative sources
- GraphRAG-powered narrative reasoning
- Narrative-to-market causal analysis
- Tacit knowledge capture and synthesis
- Narrative timeline and regime analysis
- Semantic influence propagation
- Narrative-aware agentic reasoning

The platform shall support ingestion, semantic enrichment, contextualization, retrieval, and AI reasoning across:

- Podcasts
- YouTube videos
- Analyst interviews
- Earnings calls
- Research discussions
- Industry conferences
- Regulatory commentary
- Internal analyst notes
- Obsidian vaults

These capabilities shall integrate with the platform’s:

- Neo4j multilayer context graph
- Vector semantic retrieval layer
- Kafka/Flink realtime context engineering pipeline
- Iceberg lakehouse
- Trino federated semantic query layer
- Agentic orchestration framework
- Decision lineage and explainability architecture

---

# BRD — Business Requirements

## Narrative Intelligence Business Objectives

| ID | Requirement | Business Value |
|---|---|---|
| BR-NI-001 | Platform shall ingest podcasts and YouTube transcripts for narrative intelligence extraction | Capture emerging macro and energy narratives |
| BR-NI-002 | Platform shall support conversational AI querying over narrative sources | Improve analyst productivity and semantic discovery |
| BR-NI-003 | Platform shall correlate narratives with market behavior and volatility regimes | Improve signal generation and contextual reasoning |
| BR-NI-004 | Platform shall identify evolving themes and market narratives across time | Detect emerging macro and commodity regimes |
| BR-NI-005 | Platform shall support GraphRAG retrieval across narrative and structured sources | Improve grounded AI reasoning |
| BR-NI-006 | Platform shall support multimodal semantic intelligence ingestion | Expand contextual awareness |
| BR-NI-007 | Platform shall identify influential speakers, channels, and narrative propagation | Improve influence and market psychology analysis |
| BR-NI-008 | Platform shall maintain provenance and timestamp lineage for narrative claims | Improve explainability and auditability |
| BR-NI-009 | Platform shall support analyst tacit knowledge annotation and synthesis | Preserve institutional knowledge |
| BR-NI-010 | Platform shall support realtime narrative context updates | Enable streaming semantic intelligence |
| BR-NI-011 | Platform shall support mobile and web conversational narrative exploration | Improve accessibility and adoption |
| BR-NI-012 | Platform shall support narrative-to-market causal chain analysis | Improve macroeconomic reasoning |
| BR-NI-013 | Platform shall support contradiction and competing narrative detection | Improve risk management and scenario analysis |
| BR-NI-014 | Platform shall support narrative regime transition detection | Improve macro regime awareness |
| BR-NI-015 | Platform shall support AI-generated narrative summaries and thematic clustering | Improve analyst throughput |

---

# FRD — Functional Requirements

## Narrative Intelligence Functional Components

| ID | Functional Requirement |
|---|---|
| FR-NI-001 | System shall ingest podcast metadata from RSS feeds and supported APIs |
| FR-NI-002 | System shall ingest YouTube metadata and transcripts from supported APIs |
| FR-NI-003 | System shall support speech-to-text processing for supported audio sources |
| FR-NI-004 | System shall perform semantic chunking of transcripts |
| FR-NI-005 | System shall generate embeddings for transcript chunks |
| FR-NI-006 | System shall extract entities, themes, causal claims, and relationships |
| FR-NI-007 | System shall classify transcript segments into narrative categories |
| FR-NI-008 | System shall store lexical graph structures in Neo4j |
| FR-NI-009 | System shall store domain entities and semantic relationships in Neo4j |
| FR-NI-010 | System shall support ontology-based semantic classification |
| FR-NI-011 | System shall support GraphRAG retrieval over narrative intelligence sources |
| FR-NI-012 | System shall support timeline replay of narrative evolution |
| FR-NI-013 | System shall correlate narrative momentum with market data and volatility |
| FR-NI-014 | System shall support influence graph generation |
| FR-NI-015 | System shall support contradiction detection between narratives |
| FR-NI-016 | System shall support semantic clustering across multimodal sources |
| FR-NI-017 | System shall support conversational AI over podcasts and videos |
| FR-NI-018 | System shall support cross-source semantic retrieval |
| FR-NI-019 | System shall support realtime semantic enrichment using Kafka and Flink |
| FR-NI-020 | System shall support realtime materialization into Iceberg via Tableflow |
| FR-NI-021 | System shall support semantic federation via Trino |
| FR-NI-022 | System shall support analyst annotations and Obsidian integration |
| FR-NI-023 | System shall maintain decision lineage linking narratives to generated signals |
| FR-NI-024 | System shall support AI-generated trade thesis synthesis from narrative context |
| FR-NI-025 | System shall support narrative-aware agentic workflows |

---

# PRD — Product Requirements

## Product Vision

MacroDesk-AI shall provide an AI-native institutional intelligence platform capable of:

- Understanding evolving macroeconomic and energy narratives
- Correlating narratives with markets and volatility
- Supporting conversational semantic research
- Maintaining narrative-aware contextual memory
- Enabling AI-assisted market reasoning

---

## Product Features

### Narrative Intelligence Explorer

Capabilities:

- Semantic search over podcasts and videos
- Theme and narrative exploration
- Narrative evolution timeline replay
- Contradictory narrative comparison
- Narrative-to-market causality visualization
- AI-generated summaries
- Speaker influence mapping
- Semantic clustering

---

### Conversational Narrative Research Assistant

Capabilities:

- Natural language queries
- Multi-source semantic synthesis
- GraphRAG retrieval
- Market implication analysis
- Trade thesis generation
- Regime interpretation
- Cross-domain reasoning

Example queries:

- “How has the AI energy demand narrative evolved?”
- “What narratives preceded volatility expansion in natural gas?”
- “Which speakers are bullish on LNG infrastructure?”
- “Summarize bullish vs bearish narratives on data center power demand.”

---

### Narrative Timeline and Regime Explorer

Capabilities:

- Narrative momentum tracking
- Regime transition detection
- Narrative propagation analysis
- Temporal semantic graph replay
- Narrative influence scoring

---

### Semantic Context Graph Explorer

Capabilities:

- Interactive Neo4j graph visualization
- Entity relationship exploration
- Narrative influence graphs
- Causal chain exploration
- Trade-thesis lineage visualization

---

### Mobile Narrative Intelligence Experience

Capabilities:

- Conversational AI interface
- Podcast/video semantic search
- Voice-enabled narrative queries
- Mobile graph exploration
- AI-generated research summaries
- Narrative alerts and notifications

---

# Narrative Intelligence Acquisition vs MCP Reasoning Requirements

The Narrative Intelligence architecture shall explicitly distinguish between:

1. Narrative Intelligence Data Acquisition and Lakehouse Integration
2. Narrative Intelligence Agentic Access and MCP-Based Reasoning

These are related but distinct architectural concerns.

---

## Area 1 — Narrative Intelligence Data Acquisition and Lakehouse Integration

This layer is responsible for:

- Durable ingestion
- Scheduled collection
- Transcript acquisition
- Semantic enrichment
- Provenance tracking
- Lakehouse persistence
- Realtime and batch processing
- Canonical historical storage

This layer shall NOT rely exclusively on MCP servers.

Instead, the platform shall use:

- Airflow / Amazon MWAA
- Temporal workflows
- Kafka ingestion pipelines
- API connectors
- RSS ingestion
- Speech-to-text pipelines
- Iceberg lakehouse storage
- Spark/Flink enrichment pipelines

### Narrative Acquisition Requirements

| ID | Requirement |
|---|---|
| FR-NI-026 | System shall ingest podcast metadata from RSS feeds and approved APIs |
| FR-NI-027 | System shall ingest YouTube metadata and transcript/caption data from approved APIs |
| FR-NI-028 | System shall support scheduled ingestion workflows using Airflow, MWAA, Temporal, or equivalent orchestration frameworks |
| FR-NI-029 | System shall support Kafka-based realtime narrative ingestion pipelines |
| FR-NI-030 | System shall support speech-to-text processing for supported audio/video content |
| FR-NI-031 | System shall persist raw narrative intelligence sources in S3-backed lakehouse storage |
| FR-NI-032 | System shall materialize curated narrative intelligence tables using Apache Iceberg |
| FR-NI-033 | System shall support realtime semantic enrichment using Kafka and Flink |
| FR-NI-034 | System shall support Confluent Tableflow or equivalent realtime table materialization approaches |
| FR-NI-035 | System shall maintain provenance metadata including source URL, timestamps, ingestion method, speaker metadata, and transcript lineage |
| FR-NI-036 | System shall support replayable narrative ingestion and semantic enrichment workflows |
| FR-NI-037 | System shall support semantic chunking and embedding generation for narrative sources |
| FR-NI-038 | System shall support transcript versioning and reprocessing |
| FR-NI-039 | System shall support durable multimodal archival for future AI reasoning |

### Narrative Acquisition Architecture

```text
Podcast RSS / YouTube APIs / Spotify Metadata
        ↓
Airflow / Temporal / Kafka
        ↓
Transcript Acquisition / STT
        ↓
Raw S3 Storage
        ↓
Iceberg Lakehouse Tables
        ↓
Spark / Flink Semantic Enrichment
        ↓
Neo4j + Vector DB
```

---

## Area 2 — MCP-Based Narrative Intelligence Reasoning and Agentic Access

This layer is responsible for:

- Conversational AI access
- Agentic retrieval
- Natural language exploration
- Semantic reasoning
- Cross-source synthesis
- Interactive narrative exploration
- AI copilots
- Tool-based retrieval

This layer SHALL use MCP servers as AI-accessible tool interfaces.

MCP servers are NOT the canonical ingestion or persistence layer.

Instead, MCP servers shall expose:

- Curated semantic retrieval
- Podcast/video exploration tools
- GraphRAG retrieval tools
- Narrative search
- AI summarization
- Semantic relationship exploration
- Timeline replay
- Influence graph exploration

### MCP Narrative Reasoning Requirements

| ID | Requirement |
|---|---|
| FR-NI-040 | System shall expose podcast and YouTube narrative intelligence via MCP-compatible tool interfaces |
| FR-NI-041 | System shall support conversational AI queries over narrative intelligence sources |
| FR-NI-042 | System shall support GraphRAG retrieval through MCP-accessible retrieval tools |
| FR-NI-043 | System shall support semantic search over podcast and video transcripts |
| FR-NI-044 | System shall support AI-generated narrative summaries and synthesis |
| FR-NI-045 | System shall support narrative timeline replay and semantic evolution analysis |
| FR-NI-046 | System shall support AI reasoning over narrative-to-market causal relationships |
| FR-NI-047 | System shall support agentic exploration of multimodal narrative intelligence |
| FR-NI-048 | System shall support MCP-accessible graph exploration and semantic relationship traversal |
| FR-NI-049 | System shall support AI-generated trade thesis reasoning from narrative intelligence |
| FR-NI-050 | System shall support mobile and web conversational AI interfaces over narrative intelligence |
| FR-NI-051 | System shall support AI-driven semantic clustering and contradiction detection |
| FR-NI-052 | System shall support narrative-aware agentic workflows using MCP-accessible tools |

### MCP Narrative Reasoning Architecture

```text
Iceberg + Neo4j + Vector DB
        ↓
GraphRAG Retrieval Layer
        ↓
MCP Servers
        ↓
AI Agents / Copilots
        ↓
Web + Mobile Conversational UI
```

---

## Curated vs Exploratory Narrative Intelligence Requirements

The platform shall distinguish between:

1. Curated Narrative Intelligence
2. Exploratory Narrative Intelligence

These are separate governance, provenance, and architectural concerns.

---

### Curated Narrative Intelligence

Curated Narrative Intelligence refers to:

- Curated
- Ingested
- Canonicalized
- Governed
- Provenance-tracked
- Semantically enriched
- Persisted

narrative content stored within the platform’s:

- Iceberg lakehouse
- Neo4j context graph
- Vector semantic retrieval layer

Curated Narrative Intelligence SHALL be the primary source used for:

- AI reasoning
- GraphRAG retrieval
- Agentic workflows
- Trade thesis generation
- Semantic analysis
- Decision lineage
- Institutional memory
- Auditability and explainability

### Curated Narrative Intelligence Requirements

| ID | Requirement |
|---|---|
| FR-NI-053 | System shall maintain a curated Narrative Intelligence corpus within the lakehouse and context graph |
| FR-NI-054 | System shall expose curated Narrative Intelligence through Neo4j MCP-compatible retrieval interfaces |
| FR-NI-055 | System shall use curated Narrative Intelligence as the preferred source for GraphRAG retrieval and AI reasoning |
| FR-NI-056 | System shall maintain provenance, lineage, and timestamp metadata for controlled narrative sources |
| FR-NI-057 | System shall support replayable semantic retrieval over controlled narrative corpora |
| FR-NI-058 | System shall support semantic governance and ontology classification for controlled narrative sources |
| FR-NI-059 | System shall support analyst annotation and curation workflows for controlled narrative intelligence |
| FR-NI-060 | System shall support narrative-aware decision lineage linked to controlled narrative corpora |

---

### Exploratory Narrative Intelligence

Exploratory Narrative Intelligence refers to:

- External
- Non-ingested
- Dynamically discovered
- Ad hoc
- Exploratory
- Non-canonical

narrative content accessed directly from:

- Spotify MCP servers
- YouTube MCP servers
- External APIs
- Search providers
- Public media sources

Exploratory Narrative Intelligence SHALL primarily support:

- Source discovery
- Exploratory research
- Trend identification
- Candidate ingestion selection
- Ad hoc investigation
- Emerging narrative detection

Exploratory Narrative Intelligence SHALL NOT be treated as canonical institutional semantic memory until curated and ingested into the controlled narrative corpus.

### Exploratory Narrative Intelligence Requirements

| ID | Requirement |
|---|---|
| FR-NI-061 | System may support Spotify MCP servers for external narrative discovery |
| FR-NI-062 | System may support YouTube MCP servers for external narrative discovery |
| FR-NI-063 | System shall support AI-assisted identification of candidate narrative sources for ingestion |
| FR-NI-064 | System shall support analyst approval workflows for promoting exploratory narrative sources into controlled narrative intelligence |
| FR-NI-065 | System shall distinguish between curated and exploratory narrative sources |
| FR-NI-066 | System shall visually identify exploratory versus curated narrative intelligence within the UI |
| FR-NI-067 | System shall support optional external semantic exploration of public narrative sources |
| FR-NI-068 | System shall support source quality and credibility scoring for exploratory narrative intelligence |

---

## Curated vs Exploratory Architecture Perspective

### Curated Narrative Intelligence

```text
Podcast/YouTube Sources
        ↓
Airflow / Kafka / STT
        ↓
Iceberg Lakehouse
        ↓
Neo4j Context Graph
        ↓
Neo4j MCP + GraphRAG
        ↓
AI Reasoning
```

Purpose:

```text
Durable institutional semantic memory.
```

Curated Narrative Intelligence may become part of the platform’s well-thought-out semantic graph after it has been:

- sourced through approved acquisition workflows
- transcripted or text-normalized
- chunked and embedded
- entity-extracted
- classified by ontology terms
- mapped to domain concepts
- linked to causal claims and market drivers
- reviewed or approved by analysts or trusted agentic workflows
- stored with provenance and lineage metadata

Curated Narrative Intelligence shall be eligible for promotion into the semantic graph as durable institutional memory.

---

### Exploratory Narrative Intelligence

```text
Spotify MCP / YouTube MCP
        ↓
Ad hoc AI discovery
        ↓
Candidate source identification
        ↓
Optional ingestion workflow
```

Purpose:

```text
Exploratory narrative discovery and horizon scanning.
```

Exploratory Narrative Intelligence shall remain a discovery and horizon-scanning capability until promoted through curated ingestion workflows.

---

## Strategic Clarification

### Narrative Acquisition Layer

Purpose:

```text
Build durable institutional semantic memory.
```

Primary Technologies:

- Airflow / MWAA
- Temporal
- Kafka
- Flink
- Iceberg
- Spark
- S3
- Neo4j

---

### MCP Narrative Reasoning Layer

Purpose:

```text
Enable AI-native conversational semantic reasoning
and agentic exploration over narrative intelligence.
```

Primary Technologies:

- MCP servers
- GraphRAG
- Neo4j
- Vector DB
- LLMs
- Embabel
- AI copilots

---

# Architecture Requirements

## Narrative Intelligence Architecture

| Layer | Technology |
|---|---|
| Event Backbone | Apache Kafka |
| Stream Processing | Apache Flink |
| Realtime Context Engineering | Confluent Tableflow |
| Lakehouse | Apache Iceberg |
| Batch Analytics | Apache Spark |
| Federated Query Layer | Trino |
| Context Graph | Neo4j |
| Vector Retrieval | Qdrant / pgvector / Weaviate |
| Agentic Orchestration | Temporal + Embabel |
| Web UI | Next.js |
| Mobile UI | React Native |

---

## Context Graph Layers

### Layer 1 — Lexical Graph

Stores:

- Podcast episodes
- YouTube videos
- Transcript chunks
- Speaker turns
- Embeddings
- Metadata
- Source provenance

---

### Layer 2 — Domain Graph

Stores:

- Entities
- Events
- Relationships
- Market drivers
- Energy infrastructure
- Commodity relationships
- Convexity and volatility concepts

---

### Layer 3 — Ontology / Semantic Context Layer

Stores:

- Narrative categories
- Macro regimes
- Causal claims
- Narrative classifications
- Risk ontologies
- Semantic relationship definitions
- Industry-specific ontologies
- FIBO integrations

---

# Roadmap Additions

## Phase 1 — Narrative Intelligence Foundation

Capabilities:

- Podcast and YouTube ingestion
- Transcript processing
- Embeddings and vector storage
- Basic GraphRAG retrieval
- Neo4j lexical graph
- Narrative semantic extraction
- Conversational transcript search

Deliverables:

- Narrative ingestion pipeline
- Semantic transcript explorer
- Initial narrative ontology
- AI research assistant MVP

---

## Phase 2 — Narrative Context Engineering

Capabilities:

- Kafka/Flink realtime enrichment
- Narrative clustering
- Narrative timeline replay
- Contradiction detection
- Influence graph generation
- Cross-source semantic retrieval
- Semantic graph visualization

Deliverables:

- Narrative Intelligence Explorer
- Timeline replay dashboard
- Narrative graph visualization
- Semantic relationship explorer

---

## Phase 3 — Narrative-to-Market Causal Intelligence

Capabilities:

- Narrative-to-market correlation
- Volatility regime correlation
- Trade thesis generation
- Convexity narrative analysis
- Dealer positioning semantic analysis
- AI-generated market hypotheses

Deliverables:

- Narrative causality engine
- Trade thesis explorer
- Regime transition analytics
- Narrative-driven signal engine

---

## Phase 4 — Agentic Narrative Intelligence

Capabilities:

- Autonomous narrative monitoring agents
- Narrative-aware strategy agents
- Recursive playbook evolution
- Decision lineage graph
- Context-aware agent collaboration
- AI-generated research reports

Deliverables:

- Narrative intelligence agents
- Agentic semantic reasoning framework
- Narrative-aware AI copilots
- Recursive strategy evolution engine

---

# Suggested Ontology Categories

| Category | Description |
|---|---|
| Narrative | Evolving market themes |
| CausalClaim | Assertions about cause/effect |
| MacroRegime | Structural macro environments |
| EnergyDemandDriver | Drivers of energy demand |
| ConvexitySignal | Gamma and volatility semantics |
| PolicyRisk | Regulatory and geopolitical drivers |
| LiquidityRegime | Monetary and fiscal conditions |
| InfrastructureConstraint | LNG, pipelines, generation constraints |
| NarrativeMomentum | Accelerating discourse patterns |
| InfluencePropagation | Narrative spread across sources |

---

# Product Strategy — Narrative Intelligence Platform Evolution

## Strategic Vision

MacroDesk-AI shall evolve from:

```text
A macroeconomic and commodity analytics platform
```

into:

```text
A programmable narrative-aware semantic intelligence platform
for macroeconomics, energy systems, volatility, and agentic AI reasoning.
```

The long-term strategic asset of the platform shall be:

- Curated semantic memory
- Narrative-aware context engineering
- Graph-native institutional intelligence
- Recursive strategy evolution
- Multi-tenant semantic reasoning
- Extensible narrative intelligence ingestion
- Tenant-aware GraphRAG
- AI-native knowledge and context graphs

---

## Strategic Narrative Intelligence Model

The platform shall distinguish between:

| Narrative Intelligence Type | Purpose |
|---|---|
| Curated Narrative Intelligence | Durable institutional semantic memory |
| Exploratory Narrative Intelligence | Dynamic discovery and horizon scanning |

Curated Narrative Intelligence shall become part of the platform’s:

- semantic graph
- ontology framework
- GraphRAG retrieval layer
- institutional memory
- decision lineage system
- AI reasoning substrate

Exploratory Narrative Intelligence shall support:

- source discovery
- emerging narrative detection
- ad hoc semantic exploration
- candidate ingestion workflows
- external horizon scanning

---

## Platform Evolution Strategy

### Stage 1 — Curated Internal Narrative Intelligence

Characteristics:

- Platform-managed ingestion
- Internal ontology governance
- Curated semantic graph
- Controlled GraphRAG retrieval
- Institutional-quality semantic enrichment

Capabilities:

- Internal admin source onboarding
- Curated podcast ingestion
- Curated YouTube ingestion
- Semantic narrative enrichment
- Narrative-to-market reasoning
- AI research copilots

---

### Stage 2 — Enterprise Narrative Intelligence Platform

Characteristics:

- Enterprise extensibility
- Tenant-aware semantic graphs
- Organization-specific ontologies
- Proprietary semantic memory

Capabilities:

- Enterprise source onboarding
- Internal enterprise podcast ingestion
- Tenant-specific semantic ontologies
- Enterprise GraphRAG policies
- Custom narrative enrichment rules
- Semantic governance workflows

---

### Stage 3 — Multi-Tenant Semantic Intelligence Platform

Characteristics:

- User-extensible semantic infrastructure
- Context Engineering as a Service
- Multi-tenant AI-native semantic memory

Capabilities:

- Tenant narrative corpora
- Tenant-defined source onboarding
- Tenant GraphRAG policies
- User-defined semantic enrichment
- Custom agent workflows
- Semantic plugin architecture
- Ontology marketplace
- Narrative intelligence marketplace

---

## Narrative Source Promotion Strategy

The platform shall support promotion workflows from Exploratory Narrative Intelligence into Curated Narrative Intelligence.

### Promotion Workflow

```text
User/Admin adds source
        ↓
Exploratory ingestion
        ↓
Transcript extraction
        ↓
Entity extraction
        ↓
Narrative clustering
        ↓
Source quality scoring
        ↓
Ontology mapping
        ↓
Analyst or agent review
        ↓
Promotion into curated semantic graph
```

---

## Semantic Governance Strategy

The platform shall maintain semantic integrity through:

- ontology governance
- provenance tracking
- narrative source scoring
- graph schema evolution controls
- semantic enrichment validation
- tenant namespace isolation
- graph promotion workflows
- analyst approval policies

This strategy is intended to prevent:

```text
semantic entropy and degradation of AI reasoning quality
```

within the semantic graph.

---

## Product Roadmap Expansion

| Phase | Capability |
|---|---|
| MVP | Internal curated narrative ingestion |
| V2 | Admin-managed source onboarding |
| V3 | Narrative source promotion workflows |
| V4 | Enterprise semantic graph extensions |
| V5 | Tenant-specific narrative corpora |
| V6 | Tenant GraphRAG policies |
| V7 | User-defined semantic enrichment |
| V8 | Ontology and narrative marketplace |
| V9 | Agentic narrative discovery networks |
| V10 | Recursive semantic strategy evolution |

---

## Product Strategy Requirements

| ID | Requirement |
|---|---|
| BR-NI-016 | Platform shall support administrator onboarding of narrative intelligence sources |
| BR-NI-017 | Platform shall support onboarding of podcasts, playlists, channels, RSS feeds, and multimedia narrative sources |
| BR-NI-018 | Platform shall support semantic promotion workflows from exploratory to curated narrative intelligence |
| BR-NI-019 | Platform shall support tenant-specific semantic narrative corpora |
| BR-NI-020 | Platform shall support tenant ontology extension and semantic governance |
| BR-NI-021 | Platform shall support multi-tenant GraphRAG retrieval policies |
| BR-NI-022 | Platform shall support source quality scoring and provenance governance |
| BR-NI-023 | Platform shall support tenant namespace isolation for semantic memory |
| BR-NI-024 | Platform shall support graph schema evolution workflows |
| BR-NI-025 | Platform shall support semantic enrichment plugins and custom ingestion policies |

---

## Strategic Positioning

MacroDesk-AI shall evolve beyond a traditional analytics platform into:

> An AI-native institutional macroeconomic, energy, and volatility intelligence platform with realtime narrative-aware semantic reasoning, multimodal context engineering, GraphRAG retrieval, and recursive strategy evolution.

