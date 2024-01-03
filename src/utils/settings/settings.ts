export const paperSizeTranslator = {
  '6x4': {
    label: '6 x 4',
    width: 6,
    height: 4,
    aspectRatio: 6 / 4,
    endpoint: 'save-pdf-print-6x4-image',
  },
  '3.5x5': {
    label: '3.5 x 5',
    width: 3.5,
    height: 5,
    aspectRatio: 3.5 / 5,
    endpoint: 'save-pdf-print-3.5x5-image',
  },
} as const;

export const getSettingsFromLocalStorage = () => {
  return {
    paperSizeKey: localStorage.getItem('paperSizeKey'),
    paperSizeLabel: localStorage.getItem('paperSizeLabel'),
    paperSizeWidth: localStorage.getItem('paperSizeWidth'),
    paperSizeHeight: localStorage.getItem('paperSizeHeight'),
    paperSizeAspectRatio: localStorage.getItem('paperSizeAspectRatio'),
    serverBaseUrl: localStorage.getItem('serverBaseUrl'),
    serverEndpoint: localStorage.getItem('serverEndpoint'),
  };
};