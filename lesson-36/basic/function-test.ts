import { createSubscribable } from "./Subscribable-function";

const sub = createSubscribable<string>();
const unsub = sub.subscribe(console.log);
sub.publish("Hello 1");
sub.publish("Hello 2");
unsub();
sub.publish("Hello 3");
