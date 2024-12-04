import { io, Socket } from 'socket.io-client';

class MessagingService {
  private socket: Socket | null = null;
  private messageHandlers: Map<string, Function> = new Map();

  connect(userId: string) {
    this.socket = io('your-websocket-server', {
      query: { userId }
    });

    this.socket.on('message', (data) => {
      const handler = this.messageHandlers.get(data.type);
      if (handler) {
        handler(data);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(recipientId: string, message: string) {
    if (this.socket) {
      this.socket.emit('send_message', {
        recipientId,
        message,
        timestamp: new Date()
      });
    }
  }

  onMessageReceived(type: string, handler: Function) {
    this.messageHandlers.set(type, handler);
  }
}

export const messaging = new MessagingService();