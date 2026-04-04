# Xiaolan-CDN-Web

## 存储库

* Gitee：[https://gitee.com/Xiaolan23333/Xiaolan-CDN-Web](https://gitee.com/Xiaolan23333/Xiaolan-CDN-Web)
* GitHub：[https://github.com/Xiaolan2333/Xiaolan-CDN-Web](https://github.com/Xiaolan2333/Xiaolan-CDN-Web)

> 本面板，不包含系统主程序本体。

## 注意事项

本面板鉴权较为简陋，不建议用于生产环境

必须修改默认密钥和密码，否则等于裸奔

## 从V0.0.2更新

由于V0.0.3在目录方面做了较多更改，所以需要使用单独的更新脚本

一键更新命令：

```bash
wget https://github.com/Xiaolan2333/Xiaolan-CDN-Web/releases/download/Xiaolan-CDN-Web-V0.0.3/web-update-to-0.0.3+.sh && chmod 777 web-update-to-0.0.3+.sh && ./web-update-to-0.0.3+.sh
```

* 更新后需要重新修改 server.js 和 index.html 中的配置项

* 此脚本仅支持V0.0.2更新至V0.0.3

## 必改配置（非常重要）

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/server.js
```

修改以下内容：

```js
const JWT_SECRET = '新的JWT密钥';   // 建议使用复杂随机字符串
const ADMIN_PASSWORD = '新的密码';
```

* 最好把用户名也改了

修改后执行：

```bash
systemctl restart xiaolan-cdn-web.service
```

重启后端进程

编辑：

``` bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/index.html
```

修改以下内容：

```js
const API_BASE = 'http://服务器的IP:3000/api'; 
```


## 支持的环境

* 一键安装脚本仅支持 **Deb 系**
* 理论支持所有可运行 Node.js 的 Linux 系统

### 环境要求

* Nginx 或其它 Web 服务程序
* Node.js（推荐 24 LTS）

## 半自动安装

> 需先安装 Xiaolan-CDN 主控

1. 安装宝塔面板

官网：https://www.bt.cn

安装宝塔面板后：

进入宝塔面板-->安装 Nginx（默认版本即可）

2. 执行安装脚本

```bash
wget https://raw.githubusercontent.com/Xiaolan2333/Xiaolan-CDN-Web/refs/heads/main/install-web.sh && chmod 777 install-web.sh && ./install-web.sh
```

默认安装路径：

```
/opt/xiaolan-cdn/xiaolan-cdn-web
```

3. 修改前端接口地址

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/index.html
```

```bash
const API_BASE = 'http://你的服务器IP:3000/api';
```

4. 修改后端配置

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/server.js
```

修改：

```js
const JWT_SECRET = '新的JWT密钥';   // 建议使用复杂随机字符串
const ADMIN_PASSWORD = '新的密码';
```

* 最好把用户名也改了

修改后执行：

```bash
systemctl restart xiaolan-cdn-web.service
```

重启后端进程


5. 宝塔创建站点

```宝塔面板
传统项目
域名：如有域名填域名:端口，如没有则填服务器IP:端口（最好不使用80 443）
备注：瞎写
根目录：/opt/xiaolan-cdn/xiaolan-cdn-web
FTP：不管它
数据库：不管它
PHP版本：纯静态
网站分类：不管它
```

6. 放行端口

在左侧边栏-->安全-->添加端口规则添加以下两个规则：

```宝塔面板
协议：TCP
端口：3000
其它默认
```

```宝塔面板
协议：TCP
端口：上面项目里设置的IP:端口/域名:端口的冒号后面的那个端口
其它默认
```

7. 修改前端接口地址

``` bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/index.html
```

修改

```js
const API_BASE = 'http://服务器的IP:3000/api'; 
```

8. 访问面板

步骤5中设置的地址

## 手动安装

1. 创建目录

```bash
mkdir 文件夹路径 && cd 文件夹路径
```

2. 下载文件

```bash
wget https://github.com/Xiaolan2333/Xiaolan-CDN-Web/releases/latest/download/Xiaolan-CDN-Web.zip

```

3. 解压

```bash
unzip Xiaolan-CDN-Web.zip
```

4. 设置 Systemd 配置文件

```bash
NODE_PATH=$(which node)
```

```bash
cat > /etc/systemd/system/xiaolan-cdn-web.service << EOF
[Unit]
Description=Xiaolan-CDN-Web
After=network.target

[Service]
User=root
Group=root
WorkingDirectory=/opt/xiaolan-cdn/xiaolan-cdn-web
ExecStart=$NODE_PATH server.js

[Install]
WantedBy=multi-user.target
EOF
```

5. 启动服务

```bash
systemctl daemon-reload
```

```bash
systemctl enable xiaolan-cdn-web.service --now
```

6. 修改后端配置

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/server.js
```

修改以下内容：

```js
const JWT_SECRET = '新的JWT密钥';   // 建议使用复杂随机字符串
const ADMIN_PASSWORD = '新的密码';
```

* 最好把用户名也改了

如果主控不是自动安装则需要修改 server.js 中以下行：

```js
const CONFIG_DIR = '/opt/xiaolan-cdn-system/node-config'; // node-config文件夹所在路径
const NODE_CONF_PATH = '/opt/xiaolan-cdn-system/node.conf'; // node.conf路径
const LOGS_DIR = '/opt/xiaolan-cdn-system/node-access-logs'; // node-access-logs路径
const CMD_DIR = '/opt/xiaolan-cdn-system'; // CDN主程序路径
```

改为部署的实际路径

重启后端进程：

```bash
systemctl restart xiaolan-cdn-web.service
```

7. 修改前端接口地址

``` bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/index.html
```

修改l

```js
const API_BASE = 'http://服务器的IP:3000/api'; 
```

8. 配置 Web 服务

Nginx 或其它 Web 服务程序将网站目录指向部署目录

* 都用手动安装了，具体步骤我就不写了

9. 访问

打开浏览器访问你设置的地址

## 许可证

本项目基于 **MIT License** 开源