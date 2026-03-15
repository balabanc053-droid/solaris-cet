import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Propose = {
    $$type: 'Propose';
    queryId: bigint;
    to: Address;
    value: bigint;
    payload: Cell | null;
}

export function storePropose(src: Propose) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        if (src.payload !== null && src.payload !== undefined) { b_0.storeBit(true).storeRef(src.payload); } else { b_0.storeBit(false); }
    };
}

export function loadPropose(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _to = sc_0.loadAddress();
    const _value = sc_0.loadCoins();
    const _payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Propose' as const, queryId: _queryId, to: _to, value: _value, payload: _payload };
}

export function loadTuplePropose(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _payload = source.readCellOpt();
    return { $$type: 'Propose' as const, queryId: _queryId, to: _to, value: _value, payload: _payload };
}

export function loadGetterTuplePropose(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _payload = source.readCellOpt();
    return { $$type: 'Propose' as const, queryId: _queryId, to: _to, value: _value, payload: _payload };
}

export function storeTuplePropose(source: Propose) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeCell(source.payload);
    return builder.build();
}

export function dictValueParserPropose(): DictionaryValue<Propose> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePropose(src)).endCell());
        },
        parse: (src) => {
            return loadPropose(src.loadRef().beginParse());
        }
    }
}

export type Sign = {
    $$type: 'Sign';
    queryId: bigint;
    proposalId: bigint;
}

export function storeSign(src: Sign) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.proposalId, 64);
    };
}

export function loadSign(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _proposalId = sc_0.loadUintBig(64);
    return { $$type: 'Sign' as const, queryId: _queryId, proposalId: _proposalId };
}

export function loadTupleSign(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    return { $$type: 'Sign' as const, queryId: _queryId, proposalId: _proposalId };
}

export function loadGetterTupleSign(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    return { $$type: 'Sign' as const, queryId: _queryId, proposalId: _proposalId };
}

export function storeTupleSign(source: Sign) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.proposalId);
    return builder.build();
}

export function dictValueParserSign(): DictionaryValue<Sign> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSign(src)).endCell());
        },
        parse: (src) => {
            return loadSign(src.loadRef().beginParse());
        }
    }
}

export type Execute = {
    $$type: 'Execute';
    queryId: bigint;
    proposalId: bigint;
}

export function storeExecute(src: Execute) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.proposalId, 64);
    };
}

export function loadExecute(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _proposalId = sc_0.loadUintBig(64);
    return { $$type: 'Execute' as const, queryId: _queryId, proposalId: _proposalId };
}

export function loadTupleExecute(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    return { $$type: 'Execute' as const, queryId: _queryId, proposalId: _proposalId };
}

export function loadGetterTupleExecute(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    return { $$type: 'Execute' as const, queryId: _queryId, proposalId: _proposalId };
}

export function storeTupleExecute(source: Execute) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.proposalId);
    return builder.build();
}

export function dictValueParserExecute(): DictionaryValue<Execute> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecute(src)).endCell());
        },
        parse: (src) => {
            return loadExecute(src.loadRef().beginParse());
        }
    }
}

export type Revoke = {
    $$type: 'Revoke';
    queryId: bigint;
    proposalId: bigint;
}

export function storeRevoke(src: Revoke) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.proposalId, 64);
    };
}

export function loadRevoke(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _proposalId = sc_0.loadUintBig(64);
    return { $$type: 'Revoke' as const, queryId: _queryId, proposalId: _proposalId };
}

export function loadTupleRevoke(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    return { $$type: 'Revoke' as const, queryId: _queryId, proposalId: _proposalId };
}

export function loadGetterTupleRevoke(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    return { $$type: 'Revoke' as const, queryId: _queryId, proposalId: _proposalId };
}

export function storeTupleRevoke(source: Revoke) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.proposalId);
    return builder.build();
}

export function dictValueParserRevoke(): DictionaryValue<Revoke> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRevoke(src)).endCell());
        },
        parse: (src) => {
            return loadRevoke(src.loadRef().beginParse());
        }
    }
}

