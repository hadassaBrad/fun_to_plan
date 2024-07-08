const baseUrl = "http://localhost:3000/";

// const getData = async (entity,
//     searchKey = [],
//     searchValue = [],
//     start = 0,
//     limit = null,
//     id = null,
//     userId = null
// ) => {
//     try {
//         let url = `${baseUrl}${entity}`;
//         console.log('url' + url);
//         if (id) {
//             url += `/${id}`;
//             console.log('url id');
//         }
//         console.log("searchKey");
//         console.log(searchKey);
//         if(searchKey)
//         for (let i = 0; i < searchKey.length; i++) {
//             url += `&?${searchKey[i]}=${searchValue[i]}`;
//             console.log(' url += `& ?${searchKey}=${searchValue}`;');
//         }
//         if (limit) {
//             url += `?&_start=${start}&_limit=${limit}`;
//             console.log('rl += `?&_start=${start}&_limit=${limit}`;');
//         }
//         if (userId) {
//             url += `?user_id=${userId}`
//             console.log(' url +=`?user_id=${userId}`   ');
//         }
//         console.log("url  " + url);
        
//         const response = await fetch(url, {
//             method: 'GET', // או POST, או כל שיטה אחרת שאתה משתמש בה
//             credentials: 'include', // שולח את העוגיות עם הבקשה
//         });

//         console.log(response)
//         const newData = await response.json();
//         console.log("new data:  in config ");
//         console.log(newData);
//         return newData;
//     } catch (error) {
//         console.log('"Error fetching data:", error')
//         console.error("Error fetching data:", error);

//     }
// };

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
        console.log('url: ' + url);

        // Add ID to URL if provided
        if (id) {
            url += `/${id}`;
            console.log('url with id: ' + url);
        }

        // Initialize URLSearchParams to build query parameters
        const params = new URLSearchParams();

       if(searchKey){ // Add search keys and values to params
        for (let i = 0; i < searchKey.length; i++) {
            if (searchValue[i]) {
                params.append(searchKey[i], searchValue[i]);
            }
        }}

        // Add pagination parameters
        if (limit) {
            params.append('_start', start);
            params.append('_limit', limit);
        }

        // Add user ID if provided
        if (userId) {
            params.append('user_id', userId);
        }

        // Append query parameters to URL if there are any
        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        console.log("Final URL: " + url);

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Send cookies with request
        });

        console.log(response);
        const newData = await response.json();
        console.log("new data:  in config ");
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('"Error fetching data:", error')
        console.error("Error fetching data:", error);
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
            console.log("in config put dataaaaaaaaaaaa")
            console.log(json)
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
            if (responseData && responseData.error) {
                const error = new Error(responseData.error);
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
        console.error('Error:', error.message);
        console.log(error.message);
        throw error;
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