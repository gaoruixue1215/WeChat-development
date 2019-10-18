const formatMsg = require('./fmtwxmsg');

function help(){
    //字符串形式返回帮助信息
    //还可以是以读取文件的形式来返回
    return '你好。这是一个测试号，目前会原样返回用户输入的信息，暂不支持视频类型'
}
/* * 
 *@param {object} wxmsg 解析XML消息的对象
 *@param {object} retmsg 要返回的数据对象
* */ 

function userMsg(wxmsg,retmsg){
    //关键字自动回复
    if(wxmsg.MsgType == 'text'){
        switch(wxmsg.Content){
            case '帮助':
            case 'help':
            case '?':
                retmsg.msg = help();
                retmsg.msgtype = 'text';
                return formatMsg(retmsg);
            case 'about':
                retmsg.msgtype = 'text';
                retmsg.msg = '我是这个测试号的开发者'
                return formatMsg(retmsg);
            case 'who':
                retmsg.msgtype = 'text';
                retmsg.msg = '开发者：郜瑞雪\n学号：2017012057\n班级：8班\n'
                return formatMsg(retmsg);
            default:
                retmsg.msgtype = 'text';
                retmsg.msg = wxmsg.Content;
                return formatMsg(retmsg);
        }
    }
    //处理其他类型的消息
    switch(wxmsg.MsgType){
        case 'image':
        case 'voice':
            retmsg.msgtype = wxmsg.MsgType;
            retmsg.msg = wxmsg.MediaId;
            return formatMsg(retmsg);
        default:
            //retmsg,msgtype类型为空，格式化数据会返回default处理的 数据，提示用户该类型不被支持
            return formatMsg(retmsg);
    }
}

function eventMsg(wxmsg,retmsg){
    retmsg.msgtype = 'text';

    switch (wxmsg.Event){
        case 'subscribe':
            retmsg.msg = '你好，这是一个测试号，尽管没什么用，还是欢迎关注哦';
            return formatMsg(retmsg);
        case 'unsubscribe':
            console.log(wxmsg.FromUserName,'取消关注');
            break;
        case 'CLICK':
            console.log('关于我的key值',wxmsg.EventKey);
            retmsg.msg = wxmsg.EventKey;
            return formatMsg(retmsg);
        case 'VIEW':
            console.log('用户浏览',wxmsg.EventKey);
            break;
        default:
            return '';
    }
    return '';
}

exports.help = help;
exports.userMsg = userMsg;

//后续还会加入事件消息支持
//引入模块
exports.msgDispatch = function(wxmsg,retmsg){
    if(wxmsg.MsgType == 'event'){
        return eventMsg(wxmsg,retmsg);
    }
    return userMsg(wxmsg,retmsg);
}