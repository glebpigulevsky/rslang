const subscribers = {};

export function publish(event, data) {
  if (!subscribers[event]) return;
  subscribers[event].forEach((subscriberCallback) => subscriberCallback(data));
}
export function subscribe(event, callback) {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event].push(callback);
}
