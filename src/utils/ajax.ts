import axios from "axios";

type ApiProps = {
    method: 'GET' | 'POST';
    url: string;
    baseURL?: string;
    headers?: any;
    data?: any;
    params?: any;
}

export const ajax = async ({ method, url, baseURL = '', headers = {}, data = {}, params = {} }: ApiProps) => {
    try {
        const { data: _data } = await axios({
            method,
            url,
            headers,
            data,
            params,
        });
        return _data.data;
    } catch (error) {
        return error;
    }
}