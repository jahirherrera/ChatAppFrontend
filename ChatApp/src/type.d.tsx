export interface UserLogin{
    username: string;
    password: string;
}

export interface User{
    fullname: string;
    username: string;
    password: string;
    isExpired: boolean;
}


export interface Chat{
    id:number;
    name: string;
    server_id: number;
}

export interface Server{
    id: number; 
    name: string;
    ownerUsername: string;
}

export interface Message{
    id: number;
    content : string;
    chat_id: number;
    sender_id: number;
    sender_username: string;
    date: string;
}

export interface SelectProps {
  list: string[];
  title : string;
  setSelected : React.Dispatch<React.SetStateAction<string[]>>        
}


