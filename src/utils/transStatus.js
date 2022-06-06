export const isTransReady = (func) => {
  return (
    func &&
    func.state &&
    func.state.status !== "PendingSignature" &&
    func.state.status !== "Mining"
  );
};
