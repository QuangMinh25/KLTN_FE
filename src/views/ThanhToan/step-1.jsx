import React, { useEffect, useState } from 'react'
import { useHookTrainStation } from "../../state/trainStation";
import useSubject from '../../hooks/useSubject';
import { useHistory } from 'react-router-dom'

export default function ThanhToan_step1({ setStep }) {
    const [state, actions] = useHookTrainStation()
    const { getSubjects } = useSubject()
    const history = useHistory()
    const [subject, setSubject] = useState([])

    const getSubject = async () => {
        await getSubjects().then(res => {
            setSubject([...res])
            state?.ticketSelected?.map((item, index) => {
                item.map((i, id) => {
                    let change = i
                    change.subject = res[0]._id
                    change.subject_title = res[0].title
                    let newArr = state.ticketSelected
                    newArr[index][id] = change
                    actions.setTicketSelected([...newArr])
                })
            })
        })
    }

    useEffect(() => {
        // console.log('=================<>', state?.ticketSelected, state?.payment);
    }, [state])

    useEffect(() => {
        getSubject().then((res) => {
        })
    }, [])

    return (
        <>

            <div className="col-md-12" ng-show="!isViewConfirm && !isFormDichVu">
                <div className="et-page-header"><span className="et-main-label ng-binding" style={{ float: 'left' }}>THÔNG TIN GIỎ VÉ</span>&nbsp;&nbsp; <a className="list-ticket-mobile" ng-click="thongBaoHetThoiGianGiuCho()" style={{ float: 'left' }}><img style={{ marginBottom: '3PX' }} height={32} src="../../images/icon_info.png" /></a></div>
                <div className="row list-ticket-deskhop">
                    <div className="alert alert-info">
                        <p ng-bind-html="'PBuyTicket_dienGiaiGioVe'|translate" className="ng-binding">Các vé có biểu tượng <img src="/images/waring20.png" /> là các vé bị hết thời gian tạm giữ. Xin vui lòng loại bỏ các vé này khỏi danh sách vé đặt mua trước khi thực hiện giao dịch thanh toán tiền.</p>
                        <p ng-bind-html="'PBuyTicket_dienGiaiNhapTT'|translate" className="ng-binding">Quý khách vui lòng điền đầy đủ, chính xác tất cả các thông tin về hành khách đi tàu bao gồm: Họ tên đầy đủ, số giấy tờ tùy thân (Số chứng minh nhân dân hoặc số hộ chiếu hoặc số giấy phép lái xe đường bộ được pháp luật Việt Nam công nhận hoặc ngày tháng năm sinh nếu là trẻ em hoặc thẻ sinh viên nếu là sinh viên). Để đảm bảo an toàn, minh bạch trong quá trình bán vé các thông tin này sẽ được nhân viên soát vé kiểm tra trước khi lên tàu theo đúng các quy định của Tổng công ty Đường sắt Việt Nam.</p>
                    </div>
                </div>
                {/* ngInclude: 'app/payment/ticketCart.form.desktop.html' */}
                <div ng-include="'app/payment/ticketCart.form.desktop.html'" className="ng-scope">
                    <div className="row form-group table-responsive list-ticket-deskhop ng-scope" ng-class="{'et-error-block': maxPassengerError || shortyNameError}">
                        <table className="table table-bordered">
                            <thead className="et-table-header">
                                <tr>
                                    <th style={{ backgroundColor: 'lavender', width: '25%' }} className="ng-binding">
                                        Họ tên{/*Họ tên*/}
                                    </th>
                                    <th style={{ width: '120px', backgroundColor: 'lavender' }} className="ng-binding">
                                        Thông tin chỗ{/*Thông tin chỗ*/}
                                    </th>
                                    <th style={{ backgroundColor: 'lavender' }} className="ng-binding">
                                        Giá vé{/*Giá vé*/}
                                    </th>
                                    <th style={{ backgroundColor: 'lavender' }} className="ng-binding">
                                        Giảm đối tượng{/*Giảm đối tượng*/}
                                    </th>
                                    <th style={{ backgroundColor: 'lavender' }} className="ng-binding">
                                        Khuyến mại{/*Khuyến mại*/}
                                    </th>
                                    <th style={{ backgroundColor: 'lavender' }} className="ng-binding">
                                        Bảo hiểm{/*Bảo hiểm*/}
                                    </th>
                                    <th style={{ backgroundColor: 'lavender', width: '120px' }} className="ng-binding">
                                        Thành tiền (VNĐ){/*Thành tiền (VNĐ)*/}
                                    </th>
                                    <th style={{ backgroundColor: 'lavender', width: '25px' }} />
                                </tr>
                            </thead>
                            <tbody ng-show="ves.chieuDi.length > 0" className>
                                {
                                    state?.ticketSelected?.map((ticket, idxOf) => (
                                        <tr ng-repeat="ve in ves.chieuDi" ng-class="{'et-error-tr': ve.buyingRuleError || ve.sameNameError}" className="ng-scope">
                                            <td className="et-table-cell" style={{ padding: '0px', borderBottom: 'solid 2px #ccc' }}>
                                                <div className="input-group input-group-sm" style={{ marginBottom: '6px', width: '100%' }}>
                                                    <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Họ tên</span>
                                                    <input onChange={(event) => {
                                                        ticket.map((i, id) => {
                                                            let change = i
                                                            change.info_customer = event.target.value
                                                            let newArr = state.ticketSelected
                                                            newArr[idxOf][id] = change
                                                            actions.setTicketSelected([...newArr])
                                                        })
                                                    }} type="text" placeholder="Thông tin hành khách" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }} required />
                                                </div>
                                                <div className="input-group input-group-sm" style={{ marginBottom: '6px', width: '100%' }}>
                                                    <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Đối tượng</span>
                                                    <select onChange={(event) => {
                                                        ticket.map((i, id) => {
                                                            let change = i
                                                            change.subject = subject[event.target.value]._id
                                                            change.subject_title = subject[event.target.value].title
                                                            let newArr = state.ticketSelected
                                                            newArr[idxOf][id] = change
                                                            actions.setTicketSelected([...newArr])
                                                        })
                                                    }} className="form-control input-sm ng-pristine ng-valid ng-valid-required" id="pt111430425" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }} required>
                                                        <optgroup label="Người Việt Nam">
                                                            {
                                                                subject.map((item, index) => (
                                                                    item.group === 0
                                                                        ? <option value={index}>{item.title}</option>
                                                                        : <></>
                                                                ))
                                                            }
                                                        </optgroup>
                                                        <optgroup label="Người nước ngoài">
                                                            {
                                                                subject.map((item, index) => (
                                                                    item.group === 1
                                                                        ? <option value={item._id}>{item.title}</option>
                                                                        : <></>
                                                                ))
                                                            }
                                                        </optgroup>
                                                    </select>
                                                </div>
                                                <div className="input-group input-group-sm" style={{ width: '100%' }}>
                                                    <span className="input-group-addon text-left ng-scope ng-binding" style={{ width: '84px' }} >Số giấy tờ</span>
                                                    <input onChange={(event) => {
                                                        ticket.map((i, id) => {
                                                            let change = i
                                                            change.id_card = event.target.value
                                                            let newArr = state.ticketSelected
                                                            newArr[idxOf][id] = change
                                                            actions.setTicketSelected([...newArr])
                                                        })
                                                    }} type="text" placeholder="Số CMND/ Hộ chiếu/ Ngày tháng năm sinh trẻ em" maxLength={19} className="form-control input-sm ng-scope ng-pristine ng-valid" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }} popover="<div>- Số CMND</div><div>- Hộ chiếu</div><div>- Ngày tháng năm sinh trẻ em</div>" popover-title="Số giấy tờ áp dụng" popover-trigger="mouseenter" popover-placement="top" />
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '10px', borderBottom: 'solid 2px #ccc' }}>
                                                <div className="text-center ng-hide" ng-show="ve.seat.Status.Status != 6">
                                                    <img src="/images/waring20.png" tooltip className="ng-scope" />
                                                </div>
                                                <div>
                                                    <div className="ng-binding">
                                                        {ticket[0].train_code} {ticket[0].train_station_title}-{ticket[ticket.length - 1].train_station_to_title}
                                                    </div>
                                                    <div className="ng-binding">
                                                        {`${new Date(ticket[0].departure_date).getDate() < 10 ? ('0' + new Date(ticket[0].departure_date).getDate()) : new Date(ticket[0].departure_date).getDate()}/${(new Date(ticket[0].departure_date).getMonth() + 1) < 10 ? ('0' + (new Date(ticket[0].departure_date).getMonth() + 1)) : new Date(ticket[0].departure_date).getMonth() + 1} ${new Date(ticket[0].departure_date).getHours() < 10 ? ('0' + new Date(ticket[0].departure_date).getHours()) : new Date(ticket[0].departure_date).getHours()}:${new Date(ticket[0].departure_date).getMinutes() < 10 ? ('0' + new Date(ticket[0].departure_date).getMinutes()) : new Date(ticket[0].departure_date).getMinutes()}`}
                                                    </div>
                                                    <div className="ng-binding">
                                                        toa {ticket[0].wagons} chỗ {ticket[0].seats}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                                                {
                                                    (Number(581000) * ticket.length).toLocaleString()
                                                }
                                            </td>
                                            <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                                                0
                                            </td>
                                            <td className="et-table-cell text-left" style={{ borderBottom: 'solid 2px #ccc' }}>
                                                <div ng-show="!ve.isloadedKhuyenMai" className="ng-binding ng-hide">
                                                    Đang tìm khuyến mại...{/*Đang tìm khuyến mại...*/}
                                                </div>
                                                <div ng-show="ve.isloadedKhuyenMai" className>
                                                    <div ng-show="ve.ListKhuyenMai.length==0" className="ng-binding">
                                                        Không có khuyến mại cho vé này{/*Không có khuyến mại*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                                                {
                                                    (Number(1000) * ticket.length).toLocaleString()
                                                }
                                            </td>
                                            <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                                                {
                                                    ((Number(581000) * ticket.length) + (Number(1000) * ticket.length)).toLocaleString()
                                                }
                                            </td>
                                            <td style={{ verticalAlign: 'middle', borderBottom: 'solid 2px #ccc' }}>
                                                <a onClick={() => {
                                                    const tS = state.ticketSelected
                                                    tS.splice(idxOf, 1)
                                                    actions.setTicketSelected([...tS])
                                                }} href className="et-btn-cancel" />
                                                <img src="/images/loading51.gif" style={{ width: '30px' }} ng-show="ve.seat.waiting" className="ng-hide" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <tbody ng-show="ves.chieuVe.length > 0" className="ng-hide">
                                <tr className="et-table-group-header" ng-show="ves.khuHoi.length > 0 || ves.chieuDi.length > 0">
                                    <td colSpan={8} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <label className="ng-binding">
                                            Chiều về{/*Chiều về*/}
                                        </label>
                                        &nbsp;
                                        <div ng-show="ves.khuHoi.length > 0 || ves.chieuDi.length > 0" className>
                                            <a className="et-btn ng-binding" id="btnCloneBookingInfo" ng-show="ves.chieuDi.length > 0" ng-click="setBackInfo()">
                                                Lấy thông tin từ chiều đi{/*Lấy thông tin từ chiều đi*/}
                                            </a>
                                        </div>
                                        {/*<div>Vui lòng nhập địa chỉ cưu trú, lưu trú vào phần địa chỉ lưu trú kế bên</div>*/}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="info">
                                    <td colSpan={6}>
                                        <span className="pull-right">
                                            <strong className="ng-binding">
                                                Tổng tiền{/*Tổng tiền*/}
                                            </strong>
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <strong className="ng-binding">582,000</strong>
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="et-register-block">
                    <h5 className="ng-binding">Thông tin người đặt vé</h5>
                    <div className="row text-info ng-binding" ng-bind-html="'PBuyTicket_dienGiaiNguoiDat'|translate">Quý khách vui lòng điền đẩy đủ và chính xác các thông tin về người mua vé dưới đây. Các thông tin này sẽ được sử dụng để xác minh người mua vé và lấy vé tại ga trước khi lên tàu theo đúng các quy định của Tổng công ty Đường sắt Việt Nam.</div>
                    {
                        state?.ticketSelected?.map((item, idx) => (
                            <div className="form-horizontal form-group">
                                <div className="row">
                                    <label className="col-xs-4 et-col-md-2 text-left ng-binding">Họ và tên<span style={{ color: 'red' }}>*</span></label>
                                    <div className="col-xs-8 et-col-md-4" style={{ marginBottom: '5px' }}>
                                        <input value={item[0].info_customer} type="text" name="fullName" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" disabled placeholder="Họ và tên" required />
                                    </div>
                                    <label className="col-xs-4 et-col-md-2 text-left ng-binding" style={{ paddingRight: 0 }}>Số CMND/Hộ chiếu<span style={{ color: 'red' }}>*</span></label>
                                    <div className="col-xs-8 et-col-md-4"><input type="text" value={item[0].id_card} disabled name="identity" id="registerIdentity" className="form-control input-sm ng-pristine ng-valid" ng-model="register.soCMND" maxLength={20} placeholder="Số CMND/Hộ chiếu" ng-class="{'et-error-block': registerIdentityError}" /></div>
                                </div>
                                <div className="row">
                                    <label className="col-xs-4 et-col-md-2 text-left ng-binding" style={{ paddingRight: 0 }}>Email</label>
                                    <div className="col-xs-8 et-col-md-4" style={{ marginBottom: '5px' }}><input onChange={(event) => {
                                        item.map((i, id) => {
                                            let change = i
                                            change.email = event.target.value
                                            let newArr = state.ticketSelected
                                            newArr[idx][id] = change
                                            actions.setTicketSelected([...newArr])
                                        })
                                    }} type="email" id="email" name="email" className="form-control input-sm ng-pristine ng-valid ng-valid-email" ng-model="register.email" placeholder="Email" ng-class="{'et-error-block': (registerEmailRequiredError || registerEmailValidError)}" /></div>
                                    <label className="col-xs-4 et-col-md-2 text-left ng-binding">Số di động<span style={{ color: 'red' }}>*</span></label>
                                    <div className="col-xs-8 et-col-md-4" style={{ marginBottom: '5px' }}><input onChange={(event) => {
                                        item.map((i, id) => {
                                            let change = i
                                            change.phone = event.target.value
                                            let newArr = state.ticketSelected
                                            newArr[idx][id] = change
                                            actions.setTicketSelected([...newArr])
                                        })
                                    }} type="text" id="phoneNumber" name="phoneNumber" className="form-control input-sm ng-pristine ng-valid" ng-model="register.dienThoai" maxLength={20} placeholder="Số di động" ng-class="{'et-error-block': registerPhoneError || registerPhoneRequiredError}" /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-primary ng-binding" ng-bind-html="'PBuyTicket_mobileWarningCOVID19'|translate">Để ngăn chặn dịch bệnh COVID-19, ĐSVN kính mong quý khách hàng nhập đúng thông tin số điện thoại để trong trường hợp cần thông báo chúng tôi có thể liên hệ với quý khách hàng nhanh nhất có thể.</div>
                                </div>
                            </div>
                        ))
                    }
                    <h5 style={{ marginBottom: '6px' }} className="ng-binding">Thông tin xuất hóa đơn điện tử</h5>
                    <div className="text-danger ng-binding">&nbsp;- Tổng công ty ĐSVN phát hành hóa đơn điện tử đối với tất cả các vé bán ra</div>
                    <div className="text-danger ng-binding">&nbsp;- Trường hợp khách hàng không nhập thông tin hóa đơn dưới đây, ĐSVN sẽ xuất hóa đơn theo thông tin mua hàng</div>
                    <div className="form-horizontal form-group" style={{ paddingTop: '6px' }}>
                        <div className="row">
                            <label className="col-xs-4 et-col-md-2 text-left ng-binding">Tên Công ty<span style={{ color: 'red', display: 'none' }}>*</span></label>
                            <div className="col-xs-8 et-col-md-4" style={{ marginBottom: '5px' }}><input type="text" name="congTy" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" ng-model="register.congTy" placeholder="Tên Công ty" required ng-class="{'et-error-block': invoiceError}" /></div>
                            <label className="col-xs-4 et-col-md-2 text-left ng-binding">Mã số thuế<span style={{ color: 'red', display: 'none' }}>*</span></label>
                            <div className="col-xs-8 et-col-md-4"><input type="text" name="mst" id="mst" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" ng-model="register.mst" placeholder="Mã số thuế" required ng-class="{'et-error-block': mstError }" /></div>
                        </div>
                        <div className="row">
                            <label className="col-xs-4 et-col-md-2 text-left ng-binding" style={{ paddingRight: 0 }}>Địa chỉ<span style={{ color: 'red', display: 'none' }}>*</span></label>
                            <div className="col-xs-8 et-col-md-10"><input type="text" name="diaChi" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" ng-model="register.diaChi" placeholder="Địa chỉ" required ng-class="{'et-error-block': invoiceError}" /></div>
                        </div>
                    </div>
                    <h5 className="ng-binding">Phương thức thanh toán</h5>
                    <div className="list-group">
                        <div className="list-group-item ng-scope" ng-repeat="item in listCongTT" ng-style="{'border-color': congThanhToanError?'red':'#dddddd'}" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                            <table border={0} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ cursor: 'pointer', width: '3%' }} ng-click="setCongTT(item.MaCongTT)"><input onChange={() => {
                                        actions.setPayment(1)
                                    }} checked={state.payment === 1 ? true : false} type="radio" name="phuongThucThanhToan" ng-checked="isCheckedCongTT(item.MaCongTT)" ng-disabled="item.MaCongTT=='PayLater' && !canPayLatter" style={{ cursor: 'pointer', height: '1.2em', width: '100%' }} /></td>
                                        <td style={{ cursor: 'pointer', width: '12%' }} ng-click="setCongTT(item.MaCongTT)"><img ng-src="/images/paypal.png" style={{ width: '100px' }} src="/images/paypal.png" /></td>
                                        <td>
                                            <div className="text-info" style={{ fontSize: '12px' }}><strong className="ng-binding">Thanh toán trực tuyến qua cổng thanh toán Paypal</strong></div>
                                            <p ng-show="installmentMin===null" className="list-group-item-text ng-binding ng-hide" style={{ fontSize: '12px' }} ng-bind-html="'PBuyTicket_'+item.MaCongTT+'_content'|translate">
                                            </p><div>- Ví điện tử, thẻ nội địa, thẻ quốc tế qua cổng thanh toán Paypal</div>
                                            <p ng-show="installmentMin!==null" className="list-group-item-text ng-binding" style={{ fontSize: '12px' }} ng-bind-html="'PBuyTicket_'+item.MaCongTT+'_content_installment'|translate">
                                            </p><div>- Ví điện tử, thẻ nội địa, thẻ quốc tế qua cổng thanh toán Paypal</div>
                                            <p />
                                            <div className="ng-hide">
                                                <button type="button" className="btn btn-sm ng-binding btn-warning" style={{ marginTop: '2px' }}><span className="glyphicon glyphicon-check" aria-hidden="true" /> Thanh toán trả thẳng</button> &nbsp; <button type="button" className="btn btn-sm ng-binding btn-primary" ng-class="{'btn-warning':installment,'btn-primary':!installment}" ng-click="setInstallment(true)" style={{ marginTop: '2px' }}><span className="glyphicon glyphicon-unchecked" aria-hidden="true" /> Thanh toán trả góp</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* end ngRepeat: item in listCongTT */}
                        <div className="list-group-item ng-scope" ng-repeat="item in listCongTT" ng-style="{'border-color': congThanhToanError?'red':'#dddddd'}" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                            <table border={0} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ cursor: 'pointer', width: '3%' }} ng-click="setCongTT(item.MaCongTT)">
                                            <input onChange={() => {
                                        actions.setPayment(0)
                                    }} type="radio" name="phuongThucThanhToan" style={{ cursor: 'pointer', height: '1.2em', width: '100%' }} checked={state.payment === 0 ? true : false} />
                                        </td>
                                        <td style={{ cursor: 'pointer', width: '12%' }}>
                                            <img ng-src="/images/logo-dvtt-PayLater.png" style={{ width: '100px' }} src="/images/logo-dvtt-PayLater.png" />
                                        </td>
                                        <td>
                                            <div className="text-info" style={{ fontSize: '12px' }}>
                                                <strong className="ng-binding">Thanh toán trả sau bằng tiền mặt, internet banking tại các điểm giao dịch:</strong>
                                            </div>
                                            <p className="list-group-item-text ng-binding ng-hide" style={{ fontSize: '12px' }}></p>
                                            <div>- Tại các nhà ga, các điểm bưu cục VNPost, ngân hàng VIB, Paypal, Internet Banking</div>
                                            <p className="list-group-item-text ng-binding" style={{ fontSize: '12px' }}></p>
                                            <div>- Tại các nhà ga, các điểm bưu cục VNPost, ngân hàng VIB, Paypal, Internet Banking</div>
                                            <div className="ng-hide">
                                                <button type="button" className="btn btn-sm ng-binding btn-warning" style={{ marginTop: '2px' }}><span className="glyphicon glyphicon-check" aria-hidden="true" />Thanh toán trả thẳng</button>
                                                &nbsp;
                                                <button type="button" className="btn btn-sm ng-binding btn-primary" style={{ marginTop: '2px' }}><span className="glyphicon glyphicon-unchecked" aria-hidden="true" /> Thanh toán trả góp</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* end ngRepeat: item in listCongTT */}
                    </div>
                    <div className="form-group" ng-class="{'et-error-block': notAgreementError}">
                        <div ng-show="notAgreementError" className="ng-hide"><span className="et-error-label ng-binding">Bạn chưa đồng ý với những quy định mua vé trực tuyến.</span></div>
                        <div><input type="checkbox" ng-model="agreement" className="ng-pristine ng-valid" /> <span ng-bind-html="'PBuyTicket_xacNhanDongYMuaVeOnline'|translate" className="ng-binding">Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các <a href="/#/quydinhmuave" target="_blank">quy định mua vé trực tuyến</a>, <a href="/#/khuyenmai" target="_blank">các chương trình khuyến mại</a> của Tổng công ty đường sắt Việt Nam và chịu trách nhiệm về tính xác thực của các thông tin trên.</span></div>
                    </div>
                </div>
                <div className="col-md-12">
                    <a id="btnSaveBookInfo" className="pull-right et-btn-rec ng-binding" onClick={() => setStep(2)} >Tiếp theo&gt;&gt;</a>
                    <a href="/#/timkiem/ketqua" className="pull-left et-btn-rec ng-binding" onClick={() => history.push('/search')}>&lt;&lt; Quay lại</a>
                </div>
            </div>
        </>
    )
}