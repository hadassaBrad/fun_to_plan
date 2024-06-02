import React, { createContext, useContext, useState } from 'react';
export const ServerContext = createContext();

const Server = ({ requst }) => {
const [user, serUser]=useState();

    const baseUrl = "http://localhost:3000/";

    const getData = async (entity,
        searchKey = null,
        searchValue = null,
        start = 0,
        limit = null) => {
        try {
            let url = `${baseUrl}${entity}`;
            if (searchKey) {
                url += `?${searchKey}=${searchValue}`;
            }
            if (limit) {
                url += `&_start=${start}&_limit=${limit}`;
            }
            const response = await fetch(url);
            const newData = await response.json();
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

    const postData = async (entity, body) => {
        fetch(`${baseUrl}${entity}`, {
            method: 'POST',
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

    // const fetchData = async (
    //     entity,
    //     searchKey = null,
    //     searchValue = null,
    //     start = 0,
    //     limit = null
    // ) => {
    //     try {
    //         let url = `http://localhost:3000/${entity}`;
    //         if (searchKey) {
    //             url += `?${searchKey}=${searchValue}`;
    //         }
    //         if (limit) {
    //             url += `&_start=${start}&_limit=${limit}`;
    //         }
    //         const response = await fetch(url);
    //         const newData = await response.json();
    //         return newData;
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // const updateDataOnServer = async (entity, updatedData, method) => {
    //     const URL =
    //         method === "POST"
    //             ? `http://localhost:3000/${entity}`
    //             : `http://localhost:3000/${entity}/${updatedData.id}`;
    //     try {
    //         const response = await fetch(URL, {
    //             method: method,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(updatedData),
    //         });
    //         const newData = await response.json();

    //         console.log("Data updated on the server:", newData.id);
    //         return newData;
    //     } catch (error) {
    //         console.error("Error updating data on the server:", error);
    //     }
    // };

    return (
        <ServerContext.Provider value={{ deleteData, postData, putData, getData, user, serUser }}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => {
    return useContext(ServerContext);
}
export default Server;