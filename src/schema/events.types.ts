export const EventsTypes = {
  goal: 'goal',
  watch: 'watch',
} as const
export type EventsTypesValue = (typeof EventsTypes)[keyof typeof EventsTypes]
