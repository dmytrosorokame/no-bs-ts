import fs from "fs";

export function createHandlerStack<MessageType>() {
  const subscribers: Set<(msg: MessageType) => undefined | unknown> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);

      return () => {
        subscribers.delete(cb);
      };
    },
    publish(msg: MessageType): undefined | unknown {
      let data: unknown;

      for (const subscriber of Array.from(subscribers)) {
        data = subscriber(msg);

        if (data !== undefined) {
          break;
        }
      }

      return data;
    },
  };
}

const handlers = createHandlerStack<{
  name: string;
  contents: string;
}>();

handlers.subscribe(({ name, contents }) => {
  if (name.endsWith(".json")) {
    return JSON.parse(contents);
  }
});
handlers.subscribe(({ contents }) => contents);

for (const fileName of fs.readdirSync("./files")) {
  const contents = fs.readFileSync(`./files/${fileName}`, "utf-8");

  const output = handlers.publish({
    name: fileName,
    contents,
  });

  console.log(`${fileName}: ${JSON.stringify(output)}`);
}
