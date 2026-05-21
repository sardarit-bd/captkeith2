export type RouteDefinition<TMethods extends string | string[]> = {
    url: string;
    method: TMethods extends string[] ? TMethods[number] : TMethods;
    methods?: string[];
};

export type RouteFormDefinition<TMethod extends string> = {
    action: string;
    method: TMethod;
};

export type RouteQueryOptions = {
    query?: Record<string, string | number | boolean | null | undefined>;
    mergeQuery?: Record<string, string | number | boolean | null | undefined>;
};

export function queryParams(options?: RouteQueryOptions): string {
    const params = options?.query ?? options?.mergeQuery ?? {};
    const query = Object.entries(params)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        )
        .join('&');

    return query ? `?${query}` : '';
}

export function applyUrlDefaults(url: string): string {
    return url;
}

export const create = {
    url: () => '/my-yachts/create',
    method: 'GET',
};

export const store = {
    url: () => '/my-yachts',
    method: 'POST',
};

export function edit(params: { vessel: number | string }) {
    return {
        url: `/my-yachts/${params.vessel}/edit`,
        method: 'GET',
    };
}

export function update(params: { vessel: number | string }) {
    return {
        url: `/my-yachts/${params.vessel}`,
        method: 'PUT',
    };
}

export function destroy(params: { vessel: number | string }) {
    return {
        url: `/my-yachts/${params.vessel}`,
        method: 'DELETE',
    };
}
