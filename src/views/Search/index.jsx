import React, { useEffect, useState } from "react";
import Regulation from "../../components/Regulation";
import { useHookTrainStation } from "../../state/trainStation";
import { useHistory } from 'react-router-dom'
import ReturnTicket from './returnTickets'
import { useHookDataTicket } from '../../state/ticket'

export default function Search() {
    const history = useHistory()
    const [stateT, actionsT] = useHookDataTicket()
    const [state, actions] = useHookTrainStation()
    const [wagonsSelected, setWagonsSelected] = useState(1)
    // const [ticketSelected, setTicketSelected] = useState([])
    const [keyTicketSelected, setKeyTicketSelected] = useState([])
    const [itemSelected, setItemSelected] = useState(undefined)
    const [trainSelected, setTrainSelected] = useState(0)

    const addTicket = (seats, typeSeats) => {
        const newData = []
        for (let i = 0; i < state?.data[itemSelected.train._id].length; i++) {
            newData.push(initDataTicket({
                id: state?.data[itemSelected.train._id][i]?._id,
                train: state?.data[itemSelected.train._id][i]?.train,
                train_station: state?.data[itemSelected.train._id][i]?.train_station,
                train_station_to: state?.data[itemSelected.train._id][i]?.train_station_to,
                departure_date: state?.data[itemSelected.train._id][i]?.departure_date,
                return_day: state?.data[itemSelected.train._id][i]?.arrival_date,
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
        for (let i = 0; i < state?.data[itemSelected?.train._id].length; i++) {
            if (state?.data[itemSelected?.train._id][i].wagons[wagonsSelected][type].indexOf(seats) !== -1) {
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
        // console.log('=================<data>', state?.data);
        // console.log('=================<kkkk>', state?.ticketSelected);
        // console.log('=================<statestate>', state?.objectKeyTrainStation);
        // console.log('=================<trainSelected>', trainSelected);
        // console.log('=================<itemSelected>', itemSelected);
        // console.log('=================<state?.data[itemSelected?.train._id][1]>', state?.data[itemSelected?.train._id][1]);
    }, [state, trainSelected, itemSelected])

    useEffect(() => {
        if (state && state?.data) {
            setItemSelected(state?.data[state?.objectKeyTrainStation[0]][0])
        }
    }, [state?.data])

    useEffect(() => {
        if (state?.data === undefined || state?.data === null) {
            history.push('/')
        }
    }, [])

    return (
        <>
            <div className="adv-left">
                <a target="_blank" href="http://www.vr.com.vn/cam-nang-di-tau/khuyen-cao-khach-hang-chu-y-khi-mua-ve-truc-tuyen.html">
                    <img src="images/dsvn1.jpg" />
                </a>
            </div>
            <div className="container et-main-content" ng-show="!bannerTet">
                <div className="marquee">
                    <div style={{ width: '100000px', marginLeft: '992px', animation: '15s linear 1s infinite normal none running marqueeAnimation-7958023' }} className="js-marquee-wrapper">
                        <div className="js-marquee" style={{ marginRight: '0px', float: 'left' }} />
                    </div>
                </div>

                <div data-ng-view className="shuffle-animation ng-scope" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                    <div ng-controller="searchResultController" className="ng-scope">
                        <div className="row et-content" style={{ marginRight: '-10px' }}>
                            <>
                                <div className="col-xs-12 col-sm-9 et-col-md-9">
                                    <div className="row et-page-header">
                                        <span className="et-main-label ng-binding">
                                            <strong className="ng-binding">Chiều đi:</strong>
                                            &nbsp;ngày&nbsp;
                                            {itemSelected ? `${new Date(itemSelected?.departure_date).getDate()}/${new Date(itemSelected?.departure_date).getMonth() + 1}/${new Date(itemSelected?.departure_date).getFullYear()}` : 'N/A'}
                                            &nbsp;từ&nbsp;
                                            {itemSelected ? `${state?.data[itemSelected?.train._id][0].train_station.title} đến ${state?.data[itemSelected?.train._id][state?.data[itemSelected?.train._id].length - 1].train_station_to.title}` : 'N/A'}
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
                                                        setItemSelected(state?.data[key][0][0])
                                                        setTrainSelected(idTrain)
                                                    }}>
                                                        <div className={`et-train-head ${(idTrain === trainSelected) ? 'et-train-head-selected' : ''}`}>
                                                            <div className="row center-block" style={{ width: '40%', marginBottom: '3px' }}>
                                                                <div className="et-train-lamp text-center ng-binding" style={{ color: 'rgb(85, 85, 85)' }}>{state?.data[key][0].train.code}</div>
                                                            </div>
                                                            <div className="et-train-head-info">
                                                                <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">TG đi</span> <span className="pull-right ng-binding">{`${new Date(state?.data[key][0].departure_date).getDate() < 10 ? ('0' + new Date(state?.data[key][0].departure_date).getDate()) : new Date(state?.data[key][0].departure_date).getDate()}/${(new Date(state?.data[key][0].departure_date).getMonth() + 1) < 10 ? ('0' + (new Date(state?.data[key][0].departure_date).getMonth() + 1)) : new Date(state?.data[key][0].departure_date).getMonth() + 1} ${new Date(state?.data[key][0].departure_date).getHours() < 10 ? ('0' + new Date(state?.data[key][0].departure_date).getHours()) : new Date(state?.data[key][0].departure_date).getHours()}:${new Date(state?.data[key][0].departure_date).getMinutes() < 10 ? ('0' + new Date(state?.data[key][0].departure_date).getMinutes()) : new Date(state?.data[key][0].departure_date).getMinutes()}`}</span></div>
                                                                <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">TG đến</span> <span className="pull-right" /> <span className="pull-right ng-binding">01/05 19:15</span></div>
                                                                <div className="row et-no-margin">
                                                                    <div className="et-col-50">
                                                                        <div className="et-text-sm ng-binding">SL chỗ đặt</div>
                                                                        <div className="et-text-large et-bold pull-left ng-binding" style={{ marginLeft: '5px' }}>{state?.data[key][0].block_seats}</div>
                                                                    </div>
                                                                    <div className="et-col-50 text-center">
                                                                        <div className="et-text-sm ng-binding">SL chỗ trống</div>
                                                                        <div className="et-text-large et-bold pull-right ng-binding" style={{ marginRight: '5px' }}>{state?.data[key][0].blank_seats}</div>
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
                                                        <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">Ga đi</span> <span className="pull-right ng-binding" /></div>
                                                        <div className="row et-no-margin"><span className="pull-left et-bold ng-binding">Ga đến</span> <span className="pull-right ng-binding" /></div>
                                                        <div className="row et-no-margin">
                                                            <div className="et-col-100">
                                                                <div style={{ whiteSpace: 'normal', color: '#5a8eec' }} className="ng-binding">Bấm vào đây để tra tìm tàu đi từ undefined đến undefined</div>
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
                                                            }} className="et-car-block ng-scope" ng-repeat="toa in searchData.tauDi.ToaXes" tooltip="Giường nằm khoang 4 điều hòa (An28LV)">
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
                                                                                generateSeats(itemSelected?.wagons[wagonsSelected].default_main_seat, state?.data[itemSelected?.train._id]).map((html) => (
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
                                    <div ng-show="searchData.toaDi.ToaXe=='CD' ||searchData.toaDi.ToaXe=='CDL'" className="ng-hide">
                                        <div className="alert alert-info text-center ng-binding" ng-bind-html="'PSearchResult_dienGiaiToaXeCD'|translate">
                                            <div>Lưu ý: Chỗ ngồi được chuyển đổi từ giường tầng 1 khoang 4 giường có điều hoà.</div>
                                            <div>(01 giường dành 03 chỗ cho 03 hành khách)</div>
                                        </div>
                                    </div>
                                    <div ng-show="searchData.toaDi.ToaXe=='An24LV2'" className="ng-hide">
                                        <div className="alert alert-info text-center">
                                            <div className="row">
                                                <div className="col-md-3"><img src="/images/phong2giuong.jpg" /></div>
                                                <div className="col-md-9 ng-binding" ng-bind-html="'PSearchResult_dienGiaiToaXeGiuongVip'|translate">Toa xe giường nằm có khoang số 3 &amp; 4 là khoang 2 giường đặc biệt: rộng rãi, thoải mái tiện nghi hiện đại</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div ng-show="searchData.tauDi.ListThongBao.length > 0" className="alert alert-success text-left ng-hide">
                                        <p ng-bind-html="searchData.tauDi.ListThongBao" className="ng-binding" />
                                    </div>
                                    <div ng-show="searchData.avaiableDichVus[searchData.tauDi.Key]&&searchData.avaiableDichVus[searchData.tauDi.Key].length>0" className="ng-hide">
                                        <h4 style={{ marginTop: '0px' }} className="ng-binding">Chúng tôi cung cấp các dịch vụ để quý khách chọn mua kèm dưới đây</h4>
                                        <table className="table table-bordered table-hover">
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-12" style={{ marginLeft: '-15px', marginBottom: '15px' }}><a className="list-ticket-mobile" style={{ display: 'none' }} ng-click="chuThichToaChoNgoi()"><strong style={{ fontWeight: 'bold', fontSize: '14px' }}>Trạng thái toa-chỗ &gt;&gt;</strong></a></div>
                                    <div className="row" ng-show="tauDiKhuyenMaiInfos&&tauDiKhuyenMaiInfos.length>0">
                                        <div className="col-md-12">
                                            <h4 style={{ marginTop: '0px' }} className="ng-binding">Khuyến mại cho chiều đi</h4>
                                            <table className="table table-striped table-bordered table-hover">
                                                <thead className="table-row-header">
                                                    <tr>
                                                        <th className="col-md-6 ng-binding" style={{ verticalAlign: 'middle', width: '50%' }}>Nội dung</th>
                                                        <th className="col-md-6 ng-binding" style={{ verticalAlign: 'middle', width: '50%' }}>Chi tiết</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr data-ng-repeat="item in tauDiKhuyenMaiInfos" className="ng-scope">
                                                        <td className="text-left ng-binding">Thời gian áp dụng chương trình từ 25/03/22 đến 03/05/22. Giảm giá vé khứ hồi chiều về theo VB 283/VTSG theo Mục II, điểm 5</td>
                                                        <td className="text-left ng-binding">Giảm 05% giá vé khi mua vé khứ hồi lượt về</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {
                                        stateT?.data?.roundTrip === true
                                        ? <ReturnTicket />
                                        : <></>
                                    }
                                    <div className="et-col-md-12 table-bordered list-ticket-deskhop" style={{ marginTop: '20px', padding: '5px' }}>
                                        <div className="et-col-md-12">
                                            <div className="et-col-md-4 et-no-padding">
                                                <div className="et-col-md-12">
                                                    <div className="et-col-md-12" style={{ padding: '0px' }}>
                                                        <div className="et-col-md-12" style={{ padding: '6px 0px 0px 0px' }}>
                                                            <div className="et-car-block" style={{ height: '36px' }}>
                                                                <div className="et-car-icon et-car-icon-avaiable"><img src="/images/trainCar2.png" /></div>
                                                            </div>
                                                            <span style={{ paddingLeft: '6px' }} className="ng-binding">Toa còn vé</span>
                                                        </div>
                                                    </div>
                                                    <div className="et-col-md-12 text-center et-no-padding ng-binding" style={{ marginTop: '-20px', display: 'none' }}>Toa còn vé</div>
                                                </div>
                                            </div>
                                            <div className="et-col-md-3 et-no-padding" style={{ display: 'none' }}>
                                                <div className="et-col-md-12">
                                                    <div className="et-col-md-12" style={{ padding: '0px' }}>
                                                        <div className="et-col-md-12" style={{ padding: '6px 0px 0px 0px' }}>
                                                            <div className="et-car-block" style={{ height: '36px' }}>
                                                                <div className="et-car-icon et-car-icon-full"><img src="/images/trainCar2.png" /></div>
                                                            </div>
                                                            <span style={{ paddingLeft: '6px' }} className="ng-binding">Toa chưa bán</span>
                                                        </div>
                                                    </div>
                                                    <div className="et-col-md-12 et-no-padding text-center ng-binding" style={{ marginTop: '-20px', display: 'none' }}>Toa chưa bán</div>
                                                </div>
                                            </div>
                                            <div className="et-col-md-4 et-no-padding">
                                                <div className="et-col-md-12">
                                                    <div className="et-col-md-12" style={{ padding: '0px' }}>
                                                        <div className="et-col-md-12" style={{ padding: '6px 0px 0px 0px' }}>
                                                            <div className="et-car-block" style={{ height: '36px' }}>
                                                                <div className="et-car-icon et-car-icon-selected"><img src="/images/trainCar2.png" /></div>
                                                            </div>
                                                            <span style={{ paddingLeft: '6px' }} className="ng-binding">Toa đang chọn</span>
                                                        </div>
                                                    </div>
                                                    <div className="et-col-md-12 et-no-padding text-center ng-binding" style={{ marginTop: '-20px', display: 'none' }}>Toa đang chọn</div>
                                                </div>
                                            </div>
                                            <div className="et-col-md-4 et-no-padding">
                                                <div className="et-col-md-12">
                                                    <div className="et-col-md-12" style={{ padding: '0px' }}>
                                                        <div className="et-col-md-12" style={{ padding: '6px 0px 0px 0px' }}>
                                                            <div className="et-car-block" style={{ height: '36px' }}>
                                                                <div className="et-car-icon et-car-icon-sold-out"><img src="/images/trainCar2.png" /></div>
                                                            </div>
                                                            <span style={{ paddingLeft: '6px' }} className="ng-binding">Toa hết vé</span>
                                                        </div>
                                                    </div>
                                                    <div className="et-col-md-12 text-center et-no-padding ng-binding" style={{ marginTop: '-20px', display: 'none' }}>Toa hết vé</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="et-col-md-12 table-bordered" />
                                        <div className="et-col-md-12 et-legend" style={{ padding: '0px' }}>
                                            <div className="et-col-md-4" style={{ padding: '0px' }}>
                                                <div className="et-col-md-4" style={{ padding: '0px' }}>
                                                    <div className="row">
                                                        <div className="et-car-nm-64-sit et-col-md-6" style={{ paddingRight: '0px' }}>
                                                            <div className="et-col-16 et-sit-side" />
                                                            <div className="et-col-64 et-sit-sur-outer">
                                                                <div className="et-sit-sur text-center" />
                                                            </div>
                                                        </div>
                                                        <div className="et-bed-left et-col-md-3 et-no-padding" style={{ width: '30%' }}>
                                                            <div className="et-bed-outer">
                                                                <div className="et-bed text-center" />
                                                                <div className="et-bed-illu" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-col-md-8" style={{ padding: '0px' }}>
                                                    <div className="et-legend-label ng-binding" style={{ marginLeft: '-6px' }}>Chỗ trống</div>
                                                </div>
                                            </div>
                                            <div className="et-col-md-4" style={{ padding: '0px' }}>
                                                <div className="et-col-md-4" style={{ padding: '0px' }}>
                                                    <div className="row">
                                                        <div className="et-car-nm-64-sit et-col-md-6" style={{ paddingRight: '0px' }}>
                                                            <div className="et-col-16 et-sit-side" />
                                                            <div className="et-col-64 et-sit-sur-outer">
                                                                <div className="et-sit-sur text-center et-sit-longer" />
                                                            </div>
                                                        </div>
                                                        <div className="et-bed-left et-col-md-3 et-no-padding" style={{ width: '30%' }}>
                                                            <div className="et-bed-outer">
                                                                <div className="et-bed text-center et-sit-longer" />
                                                                <div className="et-bed-illu" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-col-md-8" style={{ padding: '0px' }}>
                                                    <div className="et-legend-label ng-binding" style={{ marginLeft: '-6px' }}>Chỗ chặng dài hơn</div>
                                                </div>
                                            </div>
                                            <div className="et-col-md-4" style={{ padding: '0px' }}>
                                                <div className="et-col-md-4" style={{ padding: '0px' }}>
                                                    <div className="row">
                                                        <div className="et-car-nm-64-sit et-col-md-6" style={{ paddingRight: '0px' }}>
                                                            <div className="et-col-16 et-sit-side" />
                                                            <div className="et-col-64 et-sit-sur-outer">
                                                                <div className="et-sit-sur text-center et-sit-blocked" />
                                                            </div>
                                                        </div>
                                                        <div className="et-bed-left et-col-md-3 et-no-padding" style={{ width: '30%' }}>
                                                            <div className="et-bed-outer">
                                                                <div className="et-bed text-center et-sit-blocked" />
                                                                <div className="et-bed-illu" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-col-md-8" style={{ padding: '0px' }}>
                                                    <div className="et-legend-label ng-binding" style={{ marginLeft: '-6px' }}>Chỗ đã bán, không bán</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            <div className="col-xs-12 col-sm-3 et-col-md-3 part-right">
                                <div et-ticket-pocket className="ng-isolate-scope">
                                    <div className="col-md-12 et-widget" id="ticketPocket" style={{ paddingBottom: '8px' }}>
                                        <div className="row et-widget-header"><img src="/images/widgetIcon.png" /><span><strong className="ng-binding">Giỏ vé</strong></span></div>
                                        <div className="row">
                                            <div className="col-md-12 text-center" ng-show="searchData.ves.chieuDi.length == 0 && searchData.ves.chieuVe.length == 0">

                                                {
                                                    state?.ticketSelected.map((itemSlt, indexSlt) => (
                                                        <div className="col-md-12 et-ticket-info ng-scope">
                                                            <div className="et-col-84">
                                                                <div className="ng-binding">{itemSlt[0].train_code} {itemSlt[0].train_station_title}-{itemSlt[itemSlt.length - 1].train_station_to.title}</div>
                                                                <div className="ng-binding">{`${new Date(itemSlt[0].departure_date).getDate() < 10 ? ('0' + new Date(itemSlt[0].departure_date).getDate()) : new Date(itemSlt[0].departure_date).getDate()}/${(new Date(itemSlt[0].departure_date).getMonth() + 1) < 10 ? ('0' + (new Date(itemSlt[0].departure_date).getMonth() + 1)) : new Date(itemSlt.departure_date).getMonth() + 1} ${new Date(itemSlt[0].departure_date).getHours() < 10 ? ('0' + new Date(itemSlt[0].departure_date).getHours()) : new Date(itemSlt[0].departure_date).getHours()}:${new Date(itemSlt[0].departure_date).getMinutes() < 10 ? ('0' + new Date(itemSlt[0].departure_date).getMinutes()) : new Date(itemSlt[0].departure_date).getMinutes()}`}</div>
                                                                <div className="ng-binding">toa {itemSlt[0].wagons} chỗ {itemSlt[0].seats}</div>
                                                            </div>
                                                            <div className="et-col-16 text-center et-sit-no" style={{ height: '42px' }}>
                                                                <a className="et-btn-cancel" onClick={() => {
                                                                    const tS = state?.ticketSelected
                                                                    tS.splice(indexSlt, 1)
                                                                    actions.setTicketSelected([...tS])
                                                                    const kTS = keyTicketSelected
                                                                    kTS.splice(indexSlt, 1)
                                                                    setKeyTicketSelected([...kTS])
                                                                }} />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="col-md-12 text-center ng-hide" ng-show="searchData.ves.chieuDi.length > 0 || searchData.ves.chieuVe.length > 0">
                                                <h6 className="ng-binding">Chiều đi</h6>
                                            </div>

                                            <div className="col-md-12 text-center ng-hide" ng-show="searchData.ves.chieuVe.length > 0">
                                                <h6 className="ng-binding">Chiều về</h6>
                                            </div>

                                        </div>
                                        <div className="col-md-12 text-center" style={{ marginTop: '2px' }}>
                                            {
                                                (state?.ticketSelected.length > 0)
                                                    ? <a id="btnCheckOut" target="_blank" onClick={() => history.push('/thanhtoan')} className="btn btn-sm et-btn ng-binding">Mua vé</a>
                                                    : <></>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div et-social className="ng-isolate-scope">
                                    <div className="col-md-12 et-widget" style={{ paddingBottom: '5px' }}>
                                        <div className="text-center text-info" style={{ marginTop: '5px', marginBottom: '5px' }} ng-show="!doneCount">
                                            <strong style={{ fontSize: '13px' }} className="ng-binding">
                                                Kết nối với chúng tôi
                                            </strong>
                                        </div>
                                        <div className="text-center">
                                            <a href="http://facebook.com/muavetau" target="_blank"><img src="/images/facebook.png" style={{ width: '32px', height: '32px' }} /></a>
                                            <a href="http://youtube.com/muavetau" target="_blank"><img src="/images/icon-youtube.png" style={{ width: '32px', height: '32px' }} /></a>
                                            <a href="http://hoivien.dsvn.vn" target="_blank"><img src="/images/Member.png" style={{ width: '32px', height: '32px' }} /></a>
                                        </div>
                                        <div className="text-center">
                                            <a href="http://vr.com.vn" target="_blank"><img src="/images/banner-vr.com.vn.png" style={{ width: '194px', height: '80px', marginTop: '6px', border: 'solid 1px #929292' }} /></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 et-widget" style={{ paddingBottom: '5px' }}>
                                        <div className="text-center text-info" style={{ marginTop: '5px', marginBottom: '5px' }} ng-show="!doneCount">
                                            <strong style={{ fontSize: '13px' }} className="ng-binding">
                                                Kết nối với Cty VTHN
                                            </strong>
                                        </div>
                                        <div className="text-center">
                                            <a href="https://www.facebook.com/congtyvantaiduongsathanoi" target="_blank"><img src="/images/icon-ksg-facebook.png" style={{ width: '32px', height: '32px' }} /></a>
                                            &nbsp;
                                            <a href="http://www.vantaiduongsathanoi.vn" target="_blank"><img src="/images/icon-ksg-website.png" style={{ width: '32px', height: '32px' }} /></a>
                                            &nbsp;
                                            <a href="tel:19000109"><img src="/images/phone-hn.png" style={{ width: '100px', height: '32px' }} /></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 et-widget" style={{ paddingBottom: '5px' }}>
                                        <div className="text-center text-info" style={{ marginTop: '5px', marginBottom: '5px' }} ng-show="!doneCount">
                                            <strong style={{ fontSize: '13px' }} className="ng-binding">
                                                Kết nối với Cty VTSG
                                            </strong>
                                        </div>
                                        <div className="text-center">
                                            <a href="http://facebook.com/duongsatsg" target="_blank"><img src="/images/icon-ksg-facebook.png" style={{ width: '32px', height: '32px' }} /></a>
                                            &nbsp;
                                            <a href="http://saigonrailway.com.vn" target="_blank"><img src="/images/icon-ksg-website.png" style={{ width: '32px', height: '32px' }} /></a>
                                            &nbsp;
                                            <a href="tel:19001520"><img src="/images/phone-sg.png" style={{ width: '100px', height: '32px' }} /></a>
                                        </div>
                                    </div>
                                </div>
                                <div et-hoadon className="ng-isolate-scope">
                                    <div className="col-md-12 et-widget" ng-show="!doneCount" style={{ paddingBottom: '4px' }}>
                                        <div className="text-center text-info" style={{ marginTop: '5px', marginBottom: '5px' }}>
                                            <strong>Tra cứu hóa đơn</strong>
                                        </div>
                                        <div className="text-justify text-primary" style={{ marginTop: '5px', marginBottom: '5px' }}>
                                            Để tra cứu hóa đơn điện tử, quý khách hàng vui lòng <strong><a href="javascript:;" ng-click="viewPopupHoaDon()">bấm vào đây</a></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Regulation />
            </div>
            <div className="adv-right">
                <a target="_blank" href="http://www.vr.com.vn/">
                    <img src="images/dsvn2.jpg" />
                </a>
            </div>
        </>
    )
}