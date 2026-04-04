# Xiaolan-CDN-System

## 存储库

* Gitee：[https://gitee.com/Xiaolan23333/Xiaolan-CDN-System](https://gitee.com/Xiaolan23333/Xiaolan-CDN-System)
* GitHub：[https://github.com/Xiaolan2333/Xiaolan-CDN-System](https://github.com/Xiaolan2333/Xiaolan-CDN-System)

## 功能

* 同步 Nginx 配置文件
* 集中收集各节点 Nginx 访问日志

## 使用说明

### 支持的环境

* 一键安装脚本仅支持 **Deb 系**
* 理论支持：
  * Linux 内核 ≥ 3.2
  * 使用 Systemd 管理器的 Linux 系统

## 半自动安装

```bash
wget https://raw.githubusercontent.com/Xiaolan2333/Xiaolan-CDN-System/refs/heads/main/install-system.sh && chmod 777 install-system.sh && ./install-system.sh
```

默认安装路径：

```
/opt/xiaolan-cdn/xiaolan-cdn-system
```
> 如果使用 Xiaolan-CDN-Web 的话主控只需要安装到这一步就可以了

### 配置节点列表

```bash
vim /opt/xiaolan-cdn-system/node.conf
```

格式如下：

```
服务器名
IP
端口
用户名
密码

服务器名
IP
端口
用户名
密码
（多个节点按以上格式重复）
```

示例：

```
Aliyun-JP
127.0.0.1
22
root
password
```


### 同步节点配置文件

```bash
cd /opt/xiaolan-cdn/xiaolan-cdn-system && ./main
```

## 手动安装

> 如需使用 Web 面板，建议使用自动安装

### 步骤

1. 创建目录

```bash
mkdir 文件夹路径 && cd 文件夹路径
```

2. 下载主控程序

```bash
wget https://github.com/Xiaolan2333/Xiaolan-CDN-System/releases/latest/download/Xiaolan-CDN-System.zip
```

3. 解压

```bash
unzip Xiaolan-CDN-System.zip
```

4. 设置 Systemd 服务

```bash
cat > /etc/systemd/system/xiaolan-cdn-log.timer << 'EOF'
[Unit]
Description=Xiaolan-CDN-System-Log
Documentation=https://xiaolan2333.github.io

[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
Persistent=true

[Install]
WantedBy=timers.target
EOF
```
```bash
cat > /etc/systemd/system/xiaolan-cdn-log.service << 'EOF'
[Unit]
Description=Xiaolan-CDN-System-Log
Documentation=https://xiaolan2333.github.io
After=network.target

[Service]
Type=oneshot
User=root
WorkingDirectory=/opt/xiaolan-cdn/xiaolan-cdn-system
ExecStart=/opt/xiaolan-cdn/xiaolan-cdn-system/log
SyslogIdentifier=xiaolan-cdn-log

[Install]
WantedBy=multi-user.target
EOF
```

5. 配置节点列表

```bash
vim node.conf
```
> 格式与自动安装相同

6. 放置 Nginx 配置文件

```
主控目录/node-config/
```

7. 同步节点配置文件

```bash
cd 主控目录 && ./main
```

8. 启动日志同步

```bash
systemctl daemon-reload
```
```bash
systemctl enable xiaolan-cdn-log.timer --now
```

日志保存路径：

```
node-access-logs/服务器名-日期.log
```

9. 清理临时文件

```bash
rm /opt/xiaolan-cdn/xiaolan-cdn-system/Xiaolan-CDN-System.zip
```

## 注意事项

* 配置同步会同步整个 `node-config` 目录（所以证书文件也可以塞里面）
* 节点日志路径必须为：

```
/opt/xiaolan-cdn/xiaolan-cdn-node/logs/access.log
```

（需自行在 nginx.conf 中指定）

## 常用操作

### 更新节点配置

```bash
cd 主控目录 && ./main
```

### 更新所有节点

（主控版本需 ≥ 0.0.2）

```bash
cd 主控目录 && ./update
```


### 更新主控

1. 备份 `node-config` 文件夹
2. 删除主控目录全部文件
3. 下载并解压最新版本
4. 还原 `node-config` 文件夹
5. 重启服务

```bash
systemctl restart xiaolan-cdn-log.timer
```

## 从源码运行

这是几个很简单的Go程序，都只需要两个依赖：
```bash
github.com/pkg/sftp
golang.org/x/crypto/ssh
```
只需要安装完依赖后
```bash
go run ***.go
```
即可

## 许可证

本项目基于 **MIT License** 开源