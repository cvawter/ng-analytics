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

# Ollama vs vLLM vs SGLang Comparison

## High-Level Comparison

| Capability | Ollama | vLLM | SGLang |
|---|---|---|---|
| Primary Purpose | Local development | High-throughput inference | Structured agentic workflows |
| Ease of Setup | Extremely easy | Moderate | Moderate to advanced |
| Best Use Case | Developer laptops | Production inference servers | Structured reasoning pipelines |
| Multi-GPU Support | Limited | Strong | Strong |
| Continuous Batching | Limited | Excellent | Excellent |
| Structured Generation | Basic | Moderate | Excellent |
| JSON-Constrained Output | Limited | Moderate | Excellent |
| Prefix Caching | Limited | Good | Excellent |
| Throughput | Moderate | Very high | High |
| Latency Optimization | Good | Excellent | Excellent |
| Production Readiness | Small to medium deployments | Enterprise-grade | Enterprise-grade |
| Concurrent Multi-Agent Workloads | Moderate | Excellent | Excellent |
| OpenAI-Compatible APIs | Yes | Yes | Partial / configurable |
| Embabel Integration Fit | Good | Very good | Excellent |
| Temporal Workflow Fit | Good | Excellent | Excellent |
| GraphRAG Support | Good | Excellent | Excellent |
| Cost Efficiency | Good | Excellent | Excellent |
| Operational Complexity | Low | Medium | Medium to high |
| Recommended Deployment | Local workstation | GPU inference cluster | Structured AI orchestration cluster |

---

# Recommended Usage Guidance

## When to Use Ollama

Use Ollama when:

- developing locally
- prototyping workflows
- running local analyst tools
- testing GraphRAG pipelines
- supporting offline workflows
- prioritizing simplicity
- experimenting with local models

### Recommended Roles

| Role | Recommendation |
|---|---|
| Developer laptops | Excellent |
| Prototype environments | Excellent |
| Small-team environments | Excellent |
| Enterprise production serving | Limited |
| Large-scale ingestion | Not ideal |

---

## When to Use vLLM

Use vLLM when:

- serving production inference workloads
- supporting high-throughput ingestion
- scaling concurrent agents
- maximizing GPU utilization
- supporting large GraphRAG pipelines
- serving many users simultaneously

### Recommended Roles

| Role | Recommendation |
|---|---|
| Production inference | Excellent |
| Multi-agent serving | Excellent |
| High-volume extraction | Excellent |
| Local experimentation | Moderate |
| Structured extraction pipelines | Good |

---

## When to Use SGLang

Use SGLang when:

- building planner / critic workflows
- enforcing schema-constrained generation
- running repeated structured prompts
- building ontology extraction workflows
- enriching context graphs
- optimizing repeated reasoning pipelines
- coordinating advanced agentic workflows

### Recommended Roles

| Role | Recommendation |
|---|---|
| Structured AI workflows | Excellent |
| Ontology extraction | Excellent |
| Graph enrichment | Excellent |
| Planner / critic orchestration | Excellent |
| General local experimentation | Moderate |

---

# Recommended Deployment Topologies

## Topology 1 — Local Development

```text
Developer Laptop
   ├── Ollama
   ├── Gemma 4
   ├── Neo4j
   └── LiteLLM
```

### Best For

- local experimentation
- rapid iteration
- offline workflows
- early prototypes

---

## Topology 2 — Production Local AI Cluster

```text
LiteLLM Router
   ├── vLLM Cluster
   │      ├── Gemma 4
   │      ├── Qwen
   │      └── Mistral
   └── Ollama
```

### Best For

- production GraphRAG
- ingestion pipelines
- multi-agent serving
- scalable local inference

---

## Topology 3 — Structured Agentic AI Platform

```text
Embabel
   ├── LiteLLM
   ├── SGLang
   ├── vLLM
   └── Premium Frontier Models
```

### Best For

- planner / critic workflows
- ontology extraction
- graph enrichment
- structured generation
- advanced reasoning pipelines

---

# Operational Tradeoff Analysis

| Concern | Ollama | vLLM | SGLang |
|---|---|---|---|
| Simplicity | Excellent | Moderate | Moderate |
| Throughput | Moderate | Excellent | Excellent |
| Structured AI | Limited | Good | Excellent |
| Dev Experience | Excellent | Good | Good |
| Production Scalability | Moderate | Excellent | Excellent |
| Embabel Alignment | Good | Very good | Excellent |
| Cost Efficiency | Good | Excellent | Excellent |
| Multi-Agent Concurrency | Moderate | Excellent | Excellent |
| Schema-Constrained Workflows | Limited | Moderate | Excellent |
| Best Long-Term Fit | Development | Production serving | Agentic orchestration |

---

# Recommended Default Stack

## Recommended Initial Stack

