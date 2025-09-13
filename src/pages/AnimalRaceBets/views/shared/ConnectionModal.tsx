import { ConnectionStatus } from "../../types";
import { ConnectionModalContainer } from "./ConnectionModal.styles";

const statusMessages: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Connecting]: "Connecting...",
  [ConnectionStatus.Connected]: "",
  [ConnectionStatus.Disconnected]: "Disconnected from server.",
};

const ConnectionModal = ({ status }: { status: ConnectionStatus }) => {
  const message = statusMessages[status];
  if (!message) return null;

  return <ConnectionModalContainer>{message}</ConnectionModalContainer>;
};

export default ConnectionModal;