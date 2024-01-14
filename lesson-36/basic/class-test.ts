import { Subscribable } from "./Subscribable-class";

const sub = new Subscribable<string>();
const unsub = sub.subscribe(console.log);
sub.publish("Hello 1");
sub.publish("Hello 2");
unsub();
sub.publish("Hello 3");

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v) => console.log(`DC: ${v}`));
dc.setValue(42);
