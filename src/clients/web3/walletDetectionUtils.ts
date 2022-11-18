export const isRunningInOperaBrowser = () => window.ethereum?.isOpera;

export const isRunningInBinanceChainWallet = () => !!window.BinanceChain;

export const isRunningInLedgerLive = () => {
  // Detect if app is running in iFrame
  if (!window || window.self === window.top) {
    return false;
  }

  // Check if "embed" param is present in URL
  const urlParams = new URLSearchParams(window.self.location.search);
  return !!urlParams.get('embed');
};
