export interface IMessage {
  id?: string;
  updateAt?: string;
  createAt?: string;
  status?: string;
  contentType: string[];
  conversationId: string;
  senderId?: string;
  textContent: string;
  imageLink?: string;
  videoLink?: string;
}
