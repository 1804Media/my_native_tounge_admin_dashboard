import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
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
    CInput,
    CSwitch,
    CSelect,
    CCardFooter
} from '@coreui/react'
import Multiselect from 'multiselect-react-dropdown';
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'

import usersData from '../users/UsersData'
import { fetchListing, getSubscription, updateSubscription } from '../../services/apis'

const getBadge = status => {
    switch (status) {
        case 'active': return 'success'
        case 'inactive': return 'secondary'
        case 'pending': return 'warning'
        case 'banned': return 'danger'
        default: return 'primary'
    }
}

const Subscription = () => {
    const languageMultiRef = useRef([]);
    const loginedUser = useSelector(state => state.loginedUser);
    const dispatch = useDispatch()
    const [allSubscriptionData, setAllSubscriptionData] = useState([])
    const [preSelectedSubs, setPreSelectedSubs] = useState([])
    const [editInputPlanName, setEditInputPlanName] = useState("")
    const [editInputWords, setEditInputWords] = useState("")
    const [editInputPrice, setEditInputPrice] = useState("")
    const [editInputTeam, setEditInputTeam] = useState("")
    const [editInputTeamType, setEditInputTeamType] = useState("")
    const [editInputGamePlayTime, setEditInputGamePlayTime] = useState("")
    const [editInputRandomWords, setEditInputRandomWords] = useState("")
    const [editInputSoundEffects, setEditInputSoundEffects] = useState("")
    const [editInputPlanType, setEditInputeditInputPlanType] = useState("")

    const [editableId, setEditableId] = useState(null)
    const [needUpdate, setNeedUpdate] = useState(false);
    const [multiLanguage, setMultiLanguage] = useState({});
    const [allSelectedlanguage, setAllSelectedLanguage] = useState([])

    let languageListingData = async () => {
        dispatch({ type: "LOADING", loading: true })
        let languageList = await fetchListing(loginedUser?.data.token, "", 100, "language");
        let languageListData = await languageList.json()
        setMultiLanguage({ options: languageListData.data });
        dispatch({ type: "LOADING", loading: false })
    }
    let getSubscriptionData = async () => {
        dispatch({ type: "LOADING", loading: true })
        let subscription = await getSubscription(loginedUser?.data.token);
        let subscriptionData = await subscription.json()
        setAllSubscriptionData(subscriptionData.data);
        dispatch({ type: "LOADING", loading: false })
    }

    useLayoutEffect(() => {
        languageListingData();
        getSubscriptionData();
    }, [])
    useEffect(() => {
        getSubscriptionData();
    }, [needUpdate])

    function onSelect(selectedList, selectedItem) {
        let selectLanguageIds = selectedList.map(item => item.id)
        setAllSelectedLanguage(selectLanguageIds)
    }

    function onRemove(selectedList, removedItem) {
        let selectLanguageIds = selectedList.map(item => item.id)
        setAllSelectedLanguage(selectLanguageIds)
    }

    let handlePlanEdit = (item, index) => {
        // setPreSelectedSubs(item.languages)
        setEditableId(item.id);
        setEditInputPlanName(item.name);
        setEditInputWords(item.show_words);
        setEditInputPrice(item.price);
        setEditInputTeam(item.teams);
        setEditInputTeamType(item.team_type);
        setEditInputGamePlayTime(item.game_play_time);
        setEditInputRandomWords(item.random_words);
        setEditInputSoundEffects(item.sound_effects);
        let selectLanguageArray = languageMultiRef.current[index].getSelectedItems()
        let selectLanguageIds = selectLanguageArray.map(item => item.id)
        setAllSelectedLanguage(selectLanguageIds);
    }
    let handlePlanCancle = (item, index) => {
        setEditableId(null);
        setEditInputPlanName("");
        setEditInputWords("");
        setEditInputPrice("");
        setEditInputTeam("");
        setEditInputTeamType("");
        setEditInputGamePlayTime("");
        setEditInputRandomWords("");
        setEditInputSoundEffects("");
        setAllSelectedLanguage([]);
        setAllSubscriptionData([])
        setNeedUpdate(!needUpdate)
    }

    let handleTeamtypeChange = (value) => {
        if (value == "fixed" || value == "unlimited") {
            setEditInputTeamType(value);
        }
    }

    let handleGamePlayTime = (e) => {
        let cleanstring = destroyMask(e);
        let formatedTime = cleanstring.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3")
        setEditInputGamePlayTime(formatedTime)
    }

    function destroyMask(string) {
        return string.replace(/\D/g, '').substring(0, 8);
    }
    let handleRandomWordChange = (value) => {
        if (value == "yes" || value == "no") {
            setEditInputRandomWords(value);
        }
    }
    let handleSoundEffectChange = (value) => {
        if (value == "yes" || value == "no") {
            setEditInputSoundEffects(value);
        }
    }
    let handleUpdateSubscription = async (item) => {
        dispatch({ type: "LOADING", loading: true })

        let updateSubscriptionData = {
            "name": editInputPlanName,
            "price": editInputPrice,
            "show_words": editInputWords,
            "team_type": editInputTeamType,
            "teams": editInputTeam,
            "game_play_time": editInputGamePlayTime,
            "random_words": editInputRandomWords,
            "sound_effects": editInputSoundEffects,
            "plan_languages": allSelectedlanguage,
        }
        updateSubscription(loginedUser?.data.token, item.id, updateSubscriptionData).then((res) => {
            setNeedUpdate(!needUpdate)
            setEditableId(null);
            dispatch({ type: "LOADING", loading: false })
        })
    }

    return (
        <>
            <CRow>
                {allSubscriptionData.map((item, index) => {
                    return <CCol xs="12" sm="6" md="4" className="d-flex">
                        <CCard style={{ flex: 1 }}>
                            <CCardHeader className="h6 font-weight-bold d-flex justify-content-between align-items-center">
                                {editableId == item.id ?
                                    <CInput
                                        type="text"
                                        id={`nf-${item.id}_${item.name}`}
                                        name={`nf-${item.id}_${item.name}`}
                                        placeholder="Edit Name.."
                                        size="sm"
                                        style={{ marginRight: "20px" }}
                                        value={editInputPlanName}
                                        onChange={(e) => { setEditInputPlanName(e.target.value) }}
                                    /> : item.name}

                                <div className="card-header-actions">
                                    {/* <CSwitch className={'float-right mb-0'} color={'info'} defaultChecked size={'sm'} tabIndex="0" /> */}
                                    {editableId == item.id ? <CButton size="sm" color="primary" onClick={() => { handlePlanCancle(item, index) }}>
                                        <CIcon name='cil-x' size="sm" />
                                    </CButton> :
                                        <CButton size="sm" color="primary" onClick={() => { handlePlanEdit(item, index) }}>
                                            <CIcon name='cil-pencil' size="sm" />
                                        </CButton>}
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>{item.id == 3 ? "Additional Word" : "Word"}</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        {editableId == item.id ?
                                            <CInput
                                                type="text"
                                                id={`nf-${item.id}_${item.name}_words`}
                                                name={`nf-${item.id}_${item.name}_words`}
                                                placeholder="Edit Words Count"
                                                size="sm"
                                                value={editInputWords}
                                                onChange={(e) => { setEditInputWords(e.target.value.replace(/\D/g, '')) }}
                                            /> : item.id == 3 ? "+" + item.show_words : item.show_words}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>Language</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        <Multiselect
                                            options={multiLanguage.options} // Options to display in the dropdown
                                            selectedValues={item.languages} // Preselected value to persist in dropdown
                                            onSelect={onSelect} // Function will trigger on select event
                                            onRemove={onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            showCheckbox={true}
                                            closeOnSelect={false}
                                            avoidHighlightFirstOption={true}
                                            disable={editableId == item.id ? false : true}
                                            ref={el => languageMultiRef.current[index] = el}
                                            style={{
                                                searchBox: {
                                                    paddingBottom: "0px",
                                                    marginBottom: "0px",
                                                    minHeight: "40px"
                                                },
                                                option: {
                                                    padding: "5px 10px"
                                                }
                                            }}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>Price</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        {editableId == item.id && item.id !== 1 ?
                                            <CInput
                                                type="text"
                                                id={`nf-${item.id}_${item.name}_price`}
                                                name={`nf-${item.id}_${item.name}_price`}
                                                placeholder="Edit Price"
                                                size="sm"
                                                value={editInputPrice}
                                                onChange={(e) => { setEditInputPrice(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')) }}
                                            /> : item.id == 1 ? "Free" : item.price}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>{item.id == 3 ? "Additional Team Members" : "Team Members"}</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        {editableId == item.id && item.id != 4 ?
                                            <CInput
                                                type="text"
                                                id={`nf-${item.id}_${item.name}_team`}
                                                name={`nf-${item.id}_${item.name}_team`}
                                                placeholder="Edit Team Members"
                                                size="sm"
                                                value={editInputTeam}
                                                onChange={(e) => { setEditInputTeam(e.target.value.replace(/\D/g, '')) }}
                                            /> : item.id == 3 ? "+" + item.teams : item.id == 4 ? "Unlimited Team Members" : item.teams}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>Team Type</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        {editableId == item.id ?
                                            <CSelect value={editInputTeamType} onChange={(e) => { handleTeamtypeChange(e.target.value) }} custom name={`nf-${item.id}_${item.name}_team_type`} id={`nf-${item.id}_${item.name}_team_type`} size="sm">
                                                <option value="fixed">Fixed</option>
                                                <option value="unlimited">Unlimited</option>
                                            </CSelect> : item.team_type}

                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>Game Play Time</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        {editableId == item.id ?
                                            <CInput
                                                id={`nf-${item.id}_${item.name}_game_play_time`}
                                                name={`nf-${item.id}_${item.name}_game_play_time`}
                                                placeholder="00:00:00"
                                                size="sm"
                                                maxLength="8"
                                                onChange={(e) => { handleGamePlayTime(e.target.value) }}
                                                value={editInputGamePlayTime}
                                            /> : item.game_play_time}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>Random Words</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        {editableId == item.id ?
                                            <CSelect value={editInputRandomWords} onChange={(e) => { handleRandomWordChange(e.target.value) }} custom name={`nf-${item.id}_${item.name}_random_word`} id={`nf-${item.id}_${item.name}_random_word`} size="sm">
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </CSelect> : item.random_words}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="12" className="mb-1"><strong>Sound Effects</strong></CCol>
                                    <CCol lg="12" className="mb-2">
                                        {editableId == item.id ?
                                            <CSelect value={editInputSoundEffects} onChange={(e) => { handleSoundEffectChange(e.target.value) }} custom name={`nf-${item.id}_${item.name}_soundEffect`} id={`nf-${item.id}_${item.name}_soundEffect`} size="sm">
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </CSelect> : item.sound_effects}
                                    </CCol>
                                </CRow>
                            </CCardBody>
                            {editableId == item.id ? <CCardFooter className="d-flex justify-content-end">
                                <CButton size="sm" color="primary" onClick={() => { handleUpdateSubscription(item) }}>
                                    Submit
                                </CButton>
                            </CCardFooter> : <></>}
                        </CCard>
                    </CCol>
                })}
            </CRow>
        </>
    )
}

export default Subscription
