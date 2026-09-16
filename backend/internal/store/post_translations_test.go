package store

import "testing"

func TestChooseTranslation(t *testing.T) {
	translations := []PostTranslation{
		{Locale: LocaleZhCN, Title: "中文"},
		{Locale: LocaleEnUS, Title: "English"},
	}

	if result := chooseTranslation(translations, LocaleEnUS); result == nil || result.Title != "English" {
		t.Fatal("expected exact English translation")
	}

	if result := chooseTranslation(translations[:1], LocaleEnUS); result == nil || result.Locale != LocaleZhCN {
		t.Fatal("expected Chinese fallback")
	}
}
