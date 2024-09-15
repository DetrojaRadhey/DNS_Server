import { DNSClass, DNSType } from "./question";

export interface IDNSAns {
  name: string;
  type: DNSType;
  className: DNSClass;
  ttl: number;
  data: string;
}

class DNSAnswere {
  static write(answeres: IDNSAns[]) {
    return Buffer.concat(
      answeres.map((ans) => {
        const { name, className, data, ttl, type } = ans;

        const buffer = Buffer.alloc(10);

        const str = name
          .split(".")
          .map((e) => `${String.fromCharCode(e.length)}${e}`)
          .join("");

        buffer.writeInt16BE(type);
        buffer.writeInt16BE(className, 2);
        buffer.writeInt16BE(ttl, 4);
        buffer.writeInt16BE(data.length, 8);

        return Buffer.concat([
          Buffer.from(str + "\0", "binary"),
          buffer,
          Buffer.from(data + "\0", "binary"),
        ]);
      })
    );
  }
}

export default DNSAnswere;
