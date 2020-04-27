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
          name: 'User name',
          email: 'user_email@domain.com',
        },
      });
    }, 2000);
  });
}
