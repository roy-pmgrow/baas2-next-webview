const getHeader = () => {
  return {
    "Content-Type": "application/json",
    "data-type": "json",
    // "Authorization": `Bearer ${localStorage.token}`,
  };
};

// helper functions
const handleResponse = async (response: Response) => {
  return response.text().then((text: string) => {
    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // localStorage.removeItem("token");
        // if (location.pathname !== "/") location.replace("/");
      }

      const error = response.statusText;
      return Promise.reject(error);
    }
    const data = text && JSON.parse(text);
    return data;
  });
};

class HttpRequest {
  async get(url: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: "get",
      headers: { ...getHeader() },
    });
    return handleResponse(response);
  }

  async post<T>(url: string, body?: T) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: "post",
      headers: { ...getHeader() },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  }

  async put<T>(url: string, body?: T) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: "put",
      headers: { ...getHeader() },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  }

  async delete(url: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: "delete",
      headers: { ...getHeader() },
    });
    return handleResponse(response);
  }
}

export const httpRequest = new HttpRequest();