| Layer | Recommendation |
|---|---|
| Local Development | Ollama |
| Model Gateway | LiteLLM |
| Production Local Inference | vLLM |
| Structured AI Workflows | SGLang |
| Premium Escalation | Claude / GPT / Gemini |
| Agent Framework | Embabel |
| Workflow Engine | Temporal |
| Graph Layer | Neo4j |
| Lakehouse | Iceberg |

---

# Recommended Decision Tree

```text
Need simple local development?
   └── Use Ollama

Need high-throughput inference?
   └── Use vLLM

Need structured reasoning pipelines?
   └── Use SGLang

Need institutional-grade reasoning?
   └── Escalate to frontier cloud models
```

---

# Recommended Architecture Decision

The platform should:

- use Ollama for simplicity and local experimentation
- use vLLM for scalable production inference
- use SGLang for advanced structured reasoning workflows
- use LiteLLM for routing and abstraction
- use premium frontier models only when needed

This provides:

- maximum cost efficiency
- scalable inference
- strong agentic orchestration
- structured AI workflows
- local privacy
- enterprise extensibility
- provider portability
- operational flexibility

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

# BRD / FRD / PRD / Roadmap Requirements for Model Selection and Routing

---

# BRD Requirements

## Business Goals

The platform shall:

- minimize AI inference cost
- support hybrid local and cloud AI execution
- reduce dependence on expensive frontier models
- support vendor-agnostic model execution
- dynamically route workloads based on risk, latency, and cost
- support scalable multi-agent AI workloads
- support explainable and auditable AI decisions
- optimize inference efficiency for large-scale ingestion pipelines
- support offline-capable analyst workflows
- enable enterprise-grade governance and observability

---

## Business Capabilities

| Capability | Description |
|---|---|
| Hybrid AI Routing | Dynamically route AI requests between local and hosted models |
| Cost-Aware Model Selection | Select models based on token cost, latency, and workload type |
| Risk-Aware Escalation | Escalate sensitive workflows to premium models |
| Vendor Abstraction | Prevent lock-in to a single model provider |
| Local AI Execution | Support local execution with Ollama, vLLM, and SGLang |
| Structured AI Pipelines | Support schema-constrained AI workflows |
| Multi-Agent AI Infrastructure | Coordinate specialized AI agents |
| AI Observability | Monitor token cost, latency, failures, and routing |
| AI Governance | Support auditability and human approvals |
| AI Fallback Routing | Fail over between providers and local models |

---

## Strategic Requirements

The platform should:

- support frontier AI providers
- support open-weight local models
- support enterprise governance
- support scalable ingestion pipelines
- support distributed extraction workflows
- support GraphRAG and hybrid retrieval
- support structured generation workflows
- support model experimentation and benchmarking
- support model A/B testing
- support long-term provider portability

---

# FRD Requirements

## Functional Requirements

### LLM Gateway and Routing

| ID | Requirement |
|---|---|
| FR-LLM-001 | The platform shall provide a unified LLM gateway layer using LiteLLM or equivalent. |
| FR-LLM-002 | The platform shall support routing requests to Ollama, vLLM, SGLang, AWS Bedrock, OpenAI, Anthropic, and Gemini. |
| FR-LLM-003 | The platform shall support provider failover and retry logic. |
| FR-LLM-004 | The platform shall support dynamic model selection based on workload type. |
| FR-LLM-005 | The platform shall support configurable routing policies. |
| FR-LLM-006 | The platform shall support risk-aware model escalation. |
| FR-LLM-007 | The platform shall support cost-aware routing decisions. |
| FR-LLM-008 | The platform shall support latency-aware routing decisions. |
| FR-LLM-009 | The platform shall support model capability metadata management. |
| FR-LLM-010 | The platform shall support structured logging of AI requests and responses. |

---

### Local AI Execution

| ID | Requirement |
|---|---|
| FR-LOCAL-001 | The platform shall support local execution using Ollama. |
| FR-LOCAL-002 | The platform shall support production local inference using vLLM. |
| FR-LOCAL-003 | The platform shall support structured generation workflows using SGLang. |
| FR-LOCAL-004 | The platform shall support open-weight model execution. |
| FR-LOCAL-005 | The platform shall support GPU-based inference acceleration. |
| FR-LOCAL-006 | The platform shall support quantized local models. |
| FR-LOCAL-007 | The platform shall support multimodal local models. |
| FR-LOCAL-008 | The platform shall support offline-capable inference workflows. |
| FR-LOCAL-009 | The platform shall support distributed local inference clusters. |
| FR-LOCAL-010 | The platform shall support local GraphRAG processing. |

---

### Cost Optimization

