
type messageType = {
  username: string;
  content: string; 
  createdAt: string;
  isOwnMessage: boolean;
  userId: string;
};

type UserType = {
    id:string,
    name:string,
    email:string
}
export type { messageType,UserType };