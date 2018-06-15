export abstract class Notification {
  /**
   * Notification identifier.
   */
  id: string;

  /**
   * Notification recipient identifier.
   */
  recipient: string;

  /**
   * Date in which the notification was created.
   */
  create_date: Date;

  /**
   * Channel type: web, email, sms, bot, push, telegram, etc.
   */
  channel_type: string;

  /**
   * Event that generated the notification.
   */
  event_name: string;

  /**
   * Notification text.
   */
  message: string;

  /**
   * Events received for this notification.
   */
  events: INotificationEvent[];

  /**
   * Specifies the way that notifications are grouped. No group, per event,
   * per user and event.
   */
  grouping_mode: NotificationGroupMode;

  constructor(
    channelType: string,
    recipient: string,
    eventName: string,
    message: string,
    groupingMode: NotificationGroupMode
  ) {
    this.create_date = new Date();

    this.recipient = recipient;
    this.event_name = eventName;
    this.message = message;
    this.grouping_mode = groupingMode;
    this.channel_type = channelType;
  }
}

export interface ITitledNotification {
  title: string;
}

export interface IFormattedNotification {
  data: any;
}

export interface INotificationEvent {
  source: string;
  name: string;
  event_id: string;
  msg_id?: string;
  ip: string;
  timestamp: number;
  data?: string;
}

export enum NotificationSendingStatus {
  All = 0,
  Pending = 1,
  Sent = 2,
  Error = 3,
  Cancelled = 4
}

export enum NotificationGroupMode {
  All = 0,
  NoGroup = 1,
  PerEventPerUser = 2,
  PerEvent = 3
}
