export const getServerLiveStatus = async () => {
  const serverBaseUrl = localStorage.getItem('serverBaseUrl');

  if (!serverBaseUrl) return { success: false, status: 'no_base_url_provided' } as const;

  let pingServerResponse: Response | undefined = undefined;
  try {
    pingServerResponse = await fetch(`${serverBaseUrl}ping`);
    if (pingServerResponse?.ok !== true) return { success: false, status: 'server_not_found' } as const;
  } catch (error) {
    console.error(error);
    return { success: false, status: 'server_not_found' } as const;
  }

  try {
    const pingServerJson = await pingServerResponse.json();
    if (pingServerJson?.success !== true) return { success: false, status: 'server_found_invalid_response' } as const;
  } catch (error) {
    console.error(error);
    return { success: false, status: 'server_found_invalid_response' } as const;
  }

  return { success: true, status: 'server_found' } as const;
};
