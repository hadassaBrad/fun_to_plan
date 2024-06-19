const baseUrl = "http://localhost:3000/";

const getData = async (entity,
    searchKey = null,
    searchValue = null,
    start = 0,
    limit = null,
    id=null,
    userId=null
) => {
    try {
        let url = `${baseUrl}${entity}`;
        console.log('url'+url);
        if (id) {
            url += `/${id}`;
            console.log('url id');
        }
        if (searchKey) {
            url += `?${searchKey}=${searchValue}`;
            console.log(' url += `?${searchKey}=${searchValue}`;');
        }
        if (limit) {
            url += `?&_start=${start}&_limit=${limit}`;
            console.log('rl += `?&_start=${start}&_limit=${limit}`;');
        }
     if(userId)
        {
            url +=`?user_id=${userId}`   
            console.log(' url +=`?user_id=${userId}`   ');
        }
        console.log("url  " + url);
        const response = await fetch(url);
        console.log(response)
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('"Error fetching data:", error')
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
            console.log("json");
            console.log(json)
            return json;
        });
}

const postData = async (entity, body) => {
    try {
        console.log(body.url);
        const response = await fetch(`${baseUrl}${entity}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
      
        if (!response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.error) {
                const error = new Error(responseData.error);
                throw error;
            } else {
                throw new Error('Failed to post data');
            }
        }
      
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error('Error:', error.message);
        console.log(error.message);
        throw error;
    }

}

const deleteData = async (entity, idToDelete, userId=null) => {
    try {
       
        let url = `${baseUrl}${entity}/${idToDelete}`;
        console.log("url: "+url);
        if(userId){
        url +=`?user_id=${userId}`  
        console.log("url with userid: "+url);
    } 
  
    console.log("url befor fetch: "+url);
        const res = await fetch(`${url}`, {
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
