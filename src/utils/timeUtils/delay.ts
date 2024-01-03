const isRapid = false;

export const delay = async x => {
  return new Promise(resolve => {
    const t = isRapid ? 100 : x;
    setTimeout(() => resolve(true), t);
  });
};
