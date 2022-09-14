// 导入json初始化变量
import data from './data.json' assert { type : 'json' }
import color from './colorList.json' assert { type : 'json' }
let pluginList = data.data;
let colorlist = color.color;
//获取父节点
let rootDom = document.querySelector(".wrapper");
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
    let colorStr = `--themebordercolor:${themecolor};--themebgcolor:${themecolor+'0a'};`;
    pdom.setAttribute('style',colorStr);
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

    // 添加插件类别进节点
    ptype.appendChild(icon);
    ptype.innerHTML += plugin_type;
    pdom.appendChild(ptype);

    //添加插件到节点
    let pitems = plugin.items;
    pitems.reduce((cdom,pitem)=>{
        let plugin_item = document.createElement("span");
        //0 运行中插件，1 禁用插件，2 维护中插件
        if(pitem.plugin_sta == 0){
            plugin_item.innerText = pitem.plugin_name;
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

