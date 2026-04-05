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
wget https://github.com/Xiaolan2333/Xiaolan-CDN-Web/releases/download/Xiaolan-CDN-Web-V0.0.3/web-update-to-0.0.3.sh && chmod 777 web-update-to-0.0.3.sh && ./web-update-to-0.0.3.sh
```

* 更新后需手动重新修改 server.js 和 index.html 中的配置项

* 此脚本仅支持V0.0.2更新至V0.0.3

## 从V0.0.3更新

由于V0.0.4修改了配置的存储办法，所以需要使用单独的更新方式

写更新脚本太费事了，而且Web只有一台服务器需要配置，所以手动更新吧

1. 备份 cdn-config.json

2. 停止后端进程

```bash
systemctl stop xiaolan-cdn-web
```

3. 删除旧文件

```bash
rm -rf /opt/xiaolan-cdn/xiaolan-cdn-web
```

4. 安装新版本

```bash
mkdir /opt/xiaolan-cdn/xiaolan-cdn-web
```

```bash
wget -P /opt/xiaolan-cdn/xiaolan-cdn-web https://github.com/Xiaolan2333/Xiaolan-CDN-Web/releases/latest/download/Xiaolan-CDN-Web.zip
```

```bash
unzip /opt/xiaolan-cdn/xiaolan-cdn-web/Xiaolan-CDN-Web.zip -d /opt/xiaolan-cdn/xiaolan-cdn-web
```

```bash
chmod -R 777 /opt/xiaolan-cdn/xiaolan-cdn-web
```

```bash
rm /opt/xiaolan-cdn/xiaolan-cdn-web/Xiaolan-CDN-Web.zip
```

5. 将备份的 cdn-config.json 覆盖到 /opt/xiaolan-cdn/xiaolan-cdn-web/cdn-config.json

6. 设置变量

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/.env
```

修改以下内容：

```js
JWT_SECRET=新的JWT密钥   // 建议使用复杂随机字符串
ADMIN_PASSWORD=新的密码
```

* 最好把用户名也改了

编辑：

``` bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/config.js
```

修改以下内容：

```js
API_BASE: 'http://服务器的IP:3000/api'
```

7. 访问更新前的地址，继续使用

### 更换Web服务程序（可选）

从V0.0.4开始新安装的Web面板使用Python HTTP Server作为Web服务程序，您可以通过以下方式将宝塔+Nginx更换为Python HTTP Server

1. 删除宝塔面板中的站点

2. 在左侧边栏-->安全-->添加端口规则添加以下规则或者关闭防火墙

```宝塔面板
协议：TCP
端口：8000
其它默认
```

3. 执行以下命令启动Python HTTP Server

```bash
cat > /etc/systemd/system/xiaolan-cdn-web-http.service << EOF
[Unit]
Description=Python HTTP Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/xiaolan-cdn/xiaolan-cdn-web
ExecStart=/usr/bin/python3 -m http.server 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF
```

4. 访问面板

```bash
http://服务器的IP:8000
```

* 手动安装如果安装路径不是 /opt/xiaolan-cdn/xiaolan-cdn-web 的话请自行修改 WorkingDirectory 字段

## 必改配置（非常重要）

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/.env
```

修改以下内容：

```js
JWT_SECRET=新的JWT密钥   // 建议使用复杂随机字符串
ADMIN_PASSWORD=新的密码
```

* 最好把用户名也改了

编辑：

``` bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/config.js
```

修改以下内容：

```js
API_BASE: 'http://服务器的IP:3000/api'
```


## 支持的环境

* 一键安装脚本仅支持 **Deb 系**
* 理论支持所有可运行 Node.js 的 Linux 系统

### 环境要求

* Nginx 或其它 Web 服务程序
* Node.js（推荐 24 LTS）

## 半自动安装

> 需先安装 Xiaolan-CDN 主控

1. 执行安装脚本

```bash
wget https://raw.githubusercontent.com/Xiaolan2333/Xiaolan-CDN-Web/refs/heads/main/install-web.sh && chmod 777 install-web.sh && ./install-web.sh
```

默认安装路径：

```
/opt/xiaolan-cdn/xiaolan-cdn-web
```

2. 修改程序参数

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/.env
```

修改以下内容：

```js
JWT_SECRET=新的JWT密钥   // 建议使用复杂随机字符串
ADMIN_PASSWORD=新的密码
```

* 最好把用户名也改了

编辑：

``` bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/config.js
```

修改以下内容：

```js
API_BASE: 'http://服务器的IP:3000/api'
```

修改后执行：

```bash
systemctl restart xiaolan-cdn-web.service
```

重启后端进程

3. 访问面板

```bash
http://服务器的IP:8000
```

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

4. 设置后端 Systemd 配置文件

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

5. 修改程序参数

编辑：

```bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/.env
```

修改以下内容：

```js
JWT_SECRET=新的JWT密钥   // 建议使用复杂随机字符串
ADMIN_PASSWORD=新的密码
```

* 最好把用户名也改了

编辑：

``` bash
vim /opt/xiaolan-cdn/xiaolan-cdn-web/config.js
```

修改以下内容：

```js
API_BASE: 'http://服务器的IP:3000/api'
```

6. 设置 HTTP 服务

```bash
cat > /etc/systemd/system/xiaolan-cdn-web-http.service << EOF
[Unit]
Description=Python HTTP Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/xiaolan-cdn/xiaolan-cdn-web
ExecStart=/usr/bin/python3 -m http.server 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF
```

7. 启动

```bash
systemctl daemon-reload
```