export type ProposeAddOwner = {
    $$type: 'ProposeAddOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeProposeAddOwner(src: ProposeAddOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(16, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadProposeAddOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 16) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ProposeAddOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleProposeAddOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ProposeAddOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleProposeAddOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ProposeAddOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleProposeAddOwner(source: ProposeAddOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserProposeAddOwner(): DictionaryValue<ProposeAddOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposeAddOwner(src)).endCell());
        },
        parse: (src) => {
            return loadProposeAddOwner(src.loadRef().beginParse());
        }
    }
}

export type ProposeRemoveOwner = {
    $$type: 'ProposeRemoveOwner';
    queryId: bigint;
    owner: Address;
}

export function storeProposeRemoveOwner(src: ProposeRemoveOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(17, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.owner);
    };
}

export function loadProposeRemoveOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 17) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _owner = sc_0.loadAddress();
    return { $$type: 'ProposeRemoveOwner' as const, queryId: _queryId, owner: _owner };
}

export function loadTupleProposeRemoveOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _owner = source.readAddress();
    return { $$type: 'ProposeRemoveOwner' as const, queryId: _queryId, owner: _owner };
}

export function loadGetterTupleProposeRemoveOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _owner = source.readAddress();
    return { $$type: 'ProposeRemoveOwner' as const, queryId: _queryId, owner: _owner };
}

export function storeTupleProposeRemoveOwner(source: ProposeRemoveOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.owner);
    return builder.build();
}

export function dictValueParserProposeRemoveOwner(): DictionaryValue<ProposeRemoveOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposeRemoveOwner(src)).endCell());
        },
        parse: (src) => {
            return loadProposeRemoveOwner(src.loadRef().beginParse());
        }
    }
}

export type ProposeUpdateThreshold = {
    $$type: 'ProposeUpdateThreshold';
    queryId: bigint;
    newThreshold: bigint;
}

export function storeProposeUpdateThreshold(src: ProposeUpdateThreshold) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(18, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.newThreshold, 8);
    };
}

export function loadProposeUpdateThreshold(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 18) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newThreshold = sc_0.loadUintBig(8);
    return { $$type: 'ProposeUpdateThreshold' as const, queryId: _queryId, newThreshold: _newThreshold };
}

export function loadTupleProposeUpdateThreshold(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newThreshold = source.readBigNumber();
    return { $$type: 'ProposeUpdateThreshold' as const, queryId: _queryId, newThreshold: _newThreshold };
}

export function loadGetterTupleProposeUpdateThreshold(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newThreshold = source.readBigNumber();
    return { $$type: 'ProposeUpdateThreshold' as const, queryId: _queryId, newThreshold: _newThreshold };
}

export function storeTupleProposeUpdateThreshold(source: ProposeUpdateThreshold) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.newThreshold);
    return builder.build();
}

export function dictValueParserProposeUpdateThreshold(): DictionaryValue<ProposeUpdateThreshold> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposeUpdateThreshold(src)).endCell());
        },
        parse: (src) => {
            return loadProposeUpdateThreshold(src.loadRef().beginParse());
        }
    }
}

export type Proposal = {
    $$type: 'Proposal';
    kind: bigint;
    to: Address;
    value: bigint;
    payload: Cell | null;
    proposer: Address;
    signBitmap: bigint;
    signCount: bigint;
    executed: boolean;
    expiry: bigint;
}

export function storeProposal(src: Proposal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.kind, 8);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        if (src.payload !== null && src.payload !== undefined) { b_0.storeBit(true).storeRef(src.payload); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.proposer);
        b_0.storeUint(src.signBitmap, 32);
        b_0.storeUint(src.signCount, 8);
        b_0.storeBit(src.executed);
        b_0.storeUint(src.expiry, 64);
    };
}

export function loadProposal(slice: Slice) {
    const sc_0 = slice;
    const _kind = sc_0.loadUintBig(8);
    const _to = sc_0.loadAddress();
    const _value = sc_0.loadCoins();
    const _payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _proposer = sc_0.loadAddress();
    const _signBitmap = sc_0.loadUintBig(32);
    const _signCount = sc_0.loadUintBig(8);
    const _executed = sc_0.loadBit();
    const _expiry = sc_0.loadUintBig(64);
    return { $$type: 'Proposal' as const, kind: _kind, to: _to, value: _value, payload: _payload, proposer: _proposer, signBitmap: _signBitmap, signCount: _signCount, executed: _executed, expiry: _expiry };
}

