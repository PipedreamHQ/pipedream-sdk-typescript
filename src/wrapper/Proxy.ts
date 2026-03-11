import * as core from "../core/index.js";
import * as Pipedream from "../api/index.js";
import { Proxy as GeneratedProxy } from "../api/resources/proxy/client/Client.js";

export interface ProxyRequestOptions extends GeneratedProxy.RequestOptions {
    includeHeaders?: boolean;
}

export class Proxy {
    constructor(private readonly _proxy: GeneratedProxy) {}

    public get(
        url64: string,
        request: Pipedream.ProxyGetRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: core.BinaryResponse; headers: Headers }>;
    public get(
        url64: string,
        request: Pipedream.ProxyGetRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse>;
    public async get(
        url64: string,
        request: Pipedream.ProxyGetRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse | { data: core.BinaryResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.get(url64, request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.get(url64, request, requestOptions);
    }

    public post(
        url64: string,
        request: Pipedream.ProxyPostRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: core.BinaryResponse; headers: Headers }>;
    public post(
        url64: string,
        request: Pipedream.ProxyPostRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse>;
    public async post(
        url64: string,
        request: Pipedream.ProxyPostRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse | { data: core.BinaryResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.post(url64, request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.post(url64, request, requestOptions);
    }

    public put(
        url64: string,
        request: Pipedream.ProxyPutRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: core.BinaryResponse; headers: Headers }>;
    public put(
        url64: string,
        request: Pipedream.ProxyPutRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse>;
    public async put(
        url64: string,
        request: Pipedream.ProxyPutRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse | { data: core.BinaryResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.put(url64, request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.put(url64, request, requestOptions);
    }

    public delete(
        url64: string,
        request: Pipedream.ProxyDeleteRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: core.BinaryResponse; headers: Headers }>;
    public delete(
        url64: string,
        request: Pipedream.ProxyDeleteRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse>;
    public async delete(
        url64: string,
        request: Pipedream.ProxyDeleteRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse | { data: core.BinaryResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.delete(url64, request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.delete(url64, request, requestOptions);
    }

    public patch(
        url64: string,
        request: Pipedream.ProxyPatchRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: core.BinaryResponse; headers: Headers }>;
    public patch(
        url64: string,
        request: Pipedream.ProxyPatchRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse>;
    public async patch(
        url64: string,
        request: Pipedream.ProxyPatchRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<core.BinaryResponse | { data: core.BinaryResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.patch(url64, request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.patch(url64, request, requestOptions);
    }
}
