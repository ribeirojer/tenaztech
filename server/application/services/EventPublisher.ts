// application/services/EventPublisher.ts
export class EventPublisher {
	private handlers: { [eventName: string]: Function[] } = {};

	register(eventName: string, handler: Function): void {
		if (!this.handlers[eventName]) {
			this.handlers[eventName] = [];
		}
		this.handlers[eventName].push(handler);
	}

	publish(event: any): void {
		const eventName = event.constructor.name;
		const eventHandlers = this.handlers[eventName] || [];
		for (const handler of eventHandlers) {
			handler(event);
		}
	}
}
