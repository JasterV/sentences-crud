import { AxiosInstance, AxiosStatic } from "axios";
import { RequestError } from "../../common/errors";
import { DeeplConfig } from "./interfaces/deeplConfig";
import { TranslationModel } from "./interfaces/translationModel";

export const translationModel = (axios: AxiosStatic | AxiosInstance, deeplConfig: DeeplConfig): TranslationModel => {
    
    async function translate(sentence: string): Promise<string> {
        try {
            const params = new URLSearchParams();
            params.append('auth_key', deeplConfig.key);
            params.append('text', sentence);
            params.append('target_lang', 'EN')
            const result = await axios.post(deeplConfig.url + '/v2/translate', params)
            return result.data.translations
        } catch(err) {
            throw new RequestError('Deepl translation error')
        }
    }

    return { translate }
}