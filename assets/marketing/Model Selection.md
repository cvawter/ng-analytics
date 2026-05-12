# Model Selection Strategy
## MacroDesk-AI — Natural Gas, Macroeconomics, and Gamma Trading Platform

---

# Overview

This document defines the recommended LLM and AI model strategy for the MacroDesk-AI platform using:

- Multi-agent orchestration with Embabel
- Durable workflows with Temporal
- Neo4j-based context and semantic graphs
- GraphRAG and hybrid retrieval
- Iceberg lakehouse analytics
- Narrative intelligence (podcasts, YouTube, transcripts)
- Trade analysis and best-trade strategy generation
- Econometric and quantitative analysis
- Agentic context engineering

The platform should use a:

1. High-End Enterprise Configuration
2. Cost-Optimized / Local-First Configuration
3. Hybrid Routing Architecture

The platform should NOT depend on a single LLM.

Different models should be selected based on:

- Latency
- Cost
- Reasoning quality
- Context window
- Tool calling quality
- Agent orchestration quality
- Structured output support
- Multimodal capabilities
- Privacy requirements
- Local execution capability
- Auditability requirements

---

# Core Architectural Principle

LLMs are NOT the authoritative source of truth.

The authoritative reasoning substrate should be:

- Iceberg facts
- Neo4j context graphs
- Semantic layers
- Ontologies
- Vector retrieval
- Deterministic analytics
- Econometric calculations
- Risk models
- Decision history
- Human review and approvals

The LLM layer should:

- Reason over context
- Explain findings
- Generate hypotheses
- Coordinate agents
- Summarize information
- Draft recommendations
- Generate code
- Assist with feature engineering
- Produce audit explanations

Temporal should manage:

- Workflow durability
- Retries
- State transitions
- Long-running workflows
- Human approvals
- Audit history
- Exception handling
- Replayability

Embabel should manage:

- Goal-oriented planning
- Agent orchestration
- Planner / critic loops
- Tool routing
- Shared memory
- Blackboard-style context
- Typed workflows
- Agent collaboration

---

# Local and Hybrid Inference Architecture

## Recommendation

The platform should support:

- Ollama
- vLLM
- SGLang
- LiteLLM
- AWS Bedrock
- OpenAI APIs
- Anthropic APIs
- Gemini APIs
- Hybrid local + cloud inference
- Intelligent model routing
- Risk-aware model escalation

The platform should avoid vendor lock-in.

Inference and orchestration layers should remain model-provider agnostic.

---

# Recommended Inference Layer Roles

| Technology | Recommended Usage |
|---|---|
| Ollama | Local development and prototyping |
| vLLM | High-throughput production local inference |
| SGLang | Structured agent pipelines and optimized generation |
| LiteLLM | Unified model gateway and routing |
| AWS Bedrock | Enterprise hosted model platform |
| OpenAI APIs | Premium reasoning and coding |
| Anthropic APIs | Planning, reasoning, auditability |
| Gemini APIs | Multimodal and extraction workflows |

---

# Recommended Local Execution Strategy

## Ollama

Recommended for:

- local experimentation
- analyst workstations
- offline execution
- small-team deployments
- privacy-sensitive workflows
- rapid prototyping
- local GraphRAG testing

### Advantages

- extremely easy setup
- local execution
- OpenAI-compatible APIs
- excellent developer experience
- strong local ecosystem
- ideal for development laptops

### Limitations

- not ideal for large-scale throughput
- limited advanced scheduling and batching
- weaker multi-GPU orchestration

---

# Recommended vLLM Usage

## vLLM

Recommended for:

- production local inference
- GPU server deployments
- high-throughput serving
- large-scale ingestion pipelines
- concurrent multi-agent workloads
- efficient memory utilization
- continuous batching

### Advantages

- high throughput
- efficient KV cache management
- continuous batching
- production-grade serving
- multi-user scalability
- optimized GPU utilization

### Recommended Usage

Use vLLM for:

- Gemma 4 serving
- Qwen serving
- Mistral serving
- large ingestion workloads
- GraphRAG retrieval serving
- multi-agent orchestration backends

---

# Recommended SGLang Usage

## SGLang

Recommended for:

- structured extraction workflows
- repeated prompt pipelines
- constrained generation
- agentic orchestration
- planner / critic loops
- advanced batching
- reasoning pipelines
- JSON generation
- schema-constrained outputs

