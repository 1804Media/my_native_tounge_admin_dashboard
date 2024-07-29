import React, { lazy, useEffect, useState } from 'react'
import {
    CBadge,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CCallout,
    CWidgetProgressIcon,
    CDataTable,
    CSwitch,
    CSelect,
    CInput,
} from '@coreui/react'
import {
    CChartBar,
    CChartDoughnut,
} from '@coreui/react-chartjs'
import { useSelector, useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import countries from 'country-data'


import { getUserCount, fetchListing, fetchSalesListing, getAnalytics } from 'src/services/apis.js'
import { Link } from 'react-router-dom'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))



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
    { key: 'no', label: 'No', _style: { width: "60px" } },
    { key: 'name', label: 'Name', _style: { width: "20%", minWidth: 200 } },
    { key: 'email', label: 'Email', },
    { key: 'age', label: 'Age', },
    { key: 'mobile_no', label: 'Mobile', },
    { key: 'status', label: 'Status', },
]
const salesFields = [
    {
        key: 'user_avatar', label: <CIcon name="cil-people" />, _style: {
            width: "100px", minWidth: 100, textAlign: "center", paddingTop: 12, paddingBottom: 12, color: "#768192", backgroundColor: "#d8dbe0", borderColor: "#d8dbe0"
        }
    },
    { key: 'user_name', label: 'User', _style: { paddingTop: 12, paddingBottom: 12, color: "#768192", backgroundColor: "#d8dbe0", borderColor: "#d8dbe0" } },
    { key: 'country_code', label: 'Country Code', _style: { paddingTop: 12, paddingBottom: 12, color: "#768192", backgroundColor: "#d8dbe0", borderColor: "#d8dbe0" } },
    { key: 'plan_type', label: 'Plan Type', _style: { paddingTop: 12, paddingBottom: 12, color: "#768192", backgroundColor: "#d8dbe0", borderColor: "#d8dbe0" } },
    { key: 'plan_date', label: 'Plane Date', _style: { paddingTop: 12, paddingBottom: 12, color: "#768192", backgroundColor: "#d8dbe0", borderColor: "#d8dbe0" } },
]
let currentYear = new Date().getFullYear()
let currentFullMonth = (new Date().getMonth() + 1).toString();
currentFullMonth = currentFullMonth.length == 1 ? "0" + currentFullMonth : currentFullMonth;

// console.log(currentYear, currentFullMonth)

const AnalyticComponent = React.memo(({ loginedUser, dispatch }) => {
    const [analyticsYear, setAnalyticsYear] = useState(currentYear);
    const [analyticsBar, setAnalyticsBar] = useState("");
    const [analyticsDonut, setAnalyticsDonut] = useState("");

    let fetchAnalytics = async () => {
        dispatch({ type: "LOADING", loading: true })
        let analytics = await getAnalytics(loginedUser?.data.token, analyticsYear);
        let analyticsData = await analytics.json()
        // console.log(analyticsData)
        let analytics_Bar = Object.values(analyticsData.data.analytics_bar)
        let analytics_Donut = Object.values(analyticsData.data.analytics_donut)
        setAnalyticsBar(analytics_Bar);
        setAnalyticsDonut(analytics_Donut);
        dispatch({ type: "LOADING", loading: false })
    }

    useEffect(() => {
        fetchAnalytics()
    }, [analyticsYear])


    let handleAnalyticsYearChange = (value) => {
        setAnalyticsYear(value)
    }
    return <CRow>
        <CCol>
            <CCard>
                <CCardHeader>
                    Analytics
                </CCardHeader>

                <CCardBody style={{ verticalAlign: "middle" }}>
                    <CRow className="no-gutters  align-items-center">
                        {/* <CCol lg="2" className="pr-2 font-weight-bold">
                  Select Year:
                </CCol> */}
                        <CCol lg="6" className="d-flex align-items-center">
                            <div className="pr-2 font-weight-bold">
                                Select Year:
                            </div>
                            <div>
                                <CSelect value={analyticsYear} onChange={(e) => { handleAnalyticsYearChange(e.target.value) }} custom name="nf-analytics-year" id="nf-analytics-year" size="sm">
                                    <option value={`${currentYear}`}>{currentYear}</option>
                                    <option value={`${currentYear - 1}`}>{currentYear - 1}</option>
                                    <option value={`${currentYear - 2}`}>{currentYear - 2}</option>
                                </CSelect>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>

                        <CCol lg="6" className="py-3">
                            <CChartBar
                                datasets={[
                                    {
                                        label: 'Joined User',
                                        backgroundColor: '#f87979',
                                        data: analyticsBar
                                    }
                                ]}
                                labels="months"
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                            />
                        </CCol>
                        <CCol lg="6" className="py-3">
                            <CChartDoughnut
                                datasets={[
                                    {
                                        backgroundColor: [
                                            '#41B883',
                                            '#E46651',
                                            '#00D8FF',
                                            '#DD1B16'
                                        ],
                                        data: analyticsDonut
                                    }
                                ]}
                                labels={["Total", "Subscribed Users", 'Non Subscribed Users']}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>

                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
})

