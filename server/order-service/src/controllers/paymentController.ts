import { PreferenceService } from "../services/PreferenceService";

export class PreferenceController {
    static async createPreference({ body, set }: any) {
        try {
            const { items } = body;

            if (!items || !Array.isArray(items)) {
                set.status = 400
                return { error: 'Itens inválidos' }
            }

            const preference = await PreferenceService.createPreference(items);
            console.log(preference);
            set.status = 200
            return preference
        } catch (error) {
            console.error("Erro ao processar solicitação:", error);
            set.status = 500
            return { error: 'Erro interno do servidor' }
        }
    }
}
