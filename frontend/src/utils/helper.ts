import { useTranslation } from "i18next-vue"

export const formatTime = (date: Date) => {
  const formattedDate =
    [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
    " " +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(":")
  return formattedDate
}

export const dateFormat = (val: string) => {
  const { i18next } = useTranslation()
  const date = new Date(val)
  const option: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const locale = i18next.language === "zh" ? "zh-CN" : "en-US"
  return date.toLocaleDateString(locale, option)
}

export const getSectionTitleAndSlug = (sectionTitle: string[]) => {
  const sectionSlug = sectionTitle.map(
    (e) =>
      e
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
        .replace(/\s+/g, " ") // Collapse multiple spaces into one
        .trim() // Trim leading/trailing spaces
        .replace(/\s/g, "-"), // Replace spaces with hyphens
  )
  const section = sectionTitle.map((e, i) => ({ title: e, slug: sectionSlug[i] }))
  return section
}

export const getSectionTitleAndSlugChinese = (sectionTitle: string[]) => {
  const section = sectionTitle.map((e) => ({ title: e, slug: e }))
  return section
}