### Advantages

- structured generation
- prefix caching
- advanced batching
- optimized inference
- strong agent workflow support
- efficient repeated prompt execution
- good fit for Embabel-style systems

### Recommended Usage

Use SGLang for:

- extraction pipelines
- ontology generation
- semantic tagging
- graph enrichment
- repeated reasoning workflows
- planner / critic coordination
- structured GraphRAG outputs

---

# Recommended LiteLLM Usage

## LiteLLM

Recommended as the unified inference gateway.

### Responsibilities

- model routing
- fallback handling
- retries
- provider abstraction
- rate limiting
- logging
- cost tracking
- latency monitoring
- model escalation
- provider failover

### Recommended Routing Strategy

```text
LiteLLM Router
   ├── Ollama
   ├── vLLM
   ├── SGLang
   ├── AWS Bedrock
   ├── OpenAI
   ├── Anthropic
   └── Gemini
```

### Recommended Escalation Strategy

| Complexity Level | Recommended Route |
|---|---|
| Simple extraction | Local Gemma via Ollama |
| High-volume ingestion | vLLM |
| Structured reasoning | SGLang |
| Medium-risk analysis | Local Gemma 26B |
| High-risk trade analysis | Claude / GPT / Gemini |
| Final audit review | Claude Opus |

---

# Recommended Cloud Platform Strategy

## AWS Bedrock

Recommended as the default enterprise cloud platform.

### Advantages

- multi-model support
- enterprise governance
- IAM integration
- model flexibility
- easier provider switching
- centralized billing
- enterprise security
- VPC integration
- strong AWS ecosystem alignment

### Recommended Hosted Models

| Provider | Recommended Models |
|---|---|
| Anthropic | Claude Sonnet / Opus |
| OpenAI | GPT-5.x |
| Google | Gemini 2.5 Pro / Flash |
| Mistral | Mistral Large |
| Meta | Llama models |

---

# Recommended Hybrid Architecture

```text
                     ┌─────────────────────┐
                     │     Embabel         │
                     │ Planner / Critic    │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │      LiteLLM        │
                     │ Unified Router      │
                     └──────────┬──────────┘
                                │
       ┌────────────────────────┼────────────────────────┐
       │                        │                        │
       ▼                        ▼                        ▼
┌─────────────┐       ┌────────────────┐       ┌────────────────┐
│   Ollama    │       │     vLLM       │       │    SGLang      │
│ Local Dev   │       │ Prod Serving   │       │ Structured AI  │
└─────────────┘       └────────────────┘       └────────────────┘
       │                        │                        │
       └────────────────────────┼────────────────────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │  Cloud Frontier AI  │
                     │ Claude / GPT / etc. │
                     └─────────────────────┘
```

---

# Recommended Design Principle

Use:

- Ollama for simplicity
- vLLM for scale
- SGLang for structured agent workflows
- LiteLLM for routing and abstraction
- AWS Bedrock for enterprise hosting
- Premium frontier models for high-value reasoning

---

# Recommended Architecture

```text
                    ┌────────────────────────────┐
                    │        User Interface       │
                    │ React / Next.js / Mobile    │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │      Embabel Agents         │
                    │ Planner / Critic / GOAP     │
                    └─────────────┬──────────────┘
                                  │
                    ┌─────────────┴──────────────┐
                    │                            │
                    ▼                            ▼
          ┌──────────────────┐      ┌────────────────────┐
          │   Temporal AI     │      │   Model Router      │
          │ Durable Workflows │      │ Cost / Risk Routing │
          └────────┬─────────┘      └─────────┬──────────┘
                   │                           │
                   ▼                           ▼
      ┌──────────────────────┐    ┌────────────────────────┐
      │ Neo4j Context Graphs │    │ Local + Hosted Models  │
      │ GraphRAG + Ontology  │    │ Ollama / Claude / GPT  │
      └──────────────────────┘    └────────────────────────┘
```

---

# High-End Enterprise Model Configuration

## Purpose

Designed for:

- Institutional research
- Advanced trade analysis
- Deep macroeconomic reasoning
- Large-scale multi-agent orchestration
- Explainability and auditability
- Complex scenario analysis
- High-quality code generation
- Production-grade analyst experiences

---

# Enterprise Model Recommendations

