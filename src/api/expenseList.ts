import { ajax } from "../utils/ajax";
import { API_URL } from '@env';

export const getTransactions = async () => {
    try {
        const res = await ajax({
            method: 'POST',
            url: `${API_URL}/api/transaction/get`,
            data: {
                "id": 1
            }
        });
        const dataByDate = [];
        console.log('res', res)
        res.forEach((x) => {
            const index = dataByDate.findIndex(z => new Date(z.sectionHeader).toDateString() === new Date(x.transactionDate).toDateString());
            if (index === -1) {
                dataByDate.push({
                    sectionHeader: new Date(x.transactionDate).toDateString(),
                    data: [{
                        categoryName: x.categoryName,
                        amount: x.amount
                    }]
                })
            } else {
                dataByDate[index].data.push({
                    categoryName: x.categoryName,
                    amount: x.amount
                })
            }
        })
        return dataByDate;
    } catch (error) {
        console.log('Error', JSON.stringify(error));
        return [null, error];
    }
}