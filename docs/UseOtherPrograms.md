# 与其它程序配合使用

由于本系统较为简陋，功能缺失较多，特出此篇章

## SSL证书

### All in SSL/Certimate

* 由于两程序较为相似，所以此处放在一起

项目地址：

All in SSL：[https://github.com/allinssl/allinssl](https://github.com/allinssl/allinssl)

Certimate：[https://github.com/certimate-go/certimate](https://github.com/certimate-go/certimate)

#### 部署

关于DNS和证书提供商等等都有图形化，相信屏幕前的帅哥/美女都能看懂，这里就不说了

部署证书路径：

```bash
/opt/xiaolan-cdn/xiaolan-cdn-system/node-config/证书名.pem
```

部署私钥路径：

```bash
/opt/xiaolan-cdn/xiaolan-cdn-system/node-config/证书名.key
```

* 此处的证书名请自行替换为想取的证书名

### Acme.sh

* 由于`Acme.sh`为纯命令行，所以我个人建议小白使用`All in SSL/Certimate`

项目地址：[https://github.com/acmesh-official/acme.sh](https://github.com/acmesh-official/acme.sh)

详细DNS API使用方法等请自行查看项目，此处仅提供示例命令

```bash
cd /root/.acme.sh
```

```bash
./acme.sh --issue --server 证书提供商 -dns DNS提供商 -d 域名 --keylength 密钥类型 --days 自动更新天数 --cert-file /opt/xiaolan-cdn/xiaolan-cdn-system/node-config/证书名.pem --key-file /opt/xiaolan-cdn/xiaolan-cdn-system/node-config/证书名.key
```