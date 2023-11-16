type SoapEndpoint = {
    url: string;
    template: string;
    headers: object;
};

type LoginRequest = {
    username: string;
    password: string;
}


export { SoapEndpoint, LoginRequest};