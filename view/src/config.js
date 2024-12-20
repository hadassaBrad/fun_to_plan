const baseUrl = "http://localhost:3000/";

const getData = async (entity,
    searchKey = [],
    searchValue = [],
    start = 0,
    limit = null,
    id = null,
    userId = null
) => {
    try {
        let url = `${baseUrl}${entity}`;

        if (id) {
            url += `/${id}`;
        }

        const params = new URLSearchParams();

       if(searchKey){ 
        for (let i = 0; i < searchKey.length; i++) {
            if (searchValue[i]) {
                params.append(searchKey[i], searchValue[i]);
            }
        }}

        if (limit) {
            params.append('_start', start);
            params.append('_limit', limit);
        }

        if (userId) {
            params.append('user_id', userId);
        }

        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Send cookies with request
        });

        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error(error.message);
    }
};

const putData = async (entity, idToUpdate, body) => {
    return fetch(`${baseUrl}${entity}/${idToUpdate}`, {
        method: 'PUT',
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

const postData = async (entity, body) => {
    try {
        console.log(body);
        const response = await fetch(`${baseUrl}${entity}`, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            const responseData = await response.json();
            console.log("response data");
            console.log(responseData);
            if (responseData && responseData.message) {
                const error = new Error(responseData.message);
                console.log(response.message);
                console.log(error);
                throw error;
            } else {
                throw new Error('Failed to post data');
            }
        }

        const json = await response.json();
        console.log("json...");
        console.log(json);
        return json;
    } catch (error) {
        console.error('Error:', error);
        console.log(error.message);
        throw new Error(error.message);
    }

}

const deleteData = async (entity, idToDelete, userId = null) => {
    try {

        let url = `${baseUrl}${entity}/${idToDelete}`;
        console.log("url: " + url);
        if (userId) {
            url += `?user_id=${userId}`
            console.log("url with userid: " + url);
        }
        console.log("url befor fetch: " + url);
        const res = await fetch(`${url}`, {
            method: 'DELETE',
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error(`Failed to delete ${entity}`);
        }
        return res;

    } catch (error) {
        console.error('Error deleting post:', error.message);
    }
}

const deleteAllDataByKey = async (entity, key, id) => {
    try {

        let url = `${baseUrl}${entity}/?${key}=${id}`;
        console.log("url: " + url);
        const res = await fetch(`${url}`, {
            method: 'DELETE',
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error(`Failed to delete ${entity}`);
        }
        console.log("res... in delete all data of basket probably...")
        console.log(res)
        return res;

    } catch (error) {
        console.error('Error deleting post:', error.message);
    }
}
export default { getData, putData, postData, deleteData, deleteAllDataByKey }