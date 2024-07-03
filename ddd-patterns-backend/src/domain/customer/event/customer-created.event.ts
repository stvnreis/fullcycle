import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  constructor(
    readonly eventData: any,
    readonly dataTimeOccurred: Date = new Date()
  ) {}
}
