const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import axios from "axios";

export const apiFile = async (apiDetailRoad, data) => {
    try {
        console.log(data)
        const response = await axios.post(`${apiUrl}/${apiDetailRoad}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }

};


