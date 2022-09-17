// 导入json初始化变量
import data from './data.json' assert { type : 'json' }
import color from './colorList.json' assert { type : 'json' }
let pluginList = data.data;
let colorlist = color.color;
let logoArr = Array.from(Array(24), (v,k) =>k+1);

//公共方法
// function CheckImgExists(imgurl) {
//     let ImgObj = new Image(); //判断图片是否存在  
//     ImgObj.src = imgurl;
//     if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
//         return true;
//     } else {
//         return false;
//     }
// }


//渲染开始
//获取父节点
let rootDom = document.querySelector(".wrapper");

//sider左右随机渲染
let sider = document.getElementById("sider");



//初始化插件列表dom
let content = document.createElement("div");
content.classList.add("content")
//循环插件项插入dom
pluginList.reduce((dom,plugin)=>{
    let pdom = document.createElement("div");
    // 随机取颜色
    let index = Math.floor((Math.random()*colorlist.length));
    let themecolor = colorlist[index];
    colorlist.splice(index, 1);
    let colorStr = `--themebordercolor:${themecolor};--themebgcolor:${themecolor+'0a'};--pluginbgcolor:${themecolor+'5c'};`;
    pdom.setAttribute('style',colorStr);

    //类型盒子创建
    let ptypebox = document.createElement("div");
    // 添加对应图标
    let ptype = document.createElement("span");
    let plugin_type = plugin.plugin_type;
    let icon = document.createElement("i");
    icon.classList.add("fa");

    if(plugin_type == "功能")icon.classList.add("fa-cog");
    else if (plugin_type == "原神相关")icon.classList.add("fa-circle-o");
    else if (plugin_type == "联系管理员")icon.classList.add("fa-envelope-o");
    else if (plugin_type == "常规插件")icon.classList.add("fa-cubes");
    else if (plugin_type == "抽卡相关")icon.classList.add("fa-credit-card-alt");
    else if (plugin_type == "来点好康的")icon.classList.add("fa-picture-o");
    else if (plugin_type == "数据统计")icon.classList.add("fa-bar-chart");
    else if (plugin_type == "一些工具")icon.classList.add("fa-scissors");
    else if (plugin_type == "商店")icon.classList.add("fa-shopping-cart");
    else if (plugin_type == "其它")icon.classList.add("fa-tags");
    else if (plugin_type == "群内小游戏")icon.classList.add("fa-gamepad");
    else icon.classList.add("fa-pencil-square-o");
    
    //添加真寻元素
    let logo = document.createElement("div");
    logo.classList.add("logo");
    let imgDom = document.createElement("img");

    let logoIndex = Math.floor((Math.random()*logoArr.length));
    let logoUrl = `/res/logo/${logoArr[logoIndex]}.png`;
    logoArr.splice(logoIndex, 1);
    imgDom.src=logoUrl;

    
    // dom插入
    ptype.appendChild(icon);
    ptype.innerHTML += plugin_type;
    ptypebox.appendChild(ptype);

    logo.appendChild(imgDom);
    ptypebox.appendChild(logo);

    pdom.appendChild(ptypebox);

    //添加插件到节点
    let pitems = plugin.items;
    pitems.reduce((cdom,pitem,index)=>{
        let plugin_item = document.createElement("span");
        let plugin_item_bg = document.createElement("div");
        plugin_item_bg.classList.add("splic");
        //0 运行中插件，1 禁用插件，2 维护中插件
        if(pitem.plugin_sta == 0){
            // if(index%2 == 1){
            //     plugin_item.innerText = pitem.plugin_name;
            //     plugin_item.appendChild(plugin_item_bg);
            // }else{
            //     plugin_item.appendChild(plugin_item_bg);
                // plugin_item.innerHTML += pitem.plugin_name;
            // }
            plugin_item.innerText = pitem.plugin_name;
            plugin_item.appendChild(plugin_item_bg);
            cdom.appendChild(plugin_item);
        }else if (pitem.plugin_sta == 1) {
            //禁用插件添加不同样式
            plugin_item.classList.add("ban");
            plugin_item.innerText = pitem.plugin_name;
            cdom.appendChild(plugin_item);
        } else {
            plugin_item.classList.add("ban");
            //维护中插件使用删除字样
            let del_plugin = document.createElement("del");
            del_plugin.innerText = pitem.plugin_name;
            plugin_item.appendChild(del_plugin);
            cdom.appendChild(plugin_item);
        }
        return cdom;
    },pdom);
    dom.appendChild(pdom);
    return dom;
},content);

//渲染dom
rootDom.appendChild(content);

if(Math.random()<=0.5){
    sider.classList.add("sider-left");
    document.querySelector(".des").classList.add("des-left");
    document.querySelector(".content").classList.add("content-left");
}else{
    sider.classList.add("sider-right");
    document.querySelector(".des").classList.add("des-right");
    document.querySelector(".content").classList.add("content-right");
    // rootDom.setAttribute('style',"--sidermargin:10px 10%;");
}
