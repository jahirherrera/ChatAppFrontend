export interface UserLogin{
    username: string;
    password: string;
}

export interface User{
    fullname: string;
    username: string;
    password: string;
    isExpired: boolean;
    technologies: string[];
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
    is_Public: boolean;
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

export interface LastPageProps {
    technologies: string[]
}

export interface ServerBarProps{
    servers: Server[];
    ispublic : boolean;
    globalServer: React.Dispatch<React.SetStateAction<Server | undefined>>;
    getEverything: () => void;
}

export interface windowOptionProps{
    X: number;
    Y: number;
    addServer: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface windowOptionSProps{
    X: number;
    Y: number;
    addChat: React.Dispatch<React.SetStateAction<boolean>>;
    deteleServer: () => void;
}