const Analytics = () => {
    const loginedUser = useSelector(state => state.loginedUser);
    const dispatch = useDispatch()
    const [count, setCount] = useState("");
    const [userListing, setUserListing] = useState("");
    const [salesListing, setSalesListing] = useState("");
    const [needUpdate, setNeedUpdate] = useState("");
    const [searchString, setSearchString] = useState("");
    const [salesFilterStatus, setSalesFilterStatus] = useState("all");
    const [salesFilterShow, setSalesFilterShow] = useState(false);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");



    let fetchUserCount = async () => {
        dispatch({ type: "LOADING", loading: true })
        getUserCount(loginedUser?.data.token)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setCount(res.data)
                dispatch({ type: "LOADING", loading: false })
            })
    }

    let userListingData = async () => {
        dispatch({ type: "LOADING", loading: true })
        let userList = await fetchListing(loginedUser?.data.token, searchString, 100, "user");
        let userListData = await userList.json()
        // console.log(userListData)
        setUserListing(userListData.data);
        dispatch({ type: "LOADING", loading: false })
    }
    let fetchSalesData = async () => {
        dispatch({ type: "LOADING", loading: true })
        let salesList = await fetchSalesListing(loginedUser?.data.token, salesFilterStatus, month, year, "", "sales-report/listing");
        let salesListData = await salesList.json()
        // console.log(salesListData)
        setSalesListing(salesListData.data);
        dispatch({ type: "LOADING", loading: false })
    }


    useEffect(() => {
        fetchUserCount()



        // for contry to flag for sales report 
        // var countries = require('country-data').countries,
        //   currencies = require('country-data').currencies,
        //   regions = require('country-data').regions,
        //   languages = require('country-data').languages,
        //   callingCountries = require('country-data').callingCountries;

        // let lookup = countries.lookup;
        // let x = lookup.countries({ countryCallingCodes: '+1' })
        // console.log(x)
    }, [])

    useEffect(() => {
        if (!searchString) {
            userListingData()
        }

    }, [searchString])

    useEffect(() => {
        // if (month, year) {
        fetchSalesData()
        // }
    }, [needUpdate])


    let handleCheckFilterSales = (e) => {
        if (e.target.checked) {
            setSalesFilterShow(e.target.checked)
            setSalesFilterStatus("filter")
            setMonth(currentFullMonth)
            setYear(currentYear)
            setNeedUpdate(!needUpdate)

        } else {
            setSalesFilterShow(e.target.checked)
            setSalesFilterStatus("all")
            setMonth("")
            setYear("")
            setNeedUpdate(!needUpdate)
        }
    }

    let handleMonthChange = (value) => {
        setMonth(value)
        setNeedUpdate(!needUpdate)
    }
    let handleYearChange = (value) => {
        setYear(value)
        setNeedUpdate(!needUpdate)

    }

    return (
        <>

            <AnalyticComponent loginedUser={loginedUser} dispatch={dispatch} />
        </>
    )
}

export default React.memo(Analytics)
