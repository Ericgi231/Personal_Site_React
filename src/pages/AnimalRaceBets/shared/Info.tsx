export enum ConnectionStatus {
  Connecting = "connecting",
  Connected = "connected",
  Disconnected = "disconnected",
  Waiting = "waiting",
}

const statusMessages: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Connecting]: "Connecting...",
  [ConnectionStatus.Connected]: "", // No popup for connected
  [ConnectionStatus.Disconnected]: "Disconnected from server.",
  [ConnectionStatus.Waiting]: "Waiting for game state...",
};

const Info = ({ status }: { status: ConnectionStatus }) => {
  const message = statusMessages[status];
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        padding: "2rem 3rem",
        borderRadius: "1rem",
        zIndex: 1000,
        fontSize: "1.5rem",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
};

export default Info;