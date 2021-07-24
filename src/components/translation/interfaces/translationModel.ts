export interface TranslationModel {
    translate(sentence: string): Promise<string>
}