import EventInterface from "../../@shared/event/event.interface";

export default class AddressChangedEvent implements EventInterface {
  constructor(
    readonly eventData: any,
    readonly dataTimeOccurred: Date = new Date()
  ) {}
}
