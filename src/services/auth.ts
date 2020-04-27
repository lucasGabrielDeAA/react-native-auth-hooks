interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'ababflaskdhgfblsdfkgsbdlfkjbsd;flgkjsdbfl',
        user: {
          name: 'Lucas Gabriel',
          email: 'lg.technus@gmail.com',
        },
      });
    }, 2000);
  });
}
