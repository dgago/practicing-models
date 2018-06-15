import {
  Notification,
  NotificationSendingStatus,
  NotificationGroupMode
} from ".";

export abstract class ServiceNotification extends Notification {
  recipient_reference: string;
  channel_id: string;
  tracking_id?: string;
  error?: string;
  sending_status: NotificationSendingStatus;
  sent_date?: Date;
  schedule_date?: Date;
  error_date?: Date;

  constructor(
    channelType: string,
    recipient: string,
    eventName: string,
    message: string,
    groupMode: NotificationGroupMode
  ) {
    super(channelType, recipient, eventName, message, groupMode);
  }
}

export class EmailServiceNotification extends ServiceNotification {}
