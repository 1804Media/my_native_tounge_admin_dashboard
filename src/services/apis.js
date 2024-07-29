export let BASEURL = "http://18.117.133.55/my-native-tongue/public/api/";

export let doLogIn = async (username, password) => {
    return fetch(`${BASEURL}login?user_id=${username}&user_type=admin&password=${password}`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            }
        })
}

export let getUserCount = async (token) => {
    return fetch(`${BASEURL}admin/counts`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}
export let getAnalytics = async (token, year = "") => {
    return fetch(`${BASEURL}admin/analytics?year=${year}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}


export let fetchListing = async (token, searchWord = "", rowsPerPage = "", endpoint = "") => {
    let fullUrl = `${BASEURL}admin/${endpoint}?${searchWord && "&search=" + searchWord}${rowsPerPage && "&rows_per_page=" + rowsPerPage}`
    return fetch(fullUrl,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}
export let fetchSalesListing = async (token, filterStatus, month = "", year = "", rowsPerPage = "", endpoint = "") => {
    let fullUrl = `${BASEURL}admin/${endpoint}?type=${filterStatus}${filterStatus == "filter" && month && year && "&month=" + month + "&year=" + year}${rowsPerPage && "&rows_per_page=" + rowsPerPage}`

    return fetch(fullUrl,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}

// export let fetchWordListing = async (token, searchWord = "", rowsPerPage = "") => {
//     let fullUrl = `${BASEURL}admin/word?${searchWord && "&search=" + searchWord}${rowsPerPage && "&rows_per_page=" + rowsPerPage}`
//     return fetch(fullUrl,
//         {
//             method: 'GET', // *GET, POST, PUT, DELETE, etc.
//             mode: 'cors', // no-cors, *cors, same-origin
//             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'same-origin', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": `Bearer ${token}`
//             }
//         })
// }

export let addWord = async (token, wordString = "") => {
    let fullUrl = `${BASEURL}admin/word?word=${wordString}`
    return fetch(fullUrl,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}
export let updateWord = async (token, id, wordString = "") => {
    let fullUrl = `${BASEURL}admin/word/${id}?word=${wordString}`
    return fetch(fullUrl,
        {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}

export let deleteWord = async (token, id) => {
    let fullUrl = `${BASEURL}admin/word/${id}`
    return fetch(fullUrl,
        {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}
export let changeStatus = async (token, id, status, endpoint) => {
    let fullUrl = `${BASEURL}admin/${endpoint}/update-status?id=${id}&status=${status}`
    return fetch(fullUrl,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}

// export let fetchLanguageListing = async (token, searchLang = "", rowsPerPage = "") => {
//     let fullUrl = `${BASEURL}admin/language?${searchLang && "&search=" + searchLang}${rowsPerPage && "&rows_per_page=" + rowsPerPage}`
//     return fetch(fullUrl,
//         {
//             method: 'GET', // *GET, POST, PUT, DELETE, etc.
//             mode: 'cors', // no-cors, *cors, same-origin
//             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'same-origin', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": `Bearer ${token}`
//             }
//         })
// }

export let addLanguage = async (token, addCodeInput = "", addNameInput = "", addNativeNameInput = "", addStatusInput = "") => {
    let fullUrl = `${BASEURL}admin/language?code=${addCodeInput}&name=${addNameInput}&native_name=${addNativeNameInput}&status=${addStatusInput}`
    return fetch(fullUrl,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}

export let updateLanguage = async (token, id, editInputFieldName, editInputFieldCode, editInputFieldNativeName) => {
    let fullUrl = `${BASEURL}admin/language/${id}?code=${editInputFieldCode}&name=${editInputFieldName}&native_name=${editInputFieldNativeName}`
    return fetch(fullUrl,
        {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}

export let deleteLanguage = async (token, id) => {
    let fullUrl = `${BASEURL}admin/language/${id}`
    return fetch(fullUrl,
        {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}
export let getSubscription = async (token) => {
    let fullUrl = `${BASEURL}admin/subscription-plan`
    return fetch(fullUrl,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}
export let updateSubscription = async (token, id, dataToUpdate) => {
    let fullUrl = `${BASEURL}admin/subscription-plan/${id}`
    return fetch(fullUrl,
        {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataToUpdate)
        })
}

export let doLogOut = async (token) => {
    return fetch(`${BASEURL}logout`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
}
