const ISTEST = /^(uat|172\.18\.3)/.test(window.location.host);
/* eslint-disable */
export const initVConsole = function () {
  if (ISTEST) {
    let script = document.createElement("script");
    let script2 = script.cloneNode();
    script.src = "./vconsole.min.js";
    script2.innerHTML = `
            var vConsole = new VConsole();
            var navigation = new VConsole.VConsolePlugin('navigation', 'Navigation');
            navigation.on('renderTab', function(callback) {
                var html = '<div>点击Refresh按钮刷新当前页，Redirect跳转到指定页</div>';
                callback(html);
            });
            navigation.on('addTool', function(callback) {
                var redirect = {
                    name: 'Redirect',
                    onClick: function(event) {
                        var _url = window.prompt("输入你要跳转的页面",window.location.href);
                        if(_url){
                            _url = /^http:\\/\\//.test(_url) ? _url : 'http://' + _url;
                            window.location.href = _url;
                        }
                    }
                };
                var refresh = {
                    name: 'Refresh',
                    onClick: function(event) {
                        location.reload();
                    }
                };
                callback([refresh,redirect]);
            });
            vConsole.addPlugin(navigation);
            `;
    document.head.appendChild(script);
    script.onload = function () {
      setTimeout(_ => {
        document.head.appendChild(script2);
      }, 20);
    };
  }
};
export const logOriginData = function (res) {
  if (ISTEST) {
    let _url = res.config.url;
    let _code = /\/(\d+)\//.exec(_url)[1];
    let requestInfo = {};
    requestInfo[_code] = _url.slice(_url.lastIndexOf("/") + 1);
    requestInfo["url"] = _url;
    requestInfo["requestData"] = res.config.requestData;
    requestInfo["responseData"] = res.data;
    console.log(requestInfo);
  }
};
export default {
  initVConsole,
  logOriginData
};
