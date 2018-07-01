const nebulas = require("nebulas");
const Nebpay = require('nebpay');
const dappAddress = 'n1dxQ3mCZpfWzt3J5ws1Jus622PDnPx5NnT';
var  Account = '';
const pay = new Nebpay();
const call = pay.call.bind(pay, dappAddress);

const neb = new nebulas.Neb();
var nasApi = neb.api;
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));

var getfile = function (func,args,callback) {
    nasApi.call({
        chainID: '1',
        from: Account,
        to: dappAddress,
        value: 0,
        gasPrice: 1000000,
        gasLimit: 2000000,
        contract: {
            function: func,
            args: args
        }
    }).then(function (resp) {
        console.log('----'+resp.result)
        if(callback) callback(resp.result)
    })
};

function getAccountAndShow(){
    console.log('local='+Account);
    window.addEventListener('message', function (e) {
        if (e.data && e.data.data) {
            if (e.data.data.account) {
                Account= e.data.data.account
                console.log('extwallet='+Account);
                getfile("getLastResult","[\""+Account+"\"]",function(result){
                	
                	if(result && result != '"null"'){
                		result = result.substr(1);
                		result = result.slice(0,result.length-1);
                		var html = '';
                		html = '<h5 bgcolor=#rrggbb>历史生成的图片:</h1><img src="./gif/'+Account + '/' + result +'.gif"> </img>';
                		$('#hisimgshow').html(html);
                	}
                });
            }
        }
    })

    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");
};

function createPost(val,callback) {
    const serial = call(0.001, 'begincgif',val,
        {
          goods: {
            name: 'gif创建',
            desc: `gif创建`,
          },
          listener(...args) {
            console.log(args);
            if (callback) {
              callback(serial, ...args);
            }
          }
        }
      );
};

function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    return len;
};
$(document).ready(function (){
	getAccountAndShow();
});
(function($,undefined){
	$.fn.zySearch = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("zySearch - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			
			var defaults = {
					"width":"355",
					"height":"33",
					"callback":function(keyword){
						console.info("搜索的关键字");
						console.info(keyword);
					}
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.createHtml();  // 创建组件html
			};
			
			/**
			 * 功能：创建上传所使用的html
			 * 参数: 无
			 * 返回: 无 
			 */
			this.createHtml = function(){
				
				var html = '';
				html += '<b class="search-img"></b>'; 
				html += '<input id="searchInput" class="search-input" type="text" placeholder="请输入要生成gif的文字">';
				html += '<button class="search-btn btn">生成</button>';
				
				$(self).append(html);
				
	            // 初始化html之后绑定按钮的点击事件
	            this.addEvent();
			};
			
			
			/**
			 * 功能：绑定事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function(){
				// 判断现在是否在移动设备上或屏幕小的情况下点击
				if($("."+para.parentClass).css("width")!="320px"){  // 不是
					// 解除事件
					$('#searchInput').unbind('focus').unbind('blur');
					// 需要修改图片当前top值
					$(".search-img").css({"top": "0px","height":"0px"});
					$('#searchInput').blur();  // 移除焦点
					$("#searchInput").bind("focus",function(){
						$(".search-img").animate({"top": "-23px","height":"24px"}, "slow");
					});
					$("#searchInput").bind("blur",function(){
						$(".search-img").animate({"top": "0px","height":"0"}, "slow");
					});
				}else{  // 是
					$('#searchInput').unbind('focus').unbind('blur');
					$(".search-img").css({"top":"1px","height":"0px"});
					$('#searchInput').blur();  // 移除焦点
					$("#searchInput").bind("focus",function(){
						$(".search-img").animate({"top": "-40px","height":"24px"}, "slow");
					});
					$("#searchInput").bind("blur",function(){
						$(".search-img").animate({"top": "1px","height":"0px"}, "slow");
					});
				}
				
				// 监听浏览器变化
				$(window).resize(function(){
					if($("."+para.parentClass).css("width")!="320px"){  // 不是
						// 解除事件
						$('#searchInput').unbind('focus').unbind('blur');
						// 需要修改图片当前top值
						$(".search-img").css({"top": "0px","height":"0px"});
						$('#searchInput').blur();  // 移除焦点
						$("#searchInput").bind("focus",function(){
							$(".search-img").animate({"top": "-23px","height":"24px"}, "slow");
						});
						$("#searchInput").bind("blur",function(){
							$(".search-img").animate({"top": "0px","height":"0"}, "slow");
						});
					}else{
						$('#searchInput').unbind('focus').unbind('blur');
						$(".search-img").css({"top":"1px","height":"0px"});
						$('#searchInput').blur();  // 移除焦点
						$("#searchInput").bind("focus",function(){
							$(".search-img").animate({"top": "-40px","height":"24px"}, "slow");
						});
						$("#searchInput").bind("blur",function(){
							$(".search-img").animate({"top": "1px","height":"0px"}, "slow");
						});
					}
				});
				
				// 添加搜索回车事件
				document.onkeydown=function(event){
		            var e = event || window.event || arguments.callee.caller.arguments[0];
		            if(e && e.keyCode==13){ // enter 键
		            	// 回调方法
		            	para.callback($("#searchInput").val());
		            }
		        }; 
		        
		        $(".search-btn").bind("click",function(){
		        	// 回调方法
	            	para.callback($("#searchInput").val()); 
	            	console.info("btn click");
	            	var inputValue = $("#searchInput").val();
	            	if(inputValue == 0){
	            		alert("输入为空");
	            		return;
	            	}
	            	if(getByteLen(inputValue) > 30){
	            		alert("len then 30");
	            	}
	            	if(Account==''){
	            		alert('获取账户错误，请刷新页面');
	            	}
	            	var myData = new Date(); 
	            	var filename = myData.getTime();
	            	getfile("getLastResult","[\""+Account+"\"]",function(result){
	            		if(result && result != '"null"'){
	                		result = result.substr(1);
	                		result = result.slice(0,result.length-1);
	                		var html = '';
	                		html = '<h5 bgcolor=#rrggbb>历史生成的图片:</h1><img src="./gif/'+Account + '/' + result +'.gif"> </img>';
	                		$('#hisimgshow').html(html);
	                	}
	                });
	            	createPost("[\""+Account+"\"\,\""+filename+"\"]",function(result){
	            		$.ajax({
		            		type:"POST",
		            		url:"./cgif",//web.xml中的url-pattern，使用struts改成：命名空间/action_**即可.0
		            		data:{
		            			cValue:inputValue, 
		            			userAcct:Account,
		            			fileName:filename
		            		},
		            		dataType:"text",//类型
		            		beforeSend:function(XMLHttpRequest){
		            			console.info("loading");
		            		},
		            		success:function(data,textStatus){//data代表servlet返回的数据，随意命名，一般写msg
		            			console.info("show  ",data);
		            			var html = '';
		        				html += '<h5 bgcolor=#rrggbb>当前生成的图片(请右击另存为):</h1><img src="'+ data +'"> </img>'; 
		        				$('#imgshow').html(html);
		            		},
		            	});
	                });
				});
			};
			// 初始化上传控制层插件
			this.init();
		});
	};
})(jQuery);

