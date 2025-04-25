export const formatTime = (date: Date) => {
  const formattedDate =
    [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
    " " +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(":")
  return formattedDate
}

export const dateFormat = (val: string) => {
  const date = new Date(val)
  const option: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", option)
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
