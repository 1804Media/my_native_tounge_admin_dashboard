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
    CTextarea,
    CInput
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { useSelector, useDispatch } from 'react-redux'

import usersData from '../users/UsersData'
import { fetchListing, updateWord, deleteWord, addWord, changeStatus } from '../../services/apis'

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
    { key: 'no', label: 'No', sorter: true },
    { key: 'words', label: 'Words', sorter: true, _style: { width: "50%", minWidth: 200 } },
    { key: 'status', label: 'Status', sorter: true },
    { key: 'actions', label: 'Actions', sorter: false }
]


const WordList = () => {
    const loginedUser = useSelector(state => state.loginedUser);
    const dispatch = useDispatch()
    const [wordListing, setWordListing] = useState([])
    const [addWordInput, setAddWordInput] = useState("")
    const [editInputField, setEditInputField] = useState("")
    const [editableId, setEditableId] = useState(null)
    const [needUpdate, setNeedUpdate] = useState(false);
    const [searchString, setSearchString] = useState("");
    let wordListingData = async () => {
        dispatch({ type: "LOADING", loading: true })
        let wordList = await fetchListing(loginedUser?.data.token, searchString, 100, "word");
        let wordListData = await wordList.json()
        // console.log(wordListData)
        setWordListing(wordListData.data);
        dispatch({ type: "LOADING", loading: false })
    }
    useLayoutEffect(() => {
        wordListingData()
    }, [needUpdate])

    useEffect(() => {
        if (!searchString) {
            wordListingData()
        }
    }, [searchString])


    let handleAddWord = async () => {
        if (addWordInput) {
            dispatch({ type: "LOADING", loading: true })
            addWord(loginedUser?.data.token, addWordInput)
                .then(res => res.json())
                .then(res => {
                    // console.log(res)
                    setAddWordInput("");
                    setNeedUpdate(!needUpdate)
                    dispatch({ type: "LOADING", loading: false })
                })
        }

    }
    let handleUpdateWord = async (item) => {
        if (editInputField) {
            dispatch({ type: "LOADING", loading: true })
            updateWord(loginedUser?.data.token, item.id, editInputField)
                .then(res => res.json())
                .then(res => {
                    // console.log(res)
                    setEditInputField("");
                    setEditableId(null);
                    setNeedUpdate(!needUpdate)
                    dispatch({ type: "LOADING", loading: false })
                })
        }
    }
    let handleDeleteWord = async (item) => {
        dispatch({ type: "LOADING", loading: true })
        deleteWord(loginedUser?.data.token, item.id)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
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
        changeStatus(loginedUser?.data.token, item.id, status, "word")
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
                            Word Listing
                        </CCardHeader>
                        <CCardBody style={{ verticalAlign: "middle" }}>
                            <CRow>
                                <CCol lg="6" className=" py-3">
                                    <CRow>
                                        <CCol>
                                            <CInput
                                                type="text"
                                                id="nf-add-word"
                                                name="nf-add-word"
                                                placeholder="Enter Word.."
                                                size="sm"
                                                value={addWordInput}
                                                onChange={(e) => { setAddWordInput(e.target.value) }}
                                            />
                                        </CCol>
                                        <CCol>
                                            <CButton size="sm" color="primary" onClick={() => { handleAddWord() }}>Add String</CButton>
                                        </CCol>
                                    </CRow>

                                </CCol>
                                <CCol lg="6" className="py-3">
                                    <CRow className="justify-content-end">
                                        <CCol lg="5" >
                                            <CInput
                                                type="text"
                                                id="nf-search-string"
                                                name="nf-search-string"
                                                placeholder="Search Word.."
                                                size="sm"
                                                value={searchString}
                                                onChange={(e) => { setSearchString(e.target.value) }}
                                            />
                                        </CCol>
                                        <CCol lg="3" >
                                            <CButton size="sm" color="primary" onClick={() => { wordListingData() }}>Search String</CButton>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                            <CDataTable
                                items={wordListing}
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
                                    'words':
                                        (item, index) => (
                                            <td className="align-middle py-2">
                                                {editableId == item.id ? <CRow>
                                                    <CCol lg="6" >
                                                        <CInput
                                                            type="text"
                                                            id={`nf-${item.id}`}
                                                            name={`nf-${item.id}`}
                                                            placeholder="Edit Word.."
                                                            size="sm"
                                                            value={editInputField}
                                                            onChange={(e) => { setEditInputField(e.target.value) }}
                                                        />
                                                    </CCol>
                                                </CRow> : item.word}
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
                                                    <CButton size="sm" color="primary" onClick={() => { setEditableId(null); handleUpdateWord(item); }}>Submit</CButton>
                                                    <CButton className="ml-2" size="sm" color="secondary" onClick={() => { setEditableId(null); setEditInputField("") }}>Cancel</CButton>
                                                </>
                                                    : <>
                                                        <CButton size="sm" color="info" onClick={() => { setEditableId(item.id); setEditInputField(item.word) }}>
                                                            Edit
                                                        </CButton>
                                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => { handleDeleteWord(item); }}>
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

export default WordList
