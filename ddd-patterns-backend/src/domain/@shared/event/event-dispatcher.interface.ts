import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface<T extends EventInterface> {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface<T>): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface<T>): void;
  unregisterAll(): void;
}
