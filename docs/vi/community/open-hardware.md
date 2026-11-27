---
id: open-hardware
title: Phần cứng mã nguồn mở từ cộng đồng
description: 'Tìm kiếm sơ đồ mạch gốc, thiết kế vỏ máy, thông tin tác giả và khả năng hỗ trợ firmware tương thích.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-37
translation:
  status: review
  sourceHash: 57c08d391701659fd545bd4150caa26ef56da4fb6ff0657ae485e05a4dfab189
  reviewedAt: '2026-11-15'
---
# Phần cứng mã nguồn mở từ cộng đồng

Sử dụng danh mục này để tìm kiếm thông tin nhà thiết kế gốc, sơ đồ mạch điện và các tệp cơ khí/vỏ máy. Việc một dự án được liệt kê tại đây không đồng nghĩa với việc mọi bo mạch đều đã được kiểm thử lại trên trang tài liệu này. Hãy kiểm tra mục [các bo mạch được hỗ trợ](../hardware/supported-boards.md) để tìm firmware tương ứng.

<a name="projects"></a>

## Các dự án và tác giả {#projects}

| Dự án | Tác giả gốc / Người duy trì | Liên kết dự án gốc |
| --- | --- | --- |
| Bo mạch phát triển Xmini-C3 | Xia Ge (虾哥) / tenclass01 | [OSHWHub](https://oshwhub.com/tenclass01/xmini_c3) |
| Bo mạch đàm thoại AI ESP32-S3 | netero | [Tệp thiết kế](https://oshwhub.com/netero/esp32-s3-ai) |
| xiaozhi_c3_hardware | Kevincoooool | [GitHub](https://github.com/Kevincoooool/xiaozhi_c3_hardware) |
| Bo mạch mở rộng S3 44/42 chân | surfer | [Tệp thiết kế](https://oshwhub.com/surferlong/esp32s3-xiaozhi-ai-chat-robot-de) |
| Mạch mở rộng nguồn Wi-Fi/ML307 | Fancheng (凡诚) / banana8 | [Tệp thiết kế](https://oshwhub.com/banana8/xia-ge-zhuan-yong) |
| Phiên bản phái sinh Moji XiaoZhi | Amuxi (阿慕希) / movecall | [Tệp thiết kế](https://oshwhub.com/movecall/moji-xiaozhi-ai-derivative-editi) |
| ESP-SparkBot | Espressif (乐鑫小铁匠) / esp-college | [Dự án](https://oshwhub.com/esp-college/esp-sparkbot) |
| Vỏ máy cho bản C3 | Anbin | [Thiết kế cơ khí](https://oshwhub.com/anbin/xiao-zhi-ai-yu-yin-dui-hua-kai-fa-ban-c3) |

<a name="scope"></a>

## Đánh giá khả năng tái tạo của một bản dựng {#scope}

Hãy kiểm tra trực tiếp các tệp thiết kế công khai và phiên bản thực tế thay vì chỉ tin vào nhãn “mã nguồn mở”:

1. Các tệp sơ đồ nguyên lý (schematics), tệp mạch in PCB/sản xuất và tệp thiết kế vỏ máy có đầy đủ hay không?
2. Chúng mô tả phiên bản phần cứng (revision) nào, và những linh kiện/giao tiếp nào khớp với mạch của bạn?
3. Giấy phép sử dụng (license) cho phép mức độ sử dụng và phân phối lại như thế nào? Cần ghi nhận công lao tác giả và tài nguyên bên thứ ba ra sao?
4. Có sẵn firmware tương thích kèm theo câu lệnh biên dịch, danh sách lỗi đã biết và hướng dẫn khôi phục hay không?

Nếu các tệp chỉ được chia sẻ trong nhóm chat kín hoặc qua liên kết lưu trữ đám mây đã hết hạn, hãy liên hệ người duy trì dự án để xin một đường dẫn công khai ổn định. Tuyệt đối không mô tả một bộ tài liệu thiếu hụt là dự án có thể tái tạo hoàn chỉnh. Giá bán cũ, tình trạng tồn kho hay số nhóm chat không phải là tiêu chí lựa chọn.

<a name="contribute"></a>

## Đóng góp dự án mới {#contribute}

Vui lòng cung cấp đường dẫn URL của dự án, tên tác giả, phiên bản phần cứng, loại giấy phép, danh mục các tệp đính kèm, firmware tương thích và báo cáo kết quả kiểm thử. Hình ảnh thực tế giúp nhận diện ngoại quan bo mạch dễ hơn; tuy nhiên các thông số chi tiết về mạch điện và kích thước vẫn được quy định chuẩn xác bởi các tệp thiết kế.

<a name="next"></a>

## Các bước tiếp theo {#next}

Xem thêm [hướng dẫn bộ kit hàn cắm chân SF32 của JLC](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/) và dự án [độ chế máy kể chuyện phi hành gia](./projects/astronaut-storyteller.md). Khi lựa chọn linh kiện, hãy đọc thêm mục [Lựa chọn phần cứng](../hardware/choosing-hardware.md). Thứ tự liệt kê trong danh mục không phải là bảng xếp hạng thương mại.
