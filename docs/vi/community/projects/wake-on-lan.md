---
id: wake-on-lan
title: Đánh thức máy tính qua mạng (Wake-on-LAN)
description: 'Kiểm tra các điều kiện tiên quyết của WoL, thành phần phụ thuộc bên thứ ba và thử nghiệm cục bộ trước khi tích hợp điều khiển bằng giọng nói.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Không phải tất cả các dự án và nguyên mẫu từ bên thứ ba đều đã được kiểm thử. Vui lòng kiểm tra chính xác phiên bản và yêu cầu phần cứng trước khi sử dụng.
sourceArticles:
  - DOC-36
translation:
  status: review
  sourceHash: 17efa582331ca99d4020ead7331b9613dee82ba119c2886ebf322e005db33d73
  reviewedAt: '2026-11-15'
---
# Đánh thức máy tính qua mạng (Wake-on-LAN)

Ví dụ này do **ZongZiTongXue (粽子同学)** thực hiện, sử dụng ESP8266 để gửi gói tin Wake-on-LAN (WoL) trong mạng nội bộ, được kích hoạt thông qua một nền tảng MCP của bên thứ ba. Tài liệu này chỉ bao gồm tính năng đánh thức máy tính; việc đánh thức thành công không đồng nghĩa với việc hỗ trợ tắt máy từ xa.

<a name="scope"></a>

## Kiểm tra các điều kiện tiên quyết {#scope}

- Card mạng, bo mạch chủ và trạng thái nguồn tương ứng của máy tính phải hỗ trợ WoL và đã được bật theo đúng hướng dẫn của phần cứng/hệ điều hành.
- Máy tính luôn được cắm nguồn điện và sử dụng kết nối mạng có dây (Ethernet) theo yêu cầu của thiết kế này.
- Mô-đun đánh thức luôn được cấp nguồn, trực tuyến và có đường truyền mạng thông suốt tới máy tính. Kiểm tra xem bộ định tuyến có bật tính năng cô lập máy khách (client isolation) hay không.
- Nền tảng bên thứ ba, firmware mô-đun và cầu nối MCP phải có nguồn gốc và phiên bản xác định rõ ràng.

<figure class="source-figure">

[![Xác minh khả năng đánh thức qua mạng nội bộ trước khi thêm điều khiển bằng giọng nói.](../../../public/images/en/wake-on-lan-flow.svg)](../../../public/images/en/wake-on-lan-flow.svg)

<figcaption>Xác minh khả năng đánh thức qua mạng nội bộ trước khi thêm điều khiển bằng giọng nói. Nhấp để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="local"></a>

## 1. Thử nghiệm cục bộ trước {#local}

Sử dụng một công cụ WoL cục bộ đáng tin cậy để xác nhận máy tính có thể được đánh thức. Ghi lại địa chỉ MAC của card mạng có dây, mạng đích và trạng thái nguồn. Việc tích hợp giọng nói sẽ không thể khắc phục nếu quá trình đánh thức cục bộ thất bại.

Địa chỉ MAC/IP dùng để định danh cấu hình mạng; chúng không phải là tài khoản nền tảng hay mã định danh UUID của mô-đun. Tuyệt đối không điền chúng vào các trường không liên quan.

<a name="module"></a>

## 2. Mô-đun và nền tảng {#module}

Tệp nhị phân (binary) dành riêng cho ESP8266 và mã kiểm tra toàn vẹn (checksum) được cung cấp bên dưới. Đây không phải là firmware `xiaozhi-esp32` và không thể thay thế bằng bất kỳ bản phát hành firmware chính nào khác. Mã nguồn cần được liên hệ trực tiếp tác giả để xin cấp; đây không phải là giải pháp mã nguồn mở độc lập chính thức. Hãy kiểm tra nguồn gốc xuất xứ, sau đó làm theo tài liệu đi kèm để nạp firmware, cấu hình mạng và xác minh mô-đun đã trực tuyến.