| Platform Role | Primary Model | Backup / Alternative | Premium or Free |
|---|---|---|---|
| Embabel Planner / GOAP Supervisor | Claude Sonnet 4.6 | GPT-5.5 / Gemini 2.5 Pro | Premium |
| Deep Trade Thesis Analysis | Claude Opus 4.7 | GPT-5.5 | Premium |
| Risk and Audit Critic | Claude Opus 4.7 | GPT-5.5 | Premium |
| User Analyst Chat | Claude Sonnet 4.6 | GPT-5.x | Premium |
| GraphRAG Synthesis | Claude Sonnet 4.6 | Gemini 2.5 Pro | Premium |
| SEC Filing Analysis | Claude Sonnet 4.6 | Gemini 2.5 Pro | Premium |
| Podcast / YouTube Intelligence | Gemini 2.5 Flash | Claude Haiku | Premium |
| Data Extraction | Gemini 2.5 Flash | Claude Haiku | Premium |
| Coding Agent | GPT-5 Codex | Claude Sonnet 4.6 | Premium |
| Browser Automation | Gemini Computer Use | Playwright deterministic workflows | Premium |
| Ontology Generation | Claude Sonnet 4.6 | GPT-5.5 | Premium |
| Econometric Research Agent | Claude Sonnet 4.6 | GPT-5.5 | Premium |
| Feature Engineering Agent | Claude Sonnet 4.6 | Gemini 2.5 Pro | Premium |
| Technical Analysis Vision Agent | Gemini Multimodal | GPT Vision-capable models | Premium |

---

# Enterprise Hosting Recommendations

| Layer | Recommendation |
|---|---|
| Cloud Platform | AWS |
| Model Gateway | LiteLLM |
| Hosted Models | Amazon Bedrock + OpenAI |
| Durable Workflows | Temporal |
| Agent Orchestration | Embabel |
| Graph Layer | Neo4j |
| Lakehouse | Iceberg + Athena |
| Streaming | Kafka + Flink |
| Vector Layer | pgvector / Qdrant / Pinecone |

---

# Cost-Optimized / Local-First Configuration

## Purpose

Designed for:

- Local development
- Prototype environments
- Lower operating costs
- Privacy-sensitive workflows
- Research experimentation
- Home lab environments
- Small SaaS deployments
- Offline-capable workflows

This configuration uses:

- Ollama
- Gemma 4
- Open-weight local models
- Hybrid hosted escalation

---

# Local Model Recommendations

| Platform Role | Local Model | Premium or Free |
|---|---|---|
| Cheap Extraction Worker | Gemma 4 E2B | Free / Open |
| Default Local Worker | Gemma 4 E4B | Free / Open |
| GraphRAG Query Rewriter | Gemma 4 E2B | Free / Open |
| Transcript Summarization | Gemma 4 E4B | Free / Open |
| Narrative Intelligence Drafting | Gemma 4 E4B | Free / Open |
| Analyst Chat | Gemma 4 26B A4B | Free / Open |
| Embabel Planning Agent | Gemma 4 26B A4B | Free / Open |
| Ontology Suggestions | Gemma 4 26B A4B | Free / Open |
| Feature Engineering Drafts | Gemma 4 26B A4B | Free / Open |
| Technical Analysis Vision Agent | Gemma 4 Multimodal | Free / Open |
| Deep Local Reasoning | Gemma 4 31B | Free / Open |
| Local Coding Assistant | Gemma 4 26B A4B | Free / Open |

---

# Ollama Recommendations

## Suggested Local Models

```bash
ollama pull gemma4
```

Optional additional models:

```bash
ollama pull mistral
ollama pull qwen3
ollama pull llama3
```

---

# Local Hardware Recommendations

## Minimal Local Development

| Component | Recommendation |
|---|---|
| RAM | 32 GB |
| GPU | RTX 4070 / 4080 |
| CPU | Modern Ryzen or Intel i7/i9 |
| Storage | NVMe SSD |

## Recommended Workstation

| Component | Recommendation |
|---|---|
| RAM | 64–128 GB |
| GPU | RTX 4090 or equivalent |
| CPU | Ryzen 9 / Threadripper |
| Storage | Multiple NVMe SSDs |

## High-End Local AI Server

