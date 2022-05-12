// eslint-disable-next-line no-restricted-globals
import React, { useState, useEffect } from 'react'
import Regulation from '../../components/Regulation'
import useTicket from "../../hooks/useTicket";
import useReturnTicket from '../../hooks/useReturnTicket'

export default function Trave() {
    const [code, setCode] = useState('')
    const [phone, setPhone] = useState('')
    const { getTicket } = useTicket()
    const [data, setData] = useState([])
    const [key, setKey] = useState([])
    const { postReturnTicket } = useReturnTicket()

    const getTickets = async () => {
        let array = []
        if (code !== '') {
            array.push({
                name: 'code',
                value: code
            })
        }
        if (phone !== '') {
            array.push({
                name: 'phone',
                value: phone
            })
        }
        await getTicket(array).then(res => {
            setData(res)
            setKey(Object.keys(res))
        })
    }

    const formatTime = (time) => {
        if (time < 10) {
            return '0' + time
        }
        return time
    }

    const returnTicket = async (data) => {
        if (window.confirm('Bạn có chắc chắn muốn gửi yêu cầu hủy vé tàu?\nVé của bạn sẽ không được phục hồi.')) {
            let arr = []
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i]._id)
            }
            const dataRequest = {
                ticket: arr,
                code: data[0].code,
                id_card: data[0].id_card,
                phone: data[0].phone
            }
            await postReturnTicket(dataRequest)
            getTickets()
        }
    }

    return (
        <>
            <div>
                <div className="adv-left">
                    <a target="_blank" href="http://www.vr.com.vn/cam-nang-di-tau/khuyen-cao-khach-hang-chu-y-khi-mua-ve-truc-tuyen.html">
                        <img src="images/dsvn1.jpg" />
                    </a>
                </div>
                <div className="text-center text-primary ng-binding ng-hide" ng-show="!loadedSettings" ng-bind-html="'Error_SystemLoading'|translate">Hệ thống đang tải dữ liệu, vui lòng đợi trong giây lát...</div>
                <div className="container et-main-content" ng-show="!bannerTet">
                    <div className="marquee">
                        <div style={{ width: '100000px', marginLeft: '992px', animation: '15s linear 1s infinite normal none running marqueeAnimation-574916' }} className="js-marquee-wrapper"><div className="js-marquee" style={{ marginRight: '0px', float: 'left' }} /></div>
                    </div>
                    {/* ngView:  */}
                    <div data-ng-view className="shuffle-animation ng-scope" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                        <div ng-controller="sts.controllers.returnticket.traveonline" ng-keypress="onEnter($event)" className="ng-scope">
                            {/* <div className="row et-step-bar list-ticket-desktop" id="divNhapThongTin">
                                <div className="row">
                                    <div className="et-col-md-3 text-center">
                                        <img ng-show="step === 1" src="/images/activeStep.png" className />
                                        <img ng-show="step !== 1" src="/images/inActiveStep.png" className="ng-hide" />
                                    </div>
                                    <div className="et-col-md-3 text-center">
                                        <img ng-show="step === 2" src="/images/activeStep.png" className="ng-hide" />
                                        <img ng-show="step !== 2" src="/images/inActiveStep.png" className />
                                    </div>
                                    <div className="et-col-md-3 text-center">
                                        <img ng-show="step === 3" src="/images/activeStep.png" className="ng-hide" />
                                        <img ng-show="step !== 3" src="/images/inActiveStep.png" className />
                                    </div>
                                    <div className="et-col-md-3 text-center">
                                        <img ng-show="step === 4" src="/images/activeStep.png" className="ng-hide" />
                                        <img ng-show="step !== 4" src="/images/inActiveStep.png" className />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="et-col-md-3 text-center text-info" ng-class="{'text-info': step === 1}">
                                        <span className="ng-binding">Chọn vé trả</span>
                                    </div>
                                    <div className="et-col-md-3 text-center" ng-class="{'text-info': step === 2}">
                                        <span className="ng-binding">Xác nhận</span>
                                    </div>
                                    <div className="et-col-md-3 text-center" ng-class="{'text-info': step === 3}">
                                        <span className="ng-binding">Trả vé</span>
                                    </div>
                                    <div className="et-col-md-3 text-center" ng-class="{'text-info': step === 4}">
                                        <span className="ng-binding">Hoàn tất</span>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-md-12 hidden-print">
                                <div className="row et-page-header">
                                    <span className="et-main-label ng-binding">TRẢ VÉ TRỰC TUYẾN{/*TRẢ VÉ TRỰC TUYẾN*/}</span>
                                </div>
                            </div>
                            {/* step1 - input */}
                            <div ng-show="step == 1" className>
                                <div className="col-md-12">
                                    <div>
                                        <p className="alert alert-info">
                                            Trả vé trực tuyến chỉ áp dụng với trường hợp khách hàng đã thanh toán trực tuyến (qua cổng thanh toán, ví điện tử, app ngân hàng) và có điền email khi mua vé.
                                            <br />
                                            Nếu quý khách thanh toán bằng tiền mặt, atm, chuyển khoản hoặc trả vé khi có sự cố bãi bỏ tàu vui lòng thực hiện thủ tục tại các nhà ga, đại lý bán vé.
                                        </p>
                                    </div>
                                    <label className="ng-binding">Để hiển thị các vé cần trả, vui lòng điền chính xác 2 thông tin dưới đây :{/*Để hiển thị các vé cần trả, vui lòng điền chính xác 3 thông tin dưới đây.*/}</label>
                                </div>
                                <div className="col-md-12 hidden-print">
                                    <div className="et-col-md-12">
                                        <span className="et-error-label clearfix ng-binding ng-hide" ng-show="bookingCodeError">Mã đặt chỗ không hợp lệ{/*Mã đặt chỗ không hợp lệ*/}</span>
                                        <span className="et-error-label clearfix ng-binding ng-hide" ng-show="emailError">Email không hợp lệ{/*Email không hợp lệ*/}</span>
                                        <span className="et-error-label clearfix ng-binding ng-hide" ng-show="mobileError">Điện thoại không hợp lệ{/*Số điện thoại không hợp lệ*/}</span>
                                    </div>
                                </div>
                                <div className="col-md-12 hidden-print form-horizontal" style={{ width: '99%' }}>
                                    <div>
                                        <div className="row form-group">
                                            <label className="col-xs-4 col-sm-3 control-label ng-binding">{/*Mã đặt chỗ*/}Mã đặt chỗ</label>
                                            <div className="col-xs-8 col-sm-9 et-no-padding">
                                                <input onChange={(event) => setCode(event.target.value)} type="text" className="form-control input-sm ng-pristine ng-valid" placeholder="Mã đặt chỗ khi đặt vé" />
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <label className="col-xs-4 col-sm-3 control-label ng-binding">{/*Số điện thoại*/}Điện thoại</label>
                                            <div className="col-xs-8 col-sm-9 et-no-padding">
                                                <input onChange={(event) => setPhone(event.target.value)} type="text" className="form-control input-sm ng-pristine ng-valid" placeholder="Số điện thoại khi đặt vé, để trống nếu không nhập khi đặt vé" />
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-xs-4 col-sm-3" />
                                            <div className="col-xs-8 col-sm-9 et-no-padding">
                                                {
                                                    code !== '' || phone !== ''
                                                        ? <a href className="btn btn-primary ng-binding" onClick={() => getTickets()}>Tra cứu</a>
                                                        : <a href className="btn btn-primary ng-binding disabled">Tra cứu</a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                <div className="row text-center ng-hide" ng-show="notFound">
                                    <h4 className="ng-binding">{/*Không tìm thấy dữ liệu nào*/}Không tìm thấy dữ liệu nào</h4>
                                </div>
                                <div className="col-md-12 text-center alert alert-info ng-hide" ng-show="bookingInfo.VeTraOnline.Messsage.length > 0 ">
                                    <div className="ng-binding" />
                                </div>
                                {/*Giao dien cho moblie*/}
                                <div className="list-ticket-mobile" style={{ display: 'none' }}>
                                    <div ng-show="successGroup.length > 0" className="ng-hide">
                                        <h5 className="et-register-block ng-binding" style={{ color: '#e55a05', fontWeight: 700 }}>{/*Các giao dịch thành công*/}Các giao dịch thành công</h5>
                                        {/* ngRepeat: group in successGroup */}
                                    </div>
                                </div>
                                {/*Giao dien cho desktop*/}
                                <div className="col-md-12 table-responsive list-ticket-desktop">
                                    <div ng-show="successGroup.length > 0">
                                        <table className="table table-bordered">
                                            <thead className="et-table-header">
                                                <tr>
                                                    <th style={{ width: '2%' }}>#</th>
                                                    <th style={{ width: '19%' }} className="ng-binding">Họ tên{/*Họ tên*/}</th>
                                                    <th style={{ width: '19%' }} className="ng-binding">Thông tin vé{/*Thông tin vé*/}</th>
                                                    <th style={{ width: '8%' }} className="ng-binding">Thành tiền (VNĐ){/*Thành tiền (VNĐ)*/}</th>
                                                    <th style={{ width: '8%' }} className="ng-binding">Lệ phí trả vé{/*Lệ phí trả vé*/}</th>
                                                    <th style={{ width: '8%' }} className="ng-binding">Tiền trả lại{/*Tiền trả lại*/}</th>
                                                    <th style={{ width: '6%' }} className="ng-binding">Gửi yêu cầu trả vé{/*Chọn vé trả*/}</th>
                                                </tr>
                                            </thead>
                                            {code === '' && key === ''
                                                ? <></>
                                                : <tbody>
                                                    {
                                                        key?.map((item, idx) => (
                                                            <tr>
                                                                <td>{idx + 1}</td>
                                                                <td>{data[item][0].info_customer}</td>
                                                                <td>
                                                                    {data[item][0].train.train.code}&nbsp;
                                                                    {data[item][0].train_station.title}-{data[item][data[item].length - 1].train_station_to.title}&nbsp;
                                                                    {
                                                                        `${formatTime(new Date(data[item][0].departure_date).getDate())}/${formatTime(new Date(data[item][0].departure_date).getMonth() + 1)}/${new Date(data[item][0].departure_date).getFullYear()} ${formatTime(new Date(data[item][0].departure_date).getHours())}:${formatTime(new Date(data[item][0].departure_date).getMinutes())}:${formatTime(new Date(data[item][0].departure_date).getSeconds())}`
                                                                    }
                                                                </td>
                                                                <td>{(Number(582000) * data[item].length).toLocaleString()} vnd</td>
                                                                <td>10,000 vnd</td>
                                                                <td>{(Number(582000) * data[item].length - 10000).toLocaleString()} vnd</td>
                                                                <td>
                                                                    {
                                                                        data[item][0]?.return_ticket === true
                                                                            ? <a href className="btn btn-primary ng-binding disabled">Đã yêu cầu hủy vé</a>
                                                                            : <a href className="btn btn-primary ng-binding" onClick={() => returnTicket(data[item])}>Gửi</a>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                                {/* <div class="col-md-12 text-info" ng-show="successGroup.length > 0 || pendingGroup.length > 0">
                                                    <div ng-bind-html="'PReturnTicket_huongDanHoTro'|translate:bookingCode">
                                                    </div>
                                                </div> */}
                                <div className="et-register-block pagination-sm et-col-md-12 ng-hide" ng-show="bookingInfo.VeBan.length > 0 ">
                                    <h5 style={{ color: '#e55a05', fontWeight: 700 }} className="ng-binding">{/*Thông tin người đặt vé*/}Thông tin người đặt vé</h5>
                                    <div className="form-horizontal et-col-md-12">
                                        <div className="row">
                                            <label className="col-xs-4 col-sm-2 et-col-md-2 ng-binding">{/*Họ và tên*/}Họ và tên</label>
                                            <div className="col-xs-8 col-sm-4 et-col-md-4">
                                                <input type="text" name="fullName" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" ng-model="bookingInfo.BookingPerson.HoTen" placeholder="Họ và tên" required disabled style={{ marginBottom: '5px' }} />
                                            </div>
                                            <label className="col-xs-4 col-sm-2 et-col-md-2 ng-binding">{/*Email*/}Email</label>
                                            <div className="col-xs-8 col-sm-4 et-col-md-4">
                                                <input type="email" name="email" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required ng-valid-email" ng-model="bookingInfo.BookingPerson.Email" placeholder="Email" required disabled />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-xs-4 col-sm-2 et-col-md-2 ng-binding">{/*Số CMND/Hộ chiếu*/}Số CMND/Hộ chiếu</label>
                                            <div className="col-xs-8 col-sm-4 et-col-md-4">
                                                <input type="text" name="identity" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" ng-model="bookingInfo.BookingPerson.SoGiayTo" placeholder="Số CMND/Hộ chiếu" required disabled style={{ marginBottom: '5px' }} />
                                            </div>
                                            <label className="col-xs-4 col-sm-2 et-col-md-2 ng-binding">{/*Số điện thoại*/}Số điện thoại</label>
                                            <div className="col-xs-8 col-sm-4 et-col-md-4">
                                                <input type="tel" name="phoneNumber" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" ng-model="bookingInfo.BookingPerson.Mobile" placeholder="Số điện thoại" required disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <p><button className="btn btn-primary ng-binding" ng-disabled="bookingInfo.VeTraOnline.Status != 1" ng-click="newVerifyTraVe()" disabled="disabled">Tiếp tục</button></p>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                            {/* end step1 - input */}
                            {/* begin step2 - verify info */}
                            <div className="et-register-block pagination-sm et-col-md-12 ng-hide" ng-show="step == 2 || step == 3">
                                <div>
                                    <h5 className="et-register-block" style={{ color: '#e55a05', fontWeight: 700 }}>Danh sách các vé chọn trả</h5>
                                    {/* ngRepeat: group in chonTraGroup */}
                                </div>
                                <div className="row form-group" style={{ backgroundColor: '#efefef', borderRadius: '3px', padding: '10px' }}>
                                    <div className="col-xs-4 col-sm-4 text-left">
                                        <p className="ng-binding"><span style={{ color: 'gray' }}>Tổng vé:</span> 0</p>
                                        <p className="ng-binding"><span style={{ color: 'gray' }}>Tổng lệ phí:</span> 0 VNĐ</p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 text-left">
                                        <p className="ng-binding"><span style={{ color: 'gray' }}>Tổng tiền vé:</span> 0 VNĐ</p>
                                        <p className="ng-binding"><span style={{ color: 'gray' }}>Tổng tiền trả:</span> 0 VNĐ</p>
                                    </div>
                                </div>
                                <div ng-show="step==2" className="ng-hide">
                                    <h5 className="et-register-block" style={{ color: '#e55a05', fontWeight: 700 }}>Phương thức nhận mã xác thực trả vé</h5>
                                    <p className="ng-binding">Email:</p>
                                    {/* <p>Số điện thoại: {{ bookingInfo.BookingPerson.Mobile }}</p> */}
                                    {/* <input type="checkbox" checked disabled >Email: {{ bookingInfo.BookingPerson.Email }}</input>
                                                    <input type="checkbox">Số điện thoại: {{ bookingInfo.BookingPerson.Mobile }}</input> */}
                                </div>
                                <div className="row form-group ng-hide" ng-show="step == 2">
                                    <div className="col-xs-12 col-sm-12 et-no-padding text-center">
                                        <p>
                                            <button className="btn btn-primary ng-binding" ng-click="newRequestTraVe()">Xác nhận</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* end step2 - verify info */}
                            {/* begin step3 - confirm & OTP */}
                            <div className="et-register-block pagination-sm et-col-md-12 ng-hide" ng-show="step === 3">
                                <p ng-bind-html="'PReturnTicket_huongDanLayMaOTP'|translate:bookingCode" className="ng-binding">
                                    Quý khách vui lòng kiểm tra hòm thư tại địa chỉ email đã dùng mua vé để nhận mã xác nhận. Chúng tôi sẽ dùng mã xác nhận này để đảm bảo rằng chính quý khách là người mua vé và có quyền trả các vé đã mua
                                </p>
                                <div className="row form-group">
                                    <div className="col-xs-3 col-sm-2 text-left">
                                        <label className="ng-binding">{/*mã xác nhận trả vé*/}Mã xác nhận (6 số)</label>
                                    </div>
                                    <div className="col-xs-2 col-sm-3 et-no-padding">
                                        <input type="text" className="form-control input-sm ng-pristine ng-valid" ng-model="confirmRequestTraVeInput.VerifyCode" />
                                    </div>
                                    <div className="col-xs-1 col-sm-1 et-no-padding text-left" />
                                    <div className="col-xs-6 col-sm-6 et-no-padding text-left">
                                        <p>
                                            <button className="btn btn-warning btn-sm ng-binding" ng-click="confirmRequestTraVe()">Trả vé</button>
                                            <button className="btn btn-default btn-sm" ng-disabled="countdownResend != 0 " ng-click="resendRequestTraVe()" disabled="disabled">
                                                <span ng-show="countdownResend < 0" className="ng-binding ng-hide">Đã gửi lại mã</span>
                                                <span ng-show="countdownResend >= 0" className="ng-binding">Gửi lại mã</span>
                                                <span ng-show="countdownResend > 0" className="ng-binding">(1s)</span>
                                            </button>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="ng-binding">Vui lòng điền mã xác nhận trước</p>
                                    </div>
                                </div>
                            </div>
                            {/* end step3 - confirm & OTP */}
                            {/* begin step4 - done */}
                            <div className="et-register-block pagination-sm et-col-md-12 ng-hide" ng-show="step == 4">
                                <div id="divBBTraVe">
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td className="text-center">
                                                    <h3>
                                                        <span className="glyphicon glyphicon-ok" style={{ fontSize: '80px', marginTop: '2px' }} />
                                                        <br />
                                                        TRẢ VÉ THÀNH CÔNG
                                                    </h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {/* <td class="w70"> */}
                                                    <div className="ng-binding">Mã chứng từ:</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">
                                                    <span>Người trả vé:</span> <span className="ng-binding" />
                                                    {/* <span>Giấy tờ:</span> <span>{{ bbTraVe.SoGiayTo }}</span> */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-left ng-binding">Thời gian thực hiện:</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p><strong>Thông tin các vé trả</strong></p>
                                    <div style={{ fontSize: 'smaller' }}>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">CV bán</th>
                                                    <th className="text-center">Tàu</th>
                                                    <th className="text-center">Vé</th>
                                                    <th className="text-center">Hành khách</th>
                                                    <th>Ga đi</th>
                                                    <th>Ga đến</th>
                                                    <th>Tiền vé</th>
                                                    <th>Phí trả</th>
                                                    <th>Tiền trả</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* ngRepeat: item in bbTraVe.Details */}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={6}><span>Tổng</span></td>
                                                    <td className="text-right"><span style={{ fontWeight: 'bold' }} className="ng-binding" /></td>
                                                    <td className="text-right"><span style={{ fontWeight: 'bold' }} className="ng-binding" /></td>
                                                    <td className="text-right"><span style={{ fontWeight: 'bold' }} className="ng-binding" /></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    {/* <p>(1) Tổng tiền vé : {{ bbTraVe.TongTienVe * 1000 | number }} (VNĐ)</p>
                                                    <p>(2) Tổng phí trả vé: {{ bbTraVe.TongLePhi * 1000 | number }} (VNĐ)</p>
                                                    <p>(3) Tổng tiền trả lại khách = (1)-(2): {{ bbTraVe.TongTienTra * 1000 | number }} (VNĐ)</p> */}
                                    {/* <p><b><i>{{ NhanVien.MaCT == 'KHN' ? 'Công ty cổ phần vận tải đường sắt Hà Nội' : 'Công ty cổ phần vận tải đường sắt Sài Gòn' }} đã thu tiền lệ phí trả vé là {{ TongTienLePhi*1000| number}} (VNĐ)</i></b></p> */}
                                    <p>&nbsp;</p>
                                    <div>
                                        <p className="alert alert-warning ng-binding">
                                            Số tiền hoàn lại đã được tạo lệnh chuyển đến cổng thanh toán. Vui lòng đợi trong khoảng thời gian quy định của các ngân hàng thực hiện đối soát và hoàn về tài khoản cho quý khách
                                        </p>
                                    </div>
                                    {/* <div class="modal-footer"> */}
                                    {/* <button class="btn btn-default" type="button" ng-click="cancel()">Đóng</button> */}
                                    {/* <button class="btn btn-default" type="button" ng-click="doPrint()">In biên bản</button> */}
                                    {/* </div> */}
                                </div>
                                {/* end step4 - Done */}
                                <div className="row text-center hidden-print" style={{ display: 'none' }}>
                                    <a analytics-on="click" analytics-event="PrintBookInfo" href="javascript:;" ng-click="doPrint()" className="et-btn ng-binding ng-hide" ng-show="bookingInfo.VeBan.length > 0 || bookingInfo.QueueInfo.MasterInfo">
                                        {/*In*/}In
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="et-col-md-12 hidden-print" style={{ marginTop: '15px', display: 'none' }}>
                        <div className="panel panel-warning" style={{ marginBottom: '0px', marginLeft: '-15px', marginRight: '-15px' }}>
                            <div className="panel-heading">
                                <h3 className="panel-title">ĐIỀU KIỆN HÀNH KHÁCH ĐI TÀU TỪ NGÀY 27/10/2021</h3>
                            </div>
                            <div className="panel-body">
                                <p><strong>1. Đối với hành khách đi từ địa phương/khu vực cấp độ dịch là cấp 1,2:</strong></p>
                                <p>- Tuân thủ “Thông điệp 5K”; khai báo y tế trên ứng dụng PC-Covid.</p>
                                <p>- Thực hiện nghiêm các biện pháp phòng, chống dịch COVID-19 theo hướng dẫn của Ban Chỉ đạo Quốc gia phòng, chống dịch COVID-19 và Bộ Y tế.</p>
                                <p><strong>2. Đối với hành khách đi từ địa phương/khu vực cấp độ dịch là cấp 3:</strong></p>
                                <p>- Thực hiện theo nội dung mục (1.) nêu trên;</p>
                                <p>- Xét nghiệm các trường hợp có một trong các biểu hiện triệu chứng sốt, ho, mệt mỏi, đau họng, mất vị giác và khứu giác, khó thở… hoặc có chỉ định điều tra dịch tễ.</p>
                                <p><strong>3. Đối với hành khách đi từ địa phương/khu vực cấp độ dịch là cấp 4:</strong></p>
                                <p>- Ngoài việc thực hiện theo nội dung mục 1 nêu trên hành khách phải có kết quả xét nghiệm SARS-CoV-2 bằng phương pháp RT-PCR hoặc xét nghiệm nhanh kháng nguyên âm tính trong vòng 72 giờ trước khi lên tàu.</p>
                                <p>- Chỉ đặt mua vé, đi tàu trên toa dành riêng của đoàn tàu.</p>
                                <p>
                                    <strong>
                                        (*) Hành khách có thể truy cập vào Cổng thông tin điện tử của Bộ y tế tại website <a href="https://moh.gov.vn" target="_blank">https://moh.gov.vn</a> mục thông tin điều hành để theo dõi tổng hợp đánh giá cấp độ dịch
                                        tại địa phương.
                                    </strong>
                                </p>
                                <div className="alert alert-danger" style={{ marginBottom: '0px' }}>
                                    <strong>Lưu ý: Hành khách không tuân thủ các điều kiện đi tàu như trên Ngành đường sắt từ chối chuyên chở và không trả lại tiền vé.</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="et-col-md-12 hidden-print" style={{ marginTop: '15px', display: 'none' }}>
                        <div className="panel panel-warning" style={{ marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px' }}>
                            <div className="panel-heading">
                                <h3 className="panel-title">KHUYẾN CÁO HÀNH KHÁCH MUA VÉ TÀU TẾT 2021</h3>
                            </div>
                            <div className="panel-body">
                                <p />
                                <p><strong>1. Kế hoạch tổ chức bán vé Tết cho hành khách:</strong></p>
                                <p>
                                    - Từ 8h00 ngày 01/10/2020: Bán vé cho các tập thể đã đăng ký và bán vé cá nhân trên Website: www.dsvn.vn; vetau.com.vn, giare.vetau.vn; tại các nhà ga, các điểm bán vé và các đại lý bán vé thuộc ĐSVN; qua ứng dụng ví
                                    điện tử Momo, Vimo, ứng dụng ViettelPay, app bán vé tàu trên thiết bị di động; qua Tổng đài bán vé khu vực Sài Gòn: 1900152, khu vực Nha Trang: 0258.3822113, khu vực Đà Nẵng: 0236.3823.810, khu vực Hà Nội: 19000109
                                </p>
                                <p>- Mỗi hành khách được mua không quá 04 vé cho chiều đi và về</p>
                                <p><strong>2. Quy định về việc đổi, trả vé của hành khách:</strong></p>
                                <p>2.1. Áp dụng mức khấu trừ trả vé đối với các vé đi tàu trong khoảng thời gian:</p>
                                <p>- Từ ngày 05/02/2021 đến hết ngày 13/02/2021 đối với mác tàu số chẵn.</p>
                                <p>- Từ ngày 14/02/2021 đến hết ngày 27/02/2021 đối với mác tàu số lẻ.</p>
                                <p>- Từ ngày 05/02/2021 đến hết ngày 10/02/2021 đối với mác tàu số lẻ có ga đi là ga Hà Nội, có ga đến từ các ga Phủ Lý đến Đồng Hới.</p>
                                <p>- Từ ngày 14/02/2021 đến hết ngày 21/02/2021 đối với mác tàu số chẵn có ga đi từ các ga Đồng Hới đến Phủ Lý và có ga đến là ga Hà Nội.</p>
                                <p>* Vé cá nhân: Trả vé trước giờ tàu chạy từ 10 giờ đến dưới 24 giờ, lệ phí là 30% giá vé; từ 1 ngày đến dưới 5 ngày, lệ phí là 20% giá vé; từ 5 ngày trở lên, lệ phí là 10% giá vé.</p>
                                <p>* Vé tập thể: Trả vé trước giờ tàu chạy từ 1 ngày đến dưới 5 ngày, lệ phí là 30% giá vé; từ 5 ngày đến dưới 10 ngày, lệ phí là 20% giá vé; từ 10 ngày trở lên, lệ phí là 10% giá vé.</p>
                                <p>* Không áp dụng đổi vé cá nhân, tập thể.</p>
                                <p>2.2. Ngoài thời gian nêu trên, áp dụng mức khấu trừ đổi vé, trả vé như sau:</p>
                                <p>- Đổi vé: Vé cá nhân đổi trước giờ tàu chạy 24 giờ trở lên, lệ phí là 20.000 đồng/vé; không áp dụng đổi vé đối với vé tập thể.</p>
                                <p>- Trả vé:</p>
                                <p>&nbsp; &nbsp; + Vé cá nhân: Trả vé trước giờ tàu chạy từ 4 giờ đến dưới 24 giờ, lệ phí là 20% giá vé; từ 24 giờ trở lên lệ phí là 10% giá vé.</p>
                                <p>&nbsp; &nbsp; + Vé tập thể: Trả vé trước giờ tàu chạy từ 24 giờ đến dưới 72 giờ, lệ phí là 20% giá vé; từ 72 giờ trở lên lệ phí là 10% giá vé.</p>
                                <p>2.2. Hình thức trả vé</p>
                                <p>
                                    - Khi hành khách mua vé và thanh toán online qua website bán vé của ngành Đường sắt, app bán vé hoặc các ứng dụng mua vé tàu hỏa của các đối tác thứ ba thì có thể trả vé online qua các website bán vé của ngành đường sắt
                                    hoặc đến trực tiếp nhà ga.
                                </p>
                                <p>
                                    - Khi hành khách mua vé bằng các hình thức khác, muốn đổi vé, trả vé hành khách đến trực tiếp nhà ga kèm theo giấy tờ tùy thân bản chính của người đi tàu hoặc người mua vé cho nhân viên đường sắt. Đồng thời, thông tin
                                    trên thẻ đi tàu phải trùng khớp với giấy tờ tùy thân của hành khách.
                                </p>
                                <p><strong>3. Khuyến cáo:</strong></p>
                                <p>Để đảm bảo quyền lợi của hành khách đi tàu, khi có sự cố xảy ra như mất vé, trùng chỗ trên tàu, đổi trả vé…Ngành đường sắt khuyến cáo người dân:</p>
                                <p>- Khi mua vé hành khách cần có giấy tờ tùy thân hợp lệ.</p>
                                <p>- Hành khách nên lưu giữ mã vé của thẻ lên tàu để tra cứu lại thông tin khi cần thiết.</p>
                                <p>- Hành khách có “thẻ lên tàu” trùng khớp với thông tin cá nhân mới được vào ga đi tàu.</p>
                                <p>
                                    - Để tránh việc mua nhầm “vé giả”, “vé không hợp lệ”, hành khách nên mua vé tại các nhà ga, các điểm bán vé, các đại lý thuộc ngành Đường sắt quản lý; không nên mua vé bên ngoài “cò mồi chợ đen”, các đại lý trá hình sẽ
                                    gây thiệt hại về tài chính của hành khách đồng thời không đi được tàu.
                                </p>
                                <p>
                                    <i>Trân trọng cảm ơn!.</i>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="et-col-md-12 hidden-print" style={{ marginTop: '15px', display: 'none' }}>
                        <div className="panel panel-warning" style={{ marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px' }}>
                            <div className="panel-heading">
                                <h3 className="panel-title">Thông báo về việc điều chỉnh thông số thời gian trên website bán vé điện tử</h3>
                            </div>
                            <div className="panel-body">
                                <p />
                                <p>Để phục vụ hành khách mua vé đi tàu ngày càng tốt hơn, mang lại cho người mua sự thuận tiện, dễ dàng trong quá trình mua vé tàu hỏa, tránh các tình trạng giữ vé ảo trên hệ thống bán vé điện tử,</p>
                                <p>Kể từ 12h00 ngày 10/7/2019, Tổng công ty ĐSVN sẽ chính thức điều chỉnh giảm các thông số thời gian và bổ sung một số tính năng trên website bán vé điện tử, cụ thể như sau:</p>
                                <p>- Hành khách đặt chỗ và chọn thanh toán trực tuyến thực hiện trong khoảng thời gian 30 phút (thời gian cũ là 60 phút).</p>
                                <p>- Hành khách đặt chỗ và chọn thanh toán trả sau tại các điểm giao dịch tiến hành thanh toán trong khoảng thời gian 12 giờ (thời gian cũ là 24 giờ).</p>
                                <p>- Hành khách mua vé online thực hiện trước giờ tàu chạy là 60 phút (thời gian cũ là 70 phút).</p>
                                <p>* Ghi chú: Hành khách mua vé các tàu nằm trên tuyến Thống nhất (gồm cả thống nhất và khu đoạn) trong khoảng thời gian dưới 4 tiếng trước giờ tàu chạy sẽ không được đổi, trả vé (dịp Tết sẽ có quy định riêng).</p>
                                <i>Trân trọng cảm ơn!.</i>
                            </div>
                        </div>
                    </div>
                    <div className="et-col-md-12 hidden-print" style={{ marginTop: '15px', display: 'none' }}>
                        <div className="panel panel-warning" style={{ marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px' }}>
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong>QUY ĐỊNH ĐỔI, TRẢ VÉ TẾT NHÂM DẦN 2022</strong></h3>
                            </div>
                            <div className="panel-body">
                                <p className="text-primary" style={{ display: 'none' }}>(Thời gian áp dụng từ ngày 20/01/2022 đến ngày 28/02/2022)</p>
                                <p><strong>I. HÌNH THỨC TRẢ VÉ:</strong></p>
                                <p>Quý hành khách đi tàu trong khoảng thời gian từ ngày 20/01/2022 đến hết ngày 28/02/2022 nếu có yêu cầu đổi, trả vé được thực hiện như sau:</p>
                                <p>
                                    - Hành khách được bảo lưu tiền vé và sử dụng để đi các lịch trình khác bằng đường sắt trong năm 2022. Đường sắt không thu phí trả vé và hết năm 2022 hành khách sẽ được hoàn lại số tiền bảo lưu nếu chưa sử dụng. Thời gian
                                    hoàn lại tiền vé kể từ ngày 01/01/2023.
                                </p>
                                <p>- Nếu hành khách muốn trả vé, phí trả vé thực hiện theo quy định hiện hành và đường sắt sẽ hoàn lại tiền cho hành khách sau 90 ngày tính từ ngày trả vé.</p>
                                <p><strong>II. THỜI GIAN, PHÍ ĐỔI, TRẢ VÉ</strong></p>
                                <p><strong>1. Thời gian cao điểm Tết.</strong></p>
                                <p>- Từ ngày 26/01 đến ngày 04/02/2022 đối với mác tàu số chẵn và mác tàu số lẻ có ga đi là ga Hà Nội, có ga đến từ các ga Phủ Lý đến Đồng Hới.</p>
                                <p>- Từ ngày 04/02 đến ngày 12/02/2022 đối với mác tàu số lẻ.</p>
                                <p>- Từ ngày 04/02 đến ngày 06/02/2022 đối với mác tàu số chẵn có ga đi từ các ga Đồng Hới đến Phủ Lý và có ga đến là ga Hà Nội</p>
                                <p>(*) Thời gian đổi trả, vé</p>
                                <p>- Vé cá nhân: Trước giờ tàu chạy ghi trên vé 24 giờ trở lên.</p>
                                <p>- Vé tập thể: Trước giờ tàu chạy ghi trên vé 48 giờ trở lên.</p>
                                <p style={{ color: 'red' }}>(*) Phí đổi, trả vé là 30% giá tiền in trên Thẻ đi tàu.</p>
                                <p><strong>2. Thời gian còn lại.</strong></p>
                                <p>- Đổi vé: Vé cá nhân đổi trước giờ tàu chạy 24 giờ trở lên, lệ phí là 20.000 đồng/vé; không áp dụng đổi vé đối với vé tập thể.</p>
                                <p>- Trả vé:</p>
                                <p>&nbsp; &nbsp;+ Vé cá nhân: Trả vé trước giờ tàu chạy từ 4 giờ đến dưới 24 giờ, lệ phí là 20% giá vé; từ 24 giờ trở lên lệ phí là 10% giá vé.</p>
                                <p>&nbsp; &nbsp;+ Vé tập thể: Trả vé trước giờ tàu chạy từ 24 giờ đến dưới 72 giờ, lệ phí là 20% giá vé; từ 72 giờ trở lên lệ phí là 10% giá vé.</p>
                                <i>Trân trọng cảm ơn!.</i>
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
            </div>
        </>
    )
}