Quy trình hoạt động phụ thuộc vào các dịch vụ bên ngoài như `xiaozhimcp.top`. Trước khi sử dụng, hãy xác minh địa chỉ HTTPS hiện hành, đơn vị vận hành và mục đích sử dụng thông tin xác thực. Sau đó, cấu hình điểm cuối (endpoint) bằng tài khoản của riêng bạn theo hướng dẫn của nền tảng.

<SourceMaterials article="DOC-36" />

### Nhập thông tin mô-đun và máy tính

Để xem toàn bộ quy trình cài đặt và các thông số nạp firmware chi tiết, vui lòng tham khảo [hướng dẫn do tác giả duy trì (tiếng Trung)](https://kcn80f4hacgs.feishu.cn/docx/RxRXd8aMDomjUXxlUcCcOE48ndh) và [video cài đặt (tiếng Trung)](https://v.douyin.com/PvTrtOBS1n8/). Đảm bảo cổng truy cập hiện tại của dịch vụ hỗ trợ HTTPS trước khi cấu hình các trường sau:

| Trường thông tin | Nơi lấy thông tin | Không được thay thế bằng |
| --- | --- | --- |
| UUID của mô-đun đánh thức | Phần hậu tố của tên điểm phát sóng cấu hình `WLHX-XXXXXXXX`; hãy ghi lại trước khi cấu hình mạng | Không phải UUID khởi động của ESP32 hay MAC của máy tính |
| IPv4 của máy tính đích | Windows Settings → Network & internet → Ethernet → thuộc tính mạng hiện tại | Không phải IP của card Wi-Fi hay điện thoại |
| MAC của máy tính đích | Địa chỉ vật lý (Physical address) của chính kết nối Ethernet có dây đó | Không phải địa chỉ MAC của mô-đun đánh thức |
| Điểm cuối XiaoZhi MCP | Đường dẫn endpoint đầy đủ từ mục [cài đặt mở rộng](../../mcp/quickstart.md#endpoint) của trợ lý (agent) mục tiêu | Không phải trường IP máy tính hay UUID mô-đun |

Ngoài ra, bạn có thể chạy lệnh `ipconfig /all` trên Windows để tìm địa chỉ IPv4 và địa chỉ vật lý bên dưới đúng bộ điều hợp mạng Ethernet có dây. Kiểm tra kỹ để chắc chắn cả hai thông số đều thuộc cùng một card mạng.

Làm theo quy trình trên nền tảng của tác giả để thêm mô-đun, nhập tên gợi nhớ cho máy tính, địa chỉ IPv4, địa chỉ MAC và lưu lại. Bật công cụ phần cứng thông minh tương ứng và khởi động dịch vụ MCP của trợ lý đó. Hãy thử nghiệm nút đánh thức trên nền tảng trước khi chuyển sang bước điều khiển bằng giọng nói bên dưới. UUID của mô-đun và MAC/IP của máy tính là các mã định danh khác nhau; hãy sửa lại các trường này trước nếu lỡ nhập nhầm lẫn.

<a name="verify"></a>

## 3. Từ nền tảng đến điều khiển giọng nói {#verify}

1. Sử dụng nút kiểm tra trên nền tảng trước và xác nhận máy tính đã bật nguồn.
2. Kết nối trợ lý (agent) của bạn và xác nhận hệ thống đã nhận diện được công cụ đánh thức tương ứng.
3. Kích hoạt bằng tên thiết bị rõ ràng, đồng thời kiểm tra lịch sử gọi công cụ thực tế và trạng thái nguồn của máy tính.
4. Kiểm thử các tình huống như mô-đun bị mất điện, thay đổi bộ định tuyến và các trạng thái ngủ (sleep)/tắt máy (shutdown) khác nhau của máy tính.

Phản hồi thành công từ công cụ không đồng nghĩa với việc máy tính đã thực sự khởi động. Việc đánh thức thành công cũng không đồng nghĩa với việc hỗ trợ tắt máy từ xa.

<a name="sources"></a>

## Các bước tiếp theo {#sources}

Tìm hiểu [hướng dẫn bắt đầu nhanh MCP](../../mcp/quickstart.md), sau đó lựa chọn phương án bảo trì phù hợp cho hệ thống mạng của bạn.
