export class ApiRepository {
  private _endpoint: string;

  constructor() {
    this._endpoint = "http://localhost:4000/graphql";
  }
  private _getHeader(token: string): any {
    if (token !== "") {
      return {
        "content-type": "application/json",
        "x-token": token,
      };
    }
    return {
      "content-type": "application/json",
    };
  }
  private _getGraphqlQuery(query: any, variables: any) {
    return {
      query: query,
      variables: variables,
    };
  }

  public async fetchApi(query: any, variables: any, token: string) {
    const options = {
      method: "POST",
      headers: this._getHeader(token),
      body: JSON.stringify(this._getGraphqlQuery(query, variables)),
    };
    const response = await fetch(this._endpoint, options);
    const data = await response.json();
    return data;
  }
}

export const ApiService = new ApiRepository();
