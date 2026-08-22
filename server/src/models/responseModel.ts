export interface ManualTestCase {
    id: string;
    title: string;
    module?: string;
    type?: string;
    priority: string;
    severity?: string;
    preconditions?: string;
    testData?: string;
    steps: string[] | string;
    expectedResult: string;
}

export interface ApiTestCase {
    title: string;
    method: string;
    endpoint?: string;
    headers?: Record<string, unknown> | string;
    queryParams?: Record<string, unknown> | string;
    requestBody?: Record<string, unknown> | string;
    expectedStatus: string | number;
    expectedResponse?: string;
    assertions?: string[];
}

export interface SqlQuery {
    purpose: string;
    query: string;
}

export interface QAResponse {

    manualTestCases: ManualTestCase[];

    apiTestCases: ApiTestCase[];

    sqlQueries: SqlQuery[];

    edgeCases: string[];

    playwrightScript: string;

}
