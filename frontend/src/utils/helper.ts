export const formatTime = (date: Date) => {
  const formattedDate =
    [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
    " " +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(":")
  return formattedDate
}
