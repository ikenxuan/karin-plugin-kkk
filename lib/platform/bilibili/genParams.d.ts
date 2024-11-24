export declare function genParams(apiURL: string): Promise<{
    QUERY: string;
    STATUS: string;
    isvip?: undefined;
} | {
    QUERY: string;
    STATUS: string;
    isvip: true;
} | {
    QUERY: string;
    STATUS: string;
    isvip: false;
}>;
