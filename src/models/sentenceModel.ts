import { NotFoundError } from "../errors";
import { CrudModel } from "../interfaces/crudModel";
import { CreateSentenceOptions, ListSentencesOptions, UpdateSentenceOptions } from "../interfaces/queryOptions"
import { Sentence } from "../interfaces/sentence"

export const sentenceModel = (db: DB): CrudModel<Sentence> => {
    const PAGE_LIMIT = 20

    async function create(data: CreateSentenceOptions): Promise<string> {
        const sentenceRaw = await db.collection('sentences').add(data);
        return sentenceRaw.id
    }

    async function getById(id: string): Promise<Sentence> {
        const sentenceRaw = await db.collection('sentences').doc(id).get();
        if (!sentenceRaw.exists) throw new NotFoundError(`Sentence with id ${id} not found`)
        const sentence: Sentence = { id, ...sentenceRaw.data() } as Sentence
        return sentence
    }

    async function list(options?: ListSentencesOptions): Promise<Sentence[]> {
        const { last, orderBy = null, order = 'desc' } = options || {}
        const sentences: Sentence[] = []
        const sentencesRef = db.collection('sentences');
        // order by property
        let query = sentencesRef;
        if (orderBy) query = query.orderBy(orderBy, order) as any;
        if (last) {
            const lastDoc = await sentencesRef.doc(last).get();
            query = query.startAfter(lastDoc) as any;
        }
        // query and return
        const rawResult = await query.limit(PAGE_LIMIT).get()
        rawResult.forEach((doc) => sentences.push({ id: doc.id, ...doc.data() } as Sentence))
        return sentences
    }

    async function del(id: string): Promise<string> {
        const sentenceRaw = await db.collection('sentences').doc(id).get();
        if (!sentenceRaw.exists) throw new NotFoundError(`Sentence with id ${id} not found`)
        await sentenceRaw.ref.delete();
        return id
    }

    async function update(id: string, data: UpdateSentenceOptions): Promise<Sentence> {
        const sentenceRaw = await db.collection('sentences').doc(id).get();
        if (!sentenceRaw.exists) throw new NotFoundError(`Sentence with id ${id} not found`)
        await sentenceRaw.ref.update(data);
        return { id, ...data } as Sentence
    }

    return { create, getById, list, update, del }
}