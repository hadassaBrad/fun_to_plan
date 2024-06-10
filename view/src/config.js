const baseUrl = "http://localhost:3000/";

const getData = async (entity,
    searchKey = null,
    searchValue = null,
    start = 0,
    limit = null,
) => {
    try {
        let url = `${baseUrl}${entity}`;
        if (searchKey) {
            url += `?${searchKey}=${searchValue}`;
        }
        if (limit) {
            url += `&_start=${start}&_limit=${limit}`;
        }
        console.log("url  " + url);
        const response = await fetch(url);
        console.log(response)
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const putData = async (entity, idToUpdate, body) => {
    fetch(`${baseUrl}${entity}/${idToUpdate}`, {
        method: 'PUT',
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

// const postData = async (entity, body) => {
//     fetch(`${baseUrl}${entity}`, {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',

//         },
//     })
//         .then((response) => response.json())
//         .then((json) => {
//             console.log(json)
//             return json;
//         });
// }
const postData = async (entity, body) => {
    try {
        const response = await fetch(`${baseUrl}${entity}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


const deleteData = async (entity, idToDelete) => {
    try {
        const res = await fetch(`${baseUrl}${entity}/${idToDelete}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error(`Failed to delete ${entity}`);
        }
        return res;

    } catch (error) {
        console.error('Error deleting post:', error.message);
    }
}
export default { getData, putData, postData, deleteData }
