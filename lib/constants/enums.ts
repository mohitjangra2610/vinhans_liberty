export const EventFilter = {
  ALL: "all",
  ONLINE: "online",
  OFFLINE: "offline",
} as const;

export type EventFilterType =
  (typeof EventFilter)[keyof typeof EventFilter];

export const DataSource = {
  CLIENT: "client",
  SERVER: "server",
  AUTO: "auto",
} as const;

export type DataSourceType =
  (typeof DataSource)[keyof typeof DataSource];
