export const CONSTANTS = {
  API_BASE_URL: 'https://shilpiantique.8848digitalerp.com',
};

export const headerGenerator = (token: any) => {
  const API_CONFIG = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  };
  return API_CONFIG;
};
