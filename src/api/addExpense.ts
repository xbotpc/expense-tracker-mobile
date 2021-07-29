import { ajax } from "../utils/ajax";
import { API_URL } from '@env';

export const addExpense = async (params) => {
    try {
        const res = await ajax({
            method: 'POST',
            url: `${API_URL}/api/transaction/save`,
            data: params
        });
        return [res, null];
    } catch (error) {
        console.log('Error', JSON.stringify(error));
        return [null, error];
    }
}