export function loadTupleProposal(source: TupleReader) {
    const _kind = source.readBigNumber();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _payload = source.readCellOpt();
    const _proposer = source.readAddress();
    const _signBitmap = source.readBigNumber();
    const _signCount = source.readBigNumber();
    const _executed = source.readBoolean();
    const _expiry = source.readBigNumber();
    return { $$type: 'Proposal' as const, kind: _kind, to: _to, value: _value, payload: _payload, proposer: _proposer, signBitmap: _signBitmap, signCount: _signCount, executed: _executed, expiry: _expiry };
}

export function loadGetterTupleProposal(source: TupleReader) {
    const _kind = source.readBigNumber();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _payload = source.readCellOpt();
    const _proposer = source.readAddress();
    const _signBitmap = source.readBigNumber();
    const _signCount = source.readBigNumber();
    const _executed = source.readBoolean();
    const _expiry = source.readBigNumber();
    return { $$type: 'Proposal' as const, kind: _kind, to: _to, value: _value, payload: _payload, proposer: _proposer, signBitmap: _signBitmap, signCount: _signCount, executed: _executed, expiry: _expiry };
}

export function storeTupleProposal(source: Proposal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.kind);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeCell(source.payload);
    builder.writeAddress(source.proposer);
    builder.writeNumber(source.signBitmap);
    builder.writeNumber(source.signCount);
    builder.writeBoolean(source.executed);
    builder.writeNumber(source.expiry);
    return builder.build();
}

export function dictValueParserProposal(): DictionaryValue<Proposal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposal(src)).endCell());
        },
        parse: (src) => {
            return loadProposal(src.loadRef().beginParse());
        }
    }
}

export type MultiSigWrapper$Data = {
    $$type: 'MultiSigWrapper$Data';
    ownerIndex: Dictionary<Address, bigint>;
    ownerByIndex: Dictionary<bigint, Address>;
    ownerBitmap: bigint;
    ownerCount: bigint;
    nextOwnerSlot: bigint;
    threshold: bigint;
    proposals: Dictionary<bigint, Proposal>;
    nextProposalId: bigint;
    openProposalCount: bigint;
    locked: boolean;
}

export function storeMultiSigWrapper$Data(src: MultiSigWrapper$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.ownerIndex, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeDict(src.ownerByIndex, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeUint(src.ownerBitmap, 32);
        b_0.storeUint(src.ownerCount, 8);
        b_0.storeUint(src.nextOwnerSlot, 8);
        b_0.storeUint(src.threshold, 8);
        b_0.storeDict(src.proposals, Dictionary.Keys.BigInt(257), dictValueParserProposal());
        b_0.storeUint(src.nextProposalId, 64);
        b_0.storeUint(src.openProposalCount, 64);
        b_0.storeBit(src.locked);
    };
}

export function loadMultiSigWrapper$Data(slice: Slice) {
    const sc_0 = slice;
    const _ownerIndex = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    const _ownerByIndex = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    const _ownerBitmap = sc_0.loadUintBig(32);
    const _ownerCount = sc_0.loadUintBig(8);
    const _nextOwnerSlot = sc_0.loadUintBig(8);
    const _threshold = sc_0.loadUintBig(8);
    const _proposals = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserProposal(), sc_0);
    const _nextProposalId = sc_0.loadUintBig(64);
    const _openProposalCount = sc_0.loadUintBig(64);
    const _locked = sc_0.loadBit();
    return { $$type: 'MultiSigWrapper$Data' as const, ownerIndex: _ownerIndex, ownerByIndex: _ownerByIndex, ownerBitmap: _ownerBitmap, ownerCount: _ownerCount, nextOwnerSlot: _nextOwnerSlot, threshold: _threshold, proposals: _proposals, nextProposalId: _nextProposalId, openProposalCount: _openProposalCount, locked: _locked };
}

