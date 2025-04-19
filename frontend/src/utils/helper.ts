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
