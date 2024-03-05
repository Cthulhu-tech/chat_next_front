export type TokenSliceType = {
    token: null | string;
    loading: boolean;
    decodeData: DecodeTokenType | null;
}

export type TokenAccess = {
    access: string | null;
}

export type DecodeUserTokenType = {
    id: number;
    login: string;
}

export type DecodeTokenType = {
    data: DecodeUserTokenType;
    exp: number;
    iat: number;
}
