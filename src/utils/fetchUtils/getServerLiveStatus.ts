export const getServerLiveStatus = async () => {
  const serverBaseUrl = localStorage.getItem('serverBaseUrl');

  if (!serverBaseUrl) return 'no_base_url_provided';

  let pingServerResponse: Response | undefined = undefined;
  try {
    pingServerResponse = await fetch(`${serverBaseUrl}/ping`);
    if (pingServerResponse?.ok !== true) return 'server_not_found';
  } catch (error) {
    return 'server_not_found';
  }

  try {
    const pingServerJson = await pingServerResponse.json();
    if (pingServerJson?.success !== true) return 'server_found_invalid_response';
  } catch (error) {
    return 'server_found_invalid_response';
  }

  return 'server_found';
};
