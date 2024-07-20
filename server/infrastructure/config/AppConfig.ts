export class Config {
    private static instance: Config;

    private constructor(public settings: { [key: string]: any }) {}

    static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config({ apiUrl: 'https://api.example.com', timeout: 5000 });
        }
        return Config.instance;
    }
}
