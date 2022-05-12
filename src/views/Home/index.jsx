import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Regulation from '../../components/Regulation'
import useStation from "../../hooks/useStation";
import useTrainStation from "../../hooks/useTrainStation";
import { useHookDataTicket } from '../../state/ticket'
import { useHookTrainStation } from '../../state/trainStation'
import { useHistory } from 'react-router-dom'

export default function Home() {

  const history = useHistory()
  const { getStation } = useStation()
  const { getTrainStation } = useTrainStation()
  const { get } = useTrainStation()

  const [state, actions] = useHookDataTicket()
  const [ stateTS, actionsTS ] = useHookTrainStation()
  const [station, setStation] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  

  const searchTrain = () => {
    getTrainStation([
      {
        name: 'train_station',
        value: state.data.train_station
      },
      {
        name: 'train_station_to',
        value: state.data.train_station_to
      },
      {
        name: 'date_start',
        value: state.data.startDate
      },
      {
        name: 'type_station',
        value: state.data.roundTrip
      },
      {
        name: 'date_return',
        value: state.data.endDate
      }
    ]).then((res) => {
      if (Object.keys(res.train_goes).length > 0) {
        actionsTS.setTrainStation(res.train_goes)
        actionsTS.setObjectKeyTrainStation(Object.keys(res.train_goes))
        if (state?.data?.roundTrip === true) {
          if (Object.keys(res.return_train).length > 0) {
            actionsTS.setTrainStationReturn(res.return_train)
            actionsTS.setObjectKeyTrainStationReturn(Object.keys(res.return_train))
          } else {
            alert('Không tìm thấy chuyến tàu về')
          }
        }
        history.push('/timkiem')
      } else {
        alert('Không tìm thấy chuyến tàu đi')
      }
    })
  }

  useEffect(() => {
    getStation().then((res) => {
      setStation(res)
    })
  }, [])

  return (
    <>
      <div className="adv-left">
        <a target="_blank" href="http://www.vr.com.vn/cam-nang-di-tau/khuyen-cao-khach-hang-chu-y-khi-mua-ve-truc-tuyen.html">
          <img src="images/dsvn1.jpg" />
        </a>
      </div>
      <div className="text-center text-primary ng-binding ng-hide" ng-show="!loadedSettings" ng-bind-html="'Error_SystemLoading'|translate">Hệ thống đang tải dữ liệu, vui lòng đợi trong giây lát...</div>
      <div className="container et-main-content" ng-show="!bannerTet">
        <div className="marquee">
          <div style={{ width: '100000px', marginLeft: '992px', animation: '15s linear 1s infinite normal none running marqueeAnimation-8769284' }} className="js-marquee-wrapper">
            <div className="js-marquee" style={{ marginRight: '0px', float: 'left' }} />
          </div>
        </div>
        {/* ngView:  */}
        <div data-ng-view className="shuffle-animation ng-scope" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
          <div ng-controller="searchController" ng-keypress="onEnter($event)" id="searchScreen" className="row ng-scope">
            <div className="col-xs-12 col-sm-4 et-col-md-3">
              <div className="et-col-md-12 et-widget" style={{ marginBottom: '5px' }}>
                <div className="row et-widget-header"><img src="/images/widgetIcon.png" /><span><strong className="ng-binding">Thông tin hành trình</strong></span></div>
                <div className="form-group" ng-class="{'has-error': gaDiError}">
                  <h6 className="ng-binding">Ga đi</h6>
                  <select name="" id="" className="form-control input-sm ng-pristine ng-valid" onChange={(event) => actions.setDataTicket({
                    ...state.data,
                    train_station: event.target.value
                  })}>
                    <option value={null}>Ga đi</option>
                    {
                      station.map((item) => (
                        <option value={item._id}>{item.title}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group" ng-class="{'has-error': gaDenError}">
                  <h6 className="ng-binding">Ga đến</h6>
                  <select onChange={(event) => actions.setDataTicket({
                    ...state.data,
                    train_station_to: event.target.value
                  })} name="" id="" className="form-control input-sm ng-pristine ng-valid">
                    <option value={null}>Ga đến</option>
                    {
                      station.map((item) => (
                        <option value={item._id}>{item.title}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="et-direct-block">
                  <input ng-model="searchData.isOneWay" onChange={() => actions.setDataTicket({
                    ...state.data,
                    roundTrip: false
                  })} type="radio" checked={state?.data?.roundTrip === false ? true : false} defaultChecked name="oneWay" className="ng-pristine ng-valid" />
                  <span className="ng-binding">Một chiều</span>
                  &nbsp;
                  <input onChange={() => actions.setDataTicket({
                    ...state.data,
                    roundTrip: true
                  })} checked={state?.data?.roundTrip === true ? true : false} type="radio" name="oneWay" defaultValue={1} ng-checked="searchData.isOneWay == 1" className="ng-pristine ng-valid" />
                  <span className="ng-binding">Khứ hồi</span>
                </div>
                <div className="form-group">
                  <h6 className="ng-binding">Ngày đi</h6>
                  <div className="input-group input-cal-picker" style={{ display: 'flex' }}>
                    <DatePicker style={{ zIndex: 98 }} selected={startDate} onChange={(date) => {
                      const time = new Date(date)
                      setStartDate(date)
                      actions.setDataTicket({
                        ...state.data,
                        startDate: new Date(`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} 00:00:00`).getTime()
                      })
                    }} className="form-control input-sm ng-isolate-scope ng-pristine ng-invalid ng-invalid-required ng-valid-date" />
                    <span className="input-group-btn" style={{ right: '35px', zIndex: 8 }}><button type="button" className="btn btn-primary btn-sm" ng-click="open_ngayDi($event)" style={{ padding: '3px 8px' }}><i className="glyphicon glyphicon-calendar" style={{ fontSize: '18px' }} /></button></span>
                  </div>
                </div>
                {
                  state?.data?.roundTrip === true
                  ? <>
                    <div className="form-group">
                  <h6 className="ng-binding">Ngày về</h6>
                  <div className="input-group input-cal-picker" style={{ display: 'flex' }}>
                    <DatePicker style={{ zIndex: 97 }} selected={endDate} onChange={(date) => {
                      const time = new Date(date)
                      setEndDate(date)
                      actions.setDataTicket({
                        ...state.data,
                        endDate: new Date(`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} 00:00:00`).getTime()
                      })
                    }} className="form-control input-sm ng-isolate-scope ng-pristine ng-invalid ng-invalid-required ng-valid-date" />
                    <span className="input-group-btn" style={{ right: '35px', zIndex: 8 }}><button type="button" className="btn btn-primary btn-sm" ng-click="open_ngayDi($event)" style={{ padding: '3px 8px' }}><i className="glyphicon glyphicon-calendar" style={{ fontSize: '18px' }} /></button></span>
                  </div>
                </div>
                  </>
                  : <></>
                }
                <div className="row text-center"><a href onClick={() => searchTrain()} className="et-btn ng-binding" analytics-on="click" analytics-event="SearchTau" ng-click="validateInput($event);">Tìm kiếm</a></div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8 et-col-md-6">
              <div className="et-col-md-12 et-widget alert alert-info" style={{ marginBottom: '0px', fontSize: '13px', color: '#0091d4', display: 'none' }}>
                <p><strong>Thực hiện Quyết định số 1839/QĐ-BGTVT ngày 20/10/2021 của Bộ GTVT</strong> Hướng dẫn tạm thời về tổ chức hoạt động vận tải hành khách bằng ĐS đảm bảo thích ứng an toàn, linh hoạt, kiểm soát hiệu quả dịch Covid 19, quý khách vui lòng đọc kỹ mục [<strong>Điều kiện hành khách đi tàu từ ngày 21/10/2021</strong>] bên dưới.</p>
                <br />
                <p>Ngoài ra để kiểm soát và ngăn ngừa dịch bệnh Covid-19, Ngành Đường sắt kính đề nghị Quý khách hàng khi đến ga mua vé hoặc đi tàu thực hiện các biện pháp phòng chống dịch bệnh theo THÔNG ĐIỆP 5K của Bộ Y tế [<strong>Khẩu trang – Khử khuẩn – Khoảng cách – Không tập trung – Khai báo y tế</strong>]. Riêng việc khai báo y tế, hành khách vui lòng truy cập vào địa chỉ: <a href="https://tokhaiyte.vn" target="_blank">k"https://tokhaiyte.vnc</a>k" hoặc app [Vietnam Health Declaration].</p>
                <br />
                <p>Trân trọng cảm ơn!</p>
              </div>
              <a href="https://dsvn.vn//khuyenmai" target="_self" style={{ display: 'block' }}><img className="img" style={{ marginTop: '10px' }} ng-src="/images/banner-tet-2021-km50.jpg" src="/images/banner-tet-2021-km50.jpg" /></a>
            </div>
            <div className="col-xs-12 col-sm-12 et-col-md-3">
              <div et-ticket-pocket className="list-ticket-deskhop ng-isolate-scope">
                <div className="col-md-12 et-widget" id="ticketPocket" style={{ paddingBottom: '8px' }}>
                  <div className="row et-widget-header"><img src="/images/widgetIcon.png" /><span><strong className="ng-binding">Giỏ vé</strong></span></div>
                  <div className="row">
                    <div className="col-md-12 text-center" ng-show="searchData.ves.chieuDi.length == 0 && searchData.ves.chieuVe.length == 0">
                      <h5 sstyle="margin-top: 4px;" className="ng-binding">Chưa có vé</h5>
                    </div>
                    <div className="col-md-12 text-center ng-hide" ng-show="searchData.ves.chieuDi.length > 0 || searchData.ves.chieuVe.length > 0">
                      <h6 className="ng-binding">Chiều đi</h6>
                    </div>
                    {/* ngRepeat: ve in searchData.ves.chieuDi */}
                    <div className="col-md-12 text-center ng-hide" ng-show="searchData.ves.chieuVe.length > 0">
                      <h6 className="ng-binding">Chiều về</h6>
                    </div>
                    {/* ngRepeat: ve in searchData.ves.chieuVe */}
                  </div>
                  <div className="col-md-12 text-center" style={{ marginTop: '2px' }}><a analytics-on="click" analytics-event="Checkout" href ng-click="pocketDetail($event)" id="btnCheckOut" target="_blank" className="btn btn-sm et-btn ng-binding">Mua vé</a></div>
                </div>
              </div>
              <div et-social className="ng-isolate-scope">
                <div className="col-md-12 et-widget" style={{ paddingBottom: '5px' }}>
                  <div className="text-center text-info" style={{ marginTop: '5px', marginBottom: '5px' }} ng-show="!doneCount">
                    <strong style={{ fontSize: '13px' }} className="ng-binding">
                      {/*Kết nối với chúng tôi*/}Kết nối với chúng tôi
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
                      {/*Kết nối với Cty VTHN*/}Kết nối với Cty VTHN
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
                      {/*Kết nối với Cty VTSG*/}Kết nối với Cty VTSG
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
            <div className="col-md-12 ng-isolate-scope" et-news>
              <style dangerouslySetInnerHTML={{ __html: "\n                  .sales-infor {\n                  margin-left: 15px;\n                  margin-right: 15px;\n                  font-size: 14px;\n                  }\n                  .item a:hover {\n                  text-decoration: none;\n                  }\n                  .box-title {\n                  border-bottom: 3px solid #359BED;\n                  padding: 5px 0px;\n                  display: inline-block;\n                  color: #FFFFFF;\n                  font-weight: bold;\n                  width: 100%;\n                  margin-bottom: 15px;\n                  text-indent: 36px;\n                  height: 35px;\n                  font-size: 14px;\n                  }\n                  .box-text {\n                  background: url(../../images/category.png) no-repeat 10px center;\n                  background-color: #359BED;\n                  display: block;\n                  margin-top: -8px;\n                  width: 232px;\n                  padding: 7px 0px;\n                  }\n                  h4 {\n                  font-weight: 600;\n                  font-family: initial;\n                  }\n                  .sale-content {\n                  font-family: 'Times New Roman';\n                  font-size: 17px;\n                  border-radius: 10px;\n                  background: #fff;\n                  padding: 12px 0px 0px 0px;\n                  margin-bottom: 8px;\n                  border-bottom: 2px solid #e4e4e4;\n                  margin-left: -5px;\n                  margin-right: -5px;\n                  cursor: pointer;\n                  display: block;\n                  }\n                  .sale-content:hover p {\n                  color: #ff6a00!important;\n                  }\n               " }} />
              <div className="et-col-md-12 hidden-print ng-hide" style={{ marginTop: '15px', marginBottom: '15px' }} ng-show="tinTucs.length>0">
                <div className="panel panel-warning" style={{ marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px' }}>
                  <div className="panel-heading">
                    <h3 className="panel-title ng-binding">
                      {/*TIN TỨC & SỰ KIỆN*/} TIN TỨC &amp; SỰ KIỆN
                    </h3>
                  </div>
                  <div className="panel-body">
                    <div style={{ marginBottom: '5px!important' }}>
                      <div className="row">
                        <div className="sales-infor">
                          <div className="clear" />
                          <br />
                          {/* ngRepeat: item in tinTucs */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
              <p><strong>(*) Hành khách có thể truy cập vào Cổng thông tin điện tử của Bộ y tế tại website <a href="https://moh.gov.vn" target="_blank">https://moh.gov.vn</a> mục thông tin điều hành để theo dõi tổng hợp đánh giá cấp độ dịch tại địa phương.</strong></p>
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
              <p><strong>1.	Kế hoạch tổ chức bán vé Tết cho hành khách:</strong></p>
              <p> - Từ 8h00 ngày 01/10/2020: Bán vé cho các tập thể đã đăng ký và bán vé cá nhân trên Website: www.dsvn.vn; vetau.com.vn, giare.vetau.vn; tại các nhà ga, các điểm bán vé và các đại lý bán vé thuộc ĐSVN; qua ứng dụng ví điện tử Momo, Vimo, ứng dụng ViettelPay, app bán vé tàu trên thiết bị di động; qua Tổng đài bán vé khu vực Sài Gòn: 1900152, khu vực Nha Trang: 0258.3822113, khu vực Đà Nẵng: 0236.3823.810, khu vực Hà Nội: 19000109</p>
              <p> - Mỗi hành khách được mua không quá 04 vé cho chiều đi và về</p>
              <p><strong>2. Quy định về việc đổi, trả vé của hành khách:</strong></p>
              <p>2.1. Áp dụng mức khấu trừ trả vé đối với các vé đi tàu trong khoảng thời gian:</p>
              <p> - Từ ngày 05/02/2021 đến hết ngày 13/02/2021 đối với mác tàu số chẵn.</p>
              <p> - Từ ngày 14/02/2021 đến hết ngày 27/02/2021 đối với mác tàu số lẻ.</p>
              <p> - Từ ngày 05/02/2021 đến hết ngày 10/02/2021 đối với mác tàu số lẻ có ga đi là ga Hà Nội, có ga đến từ các ga Phủ Lý đến Đồng Hới.</p>
              <p> - Từ ngày 14/02/2021 đến hết ngày 21/02/2021 đối với mác tàu số chẵn có ga đi từ các ga Đồng Hới đến Phủ Lý và có ga đến là ga Hà Nội.</p>
              <p> * Vé cá nhân: Trả vé trước giờ tàu chạy từ 10 giờ đến dưới 24 giờ, lệ phí là 30% giá vé; từ 1 ngày đến dưới 5 ngày, lệ phí là 20% giá vé; từ 5 ngày trở lên, lệ phí là 10% giá vé.</p>
              <p> * Vé tập thể: Trả vé trước giờ tàu chạy từ 1 ngày đến dưới 5 ngày, lệ phí là 30% giá vé; từ 5 ngày đến dưới 10 ngày, lệ phí là 20% giá vé; từ 10 ngày trở lên, lệ phí là 10% giá vé.</p>
              <p> * Không áp dụng đổi vé cá nhân, tập thể.</p>
              <p>2.2. Ngoài thời gian nêu trên, áp dụng mức khấu trừ đổi vé, trả vé như sau:</p>
              <p> - Đổi vé: Vé cá nhân đổi trước giờ tàu chạy 24 giờ trở lên, lệ phí là 20.000 đồng/vé; không áp dụng đổi vé đối với vé tập thể.</p>
              <p> - Trả vé:</p>
              <p> &nbsp; &nbsp; + Vé cá nhân: Trả vé trước giờ tàu chạy từ 4 giờ đến dưới 24 giờ, lệ phí là 20% giá vé; từ 24 giờ trở lên lệ phí là 10% giá vé.</p>
              <p> &nbsp; &nbsp; + Vé tập thể: Trả vé trước giờ tàu chạy từ 24 giờ đến dưới 72 giờ, lệ phí là 20% giá vé; từ 72 giờ trở lên lệ phí là 10% giá vé.</p>
              <p>2.2. Hình thức trả vé</p>
              <p> - Khi hành khách mua vé và thanh toán online qua website bán vé của ngành Đường sắt, app bán vé hoặc các ứng dụng mua vé tàu hỏa của các đối tác thứ ba thì có thể trả vé online qua các website bán vé của ngành đường sắt hoặc đến trực tiếp nhà ga.</p>
              <p> - Khi hành khách mua vé bằng các hình thức khác, muốn đổi vé, trả vé hành khách đến trực tiếp nhà ga kèm theo giấy tờ tùy thân bản chính của người đi tàu hoặc người mua vé cho nhân viên đường sắt. Đồng thời, thông tin trên thẻ đi tàu phải trùng khớp với giấy tờ tùy thân của hành khách.</p>
              <p><strong>3. Khuyến cáo:</strong></p>
              <p> Để đảm bảo quyền lợi của hành khách đi tàu, khi có sự cố xảy ra như mất vé, trùng chỗ trên tàu, đổi trả vé…Ngành đường sắt khuyến cáo người dân:</p>
              <p> -	Khi mua vé hành khách cần có giấy tờ tùy thân hợp lệ.</p>
              <p> -	Hành khách nên lưu giữ mã vé của thẻ lên tàu để tra cứu lại thông tin khi cần thiết.</p>
              <p> -	Hành khách có “thẻ lên tàu” trùng khớp với thông tin cá nhân mới được vào ga đi tàu.</p>
              <p> -	Để tránh việc mua nhầm “vé giả”, “vé không hợp lệ”, hành khách nên mua vé tại các nhà ga, các điểm bán vé, các đại lý thuộc ngành Đường sắt quản lý; không nên mua vé bên ngoài “cò mồi chợ đen”, các đại lý trá hình sẽ gây thiệt hại về tài chính của hành khách đồng thời không đi được tàu.</p>
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
              <p>
              </p>
              <p>Để phục vụ hành khách mua vé đi tàu ngày càng tốt hơn, mang lại cho người mua sự thuận tiện, dễ dàng trong quá trình mua vé tàu hỏa, tránh các tình trạng giữ vé ảo trên hệ thống bán vé điện tử, </p>
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
              <p>  Quý hành khách đi tàu trong khoảng thời gian từ ngày 20/01/2022 đến hết ngày 28/02/2022 nếu có yêu cầu đổi, trả vé được thực hiện như sau:</p>
              <p>- Hành khách được bảo lưu tiền vé và sử dụng để đi các lịch trình khác bằng đường sắt trong năm 2022. Đường sắt không thu phí trả vé và hết năm 2022 hành khách sẽ được hoàn lại số tiền bảo lưu nếu chưa sử dụng. Thời gian hoàn lại tiền vé kể từ ngày 01/01/2023.</p>
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
    </>
  )
}