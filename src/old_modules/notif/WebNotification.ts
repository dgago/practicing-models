import { Notification, ITitledNotification, NotificationGroupMode } from ".";

export class WebNotification extends Notification
  implements ITitledNotification {
  title: string;

  constructor(
    recipient: string,
    eventName: string,
    title: string,
    message: string,
    groupingMode: NotificationGroupMode
  ) {
    super("web", recipient, eventName, message, groupingMode);

    this.title = title;
  }
}