| Component | Recommendation |
|---|---|
| RAM | 128–256 GB |
| GPU | Multiple enterprise GPUs |
| CPU | EPYC / Xeon |
| Storage | RAID NVMe |

---

# Hybrid Routing Strategy

## Recommended Production Strategy

Use local models for:

- Summarization
- Extraction
- Metadata creation
- Query rewriting
- Initial drafts
- Ontology suggestions
- Agent routing
- Context enrichment
- Transcript processing
- Cheap GraphRAG operations

Escalate to premium models for:

- Final trade recommendations
- Risk review
- Compliance review
- Institutional-grade analysis
- High-risk decisions
- Deep macroeconomic synthesis
- Best-trade analysis
- Final analyst-facing explanations

---

# Model Routing Matrix

| Task Type | Routing Recommendation |
|---|---|
| Low-risk / High-volume | Local Gemma 4 |
| Medium-risk Research | Local Gemma 4 26B |
| Complex Trade Reasoning | Premium Claude / GPT |
| Final Audit Review | Premium Claude Opus |
| Coding and Refactoring | GPT Codex / Claude Sonnet |
| Browser Automation | Gemini Computer Use |
| Large-scale Extraction | Gemma 4 E2B / E4B |
| GraphRAG Retrieval | Local Gemma |
| Human-facing Final Reports | Premium Models |

---

# Recommended Multi-Agent Design

## Core Agents

| Agent | Responsibility |
|---|---|
| Market Data Agent | Retrieve market and macro data |
| Narrative Intelligence Agent | Process podcasts, videos, transcripts |
| Ontology Agent | Maintain semantic structures |
| Context Graph Agent | Build and enrich Neo4j graphs |
| GraphRAG Agent | Retrieve and synthesize context |
| Feature Engineering Agent | Create derived variables and features |
| Econometrics Agent | Run statistical and econometric workflows |
| Trade Strategy Agent | Generate trade ideas and structures |
| Risk Agent | Evaluate portfolio and strategy risk |
| Audit Agent | Explain decisions and maintain lineage |
| Coding Agent | Generate workflows, DAGs, MCP servers |
| UI Agent | Generate and refine interfaces |

---

# Recommended Design Principles

## Deterministic First

Use deterministic systems whenever possible:

- SQL
- Python
- Stata
- Spark
- Flink
- Statistical models
- Risk engines
- Rule systems
- Decision trees

Use LLMs primarily for:

- Reasoning
- Synthesis
- Orchestration
- Summarization
- Explanation
- Planning

---

# Recommended Long-Term Evolution

## Phase 1

- Ollama + Gemma 4 local deployment
- Neo4j context graph
- Embabel orchestration
- Temporal workflows
- Iceberg lakehouse

## Phase 2

- Hybrid local + hosted routing
- GraphRAG integration
- Narrative intelligence ingestion
- Ontology expansion

## Phase 3

- Self-improving playbooks
- Decision lineage graphs
- Autonomous research agents
- Multi-agent collaboration
- Institutional-grade trade analysis

## Phase 4

- User-managed narrative intelligence
- User-defined ontologies
- User-defined context graphs
- Agent marketplaces
- SaaS tenant isolation

---

# Small Language Models \(SLMs\) and MapReduce Processing Strategy

## Recommendation

The platform should use:

- Small Language Models (SLMs)
- MapReduce-style document processing
- Hierarchical summarization
- Distributed extraction pipelines
- Chunk-based GraphRAG enrichment
- Multi-stage synthesis and validation

This approach dramatically reduces:

- inference cost
- latency
- premium model dependency
- token usage
- hosted model expenses

while improving:

- scalability
- ingestion throughput
- context enrichment
- graph extraction
- transcript processing
- explainability
- replayability

---

# Recommended MapReduce Processing Pattern

```text
Document
  ↓
Parse / OCR / clean
  ↓
Chunk by section, heading, table, transcript segment
  ↓
MAP: small/local model extracts:
     - entities
     - relationships
     - claims
     - dates
     - events
     - risk factors
     - metadata
     - semantic tags
  ↓
Store outputs in:
     - Iceberg
     - Neo4j
     - Vector DB
     - Search indexes
  ↓
REDUCE: stronger model:
     - merges findings
     - resolves conflicts
     - deduplicates entities
     - synthesizes narratives
     - identifies contradictions
     - creates higher-order insights
  ↓
Human review / audit
```

