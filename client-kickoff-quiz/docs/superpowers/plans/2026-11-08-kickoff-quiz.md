# Hey Kahani Kickoff Quiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a branded multiple-choice client discovery quiz with durable responses.
**Architecture:** Standalone Vinext app, shared questionnaire/validation module, React flow and D1 submission route.
**Tech Stack:** Vinext, React, TypeScript, Drizzle, Cloudflare D1, Sites.
**Spec:** docs/superpowers/specs/2026-11-08-kickoff-quiz.md

## Global Constraints
- Separate client-kickoff-quiz app; preserve storefront.
- No browser tools or browser preview.
- Exact Hey Kahani palette and fonts; supplied vector wordmark.
- No default answers, honest device drafts and server submission status.
- Persist response data in D1; no public read endpoint.
- Apply audience only after explicit user choice.

## Review Focus
- Unknown/duplicate/out-of-limit/exclusive answers must be rejected before storage.
- Invalid or absent optional email and empty/long names handled consistently.
- Back/review/edit must preserve choices; local storage failure must not block quiz.
- Failed submission retains draft and UUID; retry does not duplicate records.
- Mobile cards, keyboard inputs and review focus must remain usable.

## Task 1: Questions and validation
Files: lib/questions.ts, lib/quiz.ts, tests/quiz.test.ts.
Interfaces: questions/chapters data; validateSubmission(unknown), toggleChoice(question,current,id), selectionError(question,ids).
- [ ] Write tests for missing submission validation, exclusive choice, max picks, unknown answers and valid complete response.
- [ ] Run with node --experimental-strip-types --test; observe failure.
- [ ] Implement ~37 choice/scale/ranked questions and pure validation.
- [ ] Run tests successfully.

## Task 2: Quiz and persistence
Files: app/page.tsx, app/Quiz.tsx, app/globals.css, app/layout.tsx, db/schema.ts, app/api/responses/route.ts.
Consumes: shared data and validation. Produces: responsive quiz and same-origin POST response creation.
- [ ] Implement intro, chapter navigation, choice cards, scales, review/edit and client export.
- [ ] Implement device drafts, guarded storage, retry-safe server submission and truthful completion.
- [ ] Define D1 schema and generate migration; inspect schema-only SQL.
- [ ] Run TypeScript and tests, build and exercise HTTP submission against local Worker/D1.

## Task 3: Publish
- [ ] Final source review and build; preserve identity in hosting manifest.
- [ ] Use Sites source helper to push exact source and package unchanged output.
- [ ] Publish with native Sites tool, poll terminal status, confirm HTTP content without browser.
- [ ] Report deployed URL, access state and unperformed browser verification.