export function loadTupleMultiSigWrapper$Data(source: TupleReader) {
    const _ownerIndex = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _ownerByIndex = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _ownerBitmap = source.readBigNumber();
    const _ownerCount = source.readBigNumber();
    const _nextOwnerSlot = source.readBigNumber();
    const _threshold = source.readBigNumber();
    const _proposals = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserProposal(), source.readCellOpt());
    const _nextProposalId = source.readBigNumber();
    const _openProposalCount = source.readBigNumber();
    const _locked = source.readBoolean();
    return { $$type: 'MultiSigWrapper$Data' as const, ownerIndex: _ownerIndex, ownerByIndex: _ownerByIndex, ownerBitmap: _ownerBitmap, ownerCount: _ownerCount, nextOwnerSlot: _nextOwnerSlot, threshold: _threshold, proposals: _proposals, nextProposalId: _nextProposalId, openProposalCount: _openProposalCount, locked: _locked };
}

export function loadGetterTupleMultiSigWrapper$Data(source: TupleReader) {
    const _ownerIndex = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _ownerByIndex = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _ownerBitmap = source.readBigNumber();
    const _ownerCount = source.readBigNumber();
    const _nextOwnerSlot = source.readBigNumber();
    const _threshold = source.readBigNumber();
    const _proposals = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserProposal(), source.readCellOpt());
    const _nextProposalId = source.readBigNumber();
    const _openProposalCount = source.readBigNumber();
    const _locked = source.readBoolean();
    return { $$type: 'MultiSigWrapper$Data' as const, ownerIndex: _ownerIndex, ownerByIndex: _ownerByIndex, ownerBitmap: _ownerBitmap, ownerCount: _ownerCount, nextOwnerSlot: _nextOwnerSlot, threshold: _threshold, proposals: _proposals, nextProposalId: _nextProposalId, openProposalCount: _openProposalCount, locked: _locked };
}

export function storeTupleMultiSigWrapper$Data(source: MultiSigWrapper$Data) {
    const builder = new TupleBuilder();
    builder.writeCell(source.ownerIndex.size > 0 ? beginCell().storeDictDirect(source.ownerIndex, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.ownerByIndex.size > 0 ? beginCell().storeDictDirect(source.ownerByIndex, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.ownerBitmap);
    builder.writeNumber(source.ownerCount);
    builder.writeNumber(source.nextOwnerSlot);
    builder.writeNumber(source.threshold);
    builder.writeCell(source.proposals.size > 0 ? beginCell().storeDictDirect(source.proposals, Dictionary.Keys.BigInt(257), dictValueParserProposal()).endCell() : null);
    builder.writeNumber(source.nextProposalId);
    builder.writeNumber(source.openProposalCount);
    builder.writeBoolean(source.locked);
    return builder.build();
}

export function dictValueParserMultiSigWrapper$Data(): DictionaryValue<MultiSigWrapper$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMultiSigWrapper$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMultiSigWrapper$Data(src.loadRef().beginParse());
        }
    }
}

 type MultiSigWrapper_init_args = {
    $$type: 'MultiSigWrapper_init_args';
    owner: Address;
    threshold: bigint;
}

function initMultiSigWrapper_init_args(src: MultiSigWrapper_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.threshold, 257);
    };
}