```bash
systemctl enable xiaolan-cdn-web.service --now
```

```bash
systemctl enable xiaolan-cdn-web-http.service --now
```

8. 访问面板

```bash
http://服务器的IP:8000
```

## 示例Lua脚本

### 5秒盾

#### 说明：

必须修改

```lua
local secret = "Welcome-to-Xiaolan-CDN" -- 必须修改这个密钥，建议使用复杂随机字符串
```

下面是正文：

```lua
-- 配置项
local secret      = "Welcome-to-Xiaolan-CDN" -- 务必修改这个密钥！
local cookie_name = "Xiaolan-CDN" -- Cookie 的名称
local wait_time   = 5 -- 强制等待时间（秒）
local valid_time  = 3600 -- Token 有效期（秒），2 小时


local client_ip  = ngx.var.remote_addr
local user_agent = ngx.var.http_user_agent or ""
local token      = ngx.var["cookie_" .. cookie_name]

-- 签名函数
local function make_sign(ip, ua, ts)
    return ngx.md5(ip .. ua .. ts .. secret)
end

-- 检查 Cookie
if token then
    local ts, sign = token:match("^(%d+)%-(%w+)$")
    if ts and sign then
        local now = ngx.time()
        ts = tonumber(ts)
        
        -- 检查时间戳
        if now >= ts + wait_time and now <= ts + valid_time then
            local expected_sign = make_sign(client_ip, user_agent, ts)
            if sign == expected_sign then
                return
            end
        end
    end
end

-- 验证失败或首次访问，生成新的 Token 并展示5秒盾页面
local cur_ts = ngx.time()
local cur_sign = make_sign(client_ip, user_agent, cur_ts)
local new_token = cur_ts .. "-" .. cur_sign

-- HTML 页面
ngx.header.content_type = "text/html; charset=utf-8"
local html = [=[
<!DOCTYPE html>
<html lang="en-US" dir="ltr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>请稍候…</title>
    <style>
        @keyframes dots {
            0% { content: "" }
            25% { content: "." }
            50% { content: ".." }
            75% { content: "..." }
            to { content: "" }
        }
        * { box-sizing: border-box; margin: 0; padding: 0 }
        button,html { font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji }
        body { display: flex; flex-direction: column; height: 100vh; min-height: 100vh }
        body.theme-dark a:active,body.theme-dark a:focus { border-radius: 2px; outline: 2px solid #4693ff; outline-offset: 2px }
        body.theme-light .botnet-banner a:active,body.theme-light .botnet-banner a:focus { border-radius: 2px; outline: 2px solid #4693ff; outline-offset: 2px }
        .main-content { margin: 8rem auto; max-width: 60rem; padding-left: 2rem; padding-right: 2rem; width: 100% }
        .main-content .loading-verifying { height: 76.391px }
        .main-wrapper { align-items: center; display: flex; flex: 1; flex-direction: column }
        h1 { font-size: 2.5rem }
        h1,h2 { font-weight: 600; line-height: 125% }
        h2 { font-size: 1.5rem }
        .ch-ordered-list { padding-left: 1.5rem; padding-right: 0 }
        .ch-description { font-weight: 400; margin-bottom: 2rem; margin-top: 0 }
        .ch-title { margin: 8px 0 }
        .footer { line-height: 1.125rem; margin: 0 auto; max-width: 60rem; padding-left: 2rem; padding-right: 2rem; width: 100% }
        .footer,.footer a { font-size: .75rem }
        .footer-inner { border-top: 1px solid #d9d9d9; display: flex; justify-content: center; padding-bottom: 1rem; padding-top: 1rem }
        .footer-wrapper { text-align: center }
        .footer-divider { border: 1px solid #d9d9d9; height: 12px }
    </style>
</head>
<body>
    <div class="main-wrapper lang-zh-cn" role="main">
        <div class="main-content">
            <h1 class="ch-title spacer-bottom">执行安全验证</h1>
            <h2 class="ch-description spacer-top">正在验证您是否是真人，这可能需要几秒钟时间。</h2>
            <h1>请等待<span class="ui-counter">]=] .. wait_time .. [=[</span>秒</h1>
        </div>
    </div>
    <div class="footer" role="contentinfo">
        <div class="footer-inner">
            <div class="footer-wrapper">
                <div class="clearfix diagnostic-wrapper"></div>
                <div class="footer-link-wrapper">
                    <span class="footer-text">性能和安全由 <a rel="noopener noreferrer" href="https://www.xiaolan.xin" target="_blank">Xiaolan</a> 提供</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        (function() {
            var timeLeft = ]=] .. wait_time .. [=[;
            var counterEl = document.querySelector('.ui-counter');
            
            var interval = setInterval(function() {
                timeLeft--;
                if (counterEl) {
                    counterEl.textContent = timeLeft;
                }
                
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    
                    // 倒计时结束，写入 Cookie 并刷新
                    var d = new Date();
                    d.setTime(d.getTime() + (]=] .. valid_time .. [=[ * 1000));
                    var expires = "expires=" + d.toUTCString();
                    
                    document.cookie = "]=] .. cookie_name .. [=[" + "=" + "]=] .. new_token .. [=[" + "; " + expires + "; path=/; SameSite=Lax";
                    
                    window.location.reload();
                }
            }, 1000);
        })();
    </script>
</body>
</html>
]=]

ngx.say(html)
-- 中断请求，不再向下游传递
ngx.exit(ngx.HTTP_OK)
```


## 许可证

本项目基于 **MIT License** 开源