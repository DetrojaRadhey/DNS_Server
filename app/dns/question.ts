export enum DNSType {
  A = 1,
  NS = 2,
}

export enum DNSClass {
  IN = 1,
}

export interface IDNSQuestion {
  name: string;
  type: DNSType;
  classCode: DNSClass;
}

class DNSQuestion {
  static write(questions: IDNSQuestion[]) {
    return Buffer.concat(
      questions.map((question) => {
        const { name, type, classCode } = question;

        const str = name
          .split(".")
          .map((n) => `${String.fromCharCode(n.length)}${n}`)
          .join("");

        const typeAndClass = Buffer.alloc(4);

        typeAndClass.writeInt16BE(type);
        typeAndClass.writeInt16BE(classCode, 2);

        return Buffer.concat([Buffer.from(str + "\0", "binary"), typeAndClass]);
      })
    );
  }
}

export default DNSQuestion;