| ID | Requirement |
|---|---|
| FR-COST-001 | The platform shall track token usage by provider and model. |
| FR-COST-002 | The platform shall track inference cost by workflow. |
| FR-COST-003 | The platform shall support budget-aware routing. |
| FR-COST-004 | The platform shall prefer local SLMs for low-risk workloads. |
| FR-COST-005 | The platform shall escalate to premium models only when required. |
| FR-COST-006 | The platform shall support model benchmarking and comparison. |
| FR-COST-007 | The platform shall support workload-specific model profiles. |
| FR-COST-008 | The platform shall support configurable escalation thresholds. |

---

### vLLM vs SGLang Functional Requirements

| ID | Requirement |
|---|---|
| FR-VLLM-001 | vLLM shall be supported for high-throughput production inference. |
| FR-VLLM-002 | vLLM shall support concurrent multi-agent workloads. |
| FR-VLLM-003 | vLLM shall support continuous batching and KV cache optimization. |
| FR-SGLANG-001 | SGLang shall support schema-constrained generation. |
| FR-SGLANG-002 | SGLang shall support planner / critic workflows. |
| FR-SGLANG-003 | SGLang shall support repeated structured reasoning pipelines. |
| FR-SGLANG-004 | SGLang shall support ontology extraction and graph enrichment workflows. |

---

### Embabel and Temporal Integration

| ID | Requirement |
|---|---|
| FR-AGENT-001 | Embabel agents shall use LiteLLM for model abstraction and routing. |
| FR-AGENT-002 | Temporal workflows shall orchestrate distributed AI extraction pipelines. |
| FR-AGENT-003 | Temporal shall support retryable AI activities. |
| FR-AGENT-004 | Temporal shall support human approval checkpoints for premium escalation. |
| FR-AGENT-005 | Embabel shall support planner / critic model separation. |
| FR-AGENT-006 | Embabel shall support agent-specific model selection policies. |

---

# PRD Requirements

## Product Requirements

### User Experience Requirements

The platform should provide:

- transparent AI routing visibility
- explainable model selection
- AI cost visibility dashboards
- routing policy management
- local vs cloud execution controls
- model benchmarking dashboards
- AI observability dashboards
- audit trails for AI decisions
- configurable escalation policies
- inference latency monitoring

---

## Product Features

| Feature | Description |
|---|---|
| AI Model Router | Unified routing across local and hosted models |
| Cost Optimization Engine | Minimize token and inference costs |
| AI Governance Dashboard | Audit and approval workflows |
| Model Benchmarking Suite | Compare models by cost and quality |
| Routing Policy Engine | Configure escalation and routing rules |
| AI Telemetry Dashboard | Track cost, latency, throughput, and failures |
| Local AI Workbench | Run local AI workflows via Ollama / vLLM |
| Structured AI Pipeline Engine | Execute schema-constrained workflows via SGLang |
| AI Provider Abstraction Layer | Decouple applications from providers |
| AI Risk Escalation Engine | Escalate sensitive workflows to premium models |

---

## Non-Functional Requirements

| Category | Requirement |
|---|---|
| Scalability | Support concurrent multi-agent inference |
| Reliability | Support provider failover and retries |
| Security | Support enterprise-grade authentication and authorization |
| Portability | Support provider-independent model routing |
| Observability | Support centralized AI telemetry |
| Performance | Support low-latency local inference |
| Cost Efficiency | Prefer local execution whenever appropriate |
| Explainability | Support AI audit trails and decision lineage |

---

# Roadmap Requirements

## Phase 1 — Local AI Foundation

### Objectives

- establish local-first AI infrastructure
- support offline-capable development
- reduce hosted inference costs

### Deliverables

- Ollama integration
- Gemma 4 local deployment
- LiteLLM gateway
- initial routing policies
- local GraphRAG workflows
- token cost tracking
- model benchmarking framework

---

## Phase 2 — Production AI Infrastructure

### Objectives

- support scalable production inference
- improve throughput and orchestration

### Deliverables

- vLLM deployment
- multi-GPU inference support
- AI observability dashboards
- distributed inference orchestration
- routing telemetry
- retry and fallback policies
- workload-aware routing

---

## Phase 3 — Structured AI Pipelines

### Objectives

- support advanced agentic workflows
- improve structured extraction and reasoning

### Deliverables

- SGLang integration
- structured JSON workflows
- ontology extraction pipelines
- planner / critic orchestration
- graph enrichment workflows
- schema-constrained generation

---

## Phase 4 — Enterprise Hybrid AI Platform

### Objectives

- support institutional-grade AI infrastructure
- optimize cost and governance

### Deliverables

- AWS Bedrock integration
- multi-provider failover
- risk-aware escalation
- AI governance dashboards
- approval workflows
- audit lineage graphs
- enterprise AI routing controls

---

## Phase 5 — Autonomous Optimization

### Objectives

- enable self-optimizing AI infrastructure
- improve routing intelligence over time

### Deliverables

- adaptive routing policies
- automated model benchmarking
- AI-driven routing optimization
- reinforcement-based routing heuristics
- predictive cost optimization
- workload pattern analysis
- dynamic provider selection

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