async function MultiSigWrapper_init(owner: Address, threshold: bigint) {
    const __code = Cell.fromHex('b5ee9c7241023d01000eeb00025aff008e88f4a413f4bcf2c80bed53208e983001d072d721d200d200fa4021103450666f04f86102f862e1ed43d9011c0202710211020158030f020120040d020120050702e1afab76a268690000c7307d20408080eb802c816880b6b6b6c10059f2126100797a38c0b2f412e081797a2980381038408085aa0c82296040808090b74aadacfa2c984c6400e7802099fa20f12a0b81c08080a00e10374a982cfa2d184a2099fa0a71238c0823081aa0a27186ed9e3650c01d06000226020148080b03e3a4dfda89a1a400031cc1f481020203ae00b205a202dadadb040167c8498401e5e8e302cbd04b8205e5e8a600e040e1020216a83208a58102020242dd2ab6b3e8b2613190039e008267e883c4a82e07020202803840dd2a60b3e8b461288267e829c48e30208c206a8289c61aaa13b678d9431d090a005e810101250259f40d6fa192306ddf206e92306d8e19d0d307fa40fa00f404fa40d31fd307d200d33f55806c196f09e2002c206e92306d99206ef2d0806f296f09e2206e92306dde02dfa7e7da89a1a400031cc1f481020203ae00b205a202dadadb040167c8498401e5e8e302cbd04b8205e5e8a600e040e1020216a83208a58102020242dd2ab6b3e8b2613190039e008267e883c4a82e07020202803840dd2a60b3e8b461288267e829c48e30208c206a8289c61bb678d9431d0c00022702e5b380fb513434800063983e9020404075c01640b4405b5b5b60802cf90930803cbd1c60597a097040bcbd14c01c081c204042d5064114b0204040485ba556d67d164c26320073c0104cfd10789505c0e040405007081ba54c167d168c25104cfd053891c60411840d505138c3554276cf1b28601d0e003281010b2b028101014133f40a6fa19401d70030925b6de26eb302e1b7973da89a1a400031cc1f481020203ae00b205a202dadadb040167c8498401e5e8e302cbd04b8205e5e8a600e040e1020216a83208a58102020242dd2ab6b3e8b2613190039e008267e883c4a82e07020202803840dd2a60b3e8b461288267e829c48e30208c206a8289c61bb678d94301d10000222020120121702016a131502e1af5bf6a268690000c7307d20408080eb802c816880b6b6b6c10059f2126100797a38c0b2f412e081797a2980381038408085aa0c82296040808090b74aadacfa2c984c6400e7802099fa20f12a0b81c08080a00e10374a982cfa2d184a2099fa0a71238c0823081aa0a27186ed9e3650c01d1400022402e1af46f6a268690000c7307d20408080eb802c816880b6b6b6c10059f2126100797a38c0b2f412e081797a2980381038408085aa0c82296040808090b74aadacfa2c984c6400e7802099fa20f12a0b81c08080a00e10374a982cfa2d184a2099fa0a71238c0823081aa0a27186ed9e3650c01d160008f8276f10020120181a02e5b5a81da89a1a400031cc1f481020203ae00b205a202dadadb040167c8498401e5e8e302cbd04b8205e5e8a600e040e1020216a83208a58102020242dd2ab6b3e8b2613190039e008267e883c4a82e07020202803840dd2a60b3e8b461288267e829c48e30208c206a8289c61aaa13b678d94301d19002e81010b2b028101014133f40a6fa19401d70030925b6de202e1b5085da89a1a400031cc1f481020203ae00b205a202dadadb040167c8498401e5e8e302cbd04b8205e5e8a600e040e1020216a83208a58102020242dd2ab6b3e8b2613190039e008267e883c4a82e07020202803840dd2a60b3e8b461288267e829c48e30208c206a8289c61bb678d94301d1b00022102fced44d0d200018e60fa40810101d7005902d1016d6d6d8200b3e424c200f2f4718165e825c102f2f4530070207081010b54190452c0810101216e955b59f4593098c801cf004133f441e2541703810101401c206e953059f45a30944133f414e24718104610354144e30d0b925f0be0702ad74920c21f95310ad31f0bde211d1e0038f404d401d0f404d31fd307d307d307f404d33fd33fd20030109a6c1a0422c001e30221c002e30221c003e30221c0041f21232b04ee5b09d33f31fa40fa00f40430109a108a107a106a105a104a103a4abcdb3cf842db3c817cc22dc2fff2f48200d927f8276f10820afaf080a152e0bbf2f48162e523c164f2f47001db3c70f8427170f8238208093a80a01048071110070611110605111205103403111203080706050443138101015029c838393a2000c055805089cb0716ce5004fa0212f400cecb1fcb07ca00cb3fc952b0206e953059f45a30944133f415e209a407a41069105810471036450402c87f01ca005590509af40007c8f40016cb1f14cb0712cb07cb07f400cb3f12cb3f12ca00cdc9ed54049c5b09d33f31d33f30108910781067105610451034413adb3cf842db3c55902bdb3c8200cdcb22b3f2f4812213f82322bbf2f4081112080711110706111006105f104e103d4cba8200e0e151ae561538392d2203d6db3cb31bf2f4108b107a10691058104710364513021113141ddb3c0ba40711110706111006105f104e103d4b0011128101010dc855805089cb0716ce5004fa0212f400cecb1fcb07ca00cb3fc9103745c0206e953059f45a30944133f415e21049102810471046104543132f3a3104a65b09d33f31d33f30108910781067105610451034413adb3cf842db3c302adb3c8200cdcb02b312f2f4812213f82322bbf2f4532fb00a11120a0911110908111008107f106e105d104c103b021112020111110138392d2404c4db3c816c753225bef2f47f7f810101c85612065612065612065612060511120504111104031118030201111701111155805089cb0716ce5004fa0212f400cecb1fcb07ca00cb3fc9493001111001206e953059f45a30944133f415e205a52ae30f7025262a3100207001841fb091209620a5b001a401e83002ee3729c0018eef29c0028ec337388200b58c2281010b298101014133f40a6fa19401d70030925b6de26eb3f2f48200aaee26a5c200f2f48200bedb26a525bef2f450a9107810571610354433db3c308e24383907c0038e123281233c24c200f2f48129bd5345bbf2f4139134e21038105710455a14e2e30d2728019a2a81010b228101014133f40a6fa19401d70030925b6de2206ef2d0802910ac109b08107b06105b04103b40bc2bdb3c3850a8810101f45a3050a881010bf4593004a5104910781057061035443030017c37388139462281010b298101014133f40a6fa19401d70030925b6de26ef2f48200a76b26c120f2f48118582bc120f2f450a9107810571610354433db3c302901a406a4530810ac109b08107b1026105b44bc54130bdb3c380981010b53cb810101216e955b59f4593098c801cf004133f441e2102881010140bc206e953059f45a30944133f414e204a410895e3406103555123a00b03a3a8200ecf8f8276f10820afaf080a15280bbf2f447607250065a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001048103740165035041ee30221c010e30221c011e30221c0122c323436049c5b09d33f31d33f30108910781067105610451034413adb3cf842db3c55902bdb3c8200cdcb22b3f2f4812213f82322bbf2f4081112080711110706111006105f104e103d4cba8200aa8f51ae561538392d2e007e810101250259f40d6fa192306ddf206e92306d8e19d0d307fa40fa00f404fa40d31fd307d200d33f55806c196f09e2820090af216eb3f2f4206ef2d0806f2903dedb3c1bf2f4108b107a10691058104710364513021113141ddb3c0ba50611110605111005104f103e4db081010121011114010ec855805089cb0716ce5004fa0212f400cecb1fcb07ca00cb3fc910394cd0206e953059f45a30944133f415e2039303a503df091058105706441450332f3031000ca5ad71b0c0010008a5aeb3b00050c87f01ca005590509af40007c8f40016cb1f14cb0712cb07cb07f400cb3f12cb3f12ca00cdc9ed5404fe5b09d33f31fa4030108910781067105610451034413adb3cf842db3c8200a76b28c120f2f481185827c120f2f48139462b81010b2e8101014133f40a6fa19401d70030925b6de26ef2f48162e523c164f2f47001db3c71706df8422370f8238208093a80a0106807111207105610451034031112030807060504431381010138393a3300ce5029c855805089cb0716ce5004fa0212f400cecb1fcb07ca00cb3fc923103501206e953059f45a30944133f415e201a402a410891078106710561045500304c87f01ca005590509af40007c8f40016cb1f14cb0712cb07cb07f400cb3f12cb3f12ca00cdc9ed5404fc5b09d33f31fa4030108910781067105610451034413adb3cf842db3c8200de052b81010b2e8101014133f40a6fa19401d70030925b6de26eb3f2f48200aaee28a5c200f2f48139f528a527bef2f48162e523c164f2f47001db3c72706df8427170f8238208093a80a010680711120710561045103403111203080706050438393a3500d843138101015029c855805089cb0716ce5004fa0212f400cecb1fcb07ca00cb3fc923103501206e953059f45a30944133f415e201a402a410891078106710561045500304c87f01ca005590509af40007c8f40016cb1f14cb0712cb07cb07f400cb3f12cb3f12ca00cdc9ed5402fce302218210946a98b6ba8e6d5b09d33f30c8018210aff90f5758cb1fcb3fc9108a10791068105710461035443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca005590509af40007c8f40016cb1f14cb0712cb07cb07f400cb3f12cb3f12ca00cdc9ed54e03bc0000a373c04fe5b09d33f31d30730108910781067105610451034413adb3cf842db3c8200b3e42cc200f2f48129bd53c8bbf2f48162e523c164f2f47001db3c73f8426df8427170f8238208093a80a0106810570611120610451034080706050443138101015029c855805089cb0716ce5004fa0212f400cecb1fcb07ca00cb3fc92310350138393a3b001082009d0821b3f2f4004a81010b2b028101014133f40a6fa19401d70030925b6de28200de05216eb3f2f4206ef2d0800006a5aeb1008e206e953059f45a30944133f415e201a402a410891078106710561045500304c87f01ca005590509af40007c8f40016cb1f14cb0712cb07cb07f400cb3f12cb3f12ca00cdc9ed540070c1211ab08e2c10795516c87f01ca005590509af40007c8f40016cb1f14cb0712cb07cb07f400cb3f12cb3f12ca00cdc9ed54e05f0af2c08227bae805');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMultiSigWrapper_init_args({ $$type: 'MultiSigWrapper_init_args', owner, threshold })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const MultiSigWrapper_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    6232: { message: "No free owner slots" },
    8723: { message: "Proposal expired" },
    9020: { message: "Threshold too low" },
    10685: { message: "Threshold exceeds owner count" },
    14662: { message: "Already an owner" },
    14837: { message: "Cannot remove: would break threshold" },
    25317: { message: "Too many open proposals" },
    26088: { message: "Threshold cannot exceed owner count" },
    27765: { message: "Insufficient valid signatures" },
    31938: { message: "Value must be non-negative" },
    37039: { message: "Proposal not found" },
    40200: { message: "Re-entrancy detected" },
    42859: { message: "Max owners reached" },
    43663: { message: "Not signed" },
    43758: { message: "Cannot remove last owner" },
    46052: { message: "Threshold must be >= 1" },
    46476: { message: "Target is not an owner" },
    48859: { message: "Threshold too high after removal" },
    52683: { message: "Already executed" },
    55591: { message: "Insufficient contract balance" },
    56837: { message: "Not an owner" },
    57569: { message: "Already signed" },
    60664: { message: "Insufficient balance for transfer" },
} as const

