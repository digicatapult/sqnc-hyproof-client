export const formatTimelineDate = (date) =>
  new Date(date).toLocaleString('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
