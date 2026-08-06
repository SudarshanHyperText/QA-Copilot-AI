export interface ManualTestCase {
    id: string;
    title: string;
    steps: string;
    expectedResult: string;
    priority: string;
}

export interface ApiTestCase {
    title: string;
    method: string;
    expectedStatus: string;
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