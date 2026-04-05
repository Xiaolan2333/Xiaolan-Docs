# Xiaolan-CDN-Node

## 存储库

* Gitee：[https://gitee.com/Xiaolan23333/Xiaolan-CDN-Node](https://gitee.com/Xiaolan23333/Xiaolan-CDN-Node)
* GitHub：[https://github.com/Xiaolan2333/Xiaolan-CDN-Node](https://github.com/Xiaolan2333/Xiaolan-CDN-Node)

## 支持的环境

* 一键安装脚本仅支持 **Deb 系**
* 理论支持：
  * 使用 Systemd 管理器的 Linux 系统
* 已测试：Debian 11 ~ 13
* 其他系统建议编译安装（因为我没测试）

## 从V0.0.2更新

由于V0.0.3在目录方面做了较多更改，所以需要使用单独的更新脚本

一键更新命令：

```bash
wget https://github.com/Xiaolan2333/Xiaolan-CDN-Node/releases/download/Xiaolan-CDN-Node-V0.0.3/node-update-to-0.0.3.sh && chmod 777 node-update-to-0.0.3.sh && ./node-update-to-0.0.3.sh
```

* 执行完此更新脚本后需重新在主控端发起同步才可使用此节点
* 此脚本仅支持V0.0.2更新至V0.0.3

## 从V0.0.3更新

由于V0.0.4将NJS模块改为Lua模块，所以需要使用单独的更新脚本

一键更新命令：

```bash
wget https://github.com/Xiaolan2333/Xiaolan-CDN-Node/releases/download/Xiaolan-CDN-Node-V0.0.4/node-update-to-0.0.4.sh && chmod 777 node-update-to-0.0.4.sh && ./node-update-to-0.0.4.sh
```

* 执行完此更新脚本后需重新在主控端发起同步才可使用此节点
* 此脚本仅支持V0.0.3更新至V0.0.4

## 自动安装

```bash
wget https://raw.githubusercontent.com/Xiaolan2333/Xiaolan-CDN-Node/refs/heads/main/install-node.sh && chmod 777 install-node.sh && ./install-node.sh
```

## 手动安装

1. 安装所需运行库

```bash
apt update && apt install wget libgd-dev unzip -y
```

2. 创建目录

```bash
mkdir /opt/xiaolan-cdn/xiaolan-cdn-node
```

3. 下载节点程序

```bash
wget -P /opt/xiaolan-cdn/xiaolan-cdn-node https://github.com/Xiaolan2333/Xiaolan-CDN-Node/releases/latest/download/Xiaolan-CDN-Node.zip
```

4. 解压

```bash
unzip /opt/xiaolan-cdn/xiaolan-cdn-node/Xiaolan-CDN-Node.zip -d /opt/xiaolan-cdn/xiaolan-cdn-node
```

5. 设置权限

```bash
chmod -R 777 /opt/xiaolan-cdn/xiaolan-cdn-node
```

6. 设置 Systemd 服务

```bash
cat > /etc/systemd/system/xiaolan-cdn-node.service << 'EOF'
[Unit]
Description=Xiaolan-CDN-Node
Documentation=https://xiaolan2333.github.io
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/opt/xiaolan-cdn/xiaolan-cdn-node/logs/nginx.pid
ExecStart=/opt/xiaolan-cdn/xiaolan-cdn-node/sbin/nginx
ExecReload=/opt/xiaolan-cdn/xiaolan-cdn-node/sbin/nginx -s reload
ExecStop=/opt/xiaolan-cdn/xiaolan-cdn-node/sbin/nginx -s stop
Restart=always
RestartSec=3s
[Install]
WantedBy=multi-user.target
EOF
```

7. 启动节点

```bash
systemctl daemon-reload
```

```bash
systemctl enable xiaolan-cdn-node --now
```

8. 删除临时文件

```bash
rm /opt/xiaolan-cdn/xiaolan-cdn-node/Xiaolan-CDN-Node.zip
```

## 编译安装

* 此处以 **/root** 目录 **Deb** 系系统为例，其它目录/系统请自行修改命令

1. 进入目录

```bash
cd /root
```

2. 安装所需运行库

```bash
apt install unzip build-essential libgd-dev libxslt-dev libxml2-dev -y
```

3. 下载源代码压缩包

```bash
wget https://raw.githubusercontent.com/Xiaolan2333/Xiaolan-CDN-Node/refs/heads/main/src/src.zip
```

4. 解压

```bash
unzip src.zip
```

5. 设置权限

```bash
chmod -R 777 Xiaolan-CDN-Node
```

6. 安装LuaJIT

```bash
cd LuaJIT-2.1
```

```bash
make -j$(nproc)
```

```bash
make install
```

```bash
export LUAJIT_LIB=/usr/local/lib
```

```bash
export LUAJIT_INC=/usr/local/include/luajit-2.1
```

```bash
cd ..
```

7. 编译并安装Nginx

```bash
cd nginx-1.29.7
```

```bash
./configure --prefix=/opt/xiaolan-cdn/xiaolan-cdn-node --build=Xiaolan-CDN-Node-V0.0.4 --with-threads --with-file-aio --with-http_ssl_module --with-http_v2_module --with-http_v3_module --with-http_realip_module --with-http_addition_module --with-http_image_filter_module --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_auth_request_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_slice_module --with-http_stub_status_module --with-stream --with-stream_ssl_module --with-stream_realip_module --with-stream_ssl_preread_module --with-pcre-jit --with-compat --with-pcre=/root/pcre2-10.47 --with-zlib=/root/zlib-1.3.2 --with-openssl=/root/openssl-3.5.5 --with-ld-opt="-Wl,-rpath,/usr/local/lib" --add-module=/root/ngx-devel-kit --add-module=/root/lua-nginx-module
```

```bash
make -j$(nproc)
```

```bash
make install
```

```bash
cd ..
```

8. 安装Lua核心

```bash
cd lua-resty-core
```

```bash
make install PREFIX=/opt/xiaolan-cdn/xiaolan-cdn-node
```

```bash
cd ..
```

```bash
cd lua-resty-lrucache
```

```bash
make install PREFIX=/opt/xiaolan-cdn/xiaolan-cdn-node
```

```bash
cd ..
```

至此，安装完成