export {Message, CardData};

interface Message {
    type: string,
    msg?: string,
    roomNumber?: string,
    memberId?: string,
    userId?: string,
    card?: CardData
    //[propName: string]: any;
}

interface CardData
{
    readonly rank: string;
    readonly attack: number;
    readonly defend: number;
    readonly dodge: number;
    readonly race: string;
    readonly id: number;
    readonly name: string;
}
