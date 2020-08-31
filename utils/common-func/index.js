// import Vue from 'vue';
// // import {i18n} from '@/i18n-setup'

// const getCurrentUser = () => {
//     const userLocalStorage = localStorage.getItem('USER');
//     return userLocalStorage ? JSON.parse(userLocalStorage) : null;
// };
// const sleep = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms));
// };
// const buildFormData = (formData, data, parentKey) => {
//     if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
//         Object.keys(data).forEach(key => {
//             buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
//         });
//     }
//     else {
//         const value = data == null ? '' : data;

//         formData.append(parentKey, value);
//     }
// };
// const customizeTree = function(array, parent, tree) {
//     tree = typeof tree !== 'undefined' ? tree : [];
//     parent = typeof parent !== 'undefined' ? parent : {id: ''};
//     let children = _.map(array, function(o) {
//         if (!o.parentId || o.parentId == '0') o.parentId = '';
//         if (o.type == 'html')
//             o.label = o.body && o.body.options[0] ? _.cloneDeep(shorten(o.body.options[0], 30)) : '';

//         else
//             o.label = o.header.text;

//         return o;
//     });
//     children = _.filter(children, function(child) {
//         return child.parentId == parent.id;
//     });
//     children = _.orderBy(children, ['ordinal', 'createdAt'], ['asc']);
//     if (!_.isEmpty(children)) {
//         if (parent.id == '')
//             tree = children;
//         else
//             parent.children = children;

//         _.each(children, function(child) {
//             customizeTree(array, child);
//         });
//     }

//     return tree;
// };
// const shorten = (str, maxLen, separator' '' ') => {
//     if (str.length <= maxLen) return str;
//     const value = str.substr(0, str.lastIndexOf(separator, maxLen));
//     return v''ue'...'at('', '...');
// };
// const treeRoles = (data, response) => {
//     response = typeof response !== 'undefined' ? response : [];
//     _.forEach(data, function(v) {
//         if (v.key) {
//             const elem = {value: v.key, label: i18n.messages[i18n.locale][v.key] ? i18n.messages[i18n.locale][v.key] : i18n.messages[i18n.locale].accessRightDetail[v.key], key: v.key};
//             if (v.value) {
//                 elem.children = [];
//                 _.forEach(v.value, function(o) {
//                     if (o.key) {
//                         elem.children.push({value: o.key, label: i18n.messages[i18n.locale][o.key] ? i18n.messages[i18n.locale][o.key] : i18n.messages[i18n.locale].accessRightDetail[o.key], key: o.key});
//                         if (o.value) treeRoles(o.value);
//                     }
//                 });
//             }
//             response.push(elem);
//         }
//     });
//     return response;
// };
// const getSpecialString = (data) => {
//     let searchSpecial = '';
//     if (data) {
//         for (let i = 0; i < data.length; i++) {
//             if (/[*?@+^${}[\]().|\\]/.exec(data[i]))
//                 searchSpecial = searchSpecial + '//' + data[i];
//             else
//                 searchSpecial = searchSpecial + data[i];
//         }
//     }
//     return searchSpecial;
// };
// const getKey = (data) => {
//     let value = '';
//     for (let i = 1; i < data.length; i++)
//         value = value + data[i];

//     return value;
// };
// const setCommonRules = (rules, bool) => {
//     _.forEach(rules, (o) => {
//         _.forEach(o, (v, key) => {
//             o[key] = bool;
//         });
//     });
// };
// const locdau = (str) => {
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
//     str = str.replace(/đ/g, 'd');
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
//     str = str.replace(/Đ/g, 'D');
//     str = str.replace(/[&\\\#@^!|_;[,+()$~'=`"*<>{}]/g, '');
//     str = str.replace(/]/g, '');
//     str = str.replace(/-+-/g, ''); // thay thế 2- thành 1-
//     str = str.replace(/^\-+|\-+$/g, '');// cắt bỏ ký tự - ở đầu và cuối chuỗi
//     return str;
// };

// const locdauAutomationConfig = (str) => {
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
//     str = str.replace(/đ/g, 'd');
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
//     str = str.replace(/Đ/g, 'D');
//     str = str.replace(/[&\\\#@^!|_;[,+()$~'=`"*<>]/g, '');
//     str = str.replace(/]/g, '');
//     str = str.replace(/-+-/g, ''); // thay thế 2- thành 1-
//     str = str.replace(/^\-+|\-+$/g, '');// cắt bỏ ký tự - ở đầu và cuối chuỗi
//     return str;
// };

// const locdauWithTag = (str) => {
//     // code by Minit - www.canthoit.info - 13-05-2009
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
//     str = str.replace(/đ/g, 'd');
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
//     str = str.replace(/Đ/g, 'D');
//     str = str.replace(/[&\\\#@^!|_;[,+()$~'=`"*<>]/g, '');
//     str = str.replace(/]/g, '');

//     return str;
// };

