const gohttp = require('gohttp');
const wxkey = require('./wxkey');

var token_api = `https://api.weixin.qq.com/cgi-bin/token`
    +`?grant_type=client_credential`
    +`&appid=${wxkey.appid}&secret=${wxkey.secret}`;



var menu_data = {
    button : [
        {
            name:'Linux',
            type:'view',
            url : 'https://www.linux.org'
        },
        { 
            name:'发图',
            sub_button:[
                {
                    name:'相机拍照',
                    type: 'pic_sysphoto',
                    key:'photo'
                },
                {
                    name:'拍照或相册',
                    type:'pic_photo_or_album',
                    key:'photoes'
                },
                {
                    name:'相册',
                    type:'pic_weixin',
                    key:'my-image'
                }
            ]
        },
        {
            name:'关于我',
            type:'click',
            key:'开发者郜瑞雪'
        }
    ]
};

(async function createMenu(){
    let ret = await gohttp.get(token_api);
    let t = JSON.parse(ret);
    //如果没有成功获取access_token则输出错误信息并退出
    if(t.access_token === undefined){
        console.log(ret);
        process.exit(-1);
    }
    var create_menu_api = `https://api.weixin.qq.com/cgi-bin/menu/create`+`?access_token=${t.access_token}`;

    ret = await gohttp.post(create_menu_api,{
        body:menu_data,
        headers:{
            //此扩展消息头的key值都应该小写 
            'content-type':'text/plain'
        }
    });
    //输出处理结果
    console.log(ret);
})();

