import * as core from "../core/index.js";
import * as Pipedream from "../api/index.js";
import { Proxy as GeneratedProxy } from "../api/resources/proxy/client/Client.js";

export type ProxyResponse = Pipedream.ProxyResponse | core.BinaryResponse | undefined;

export interface ProxyRequestOptions extends GeneratedProxy.RequestOptions {
    includeHeaders?: boolean;
}

export class Proxy {
    constructor(private readonly _proxy: GeneratedProxy) {}

    public get(
        request: Pipedream.ProxyGetRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: ProxyResponse; headers: Headers }>;
    public get(
        request: Pipedream.ProxyGetRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse>;
    public async get(
        request: Pipedream.ProxyGetRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse | { data: ProxyResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.get(request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.get(request, requestOptions);
    }

    public post(
        request: Pipedream.ProxyPostRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: ProxyResponse; headers: Headers }>;
    public post(
        request: Pipedream.ProxyPostRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse>;
    public async post(
        request: Pipedream.ProxyPostRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse | { data: ProxyResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.post(request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.post(request, requestOptions);
    }

    public put(
        request: Pipedream.ProxyPutRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: ProxyResponse; headers: Headers }>;
    public put(
        request: Pipedream.ProxyPutRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse>;
    public async put(
        request: Pipedream.ProxyPutRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse | { data: ProxyResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.put(request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.put(request, requestOptions);
    }

    public delete(
        request: Pipedream.ProxyDeleteRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: ProxyResponse; headers: Headers }>;
    public delete(
        request: Pipedream.ProxyDeleteRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse>;
    public async delete(
        request: Pipedream.ProxyDeleteRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse | { data: ProxyResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.delete(request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.delete(request, requestOptions);
    }

    public patch(
        request: Pipedream.ProxyPatchRequest,
        requestOptions: ProxyRequestOptions & { includeHeaders: true },
    ): Promise<{ data: ProxyResponse; headers: Headers }>;
    public patch(
        request: Pipedream.ProxyPatchRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse>;
    public async patch(
        request: Pipedream.ProxyPatchRequest,
        requestOptions?: ProxyRequestOptions,
    ): Promise<ProxyResponse | { data: ProxyResponse; headers: Headers }> {
        if (requestOptions?.includeHeaders) {
            const { data, rawResponse } = await this._proxy.patch(request, requestOptions).withRawResponse();
            return { data, headers: rawResponse.headers };
        }
        return this._proxy.patch(request, requestOptions);
    }
}