// const formatMoneyToString = (num) => {
//     const a = ['', 'một ', 'hai ', 'ba ', 'bốn ', 'năm ', 'sáu ', 'bảy ', 'tám ', 'chín ', 'mười ', 'mười một ', 'mười hai ', 'mười ba ', 'mười bốn ', 'mười lăm ', 'mười sáu ', 'mười bảy ', 'mười tám ', 'mười chín '];
//     const b = ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
//     if ((num = num.toString()).length > 12) return 'Số tiền quá lớn';
//     const n = ('000000000000' + num).substr(-12).match(/^(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);
//     if (!n) return;
//     let str = '';
//     str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'trăm ' : '';
//     str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'tỷ ' : '';
//     str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'trăm ' : '';
//     str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'triệu ' : '';
//     str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'trăm ' : '';
//     str += (n[6] != 0) ? (a[Number(n[6])] || b[n[6][0]] + ' ' + a[n[6][1]]) + 'ngàn ' : '';
//     str += (n[7] != 0) ? (a[Number(n[7])] || b[n[7][0]] + ' ' + a[n[7][1]]) + 'trăm ' : '';
//     str += (n[8] != 0) ? (a[Number(n[8])] || b[n[8][0]] + ' ' + a[n[8][1]]) + 'đồng ' : '';
//     return str;
// };

// const jsonToQueryString = (json) => {
//     return '?' +
//     Object.keys(json).map(function(key) {
//         return encodeURIComponent(key) + '=' +
//         encodeURIComponent(json[key]);
//     }).join('&');
// };
// const getParamsSortOrder = (pagination) => {
//     const result = {
//         page: pagination.currentPage - 1,
//         pageSize: pagination.pageSize
//     };
//     if (pagination.sort)
//         result.order = `${pagination.sort.field}:${pagination.sort.sortOrder}`;

//     if (pagination.orderBy)
//         result.orderBy = `${pagination.orderBy.field}:${pagination.orderBy.sortOrder}`;

//     return jsonToQueryString(result);
// };
// const getWeekDays = function(day) {
//     const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//     var day = new Date(day);
//     const dayName = weekdays[day.getDay()];
//     return dayName;
// };
// const checkTwoArrayHaveAnySameValue = (array1, array2) => {
//     let result = false;
//     for (let i = 0; i < array1.length; i++) {
//         if (result)
//             break;

//         for (let j = 0; j < array2.length; j++) {
//             if (array2[j] == array1[i]) {
//                 result = true;
//                 break;
//             }
//         }
//     }
//     return result;
// };
// const GetFormattedDate = (date) => {
//     const month = format(date.getMonth() + 1);
//     const day = format(date.getDate());
//     const year = format(date.getFullYear());
//     return month + '/' + day + '/' + year;
// };
// const replaceStr = (str, pos, value) => {
//     const arr = str.split('');
//     arr[pos] = value;
//     return arr.join('');
// };
// // Tính tỷ lệ tăng giảm so với kỳ trước
// const getRateUpDown = (previous, current, fixNum) => {
//     return Math.round((((current - previous) / previous) * 100 * Math.pow(10, fixNum))) / Math.pow(10, fixNum);
// };
// // today,tomorow, other
// const findDayAfterToday = (date) => {
//     const now = new Date();
//     if (now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate())
//         return 'today';
//     else {
//         const date_tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
//         if (date_tomorrow.getFullYear() == date.getFullYear() && date_tomorrow.getMonth() == date.getMonth() && date_tomorrow.getDate() == date.getDate())
//             return 'tomorrow'; // date2 is one day after date1.
//         else
//             return 'other';
//     }
// };

// const getOffsetRect = (element) => {
//     const box = element.getBoundingClientRect();

//     const scrollTop = window.pageYOffset;
//     const scrollLeft = window.pageXOffset;

//     const top = box.top + scrollTop;
//     const left = box.left + scrollLeft;

//     return {top: Math.round(top), left: Math.round(left)};
// };
// const getMousePosition = (element, event) => {
//     const mouseX = event.pageX || event.clientX + document.documentElement.scrollLeft;
//     const mouseY = event.pageY || event.clientY + document.documentElement.scrollTop;

//     const offset = getOffsetRect(element);
//     const x = mouseX - offset.left;
//     const y = mouseY - offset.top;

//     return [x, y];
// };

// export {
//     getMousePosition, getOffsetRect
// };

// export default {
//     sleep,
//     buildFormData,
//     customizeTree,
//     shorten,
//     treeRoles,
//     getSpecialString,
//     getKey,
//     setCommonRules,
//     locdau,
//     locdauWithTag,
//     formatMoneyToString,
//     jsonToQueryString,
//     getParamsSortOrder,
//     getWeekDays,
//     checkTwoArrayHaveAnySameValue,
//     replaceStr,
//     getContentSendMail,
//     locdauAutomationConfig,
//     getRateUpDown,
//     findDayAfterToday,
//     getCurrentUser
// };
