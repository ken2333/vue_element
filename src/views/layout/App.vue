<template>
    <div class="main">
        <div class="header">
            <div class="logo">
                <span class="big">{{ $Config.siteName }}</span>
                <span class="min">
                    <img width="40" style="margin-top: 5px" src="../../assets/images/logo.svg" alt="">
                </span>
            </div>
            <span class="header-btn" @click="hiddenSidebar">
                <i class="el-icon-menu"></i>
            </span>
            <div class="left">
                <span class="header-btn">搜索:</span>
                <div class="header-btn">
                    <el-input v-model="input" placeholder="请输入内容"
                              @keyup.native.enter="search"
                    ></el-input>
                </div>
            </div>
            <div class="right">
                <span class="header-btn">城市：</span>
                <div class="header-btn city">
                    <el-cascader
                            placeholder="可搜索"
                            :options="options"
                            filterable
                            v-model="city"
                            @change="changecity"
                    ></el-cascader>
                </div>
                <span class="header-btn" @click="openAddressList">
                    <i class="fa fa-address-card"></i>
                </span>
                <span class="header-btn" @click="screenfullToggle">
                    <i class="fa fa-arrows-alt"></i>
                </span>
                <el-dropdown>
                    <span class="header-btn">
                        <i class="el-icon-setting"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <div style="padding: 10px;text-align: center;width: 420px">
                            <div class="setting-category">
                                <el-switch
                                        @change="saveSwitchTabBarVal"
                                        v-model="switchTabBar"
                                        active-text="开启TabBar"
                                        inactive-text="关闭TabBar">
                                </el-switch>
                                <el-switch
                                        @change="saveFixedTabBar"
                                        v-if="switchTabBar"
                                        v-model="fixedTabBar"
                                        style="margin-top: 10px"
                                        active-text="固定在顶部"
                                        inactive-text="随页面滚动">
                                </el-switch>
                                <el-alert
                                        v-if="switchTabBar"
                                        style="margin-top: 10px"
                                        title="导航标签超过容器时,可在导航上滚动鼠标来移动标签"
                                        type="info"
                                        show-icon>
                                </el-alert>
                            </div>
                            <div class="setting-category" style="display: flex;height: 80px;align-items: center">
                                <div style="width: 80px">
                                    <el-button type="primary" icon="el-icon-sort" circle @click="ToggleGrayMode"
                                               style="transform: rotate(90deg)"></el-button>
                                </div>
                                <div style="flex: 1;margin-top: -8px">
                                    <el-alert
                                            style="margin-top: 10px"
                                            title="切换灰度模式!"
                                            type="info"
                                            show-icon>
                                    </el-alert>
                                </div>
                            </div>
                            <!--<div class="setting-category">-->
                            <!--下个设置块-->
                            <!--</div>-->

                        </div>
                    </el-dropdown-menu>
                </el-dropdown>

                <span class="header-btn">
                    <el-popover
                            placement="top-start"
                            title="消息提示"
                            width="200"
                            trigger="hover">
                        <ul v-for="info in bellData">
                            <!-- <a :href="'/#/article_detail?id='+info.articleId" >{{info.title}}</a>-->
                            <router-link :to="'/article_detail?id='+info.articleId">{{info.title}}</router-link>
                        </ul>
                        <el-badge :value="bells" class="badge" slot="reference">
                            <i class="el-icon-bell"></i>
                        </el-badge>
                    </el-popover>

                </span>
                <el-dropdown>
                    <span class="header-btn">
                        {{username}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push('/personal')"><i style="padding-right: 8px"
                                                                                       class="fa fa-cog"></i>个人中心
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="logout">
                            <i style="padding-right: 8px" class="fa fa-key"></i>
                            退出系统
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="app">
            <div class="aside">
                <div class="menu">
                    <el-menu
                            router
                            background-color="#222d32"
                            text-color="#fff"
                            :default-active="$route.path" class="menu" @open="handleOpen" @close="handleClose"
                            :collapse="isCollapse" :unique-opened="true">
                        <template v-for="(menu_v,menu_k) in menu">
                            <el-submenu v-if="menu_v.children" :index="menu_k">
                                <template slot="title">
                                    <i :class="menu_v.icon"></i>
                                    <span slot="title">{{ menu_v.name }}</span>
                                </template>
                                <el-menu-item v-for="(menuChildren_v,menuChildren_k) in menu_v.children"
                                              :key="menuChildren_k"
                                              :index="menuChildren_v.path">
                                    <i class="is-children fa fa-circle-o"></i>
                                    <span slot="title">{{ menuChildren_v.name }}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="menu_v.path">
                                <i :class="menu_v.icon"></i>
                                <span slot="title">{{ menu_v.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div>
                <div class="sidebar-toggle" @click="sidebarToggle">
                    <div class="icon-left">
                        <i class="el-icon-back"></i>
                    </div>
                </div>
            </div>
            <div class="app-body">
                <NavBar id="nav-bar" v-if="switchTabBar"
                        :style="fixedTabBar && switchTabBar?'position: fixed;top: 0;':''"></NavBar>
                <div v-else style="margin-top: 50px;"></div>
                <div id="mainContainer" :style="fixedTabBar && switchTabBar?'margin-top: 88px;':''"
                     class="main-container">
                    <!--<transition name="fade">-->
                    <router-view></router-view>
                    <!--</transition>-->
                </div>
                <EuiFooter></EuiFooter>
            </div>
        </div>
        <el-dialog
                title="在线通讯录"
                :visible.sync="addressLine.centerDialogVisible"
                width="30%" :modal="false" :modal-append-to-body="false" >
            <el-table
                    :data="addressLine.friendList"
                    style="width: 100%" :show-header="false" @row-click="openFriend">
                <el-table-column
                        prop="userName"
                        label="用户名称">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                </el-table-column>
            </el-table>
            <el-dialog
                    width="50%"
                    height="400px"
                    :title="addressLine.currentFriend.userName"
                    :visible.sync="addressLine.innerVisible"
                    append-to-body>
                <slot>
                    <div>
                            <ul class="message "
                                v-for="message in addressLine.content[addressLine.currentFriend.userID]"
                                :class="{ 'left':!message.isSelf, 'right': message.isSelf }">
                                <p>{{message.message}}</p>
                                <span>{{message.datetime}}</span></ul>
                    </div>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="addressLine.input"
                            @keyup.enter.native="sendMssage">
                    </el-input>
                </slot>
            </el-dialog>

        </el-dialog>
    </div>
</template>

<script>
    import Screenfull from 'screenfull'
    import EuiFooter from './Footer.vue';
    import NavBar from './NavBar.vue'
    import Menu from '@/menu/index';

    export default {
        data() {
            return {
                addressLine: {
                    friendList: [
                        {userID: 1, userName: "智能客服", status: "在线"},
                        {userID: 3, userName: "java", status: "在线"},
                        {userID: 2, userName: "sun", status: "在线"}],
                    innerVisible: false,
                    centerDialogVisible: false,
                    currentFriend:{},
                    input:"",//输入的内容
                    content:{
                        "1":[],
                        "2":[],
                        "3":[ ]},
                },
                input: "",
                bells: 0,
                bellData: [],
                websoket: {},
                fixedTabBar: false,
                switchTabBar: false,
                siteName: this.$Config.siteName,
                isCollapse: false,
                menu: Menu,
                username: this.$Config.userName,
                options: [ {
                    "children": [{"label": "广州市", "value": "广州市"}, {"label": "深圳市", "value": "深圳市"}, {
                        "label": "清远市",
                        "value": "清远市"
                    }, {"label": "韶关市", "value": "韶关市"}, {"label": "河源市", "value": "河源市"}, {
                        "label": "梅州市",
                        "value": "梅州市"
                    }, {"label": "潮州市", "value": "潮州市"}, {"label": "汕头市", "value": "汕头市"}, {
                        "label": "揭阳市",
                        "value": "揭阳市"
                    }, {"label": "汕尾市", "value": "汕尾市"}, {"label": "惠州市", "value": "惠州市"}, {
                        "label": "东莞市",
                        "value": "东莞市"
                    }, {"label": "珠海市", "value": "珠海市"}, {"label": "中山市", "value": "中山市"}, {
                        "label": "江门市",
                        "value": "江门市"
                    }, {"label": "佛山市", "value": "佛山市"}, {"label": "肇庆市", "value": "肇庆市"}, {
                        "label": "云浮市",
                        "value": "云浮市"
                    }, {"label": "阳江市", "value": "阳江市"}, {"label": "茂名市", "value": "茂名市"}, {
                        "label": "湛江市",
                        "value": "湛江市"
                    }, {"label": "英德市", "value": "英德市"}, {"label": "连州市", "value": "连州市"}, {
                        "label": "乐昌市",
                        "value": "乐昌市"
                    }, {"label": "南雄市", "value": "南雄市"}, {"label": "兴宁市", "value": "兴宁市"}, {
                        "label": "普宁市",
                        "value": "普宁市"
                    }, {"label": "陆丰市", "value": "陆丰市"}, {"label": "恩平市", "value": "恩平市"}, {
                        "label": "台山市",
                        "value": "台山市"
                    }, {"label": "开平市", "value": "开平市"}, {"label": "鹤山市", "value": "鹤山市"}, {
                        "label": "四会市",
                        "value": "四会市"
                    }, {"label": "罗定市", "value": "罗定市"}, {"label": "阳春市", "value": "阳春市"}, {
                        "label": "化州市",
                        "value": "化州市"
                    }, {"label": "信宜市", "value": "信宜市"}, {"label": "高州市", "value": "高州市"}, {
                        "label": "吴川市",
                        "value": "吴川市"
                    }, {"label": "廉江市", "value": "廉江市"}, {"label": "雷州市", "value": "雷州市"}],
                    "label": "广东省",
                    "value": "广东省"
                },]
                , city: this.$Config.city
            }
        },
        methods: {
            search() {
                var self = this;
                var str = self.input;
                if (str != null && str.trim().length > 0) {
                    /*    self.$router.push({
                                name: "PostManage",
                                params: {input: self.input}
                            }
                        )*/
                    self.$router.push(
                        {
                            path: "/post_manage?input=" + str,
                        }
                    )
                }
                else {
                    self.$notify({
                        title: '警告',
                        message: '搜索内容不能为空',
                        type: 'warning'
                    });
                }

            },
            NavBarWidth() {
                let navBar = document.getElementById('nav-bar');
                if (!navBar) return;
                if (!(this.fixedTabBar && this.switchTabBar)) {
                    navBar.style.width = '100%';
                    return;
                }
                let sidebarClose = document.body.classList.contains('sidebar-close')
                if (sidebarClose) {
                    navBar.style.width = '100%';
                    return;
                }
                if (this.isCollapse) navBar.style.width = 'calc(100% - 64px)';
                else navBar.style.width = 'calc(100% - 230px)';

            },
            ToggleGrayMode() {
                document.body.classList.toggle("gray-mode")
            },
            screenfullToggle() {
                if (!Screenfull.enabled) {
                    this.$message({
                        message: '你的浏览器不支持全屏！',
                        type: 'warning'
                    })
                    return false
                }
                Screenfull.toggle();
            },
            saveFixedTabBar(v) {
                v ? localStorage.setItem('fixedTabBar', v) : localStorage.removeItem('fixedTabBar');
                this.NavBarWidth();
            },
            saveSwitchTabBarVal(v) {
                let containerDom = document.getElementById('mainContainer');
                v ? containerDom.style.minHeight = 'calc(100vh - 139px)' : containerDom.style.minHeight = 'calc(100vh - 101px)';
                v ? localStorage.setItem('switchTabBar', v) : localStorage.removeItem('switchTabBar');
                this.NavBarWidth();
            },
            sidebarToggle(e) {
                e.preventDefault();
                if (this.isCollapse) {
                    document.body.classList.remove('sidebar-hidden')
                    this.siteName = this.$Config.siteName
                    this.isCollapse = false;
                } else {
                    document.body.classList.add('sidebar-hidden')
                    this.isCollapse = true;
                }
                this.NavBarWidth();

            },
            hiddenSidebar(e) {
                e.preventDefault();
                document.body.classList.toggle('sidebar-close');
                this.NavBarWidth();
            },
            logout() {
                sessionStorage.removeItem(this.$Config.tokenKey);
                this.$router.push({path: '/login'});
            },
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //关闭菜单
            },
            changecity() {
                this.$Config.city = this.city;
            },
            /*initwebSoket() {
                let app = this;
                let websoket = new WebSocket("ws://localhost:8081/message")
                websoket.onopen = function () {
                    console.log("Socket 已打开");
                    //socket.send("这是来自客户端的消息" + location.href + new Date());
                    //发送用户的id
                    websoket.send("1:" + app.$Config.userID);
                };
                //获得消息事件
                websoket.onmessage = function (msg) {

                    app.bellData.push(JSON.parse(msg.data))
                    app.bells = app.bellData.length;


                }
                //关闭事件
                websoket.onclose = function () {
                    console.log("Socket已关闭");
                };
                //发生了错误事件
                websoket.onerror = function () {
                    alert("Socket发生了错误");
                }
            },*/
            openAddressList: function () {
                this.addressLine.centerDialogVisible = !this.addressLine.centerDialogVisible;
            },
            openFriend: function (row, column, event) {
                    let self=this
                    self.addressLine.currentFriend=row
                    self.addressLine.innerVisible = !self.addressLine.innerVisible

            },
            sendMssage:function () {
                var message="10:"+this.$Config.userID+":"+this.addressLine.currentFriend.userID+":"+this.addressLine.input
                this.socketApi.sendSock(message, this.addMessage);

            },
            //

            //接受到数据后
            addMessage:function (data) {
                self=this;
                var arr=data.split(":");

                switch (arr[0])
                {

                    //{message:"内容2",datetime:new Date(),isSelf:true}
                    case "10":{
                           var from= arr[1]; //发送者id
                           var content=arr[3] //内容
                        this.addressLine.content[from].push({message:content,datetime:new Date().toLocaleString(),isSelf:false})
                      if(this.addressLine.innerVisible==false&&this.addressLine.currentFriend.userID!=from)
                      {
                          this.$notify.info({
                              title: '消息',
                              message: '收到'+this.getUserName(from)+"的一条信息"
                          });
                      }
                        break;
                    }
                    case  "11":{
                        var success= arr[1];
                        if(success=="true")
                        {
                            var from= arr[2]; //发送者id
                            var content=this.addressLine.input
                            this.addressLine.content[from].push({message:content,datetime:new Date().toLocaleString(),isSelf:true})
                            this.addressLine.input="" //清空数据
                        }
                        break
                    }
                }
            },

            //获取userName
            getUserName:function (userID) {
              var map=  this.addressLine.friendList;
              var result=""
                map.forEach(function (user) {
                    if(user.userID==userID)
                        result=user.userName
                })
                return result;
            }

        },
        mounted: function () {

            this.switchTabBar = localStorage.getItem('switchTabBar') ? true : false;
            this.fixedTabBar = localStorage.getItem('fixedTabBar') ? true : false;
            if (this.switchTabBar) document.getElementById('mainContainer').style.minHeight = 'calc(100vh - 139px)';
            if (!this.isCollapse) {
                document.body.classList.remove('sidebar-hidden')
                this.siteName = this.$Config.siteName
            } else {
                document.body.classList.add('sidebar-hidden')
            }

            setTimeout(() => {
                this.NavBarWidth();
            }, 1000);

            //发送userID
            this.socketApi.sendSock("1:"+this.$Config.userID,this.addMessage)
        },
        components: {
            EuiFooter, NavBar
        },
        created: function () {

        },

    }
</script>
<style lang="less">

    .sidebar-hidden {
        .header {
            .logo {
                background: #222d32;
                .big {
                    display: none;
                }
                .min {
                    display: block;
                }
                width: 64px;
            }

        }
        .aside {
            .sidebar-toggle {
                .icon-left {
                    transform: rotate(180deg);
                }
            }
        }
        .main {
            .app-body {
                margin-left: 64px;
            }
        }
    }

    .sidebar-close {
        .header {
            .logo {
                width: 0;
                overflow: hidden;
            }
        }
        .aside {
            margin-left: -230px;
        }
        .main {
            .app-body {
                margin-left: 0;
            }
        }
    }

    .sidebar-hidden.sidebar-close {
        .aside {
            margin-left: -64px;
        }
    }

    .main {
        display: flex;
        .el-menu:not(.el-menu--collapse) {
            width: 230px;
        }
        .app {
            width: 100%;
            background-color: #ecf0f5;
        }
        .aside {
            position: fixed;
            margin-top: 50px;
            z-index: 10;
            background-color: #222d32;
            transition: all 0.3s ease-in-out;
            .menu {
                //    overflow-y: auto;
                height: calc(~'100vh - 100px');
            }
            .sidebar-toggle {
                position: relative;
                width: 100%;
                height: 50px;
                background-color: #367fa9;
                color: #fff;
                cursor: pointer;
                .icon-left {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    right: 0;
                    width: 64px;
                    height: 100%;
                    font-size: 20px;
                    transition: all 0.3s ease-in-out;
                }
            }
        }
        .app-body {
            margin-left: 230px;
            -webkit-transition: margin-left 0.3s ease-in-out;
            transition: margin-left 0.3s ease-in-out;
        }
        .main-container {
            //margin-top: 50px;
            padding: 6px;
            min-height: calc(~'100vh - 101px');
        }
    }

    .header {
        width: 100%;
        position: fixed;
        display: flex;
        height: 50px;
        background-color: #3c8dbc;
        z-index: 10;
        .logo {
            .min {
                display: none;
            }
            width: 230px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #fff;
            background-color: #367fa9;
            -webkit-transition: width 0.35s;
            transition: all 0.3s ease-in-out;
        }
        .right {
            position: absolute;
            right: 0;
        }
        .center {
            margin: 0 auto;
            width: 200px;
        }
        .header-btn {
            .el-badge__content {
                top: 14px;
                right: 7px;
                text-align: center;
                font-size: 9px;
                padding: 0 3px;
                background-color: #00a65a;
                color: #fff;
                border: none;
                white-space: nowrap;
                vertical-align: baseline;
                border-radius: .25em;
            }
            overflow: hidden;
            height: 50px;
            display: inline-block;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            padding: 0 14px;
            color: #fff;
            &:hover {
                background-color: #367fa9
            }
        }

    }

    .menu {
        border-right: none;
    }

    .el-menu--vertical {
        min-width: 190px;
    }

    .setting-category {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .city {
        width: 200px;
    }
    ul.message{
       padding: 20px;

    }
    ul.message.left{
        text-align: left;
    }
    ul.message.right{
        text-align: right;
    }
    ul.message >p{
        font-size: 20px;
    }
</style>
