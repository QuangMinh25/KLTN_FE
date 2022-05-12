import React from "react";
import Regulation from '../../components/Regulation'

export default function KiemTraVe() {
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
                    <div style={{ width: '100000px', marginLeft: '992px', animation: '15s linear 1s infinite normal none running marqueeAnimation-574916' }} className="js-marquee-wrapper">
                        <div className="js-marquee" style={{ marginRight: '0px', float: 'left' }} />
                    </div>
                </div>
                {/* ngView:  */}
                <div data-ng-view className="shuffle-animation ng-scope" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                    <div ng-controller="KiemTraVeController" className="kt-form ng-scope">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="ng-binding">Kiểm tra vé{/*Kiểm tra vé*/}</h3>
                                <div className="alert alert-info">
                                    <div ng-bind-html="'PKTraVe_MoTa'|translate" className="ng-binding">
                                        Theo quy định của Tổng công ty Đường sắt Việt Nam, hành khách có thông tin giấy tờ tùy thân trùng với thông tin trên vé điện tử mới đủ điều kiện vào ga lên tàu.<br />
                                        Để đảm bảo quyền lợi cho hành khách, tránh mua phải vé giả, hoặc vé không đúng với quy định, quý khách có thể kiểm tra lại vé điện tử của mình bằng cách điền đầy đủ các thông tin dưới đây.
                                    </div>
                                </div>
                                <div className="alert alert-danger ng-hide" ng-show="isError">
                                    <div ng-bind-html="'PKTraVe_InputError'|translate" className="ng-binding">Thông tin quý khách nhập chưa chính xác, vui lòng kiểm tra các mục lỗi màu đỏ bên dưới.</div>
                                </div>
                                <div className="alert alert-success ng-hide" ng-show="isValidTicket">
                                    <div ng-bind-html="'PKTraVe_ResultValid'|translate" className="ng-binding"><strong>Vé điện tử của bạn hoàn toàn hợp lệ.</strong></div>
                                </div>
                                <div className="alert alert-danger ng-hide" ng-show="isInvalidTicket">
                                    <div ng-bind-html="'PKTraVe_ResultInValid'|translate" className="ng-binding">
                                        <p><span className="glyphicon glyphicon-info-sign" /> <strong>Không tìm thấy vé điện tử phù hợp.</strong></p>
                                        <p>- Quý khách vui lòng kiểm tra và nhập chính xác các thông tin tìm vé.</p>
                                        <p>- Nếu vẫn không tìm thấy Vé xin vui lòng ra ga để kiểm tra hoặc liên hệ đầu số <strong>19006469</strong> để được trợ giúp.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-xs-4 col-sm-2 col-md-2">
                                    <label className="kt-form-label ng-binding" ng-class="{'has-error': maVeError}">Mã vé{/*Mã vé*/}</label>
                                </div>
                                <div className="col-xs-8 col-sm-4 col-md-4">
                                    <div className="form-group" ng-class="{'has-error': maVeError}">
                                        <span className="control-label ng-binding ng-hide" ng-show="maVeError">Vui lòng nhập mã vé chính xác 8 hoặc 9 ký tự số{/*Vui lòng nhập mã vé chính xác 8 hoặc 9 ký tự số*/}</span>
                                        <input type="text" className="form-control ng-pristine ng-valid" ng-model="searchData.maVe" ng-disabled="isRequesting" ng-change="maVeError = false" placeholder="Nhập mã vé gồm 8 hoặc 9 ký tự số" id="maVe" />
                                    </div>
                                </div>
                                <div className="col-xs-4 col-sm-2 col-md-2">
                                    <label className="kt-form-label ng-binding" ng-class="{'has-error': macTauError}">Mác tàu{/*Mác tàu*/}</label>
                                </div>
                                <div className="col-xs-8 col-sm-4 col-md-4">
                                    <div className="form-group" ng-class="{'has-error': macTauError}">
                                        <span className="control-label ng-binding ng-hide" ng-show="macTauError">Vui lòng nhập mác tàu chính xác{/*Vui lòng nhập mác tàu chính xác*/}</span>
                                        <input type="text" className="form-control ng-pristine ng-valid" ng-model="searchData.macTau" ng-change="macTauError = false" placeholder="Ví dụ SE1, TN1, SE2, SE6 ..." id="gaDen" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-4 col-sm-2 col-md-2">
                                    <label className="kt-form-label ng-binding" ng-class="{'has-error': gaDiError}">Ga đi{/*Ga đi*/}</label>
                                </div>
                                <div className="col-xs-8 col-sm-4 col-md-4">
                                    <div className="form-group" ng-class="{'has-error': gaDiError}">
                                        <span className="control-label ng-binding ng-hide" ng-show="gaDiError">Vui lòng nhập ga đi ghi trên vé{/*Vui lòng nhập ga đi ghi trên vé*/}</span>
                                        <input type="text" className="form-control ng-pristine ng-valid" ng-model="searchData.tenGaDi" ng-change="verifyGa(searchData.tenGaDi, true)" typeahead-on-select="setMaGaDi($item)" typeahead="ga.TenGa for ga in gas | filter:$viewValue | limitTo:10" placeholder="Nhập mã ga đi tại đây" id="gaDi" aria-autocomplete="list" aria-expanded="false" aria-owns="typeahead-0FT-8233" />
                                        <ul className="dropdown-menu ng-isolate-scope ng-hide" ng-show="isOpen()" ng-style="{top: position.top+'px', left: position.left+'px'}" style={{ display: 'block' }} role="listbox" aria-hidden="true" typeahead-popup id="typeahead-0FT-8233" matches="matches" active="activeIdx" select="select(activeIdx)" query="query" position="position">
                                            {/* ngRepeat: match in matches track by $index */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xs-4 col-sm-2 col-md-2">
                                    <label className="kt-form-label ng-binding" ng-class="{'has-error': gaDenError}">Ga đến{/*Ga đến*/}</label>
                                </div>
                                <div className="col-xs-8 col-sm-4 col-md-4">
                                    <div className="form-group" ng-class="{'has-error': gaDenError}">
                                        <span className="control-label ng-binding ng-hide" ng-show="gaDenError">Vui lòng nhập ga đến ghi trên vé{/*Vui lòng nhập ga đến ghi trên vé*/}</span>
                                        <input type="text" className="form-control ng-pristine ng-valid" ng-model="searchData.tenGaDen" ng-change="verifyGa(searchData.tenGaDen, false)" typeahead-on-select="setMaGaDen($item)" typeahead="ga.TenGa for ga in gas | filter:$viewValue | limitTo:10" placeholder="Nhập mã ga đến tại đây" id="gaDen" aria-autocomplete="list" aria-expanded="false" aria-owns="typeahead-0FU-660" />
                                        <ul className="dropdown-menu ng-isolate-scope ng-hide" ng-show="isOpen()" ng-style="{top: position.top+'px', left: position.left+'px'}" style={{ display: 'block' }} role="listbox" aria-hidden="true" typeahead-popup id="typeahead-0FU-660" matches="matches" active="activeIdx" select="select(activeIdx)" query="query" position="position">
                                            {/* ngRepeat: match in matches track by $index */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-4 col-sm-2 col-md-2">
                                    <label className="kt-form-label ng-binding" ng-class="{'has-error': ngayDiError}">Ngày đi{/*Ngày đi*/}</label>
                                </div>
                                <div className="col-xs-8 col-sm-4 col-md-4">
                                    <div className="form-group" ng-class="{'has-error': ngayDiError}">
                                        <span className="control-label ng-binding ng-hide" ng-show="ngayDiError">Vui lòng chọn ngày đi{/*Vui lòng chọn ngày đi*/}</span>
                                        <div className="input-group input-cal-picker">
                                            <input type="text" className="form-control ng-isolate-scope ng-pristine ng-invalid ng-invalid-required ng-valid-date" show-weeks="false" show-button-bar="false" datepicker-popup="dd/MM/yyyy" ng-model="searchData.ngayDi" is-open="ngayDi_opened" min-date="minDate" datepicker-options="dateOptions" ng-required="true" ng-click="open_ngayDi($event)" placeholder="dd/MM/yyyy" id="ngayDi" ng-readonly="true" ng-class="{'et-error-block': ngayDiError}" ng-change="ngayDiError = false" readOnly="readonly" required="required" />
                                            <ul className="dropdown-menu ng-pristine ng-valid ng-valid-date-disabled" style={{ paddingLeft: '2px', display: 'none' }} ng-style="{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}" ng-keydown="keydown($event)" ng-model="date" ng-change="dateSelection()">
                                                <li ng-transclude>
                                                    <div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)" datepicker format-year="yy" starting-day={1} min-date="watchData.minDate" className="ng-isolate-scope">
                                                        {/* ngSwitchWhen: day */}
                                                        <table role="grid" aria-labelledby="datepicker-0FZ-7380-title" aria-activedescendant="datepicker-0FZ-7380-25" ng-switch-when="day" tabIndex={0}>
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <button type="button" className="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabIndex={-1}><i className="glyphicon glyphicon-chevron-left" /></button>
                                                                    </th>
                                                                    <th colSpan={6}>
                                                                        <button id="datepicker-0FZ-7380-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" className="btn btn-default btn-sm" ng-click="toggleMode()" tabIndex={-1} style={{ width: '100%' }}>
                                                                            <strong className="ng-binding">Tháng 4 năm 2022</strong>
                                                                        </button>
                                                                    </th>
                                                                    <th>
                                                                        <button type="button" className="btn btn-default btn-sm pull-right" ng-click="move(1)" tabIndex={-1}><i className="glyphicon glyphicon-chevron-right" /></button>
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th ng-show="showWeeks" className="text-center" />
                                                                    {/* ngRepeat: label in labels track by $index */}
                                                                    <th ng-repeat="label in labels track by $index" className="text-center ng-scope"><small aria-label="Thứ hai" className="ng-binding">T2</small></th>
                                                                    {/* end ngRepeat: label in labels track by $index */}
                                                                    <th ng-repeat="label in labels track by $index" className="text-center ng-scope"><small aria-label="Thứ ba" className="ng-binding">T3</small></th>
                                                                    {/* end ngRepeat: label in labels track by $index */}
                                                                    <th ng-repeat="label in labels track by $index" className="text-center ng-scope"><small aria-label="Thứ tư" className="ng-binding">T4</small></th>
                                                                    {/* end ngRepeat: label in labels track by $index */}
                                                                    <th ng-repeat="label in labels track by $index" className="text-center ng-scope"><small aria-label="Thứ năm" className="ng-binding">T5</small></th>
                                                                    {/* end ngRepeat: label in labels track by $index */}
                                                                    <th ng-repeat="label in labels track by $index" className="text-center ng-scope"><small aria-label="Thứ sáu" className="ng-binding">T6</small></th>
                                                                    {/* end ngRepeat: label in labels track by $index */}
                                                                    <th ng-repeat="label in labels track by $index" className="text-center ng-scope"><small aria-label="Thứ bảy" className="ng-binding">T7</small></th>
                                                                    {/* end ngRepeat: label in labels track by $index */}
                                                                    <th ng-repeat="label in labels track by $index" className="text-center ng-scope"><small aria-label="Chủ nhật" className="ng-binding">CN</small></th>
                                                                    {/* end ngRepeat: label in labels track by $index */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* ngRepeat: row in rows track by $index */}
                                                                <tr ng-repeat="row in rows track by $index" className="ng-scope">
                                                                    <td ng-show="showWeeks" className="text-center h6"><em className="ng-binding">13</em></td>
                                                                    {/* ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-0" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">28</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                26/2*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                26/2
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                26
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-1" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">29</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                27/2*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                27/2
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                27
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-2" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">30</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                28/2*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                28/2
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                28
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-3" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">31</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                29/2*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                29/2
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                29
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-4" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">01</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                1/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                1/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                1
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-5" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">02</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                2/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                2/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                2
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-6" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">03</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                3/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                3/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                3
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                </tr>
                                                                {/* end ngRepeat: row in rows track by $index */}
                                                                <tr ng-repeat="row in rows track by $index" className="ng-scope">
                                                                    <td ng-show="showWeeks" className="text-center h6"><em className="ng-binding">14</em></td>
                                                                    {/* ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-7" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">04</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                4/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                4/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                4
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-8" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">05</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                5/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                5/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                5
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-9" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">06</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                6/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                6/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                6
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-10" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">07</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                7/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                7/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                7
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-11" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">08</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                8/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                8/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                8
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-12" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">09</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                9/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                9/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                9
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-13" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative', borderColor: 'rgb(248, 163, 131)' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">10</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                10/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                10/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                10
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                </tr>
                                                                {/* end ngRepeat: row in rows track by $index */}
                                                                <tr ng-repeat="row in rows track by $index" className="ng-scope">
                                                                    <td ng-show="showWeeks" className="text-center h6"><em className="ng-binding">15</em></td>
                                                                    {/* ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-14" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">11</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                11/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                11/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                11
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-15" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">12</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                12/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                12/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                12
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-16" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">13</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                13/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                13/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                13
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-17" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">14</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                14/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                14/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                14
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-18" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">15</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                15/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                15/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                15
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-19" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">16</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                16/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                16/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                16
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-20" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">17</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                17/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                17/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                17
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                </tr>
                                                                {/* end ngRepeat: row in rows track by $index */}
                                                                <tr ng-repeat="row in rows track by $index" className="ng-scope">
                                                                    <td ng-show="showWeeks" className="text-center h6"><em className="ng-binding">16</em></td>
                                                                    {/* ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-21" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">18</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                18/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                18/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                18
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-22" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">19</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                19/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                19/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                19
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-23" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">20</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                20/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                20/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                20
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-24" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">21</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                21/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                21/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                21
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-25" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm active" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-info">22</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                22/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                22/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                22
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-26" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">23</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                23/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                23/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                23
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-27" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">24</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                24/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                24/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                24
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                </tr>
                                                                {/* end ngRepeat: row in rows track by $index */}
                                                                <tr ng-repeat="row in rows track by $index" className="ng-scope">
                                                                    <td ng-show="showWeeks" className="text-center h6"><em className="ng-binding">17</em></td>
                                                                    {/* ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-28" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">25</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                25/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                25/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                25
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-29" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">26</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                26/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                26/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                26
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-30" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">27</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                27/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                27/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                27
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-31" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">28</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                28/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                28/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                28
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-32" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">29</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                29/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                29/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                29
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-33" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative', borderColor: 'rgb(248, 163, 131)' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding">30</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                30/3*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                30/3
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                30
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-34" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative', borderColor: 'rgb(248, 163, 131)' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">01</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                1/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                1/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                1
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                </tr>
                                                                {/* end ngRepeat: row in rows track by $index */}
                                                                <tr ng-repeat="row in rows track by $index" className="ng-scope">
                                                                    <td ng-show="showWeeks" className="text-center h6"><em className="ng-binding">18</em></td>
                                                                    {/* ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-35" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">02</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                2/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                2/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                2
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-36" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">03</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                3/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                3/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                3
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-37" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">04</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                4/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                4/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                4
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-38" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">05</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                5/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                5/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                5
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-39" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">06</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                6/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                6/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                6
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-40" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">07</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                7/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                7/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                7
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                    <td ng-repeat="dt in row track by dt.date" className="text-center ng-scope" role="gridcell" id="datepicker-0FZ-7380-41" aria-disabled="false">
                                                                        <button type="button" style={{ fontSize: '13px', width: '38px', padding: '0px 10px 10px 0px', position: 'relative' }} ng-style="{'border-color':dt.isTet?'red':((dt.isLeAL||dt.isLeDL)?'#f8a383':undefined)}" className="btn btn-default btn-sm" ng-class="{'btn-info': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabIndex={-1}>
                                                                            <span ng-class="{'text-muted': dt.secondary, 'text-info': dt.current}" className="ng-binding text-muted">08</span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                8/4*
                                                                            </span>
                                                                            <span ng-show="(dt.isTet||dt.isLeAL||dt.lunar.day==1||($parent.$index==0&&$index==0))&&!dt.lunar.leap" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding ng-hide">
                                                                                8/4
                                                                            </span>
                                                                            <span ng-show="!dt.isTet&&!dt.isLeAL&&dt.lunar.day!=1&&($parent.$index!=0||$index!=0)" style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '9px', color: '#70a0f5' }} className="ng-binding">
                                                                                8
                                                                            </span>
                                                                        </button>
                                                                    </td>
                                                                    {/* end ngRepeat: dt in row track by dt.date */}
                                                                </tr>
                                                                {/* end ngRepeat: row in rows track by $index */}
                                                            </tbody>
                                                        </table>
                                                        {/* ngSwitchWhen: month */}
                                                        {/* ngSwitchWhen: year */}
                                                    </div>
                                                </li>
                                                {/* ngIf: showButtonBar */}
                                            </ul>
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-primary" ng-click="open_ngayDi($event)" style={{ padding: '6px 8px 7px 8px' }}>
                                                    <i className="glyphicon glyphicon-calendar" style={{ fontSize: '18px' }} />
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4 col-sm-2 col-md-2">
                                    <label className="kt-form-label ng-binding">Số giấy tờ{/*Số giấy tờ*/}</label>
                                </div>
                                <div className="col-xs-8 col-sm-4 col-md-4">
                                    <div className="form-group">
                                        {/*<span class="control-label" ng-show="cmtError">Vui lòng nhập số giấy tờ cá nhân ghi trên vé</span>*/}
                                        <input type="text" className="form-control ng-pristine ng-valid" ng-model="searchData.cmt" ng-change="cmtError=false" placeholder="Nhập giấy tờ cá nhân ghi trên vé" id="maVe" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <input analytics-on="click" analytics-event="DoCheckTicket" type="button" className="btn btn-primary" ng-click="submitForm()" defaultValue="Kiểm tra vé" style={{ borderRadius: '4px !important' }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div ng-show="isValidTicket" className="ng-hide">
                                <h3 className="ng-binding">Thông tin vé{/*Thông tin vé*/}</h3>
                                {/*Giao dien cho deskhop*/}
                                <table className="table table-bordered list-ticket-deskhop">
                                    <thead className="et-table-header">
                                        <tr>
                                            <th style={{ width: '2%' }}>STT</th>
                                            <th style={{ width: '10%' }}>Mác tàu</th>
                                            <th style={{ width: '10%' }}>Ngày đi</th>
                                            <th style={{ width: '10%' }}>Ga đi</th>
                                            <th style={{ width: '10%' }}>Ga đến</th>
                                            <th style={{ width: '10%' }}>Giá vé</th>
                                            <th style={{ width: '10%' }}>Giảm giá phương thức</th>
                                            <th style={{ width: '10%' }}>Giảm giá thời gian</th>
                                            <th style={{ width: '10%' }}>Tiền dịch vụ</th>
                                            <th style={{ width: '10%' }}>Bảo hiểm</th>
                                            <th style={{ width: '10%' }}>Tiền thu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* ngRepeat: item in items */}
                                    </tbody>
                                </table>
                                {/*Giao dien cho mobile*/}
                                {/* ngRepeat: item in items */}
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
                                    (*) Hành khách có thể truy cập vào Cổng thông tin điện tử của Bộ y tế tại website <a href="https://moh.gov.vn" target="_blank">https://moh.gov.vn</a> mục thông tin điều hành để theo dõi tổng hợp đánh giá cấp độ
                                    dịch tại địa phương.
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
                                - Khi hành khách mua vé và thanh toán online qua website bán vé của ngành Đường sắt, app bán vé hoặc các ứng dụng mua vé tàu hỏa của các đối tác thứ ba thì có thể trả vé online qua các website bán vé của ngành đường
                                sắt hoặc đến trực tiếp nhà ga.
                            </p>
                            <p>
                                - Khi hành khách mua vé bằng các hình thức khác, muốn đổi vé, trả vé hành khách đến trực tiếp nhà ga kèm theo giấy tờ tùy thân bản chính của người đi tàu hoặc người mua vé cho nhân viên đường sắt. Đồng thời, thông
                                tin trên thẻ đi tàu phải trùng khớp với giấy tờ tùy thân của hành khách.
                            </p>
                            <p><strong>3. Khuyến cáo:</strong></p>
                            <p>Để đảm bảo quyền lợi của hành khách đi tàu, khi có sự cố xảy ra như mất vé, trùng chỗ trên tàu, đổi trả vé…Ngành đường sắt khuyến cáo người dân:</p>
                            <p>- Khi mua vé hành khách cần có giấy tờ tùy thân hợp lệ.</p>
                            <p>- Hành khách nên lưu giữ mã vé của thẻ lên tàu để tra cứu lại thông tin khi cần thiết.</p>
                            <p>- Hành khách có “thẻ lên tàu” trùng khớp với thông tin cá nhân mới được vào ga đi tàu.</p>
                            <p>
                                - Để tránh việc mua nhầm “vé giả”, “vé không hợp lệ”, hành khách nên mua vé tại các nhà ga, các điểm bán vé, các đại lý thuộc ngành Đường sắt quản lý; không nên mua vé bên ngoài “cò mồi chợ đen”, các đại lý trá hình
                                sẽ gây thiệt hại về tài chính của hành khách đồng thời không đi được tàu.
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
                                - Hành khách được bảo lưu tiền vé và sử dụng để đi các lịch trình khác bằng đường sắt trong năm 2022. Đường sắt không thu phí trả vé và hết năm 2022 hành khách sẽ được hoàn lại số tiền bảo lưu nếu chưa sử dụng. Thời
                                gian hoàn lại tiền vé kể từ ngày 01/01/2023.
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
        </>
    )
}