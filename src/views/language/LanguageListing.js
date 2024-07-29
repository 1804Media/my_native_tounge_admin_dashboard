import React, { useLayoutEffect, useState, useEffect } from 'react'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CInput,
    CSelect
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { useSelector, useDispatch } from 'react-redux'

import usersData from '../users/UsersData'
import { fetchListing, addLanguage, updateLanguage, deleteLanguage, changeStatus } from '../../services/apis'

const getBadge = status => {
    switch (status) {
        case 'active': return 'success'
        case 'inactive': return 'secondary'
        case 'pending': return 'warning'
        case 'banned': return 'danger'
        default: return 'primary'
    }
}

const fields = [
    { key: 'no', label: 'No' },
    { key: 'name', label: 'Name', _style: { width: "30%", minWidth: 200 } },
    { key: 'code', label: 'Code' },
    { key: 'native_name', label: 'Native Name' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
]


const LanguageList = () => {
    const loginedUser = useSelector(state => state.loginedUser);
    const dispatch = useDispatch()
    const [languageListing, setLanguageListing] = useState([])
    const [addCodeInput, setAddCodeInput] = useState("")
    const [addNameInput, setAddNameInput] = useState("")
    const [addNativeNameInput, setAddNativeNameInput] = useState("")
    const [addStatusInput, setAddStatusInput] = useState("")


    const [editInputFieldCode, setEditInputFieldCode] = useState("")
    const [editInputFieldName, setEditInputFieldName] = useState("")
    const [editInputFieldNameInput, setEditInputFieldNameInput] = useState("")

    const [editableId, setEditableId] = useState(null)
    const [needUpdate, setNeedUpdate] = useState(false);
    const [searchString, setSearchString] = useState("");
    let languageListingData = async () => {
        dispatch({ type: "LOADING", loading: true })
        let languageList = await fetchListing(loginedUser?.data.token, searchString, 100, "language");
        let languageListData = await languageList.json()
        // console.log(languageListData)
        setLanguageListing(languageListData.data);
        dispatch({ type: "LOADING", loading: false })
    }
    useLayoutEffect(() => {
        languageListingData()
    }, [needUpdate])

    useEffect(() => {
        if (!searchString) {
            languageListingData()
        }
    }, [searchString])

    let handleStatusChange = (value) => {
        if (value == "active" || value == "inactive") {
            setAddStatusInput(value);
        }
    }

    let handleAddLanguage = async () => {
        if (addCodeInput && addNameInput && addNativeNameInput && addStatusInput == "active" || addStatusInput == "inactive") {
            dispatch({ type: "LOADING", loading: true })
            addLanguage(loginedUser?.data.token, addCodeInput, addNameInput, addNativeNameInput, addStatusInput)
                .then(res => res.json())
                .then(res => {
                    // console.log(res)
                    setAddCodeInput("");
                    setAddNameInput("");
                    setAddNativeNameInput("");
                    setAddStatusInput("");
                    setNeedUpdate(!needUpdate)
                    dispatch({ type: "LOADING", loading: false })
                })
        }
    }
    let handleUpdateLanguage = async (item) => {
        dispatch({ type: "LOADING", loading: true })
        updateLanguage(loginedUser?.data.token, item.id, editInputFieldName, editInputFieldCode, editInputFieldNameInput)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setEditableId(null);
                setEditInputFieldName("");
                setEditInputFieldCode("");
                setEditInputFieldNameInput("");
                setNeedUpdate(!needUpdate)
                dispatch({ type: "LOADING", loading: false })
            })

    }
    let handleDeleteLanguage = async (item) => {
        dispatch({ type: "LOADING", loading: true })
        deleteLanguage(loginedUser?.data.token, item.id)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setSearchString("");
                setNeedUpdate(!needUpdate)
                dispatch({ type: "LOADING", loading: false })
            })

    }

    let handleStatus = async (item) => {
        dispatch({ type: "LOADING", loading: true })
        let status = ""
        if (item.status == "active") {
            status = "inactive"
        } else {
            status = "active"
        }
        changeStatus(loginedUser?.data.token, item.id, status, "language")
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setNeedUpdate(!needUpdate)
                dispatch({ type: "LOADING", loading: false })
            })

    }

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Language Listing
                        </CCardHeader>
                        <CCardBody style={{ verticalAlign: "middle" }}>
                            <CRow>
                                <CCol lg="12" className=" py-3">
                                    <CRow>
                                        <CCol lg="2">
                                            <CInput
                                                type="text"
                                                id="nf-code"
                                                name="nf-code"
                                                placeholder="Enter Code.."
                                                size="sm"
                                                value={addCodeInput}
                                                onChange={(e) => { setAddCodeInput(e.target.value) }}
                                            />
                                        </CCol>
                                        <CCol lg="2">
                                            <CInput
                                                type="text"
                                                id="nf-name"
                                                name="nf-name"
                                                placeholder="Enter Name.."
                                                size="sm"
                                                value={addNameInput}
                                                onChange={(e) => { setAddNameInput(e.target.value) }}
                                            />
                                        </CCol>
                                        <CCol lg="2">
                                            <CInput
                                                type="text"
                                                id="nf-native-name"
                                                name="nf-native-name"
                                                placeholder="Enter Native Name.."
                                                size="sm"
                                                value={addNativeNameInput}
                                                onChange={(e) => { setAddNativeNameInput(e.target.value) }}
                                            />
                                        </CCol>
                                        <CCol lg="2">
                                            {/* <CInput
                                                type="text"
                                                id="nf-status"
                                                name="nf-status"
                                                placeholder="Enter Status.."
                                                size="sm"
                                                value={addStatusInput}
                                                onChange={(e) => { setAddStatusInput(e.target.value) }}
                                            /> */}
                                            <CSelect value={addStatusInput} onChange={(e) => { handleStatusChange(e.target.value) }} custom name="nf-status" id="nf-status" size="sm">
                                                <option value="0">Chose status</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </CSelect>
                                        </CCol>
                                        <CCol lg="2">
                                            <CButton block size="sm" color="primary" onClick={() => { handleAddLanguage() }}>Add String</CButton>
                                        </CCol>
                                    </CRow>

                                </CCol>
                                <CCol lg="12" className="py-3">
                                    <CRow >
                                        <CCol lg="3">
                                            <CInput
                                                type="text"
                                                id="nf-search-string"
                                                name="nf-search-string"
                                                placeholder="Search Language.."
                                                size="sm"
                                                value={searchString}
                                                onChange={(e) => { setSearchString(e.target.value) }}
                                            />
                                        </CCol>
                                        <CCol lg="2">
                                            <CButton size="sm" block color="primary" onClick={() => { languageListingData() }}>Search Language</CButton>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                            <CDataTable
                                items={languageListing}
                                fields={fields}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={5}
                                pagination
                                // sorter={{ external: true }}
                                // onSorterValueChange={(e) => {
                                //     var typeSort = e.asc ? "ASC" : "DESC"
                                //     alert(typeSort)
                                // }}


                                scopedSlots={{
                                    'no':
                                        (item, index) => (
                                            <td className="align-middle py-2">
                                                {index + 1}
                                            </td>
                                        ),
                                    'name':
                                        (item, index) => (
                                            <td className="align-middle py-2">
                                                {editableId == item.id ?
                                                    <CInput
                                                        type="text"
                                                        id={`nf-${item.id}_${item.name}`}
                                                        name={`nf-${item.id}_${item.name}`}
                                                        placeholder="Edit Name.."
                                                        size="sm"
                                                        value={editInputFieldName}
                                                        onChange={(e) => { setEditInputFieldName(e.target.value) }}
                                                    /> : item.name}
                                                {/* {item.name} */}
                                            </td>
                                        ),
                                    'code':
                                        (item, index) => (
                                            <td className="align-middle py-2">
                                                {editableId == item.id ?
                                                    <CInput
                                                        type="text"
                                                        id={`nf-${item.id}_${item.code}`}
                                                        name={`nf-${item.id}_${item.code}`}
                                                        placeholder="Edit Code.."
                                                        size="sm"
                                                        value={editInputFieldCode}
                                                        onChange={(e) => { setEditInputFieldCode(e.target.value) }}
                                                    /> : item.code}
                                                {/* {item.code} */}
                                            </td>
                                        ),
                                    'native_name':
                                        (item, index) => (
                                            <td className="align-middle py-2">
                                                {editableId == item.id ?
                                                    <CInput
                                                        type="text"
                                                        id={`nf-${item.id}_${item.native_name}`}
                                                        name={`nf-${item.id}_${item.native_name}`}
                                                        placeholder="Edit Native Name.."
                                                        size="sm"
                                                        value={editInputFieldNameInput}
                                                        onChange={(e) => { setEditInputFieldNameInput(e.target.value) }}
                                                    /> : item.native_name}
                                                {/* {item.native_name} */}
                                            </td>
                                        ),
                                    'status':
                                        (item, index) => (
                                            <td className="align-middle py-2">
                                                <CButton className="text-capitalize" size="sm" color={getBadge(item.status)} onClick={() => { handleStatus(item) }}>
                                                    {item.status}
                                                </CButton>
                                            </td>
                                        ),
                                    'actions':
                                        (item, index) => (
                                            <td className="align-middle py-2">
                                                {editableId == item.id ? <>
                                                    <CButton size="sm" color="primary" onClick={() => { setEditableId(null); handleUpdateLanguage(item); }}>Submit</CButton>

                                                    <CButton size="sm" className="ml-2" color="secondary" onClick={() => {
                                                        setEditableId(null);
                                                        setEditInputFieldName("");
                                                        setEditInputFieldCode("");
                                                        setEditInputFieldNameInput("");
                                                    }}>Cancle</CButton>
                                                </> : <>
                                                    <CButton size="sm" color="info" onClick={() => {
                                                        setEditableId(item.id);
                                                        setEditInputFieldName(item.name);
                                                        setEditInputFieldCode(item.code);
                                                        setEditInputFieldNameInput(item.native_name);
                                                    }}>
                                                        Edit
                                                    </CButton>
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => { handleDeleteLanguage(item); }}>
                                                        Delete
                                                    </CButton></>}
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default LanguageList
