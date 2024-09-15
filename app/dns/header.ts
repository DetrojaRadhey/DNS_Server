export enum OpCode {
  STANDARD_QUERY = 0,
}

export enum ResponseCode {
  NO_ERROR = 0,
  FORMAT_ERROR = 1,
}

export interface TDNSHeader {
  id: number;
  qr: number;
  opcode: OpCode;
  aa: number;
  tc: number;
  rd: number;
  ra: number;
  z: number;
  rcode: ResponseCode;
  qdcount: number;
  ancount: number;
  nscount: number;
  arcount: number;
}

class DNSHeader {
  static write(values: TDNSHeader) {
    const header = Buffer.alloc(12);

    const flags =
      values.qr |
      values.opcode |
      values.aa |
      values.tc |
      values.rd |
      values.ra |
      values.z |
      values.rcode;

    header.writeInt16BE(values.id, 0);
    header.writeInt16BE(flags, 2);
    header.writeInt16BE(values.qdcount, 4);
    header.writeInt16BE(values.ancount, 6);
    header.writeInt16BE(values.nscount, 8);
    header.writeInt16BE(values.arcount, 10);

    return header;
  }
}

export default DNSHeader;
