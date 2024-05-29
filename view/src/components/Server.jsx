import React, { createContext, useState, useContext } from "react";

export const ServerContext = createContext();

const Server = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        id: "",
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: "",
            },
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: "",
        },
    });

    const fetchData = async (
        entity,
        searchKey = null,
        searchValue = null,
        start = 0,
        limit = null
    ) => {
        try {
            let url = `http://localhost:3000/${entity}`;
            if(searchKey) {
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

    const updateDataOnServer = async (entity, updatedData, method) => {
        const URL =
            method === "POST"
                ? `http://localhost:3000/${entity}`
                : `http://localhost:3000/${entity}/${updatedData.id}`;
        try {
            const response = await fetch(URL, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            const newData = await response.json();

            console.log("Data updated on the server:", newData.id);
            return newData;
        } catch (error) {
            console.error("Error updating data on the server:", error);
        }
    };

    return (
        <ServerContext.Provider value={{ currentUser, setCurrentUser, fetchData, updateDataOnServer }}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => {
    return useContext(ServerContext);
};

export default Server;