---

# Recommended SLM Responsibilities

## Good SLM Use Cases

| Use Case | Recommended Approach |
|---|---|
| SEC Filing Extraction | SLM extraction + premium synthesis |
| EIA / NOAA Reports | Local SLM extraction |
| Podcast Processing | SLM summarization |
| YouTube Transcript Processing | SLM summarization |
| Regulations.gov Analysis | SLM classification |
| Ontology Suggestions | SLM-assisted drafting |
| Obsidian Note Enrichment | Local SLM tagging |
| GraphRAG Query Rewriting | Local SLM |
| Metadata Extraction | Local SLM |
| Semantic Tagging | Local SLM |
| Entity Extraction | Local SLM |
| Relationship Extraction | Local SLM |
| Initial Trade Thesis Drafts | Local SLM + premium review |

---

# Recommended SLM Models

| Model | Recommended Usage |
|---|---|
| Gemma 4 E2B | Cheap extraction workers |
| Gemma 4 E4B | Default local summarization |
| Gemma 4 26B A4B | Local analyst reasoning |
| Gemma 4 31B | Deep local synthesis |
| Mistral Small | Fast extraction |
| Qwen Small Models | Classification and tagging |
| Llama Small Variants | Lightweight orchestration |

---

# Recommended Reduce Models

| Reduce Stage | Recommended Model |
|---|---|
| Graph Synthesis | Claude Sonnet |
| Narrative Synthesis | Claude Sonnet |
| Deep Trade Review | Claude Opus |
| Final Audit Review | Claude Opus |
| Institutional Explanations | GPT-5.x |
| Complex Cross-Document Reasoning | Claude Opus / GPT-5.x |

---

# Recommended Extraction Output Schema

SLM map workers should produce structured outputs such as:

```json
{
  "entities": [],
  "relationships": [],
  "claims": [],
  "events": [],
  "risk_factors": [],
  "semantic_tags": [],
  "confidence": 0.0,
  "contradictions": [],
  "missing_information": [],
  "graph_write_candidates": []
}
```

---

# Recommended Processing Layers

| Layer | Responsibility |
|---|---|
| Parse Layer | OCR, cleaning, normalization |
| Chunk Layer | Semantic segmentation |
| Map Layer | Cheap local extraction |
| Enrichment Layer | Ontology mapping |
| Storage Layer | Iceberg + Neo4j + Vector DB |
| Reduce Layer | Premium synthesis |
| Audit Layer | Human review and approvals |

---

# Recommended Architecture Integration

## Temporal Responsibilities

Temporal should orchestrate:

- distributed extraction workflows
- retries
- replayability
- resumability
- checkpointing
- exception handling
- long-running ingestion
- human approvals

## Embabel Responsibilities

Embabel should coordinate:

- planner / critic loops
- extraction routing
- model selection
- graph enrichment
- reasoning orchestration
- agent collaboration

---

# Recommended Cost Optimization Strategy

| Task Type | Recommended Model Strategy |
|---|---|
| High-volume extraction | Gemma 4 E2B / E4B |
| Summarization | Gemma 4 E4B |
| Semantic tagging | Small local models |
| Entity extraction | Small local models |
| Cross-document synthesis | Premium models |
| Institutional reporting | Premium models |
| Final trade review | Premium models |
| Audit explanations | Premium models |

---

# Recommended Design Principle

Use:

- SLMs for scale
- Premium LLMs for depth
- Neo4j for connected reasoning
- Iceberg for factual persistence
- Vector DBs for semantic recall
- Temporal for durability
- Embabel for orchestration
- Human review for high-risk decisions

---

# Final Recommendation

## Recommended Starting Point

### Local-First

- Ollama
- Gemma 4 E4B
- Neo4j
- Embabel
- Temporal
- Iceberg
- Kafka
- Flink

### Hybrid Escalation

Escalate to:

- Claude Sonnet
- Claude Opus
- GPT-5.x
- Gemini 2.5 Pro

ONLY when:

- reasoning complexity increases
- institutional-quality review is needed
- trade-risk analysis requires stronger models
- final audit-quality explanations are required

This architecture provides:

- Cost efficiency
- Scalability
- Explainability
- Auditability
- Local privacy
- Institutional extensibility
- Stable multi-agent orchestration
- Durable workflow management
- Hybrid AI flexibility