export const MultiSigWrapper_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "No free owner slots": 6232,
    "Proposal expired": 8723,
    "Threshold too low": 9020,
    "Threshold exceeds owner count": 10685,
    "Already an owner": 14662,
    "Cannot remove: would break threshold": 14837,
    "Too many open proposals": 25317,
    "Threshold cannot exceed owner count": 26088,
    "Insufficient valid signatures": 27765,
    "Value must be non-negative": 31938,
    "Proposal not found": 37039,
    "Re-entrancy detected": 40200,
    "Max owners reached": 42859,
    "Not signed": 43663,
    "Cannot remove last owner": 43758,
    "Threshold must be >= 1": 46052,
    "Target is not an owner": 46476,
    "Threshold too high after removal": 48859,
    "Already executed": 52683,
    "Insufficient contract balance": 55591,
    "Not an owner": 56837,
    "Already signed": 57569,
    "Insufficient balance for transfer": 60664,
} as const

const MultiSigWrapper_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Propose","header":1,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Sign","header":2,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Execute","header":3,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Revoke","header":4,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ProposeAddOwner","header":16,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProposeRemoveOwner","header":17,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProposeUpdateThreshold","header":18,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newThreshold","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"Proposal","header":null,"fields":[{"name":"kind","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"proposer","type":{"kind":"simple","type":"address","optional":false}},{"name":"signBitmap","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"signCount","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"executed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"expiry","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"MultiSigWrapper$Data","header":null,"fields":[{"name":"ownerIndex","type":{"kind":"dict","key":"address","value":"int"}},{"name":"ownerByIndex","type":{"kind":"dict","key":"int","value":"address"}},{"name":"ownerBitmap","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"ownerCount","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"nextOwnerSlot","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"threshold","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"proposals","type":{"kind":"dict","key":"int","value":"Proposal","valueFormat":"ref"}},{"name":"nextProposalId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"openProposalCount","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"locked","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const MultiSigWrapper_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "Propose": 1,
    "Sign": 2,
    "Execute": 3,
    "Revoke": 4,
    "ProposeAddOwner": 16,
    "ProposeRemoveOwner": 17,
    "ProposeUpdateThreshold": 18,
}

const MultiSigWrapper_getters: ABIGetter[] = [
    {"name":"ownerCount","methodId":83798,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"threshold","methodId":108215,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"nextProposalId","methodId":97465,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"openProposalCount","methodId":124994,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"contractBalance","methodId":110221,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"isOwner","methodId":89603,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getOwnerIndex","methodId":118080,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"getProposal","methodId":84079,"arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Proposal","optional":true}},
    {"name":"ownerBitmap","methodId":84979,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const MultiSigWrapper_getterMapping: { [key: string]: string } = {
    'ownerCount': 'getOwnerCount',
    'threshold': 'getThreshold',
    'nextProposalId': 'getNextProposalId',
    'openProposalCount': 'getOpenProposalCount',
    'contractBalance': 'getContractBalance',
    'isOwner': 'getIsOwner',
    'getOwnerIndex': 'getGetOwnerIndex',
    'getProposal': 'getGetProposal',
    'ownerBitmap': 'getOwnerBitmap',
}

const MultiSigWrapper_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Propose"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Sign"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Execute"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Revoke"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProposeAddOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProposeRemoveOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProposeUpdateThreshold"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const MAX_OWNERS = 32n;
export const MAX_PROPOSALS = 100n;
export const PROPOSAL_TTL = 604800n;
export const MIN_RESERVE = 50000000n;
export const KIND_TRANSFER = 0n;
export const KIND_ADD_OWNER = 1n;
export const KIND_REMOVE_OWNER = 2n;
export const KIND_UPDATE_THRESHOLD = 3n;

export class MultiSigWrapper implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = MultiSigWrapper_errors_backward;
    public static readonly opcodes = MultiSigWrapper_opcodes;
    
    static async init(owner: Address, threshold: bigint) {
        return await MultiSigWrapper_init(owner, threshold);
    }
    
    static async fromInit(owner: Address, threshold: bigint) {
        const __gen_init = await MultiSigWrapper_init(owner, threshold);
        const address = contractAddress(0, __gen_init);
        return new MultiSigWrapper(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new MultiSigWrapper(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MultiSigWrapper_types,
        getters: MultiSigWrapper_getters,
        receivers: MultiSigWrapper_receivers,
        errors: MultiSigWrapper_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Propose | Sign | Execute | Revoke | ProposeAddOwner | ProposeRemoveOwner | ProposeUpdateThreshold | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Propose') {
            body = beginCell().store(storePropose(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Sign') {
            body = beginCell().store(storeSign(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Execute') {
            body = beginCell().store(storeExecute(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Revoke') {
            body = beginCell().store(storeRevoke(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProposeAddOwner') {
            body = beginCell().store(storeProposeAddOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProposeRemoveOwner') {
            body = beginCell().store(storeProposeRemoveOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProposeUpdateThreshold') {
            body = beginCell().store(storeProposeUpdateThreshold(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwnerCount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('ownerCount', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getThreshold(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('threshold', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getNextProposalId(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('nextProposalId', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getOpenProposalCount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('openProposalCount', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getContractBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('contractBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getIsOwner(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('isOwner', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getGetOwnerIndex(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getOwnerIndex', builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    
    async getGetProposal(provider: ContractProvider, id: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(id);
        const source = (await provider.get('getProposal', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleProposal(result_p) : null;
        return result;
    }
    
    async getOwnerBitmap(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('ownerBitmap', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}