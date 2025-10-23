export interface UserLogin{
    username: string;
    password: string;
}

export interface User{
    fullname: string;
    username: string;
    password: string;
    isExpired: boolean;
    email : string;
    description : string;
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
  setSelected : React.Dispatch<React.SetStateAction<string[]>>;
  setDes : React.Dispatch<React.SetStateAction<string>>;
}

export interface LastPageProps {
    technologies: string[];
    description : string;
}

export interface ServerBarProps{
    servers: Server[];
    ispublic : boolean;
    globalServer: React.Dispatch<React.SetStateAction<Server | undefined>>;
    getEverything: () => void;
    sGlobalText : React.Dispatch<React.SetStateAction<string>>;
}

export interface windowOptionProps{
    X: number;
    Y: number;
    addServer: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface windowOptionSProps{
    X: number;
    Y: number;
    owner:string;
    addChat: React.Dispatch<React.SetStateAction<boolean>>;
    addUsertoServer: React.Dispatch<React.SetStateAction<boolean>>;
    adding: React.Dispatch<React.SetStateAction<boolean>>;
    showmode : React.Dispatch<React.SetStateAction<boolean>>;
    deteleServer: () => void;
    leaveServer : ()=>void;
}

export interface AddUserToServerProps{
    adding: boolean;
    idServer: number;
    addUsertoServer: React.Dispatch<React.SetStateAction<boolean>>;
    sGlobalText : React.Dispatch<React.SetStateAction<string>>;
}

export interface deleteAdd{
    id_server: number;
    owner:string
    user: string;
}

export interface showMode{
    server_id : number;
    showing:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface messageListProps{
    messages : Message[];
}

export interface windowMessagesProps{
    X: number;
    Y: number;
    showing:React.Dispatch<React.SetStateAction<boolean>>;
    giveStars: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface profile {
    usernameUser:string;
    showing:React.Dispatch<React.SetStateAction<boolean>>;
    
}

export interface userWithStars{
    username : string,
    fullname : string,
    description: string,
    starsGiven : number,
}

export interface giveStars{
    amount : number,
    usernameFrom : string,
    usernameTo : string
}

export interface techs{
    color : string;
    name : string;
}

export interface serverInfo{
    name : string;
    ownerUsername : string;
    is_Public : boolean;
    numberModerators : number;
}

export interface userInfo{
    fullname : string;
    username : string;
    password : string;
    email : string;
    description : string;
}
