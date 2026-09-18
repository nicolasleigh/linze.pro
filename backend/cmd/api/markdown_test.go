package main

import "testing"

func TestParseMarkdownDocument(t *testing.T) {
	document := `---
slug: go-agent-design
locale: zh-CN
title: Go Agent 设计
description: 一篇测试文章
tags:
  - Go
  - Agent
  - Go
date: 2025-05-20
updated: 2026-09-12
---
# 正文

内容。`

	parsed, err := parseMarkdownDocument(document)
	if err != nil {
		t.Fatalf("parse markdown: %v", err)
	}
	if parsed.frontMatter.Title != "Go Agent 设计" {
		t.Fatalf("unexpected title %q", parsed.frontMatter.Title)
	}
	if len(parsed.frontMatter.Tags) != 2 {
		t.Fatalf("expected deduplicated tags, got %#v", parsed.frontMatter.Tags)
	}
	if parsed.createdAt == nil || parsed.createdAt.Format("2006-01-02") != "2025-05-20" {
		t.Fatalf("unexpected created time %#v", parsed.createdAt)
	}
	if parsed.updatedAt == nil || parsed.updatedAt.Format("2006-01-02") != "2026-09-12" {
		t.Fatalf("unexpected updated time %#v", parsed.updatedAt)
	}
	if parsed.content != "# 正文\n\n内容。" {
		t.Fatalf("unexpected content %q", parsed.content)
	}
}

func TestParseMarkdownDocumentRejectsInvalidInput(t *testing.T) {
	tests := []struct {
		name     string
		document string
	}{
		{name: "missing front matter", document: "# title"},
		{name: "missing title", document: "---\nlocale: en-US\n---\ncontent"},
		{name: "missing content", document: "---\ntitle: Empty\n---\n"},
		{name: "invalid updated date", document: "---\ntitle: Date\nupdated: yesterday\n---\ncontent"},
		{name: "invalid publish date", document: "---\ntitle: Date\ndate: invalid-date\n---\ncontent"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if _, err := parseMarkdownDocument(test.document); err == nil {
				t.Fatal("expected parse error")
			}
		})
	}
}

func TestNormalizeLocale(t *testing.T) {
	tests := map[string]string{
		"zh":    "zh-CN",
		"zh_cn": "zh-CN",
		"en":    "en-US",
		"en-US": "en-US",
	}
	for input, expected := range tests {
		actual, err := normalizeLocale(input)
		if err != nil || actual != expected {
			t.Fatalf("normalizeLocale(%q) = %q, %v", input, actual, err)
		}
	}
}
