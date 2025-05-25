interface FetcherOptions extends RequestInit {
    data?: any;
    withAuth?: boolean;
  }
  
  export async function fetcher(
    url: string,
    errorMessage: string = "Request failed",
    options: FetcherOptions = {}
  ) {
    const { data, withAuth, method = "GET", headers = {}, ...rest } = options;
  
    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...rest,
    };
  
    if (withAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
  
    if (data) {
      config.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(url, config);
  
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = null;
        }
  
        const message =
          (errorData && errorData.message) || errorMessage || "Unknown error";
        throw new Error(message);
      }
  
      try {
        return await response.json();
      } catch {
        return null; 
      }
    } catch (error: any) {
      throw new Error(error.message || errorMessage);
    }
  }
  