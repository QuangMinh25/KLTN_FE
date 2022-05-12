import React, { useEffect, useState } from "react";
import Regulation from "../../components/Regulation";
import { useHookTrainStation } from "../../state/trainStation";
import { useHistory } from 'react-router-dom'

export default function Search() {

    const history = useHistory()

    const [state, actions] = useHookTrainStation()
    const [wagonsSelected, setWagonsSelected] = useState(1)
    // const [ticketSelected, setTicketSelected] = useState([])
    const [keyTicketSelected, setKeyTicketSelected] = useState([])
    const [itemSelected, setItemSelected] = useState(undefined)
    const [trainSelected, setTrainSelected] = useState(0)

    const addTicket = (seats, typeSeats) => {
        const newData = []
        for (let i = 0; i < state?.dataReturn[itemSelected.train._id].length; i++) {
            newData.push(initDataTicket({
                id: state?.dataReturn[itemSelected.train._id][i]?._id,
                train: state?.dataReturn[itemSelected.train._id][i]?.train,
                train_station: state?.dataReturn[itemSelected.train._id][i]?.train_station,
                train_station_to: state?.dataReturn[itemSelected.train._id][i]?.train_station_to,
                departure_date: state?.dataReturn[itemSelected.train._id][i]?.departure_date,
                return_day: state?.dataReturn[itemSelected.train._id][i]?.arrival_date,
                wagons: wagonsSelected,
                seats: seats,
                type_seats: typeSeats,
            }))
        }
        actions.setTicketSelected([...state?.ticketSelected, [...newData]])
        setKeyTicketSelected([...keyTicketSelected, `${wagonsSelected}|${seats}|${state?.ticketSelected[itemSelected.train._id]}`])
    }

    const removeTicket = (seats) => {
        const tS = state?.ticketSelected
        const indexof = keyTicketSelected.indexOf(`${wagonsSelected}|${seats}|${state?.ticketSelected[itemSelected.train._id]}`)
        tS.splice(indexof, 1)
        actions.setTicketSelected([...tS])
        const kTS = keyTicketSelected
        kTS.splice(indexof, 1)
        setKeyTicketSelected([...kTS])
    }

    const checkSeatsBuy = (type, seats) => {
        let exists = false
        for (let i = 0; i < state?.dataReturn[itemSelected?.train._id].length; i++) {
            if (state?.dataReturn[itemSelected?.train._id][i].wagons[wagonsSelected][type].indexOf(seats) !== -1) {
                exists = true
            }
        }
        return exists
    }

    const generateSeats = (seats, wagonsSeat) => {
        const html = []
        if (seats === 42) {
            let floor_1 = []
            let floor_2 = []
            let floor_3 = []
            let count = 0
            for (let i = 0; i < 42; i++) {
                if (count === 1 || count === 0) {
                    floor_1.push(i + 1)
                } else if (count === 2 || count === 3) {
                    floor_2.push(i + 1)
                } else if (count === 5 || count === 4) {
                    floor_3.push(i + 1)
                }
                if (count === 5) {
                    count = 0
                } else {
                    count = count + 1
                }
            }
            const newArr = [...floor_3, ...floor_2, ...floor_1]
            for (let i = 0; i < 42; i++) {
                if (i === 14 || i === 28) {
                    html.push(
                        <>
                            <div class="et-col-1-16 et-seat-h-35 ng-isolate-scope" seat="seatMap[46]" direct="direct">
                                <div class="et-bed-left ng-hide" ng-show="seat.Status">
                                    <div class="et-bed-outer">
                                        <div class="et-bed text-center" analytics-on="click" analytics-event="SelectTicket">
                                            <div class="et-sit-no ng-scope"><span ng-show="!seat.waiting" class="ng-binding"></span> </div>
                                        </div>
                                        <div class="et-bed-illu"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="et-col-1-16 et-seat-h-35 ng-isolate-scope" seat="seatMap[46]" direct="direct">
                                <div class="et-bed-left ng-hide" ng-show="seat.Status">
                                    <div class="et-bed-outer">
                                        <div class="et-bed text-center" analytics-on="click" analytics-event="SelectTicket">
                                            <div class="et-sit-no ng-scope"><span ng-show="!seat.waiting" class="ng-binding"></span> </div>
                                        </div>
                                        <div class="et-bed-illu"></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                html.push(
                    <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" et-bed-left seat="seatMap[4]" direct="direct">
                        <div className={`et-bed-${i % 2 === 0 ? 'left' : 'right'}`} ng-show="seat.Status">
                            <div className="et-bed-outer">
                                {
                                    wagonsSeat.indexOf(newArr[i]) !== -1
                                        ?
                                        <div className="et-bed text-center et-sit-avaiable">
                                            <div className={`et-sit-no ng-scope ${(checkSeatsBuy('main', wagonsSeat.indexOf(newArr[i]) === true)) ? 'et-sit-bought' : ''} ${(keyTicketSelected.indexOf(`${wagonsSelected}|${newArr[i]}`) !== -1) ? 'et-sit-buying' : ''}`}><span ng-show="!seat.waiting" className="ng-binding">{newArr[i]}</span></div>
                                        </div>
                                        : (
                                            <div className="et-bed text-center et-sit-avaiable" onClick={() => {
                                                if (keyTicketSelected.indexOf(`${wagonsSelected}|${newArr[i]}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) {
                                                    removeTicket(newArr[i])
                                                } else {
                                                    addTicket(newArr[i], 0)
                                                }
                                            }}>
                                                <div className={`et-sit-no ng-scope ${(checkSeatsBuy('main', newArr[i]) === true) ? 'et-sit-bought' : ''} ${(keyTicketSelected.indexOf(`${wagonsSelected}|${newArr[i]}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) ? 'et-sit-buying' : ''}`}><span ng-show="!seat.waiting" className="ng-binding">{newArr[i]}</span></div>
                                            </div>
                                        )
                                }
                                <div className="et-bed-illu" />
                            </div>
                        </div>
                    </div>
                )

            }

        } else {
            let floor_1 = []
            let floor_2 = []
            let count = 0
            for (let i = 0; i < 28; i++) {
                if (count === 1 || count === 0) {
                    floor_1.push(i + 1)
                } else if (count === 2 || count === 3) {
                    floor_2.push(i + 1)
                }
                if (count === 3) {
                    count = 0
                } else {
                    count = count + 1
                }
            }
            const newArr = [...floor_2, ...floor_1]
            for (let i = 0; i < 28; i++) {
                if (i === 14) {
                    html.push(
                        <>
                            <div class="et-col-1-16 et-seat-h-35 ng-isolate-scope" seat="seatMap[46]" direct="direct">
                                <div class="et-bed-left ng-hide" ng-show="seat.Status">
                                    <div class="et-bed-outer">
                                        <div class="et-bed text-center" analytics-on="click" analytics-event="SelectTicket">
                                            <div class="et-sit-no ng-scope"><span ng-show="!seat.waiting" class="ng-binding"></span> </div>
                                        </div>
                                        <div class="et-bed-illu"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="et-col-1-16 et-seat-h-35 ng-isolate-scope" seat="seatMap[46]" direct="direct">
                                <div class="et-bed-left ng-hide" ng-show="seat.Status">
                                    <div class="et-bed-outer">
                                        <div class="et-bed text-center">
                                            <div class="et-sit-no ng-scope"><span ng-show="!seat.waiting" class="ng-binding"></span> </div>
                                        </div>
                                        <div class="et-bed-illu"></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                html.push(
                    <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" et-bed-left seat="seatMap[4]" direct="direct">
                        <div className={`et-bed-${i % 2 === 0 ? 'left' : 'right'}`} ng-show="seat.Status">
                            <div className="et-bed-outer">
                                <div className="et-bed text-center et-sit-avaiable" onClick={() => {
                                    if (wagonsSeat.indexOf(newArr[i]) === -1) {
                                        if (keyTicketSelected.indexOf(`${wagonsSelected}|${newArr[i]}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) {
                                            removeTicket(newArr[i])
                                        } else {
                                            addTicket(newArr[i])
                                        }
                                    }
                                }}>
                                    <div className={`et-sit-no ng-scope ${(checkSeatsBuy('main', newArr[i]) === true) ? 'et-sit-bought' : ''} ${(keyTicketSelected.indexOf(`${wagonsSelected}|${newArr[i]}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) ? 'et-sit-buying' : ''}`}><span ng-show="!seat.waiting" className="ng-binding">{newArr[i]}</span> <img src="/images/loading51.gif" ng-show="seat.waiting" className="ng-hide" /></div>
                                </div>
                                <div className="et-bed-illu" />
                            </div>
                        </div>
                    </div>
                )

            }
        }
        return html
    }

    const initDataTicket = (data) => {
        // console.log('=================<>', data);
        return {
            "train_code": data?.train.code,
            "train_station_title": data?.train_station.title,
            "train_station_to_title": data?.train_station_to.title,
            "train_station": data?.train_station._id,
            "train_station_to": data?.train_station_to._id,
            "departure_date": data?.departure_date,
            "return_day": data?.return_day,
            "info_customer": '',
            "email": "",
            "phone": "",
            "subject": "",
            "id_card": "",
            "train": data?.id,
            "wagons": data?.wagons,
            "seats": data?.seats,
            "type_seats": data?.type_seats,
            "price": 581000,
            "reduce_object": 0,
            "promotion": 0,
            "insurance": 1000,
            "total": 582000,
            "payments": 0
        }
    }

    useEffect(() => {
        // console.log('=================<data>', state?.dataReturn);
        // console.log('=================<kkkk>', state?.ticketSelected);
        // console.log('=================<statestate>', state?.objectKeyTrainStation);
        // console.log('=================<trainSelected>', trainSelected);
        // console.log('=================<itemSelected>', itemSelected);
        // console.log('=================<state?.dataReturn[itemSelected?.train._id][1]>', state?.dataReturn[itemSelected?.train._id][1]);
    }, [state, trainSelected, itemSelected])

    useEffect(() => {
        if (state && state?.dataReturn) {
            setItemSelected(state?.dataReturn[state?.objectKeyTrainStation[0]][0])
        }
    }, [state?.dataReturn])

    useEffect(() => {
        if (state?.dataReturn === undefined || state?.dataReturn === null) {
            history.push('/')
        }
    }, [])

    return (
        <>
            <div className="container et-main-content" ng-show="!bannerTet">
                <div data-ng-view className="shuffle-animation ng-scope" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                    <div ng-controller="searchResultController" className="ng-scope">
                        <div className="row et-content" style={{ marginRight: '-10px' }}>
                            <>
                                <div className="col-xs-12 col-sm-9 et-col-md-9">
                                    <div className="row et-page-header">
                                        <span className="et-main-label ng-binding">
                                            <strong className="ng-binding">Chiều về:</strong>
                                            &nbsp;ngày&nbsp;
                                            {itemSelected ? `${new Date(itemSelected?.departure_date).getDate()}/${new Date(itemSelected?.departure_date).getMonth() + 1}/${new Date(itemSelected?.departure_date).getFullYear()}` : 'N/A'}
                                            &nbsp;từ&nbsp;
                                            {itemSelected ? `${state?.dataReturn[itemSelected?.train._id][0].train_station.title} đến ${state?.dataReturn[itemSelected?.train._id][state?.dataReturn[itemSelected?.train._id].length - 1].train_station_to.title}` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="row et-train-list">
                                        <div className="previous-train et-col-md-1 text-center">
                                            <div className="et-pre-train ng-scope et-arrow-disabled" ng-class="{'et-arrow-disabled': !canShiftBack}" ng-click="chuyenTruoc(true)" tooltip="Tàu trước">
                                                <div className="et-arrow-left" />
                                            </div>
                                        </div>
                                        <div className="train-group">

                                            {
                                                state?.objectKeyTrainStation?.map((key, idTrain) => (
                                                    <div className="col-xs-4 col-sm-3 et-col-md-2 et-train-block ng-scope" onClick={() => {
                                                        setItemSelected(state?.dataReturn[key][0][0])
                                                        setTrainSelected(idTrain)
                                                    }}>
                                                        <div className={`et-train-head ${(idTrain === trainSelected) ? 'et-train-head-selected' : ''}`}>
                                                            <div className="row center-block" style={{ width: '40%', marginBottom: '3px' }}>
                                                                <div className="et-train-lamp text-center ng-binding" style={{ color: 'rgb(85, 85, 85)' }}>{state?.dataReturn[key][0].train.code}</div>
                                                            </div>
                                                            <div className="et-train-head-info">
                                                                <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">TG về</span> <span className="pull-right ng-binding">{`${new Date(state?.dataReturn[key][0].departure_date).getDate() < 10 ? ('0' + new Date(state?.dataReturn[key][0].departure_date).getDate()) : new Date(state?.dataReturn[key][0].departure_date).getDate()}/${(new Date(state?.dataReturn[key][0].departure_date).getMonth() + 1) < 10 ? ('0' + (new Date(state?.dataReturn[key][0].departure_date).getMonth() + 1)) : new Date(state?.dataReturn[key][0].departure_date).getMonth() + 1} ${new Date(state?.dataReturn[key][0].departure_date).getHours() < 10 ? ('0' + new Date(state?.dataReturn[key][0].departure_date).getHours()) : new Date(state?.dataReturn[key][0].departure_date).getHours()}:${new Date(state?.dataReturn[key][0].departure_date).getMinutes() < 10 ? ('0' + new Date(state?.dataReturn[key][0].departure_date).getMinutes()) : new Date(state?.dataReturn[key][0].departure_date).getMinutes()}`}</span></div>
                                                                <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">TG đến</span> <span className="pull-right" /> <span className="pull-right ng-binding">01/05 19:15</span></div>
                                                                <div className="row et-no-margin">
                                                                    <div className="et-col-50">
                                                                        <div className="et-text-sm ng-binding">SL chỗ đặt</div>
                                                                        <div className="et-text-large et-bold pull-left ng-binding" style={{ marginLeft: '5px' }}>{state?.dataReturn[key][0].block_seats}</div>
                                                                    </div>
                                                                    <div className="et-col-50 text-center">
                                                                        <div className="et-text-sm ng-binding">SL chỗ trống</div>
                                                                        <div className="et-text-large et-bold pull-right ng-binding" style={{ marginRight: '5px' }}>{state?.dataReturn[key][0].blank_seats}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row et-no-margin">
                                                                <div className="et-col-50"><span className="et-train-lamp-bellow-left" /></div>
                                                                <div className="et-col-50"><span className="et-train-lamp-bellow-right" /></div>
                                                            </div>
                                                        </div>
                                                        <div className="et-train-base" />
                                                        <div className="et-train-base-2" />
                                                        <div className="et-train-base-3" />
                                                        <div className="et-train-base-4" />
                                                        <div className="et-train-base-5" />
                                                    </div>
                                                ))
                                            }

                                            <div className="col-xs-4 col-sm-3 et-col-md-2 et-train-block et-train-block-none" style={{ display: 'none' }} ng-class="{'et-train-block-none':!tauDiAlias}" ng-click="showModalTauAlias(tauDiAlias, false)">
                                                <div className="et-train-head" style={{ backgroundColor: '#5f9ea0' }}>
                                                    <div className="row center-block" style={{ width: '40%', marginBottom: '3px' }}>
                                                        <div className="et-train-lamp text-center">***</div>
                                                    </div>
                                                    <div className="et-train-head-info">
                                                        <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">Ga về</span> <span className="pull-right ng-binding" /></div>
                                                        <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">Ga đến</span> <span className="pull-right ng-binding" /></div>
                                                        <div className="row et-no-margin">
                                                            <div className="et-col-100">
                                                                <div style={{ whiteSpace: 'normal', color: '#5a8eec' }} className="ng-binding">Bấm vào đây để tra tìm tàu về từ undefined đến undefined</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row et-no-margin">
                                                        <div className="et-col-50"><span className="et-train-lamp-bellow-left" /></div>
                                                        <div className="et-col-50"><span className="et-train-lamp-bellow-right" /></div>
                                                    </div>
                                                </div>
                                                <div className="et-train-base" />
                                                <div className="et-train-base-2" />
                                                <div className="et-train-base-3" />
                                                <div className="et-train-base-4" />
                                                <div className="et-train-base-5" />
                                            </div>
                                            <div className="next-train col-md-1 text-center pull-right">
                                                <div className="et-next-train ng-scope" ng-class="{'et-arrow-disabled': !canShiftForward}" ng-click="chuyenSau(true)" tooltip="Tàu sau">
                                                    <div className="et-arrow-right" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginLeft: '-10PX' }}>
                                        <div className="col-md-12 et-no-margin">
                                            {
                                                itemSelected
                                                    ? (
                                                        Object.keys(itemSelected?.wagons)?.reverse().map((wagons, index) => (
                                                            <div onClick={() => {
                                                                setWagonsSelected(Number(wagons))
                                                            }} className="et-car-block ng-scope" ng-repeat="toa in searchData.tauDi.ToaXes" tooltip="Giường nằm khoang 4 vềều hòa (An28LV)">
                                                                <div className={`et-car-icon et-car-icon-avaiable ${Number(wagons) === wagonsSelected ? 'et-car-icon-selected' : ''} ${(itemSelected?.wagons[wagons].extra_seat === 0 && itemSelected?.wagons[wagons].main_seat === 0) ? 'et-car-icon-sold-out' : ''}`} >
                                                                    <img src="/images/trainCar2.png" />
                                                                </div>
                                                                <div className="text-center text-info et-car-label ng-binding">{wagons}</div>
                                                            </div>
                                                        ))
                                                    ) : <></>
                                            }
                                            <div className="et-car-block">
                                                <div className="et-car-icon"><img src="/images/train2.png" /></div>
                                                <div className="text-center text-info et-car-label ng-binding">{itemSelected?.train.code}</div>
                                            </div>
                                            <div ng-show="searchData.tauDi.HasCheapTicket" className="text-center ng-binding ng-hide" style={{ color: '#bf8c01', cursor: 'pointer' }} ng-click="openTauGiaRe(searchData.tauDi, 0)">Tàu này đang có khuyến mại chỗ giá rẻ, bấm vào đây để xem chi tiết</div>
                                        </div>
                                        <div ng-show="searchData.toaDi.ToaXeGhiChu" className="clear ng-hide">
                                            <div className="alert alert-info text-center ng-binding" style={{ marginLeft: '20px', marginBottom: '0px' }} ng-bind-html="searchData.toaDi.ToaXeGhiChu" />
                                        </div>

                                        <et-car layout-id="searchData.toaDi.ToaXeLayout" ng-if="searchData.toaDi" seats="searchData.toaDi.Chos" direct={0} toa-dg="('ToaXeDienGiai_'+searchData.toaDi.ToaXeDienGiai)|translate" car-no="searchData.toaDi.ToaSo" className="ng-scope ng-isolate-scope">
                                            <div className="row et-car-floor-region ng-scope">
                                                <div className="col-xs-12 col-sm-12 col-md-12 text-center">

                                                    <h6 className="ng-binding">Toa số {wagonsSelected}: {itemSelected?.wagons[wagonsSelected].description}</h6>
                                                </div>
                                                <div className="et-col-5">
                                                    <div className="et-car-previous-floor text-center" ng-click="previousCar()">
                                                        &lt;
                                                    </div>
                                                </div>
                                                {
                                                    itemSelected
                                                        ? (
                                                            Number(itemSelected?.wagons[wagonsSelected].type) === 0
                                                                ? (
                                                                    <div className="et-col-90">
                                                                        <div className="row et-car-floor">
                                                                            <div className="et-car-door">
                                                                            </div>
                                                                            <div className="et-car-nm-64-half-block">
                                                                                <div className="et-full-width" style={{ marginLeft: '8px' }}>
                                                                                    {
                                                                                        new Array((Number(itemSelected?.wagons[wagonsSelected].default_main_seat))).fill(0).map((_, idx) => (
                                                                                            idx <= (Number(itemSelected?.wagons[wagonsSelected].default_main_seat)) / 2 - 1
                                                                                                ? (
                                                                                                    (idx + 1) === ((Number(itemSelected?.wagons[wagonsSelected].default_main_seat)) / 4)
                                                                                                        ? (
                                                                                                            <>

                                                                                                                <div className="et-car-nm-64-sit ng-isolate-scope" et-seat-right seat="seatMap[33]" direct="direct" style={Number(itemSelected?.wagons[wagonsSelected].default_main_seat) !== 64 ? { width: '13.5%' } : {}}>
                                                                                                                    <div className="et-car-seat-left et-seat-h-35" onClick={() => {
                                                                                                                        if (itemSelected?.wagons[wagonsSelected].main.indexOf(idx + 1) === -1) {
                                                                                                                            if (keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) {
                                                                                                                                removeTicket(idx + 1)
                                                                                                                            } else {
                                                                                                                                addTicket(idx + 1, 0)
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }}>
                                                                                                                        <div className="et-col-16 et-sit-side" />
                                                                                                                        <div className="et-col-84 et-sit-sur-outer">
                                                                                                                            <div className={`et-sit-sur text-center ${(checkSeatsBuy('main', idx + 1) === true) ? 'et-sit-bought' : ''}`}>
                                                                                                                                <div className={`et-sit-no ng-scope ${(keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) ? 'et-sit-buying' : ''}`}>
                                                                                                                                    <span ng-show="!seat.waiting" className="ng-binding">{idx + 1}</span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="et-car-way et-full-width" />
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            <>
                                                                                                                <div className="et-car-nm-64-sit ng-isolate-scope" et-seat-right seat="seatMap[33]" direct="direct" style={Number(itemSelected?.wagons[wagonsSelected].default_main_seat) !== 64 ? { width: '13.5%' } : {}}>
                                                                                                                    <div className="et-car-seat-left et-seat-h-35" onClick={() => {
                                                                                                                        if (itemSelected?.wagons[wagonsSelected].main.indexOf(idx + 1) === -1) {
                                                                                                                            if (keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) {
                                                                                                                                removeTicket(idx + 1)
                                                                                                                            } else {
                                                                                                                                addTicket(idx + 1, 0)
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }}>
                                                                                                                        <div className="et-col-16 et-sit-side" />
                                                                                                                        <div className="et-col-84 et-sit-sur-outer">
                                                                                                                            <div className={`et-sit-sur text-center ${(checkSeatsBuy('main', idx + 1) === true) ? 'et-sit-bought' : ''}`}>
                                                                                                                                <div className={`et-sit-no ng-scope ${(keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) ? 'et-sit-buying' : ''}`}>
                                                                                                                                    <span ng-show="!seat.waiting" className="ng-binding">{idx + 1}</span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </>
                                                                                                        )
                                                                                                ) : (
                                                                                                    <></>
                                                                                                )
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="et-car-seperator" ng-class="{'et-hidden': !seatMap[0].Status}">
                                                                                <div>
                                                                                </div>
                                                                                <div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="et-car-nm-64-half-block">
                                                                                <div className="et-full-width" style={{ marginLeft: '8px' }}>
                                                                                    {
                                                                                        new Array((Number(itemSelected?.wagons[wagonsSelected].default_main_seat)))?.fill(0)?.map((_, idx) => (
                                                                                            idx > (Number(itemSelected?.wagons[wagonsSelected].default_main_seat)) / 2 - 1
                                                                                                ? (
                                                                                                    (idx + 1) === ((Number(itemSelected?.wagons[wagonsSelected].default_main_seat)) / 4) * 3
                                                                                                        ? (
                                                                                                            <>
                                                                                                                <div className="et-car-nm-64-sit ng-isolate-scope" et-seat-right seat="seatMap[33]" direct="direct" style={Number(itemSelected?.wagons[wagonsSelected].default_main_seat) !== 64 ? { width: '13.5%' } : {}}>
                                                                                                                    <div className="et-car-seat-right et-seat-h-35" onClick={() => {
                                                                                                                        if (itemSelected?.wagons[wagonsSelected].main.indexOf(idx + 1) === -1) {
                                                                                                                            if (keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) {
                                                                                                                                removeTicket(idx + 1)
                                                                                                                            } else {
                                                                                                                                addTicket(idx + 1, 0)
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }}>
                                                                                                                        <div className="et-col-84 et-sit-sur-outer-invert">
                                                                                                                            <div className={`et-sit-sur-invert text-center ${(checkSeatsBuy('main', idx + 1) === true) ? 'et-sit-bought' : ''}`}>
                                                                                                                                <div className={`et-sit-no ng-scope ${(keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}`) !== -1) ? 'et-sit-buying' : ''}`}>
                                                                                                                                    <span ng-show="!seat.waiting" className="ng-binding">{idx + 1}</span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="et-col-16 et-sit-side" />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="et-car-way et-full-width" />
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            <>
                                                                                                                <div className="et-car-nm-64-sit ng-isolate-scope" et-seat-right seat="seatMap[33]" direct="direct" style={Number(itemSelected?.wagons[wagonsSelected].default_main_seat) !== 64 ? { width: '13.5%' } : {}}>
                                                                                                                    <div className="et-car-seat-right et-seat-h-35" onClick={() => {
                                                                                                                        if (itemSelected?.wagons[wagonsSelected].main.indexOf(idx + 1) === -1) {
                                                                                                                            if (keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) {
                                                                                                                                removeTicket(idx + 1)
                                                                                                                            } else {
                                                                                                                                addTicket(idx + 1, 0)
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }}>
                                                                                                                        <div className="et-col-84 et-sit-sur-outer-invert">
                                                                                                                            <div className={`et-sit-sur-invert text-center ${(checkSeatsBuy('main', idx + 1) === true) ? 'et-sit-bought' : ''}`}>
                                                                                                                                <div className={`et-sit-no ng-scope ${(keyTicketSelected.indexOf(`${wagonsSelected}|${idx + 1}|${state?.ticketSelected[itemSelected.train._id]}`) !== -1) ? 'et-sit-buying' : ''}`}>
                                                                                                                                    <span ng-show="!seat.waiting" className="ng-binding">{idx + 1}</span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="et-col-16 et-sit-side" />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </>
                                                                                                        )
                                                                                                ) : (
                                                                                                    <></>
                                                                                                )
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="et-car-door">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : <div className="et-col-90">
                                                                    <div className="et-full-width et-car-loading ng-hide" ng-show="!seatMap[0].Status">
                                                                        <div className="row text-capitalize text-center"><img src="/images/loading51.gif" style={{ width: '20px', height: '20px' }} /></div>
                                                                        <div className="row text-center"><span className="ng-binding">Đang tải thông tin toa</span></div>
                                                                    </div>
                                                                    <div className="row et-car-floor">
                                                                        <div className="et-col-1-18 et-car-floor-full-height" style={{ width: '13%' }}>
                                                                            <div className="et-bed-way et-full-width" />
                                                                            {
                                                                                itemSelected?.wagons[wagonsSelected].default_main_seat === 42
                                                                                    ? <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 3</div>
                                                                                    : <></>
                                                                            }
                                                                            <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 2</div>
                                                                            <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 1</div>
                                                                        </div>
                                                                        <div className="et-col-8-9">
                                                                            <div className="et-bed-way et-full-width et-text-sm">
                                                                                <div className="et-col-1-8 text-center ng-binding" ng-class="{'et-hidden': !seatMap[0].Status}">Khoang 1</div>
                                                                                <div className="et-col-1-8 text-center ng-binding" ng-class="{'et-hidden': !seatMap[6].Status}">Khoang 2</div>
                                                                                <div className="et-col-1-8 text-center ng-binding" ng-class="{'et-hidden': !seatMap[12].Status}">Khoang 3</div>
                                                                                <div className="et-col-1-8 text-center ng-binding" ng-class="{'et-hidden': !seatMap[18].Status}">Khoang 4</div>
                                                                                <div className="et-col-1-8 text-center ng-binding" ng-class="{'et-hidden': !seatMap[24].Status}">Khoang 5</div>
                                                                                <div className="et-col-1-8 text-center ng-binding" ng-class="{'et-hidden': !seatMap[30].Status}">Khoang 6</div>
                                                                                <div className="et-col-1-8 text-center ng-binding" ng-class="{'et-hidden': !seatMap[36].Status}">Khoang 7</div>
                                                                                <div className="et-col-1-8 text-center ng-binding et-hidden" ng-class="{'et-hidden': !seatMap[42].Status}">Khoang 8</div>
                                                                            </div>
                                                                            {
                                                                                generateSeats(itemSelected?.wagons[wagonsSelected].default_main_seat, state?.dataReturn[itemSelected?.train._id]).map((html) => (
                                                                                    html
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        ) : <></>
                                                }
                                                <div className="et-col-5">
                                                    <div className="et-car-next-floor text-center" ng-click="nextCar()">
                                                        &gt;
                                                    </div>
                                                </div>
                                                <div className="et-col-md-12 text-center" ng-show="altSeats.length > 0">
                                                    <h6 className="ng-binding">

                                                    </h6>
                                                </div>
                                                <div className="et-col-5">
                                                </div>
                                                <div className="et-col-90">

                                                    {
                                                        itemSelected
                                                            ? (
                                                                new Array((Number(itemSelected?.wagons[wagonsSelected].default_extra_seat))).fill(0).map((_, idx) => (
                                                                    <div className="et-col-1-20 ng-scope" ng-repeat="seat in altSeats" ng-class="{'et-hidden': !seat.Status}">
                                                                        <div className="et-car-nc-80-sit-left">
                                                                            <div className="et-col-16 et-sit-side" />
                                                                            <div className="et-col-84 et-car-nc-80-sit-outer">
                                                                                <div className={`et-car-nc-80-sit-sur text-center ${(checkSeatsBuy('extra', idx + 1) === true) ? 'et-sit-blocked' : ''}`} analytics-on="click" analytics-event="SelectTicket" ng-click="buyTicket(seat, direct)">
                                                                                    <div className="et-sit-no ng-scope">
                                                                                        <span ng-show="!seat.waiting" className="ng-binding">
                                                                                            GP
                                                                                        </span>
                                                                                        <img src="/images/loading51.gif" ng-show="seat.waiting" className="ng-hide" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : <></>
                                                    }

                                                </div>
                                                <div className="et-col-5">
                                                </div>
                                            </div>
                                        </et-car>

                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}