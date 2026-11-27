---
id: choosing-hardware
title: Chọn phần cứng cho XiaoZhi
description: 'Lựa chọn dựa trên mức độ hỗ trợ firmware, giao tiếp, điện áp và tài liệu kỹ thuật, không dựa vào giá cũ hay tên gọi quảng cáo.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-10
translation:
  status: review
  sourceHash: 0f692bd58c8825aad2639f21ddb1d8db5b9488d82b43f05f6f80744af2f98a4d
  reviewedAt: '2026-11-15'
---
# Chọn phần cứng cho XiaoZhi

Hãy chọn một cấu hình hoàn chỉnh có hỗ trợ firmware rõ ràng và hướng dẫn đấu nối cụ thể trước khi mua linh kiện. Giá thành rẻ, ngoại hình giống nhau hoặc cùng tên dòng chip không đảm bảo tính tương thích.

<a name="scope"></a>

## Bắt đầu từ nhu cầu sử dụng của bạn {#scope}

| Nhu cầu sử dụng | Những điểm cần kiểm tra |
| --- | --- |
| Thiết bị giao tiếp giọng nói đầu tiên | [Mạch breadboard S3 cơ bản](./breadboard-esp32-s3.md), với bộ linh kiện và firmware cố định |
| Thiết bị nhỏ gọn, chi phí thấp hơn | [C3 + ES8311](./breadboard-esp32-c3.md); không lắp lẫn các module âm thanh của S3 |
| Màn hình màu hoặc camera | Phần cứng có bản tinh chỉnh tương thích cho [màn hình màu](./displays/st7789.md) hoặc [camera](./breadboard-camera.md) |
| Sản phẩm tùy chỉnh riêng | [Những lưu ý khi thiết kế phần cứng](./design-guidelines.md) và gói hỗ trợ bo mạch được duy trì riêng |

<a name="kits"></a>

## Chọn cấu hình, sau đó làm theo hướng dẫn tương ứng {#kits}

- **Thiết bị hoàn chỉnh:** kiểm tra chính xác model và firmware trong danh sách [các bo mạch được hỗ trợ](./supported-boards.md). Bạn không cần mua thêm bộ linh kiện breadboard rời nếu đã có thiết bị hoàn chỉnh.
- **Mạch breadboard cơ bản:** bắt đầu với [danh sách đầy đủ linh kiện và hình ảnh minh họa](./breadboard-esp32-s3.md#materials), bao gồm vi điều khiển, micro, mạch khuếch đại, loa, dây cắm, bảng mạch breadboard và màn hình.
- **Mạch C3 nhỏ gọn hoặc ESP32 cổ điển có sẵn:** sử dụng hướng dẫn cho [C3](./breadboard-esp32-c3.md) hoặc [ESP32 cổ điển](./breadboard-esp32.md) với bộ module, sơ đồ đấu nối và firmware riêng biệt.
- **Kết nối mạng di động:** đọc [hướng dẫn module 4G, nguồn cấp và đấu nối](./breadboard-4g.md). Nếu chỉ thỉnh thoảng mang ra ngoài, hãy cân nhắc xem điểm phát sóng Wi-Fi từ điện thoại đã đáp ứng đủ nhu cầu hay chưa.

<a name="checklist"></a>

## Trước khi mua linh kiện {#checklist}

- **Vi điều khiển và bộ nhớ:** mã đầy đủ của module, dung lượng và chuẩn giao tiếp Flash/PSRAM, cùng mức độ hỗ trợ firmware hiện tại.
- **Micro/bộ giải mã âm thanh (codec):** chuẩn giao tiếp I2S, PDM hay analog; chiều truyền tín hiệu, điện áp cấp và cách chọn kênh.
- **Mạch khuếch đại (amplifier):** định dạng tín hiệu đầu vào, dải điện áp cho phép, trở kháng tải, cơ chế chân kích hoạt (enable) và mạch khuếch đại mặc định.
- **Màn hình:** chip điều khiển (driver), độ phân giải, chuẩn giao tiếp, địa chỉ, sơ đồ chân, mạch điều khiển đèn nền và điện áp hoạt động của module.
- **Nguồn điện và dây cáp:** cáp USB có hỗ trợ truyền dữ liệu, đường cấp nguồn trên bo mạch, dòng tải đỉnh và độ chắc chắn của các đầu nối.

MAX98357A và B không thể thay thế cho nhau trong mọi trường hợp vì định dạng đầu vào kỹ thuật số của chúng khác nhau. Loa rời, tai nghe và loa chủ động (có nguồn riêng) cũng là các loại tải đầu ra khác nhau. Xem chi tiết tại [ngõ ra âm thanh](./audio-output.md).

<a name="verify"></a>

## Sau khi nhận được linh kiện {#verify}

Kiểm tra ký hiệu in trên linh kiện (silkscreen), kiểu đóng gói, hàng chân cắm và tài liệu kỹ thuật xem có khớp nhau không, sau đó kiểm tra lại toàn bộ mối nối khi đã ngắt nguồn điện. Trước tiên hãy kiểm tra quá trình khởi động, hiển thị màn hình, ghi âm/phát lại và trò chuyện trên cấu hình cơ bản. Thử nghiệm riêng rẽ từng module mở rộng.

Ảnh chụp màn hình màu do người bán đăng tải không đảm bảo thông số kỹ thuật của chiếc màn hình bạn thực nhận. Chân cắm 5V trên bo mạch không mặc nhiên là ngõ vào sạc pin.

<a name="sources"></a>

## Nhà cung cấp và tài liệu tham chiếu {#sources}

Hình ảnh nhận diện linh kiện và thông số mua hàng chính xác được duy trì trong từng hướng dẫn lắp ráp tương ứng, thay vì liệt kê các module rời rạc tại đây như một bộ hoàn chỉnh. Giá bán cũ, tình trạng tồn kho và nhận xét về người bán chỉ mang tính thời điểm. Khi đổi nhà cung cấp, hãy giữ nguyên các thông số điện kỹ thuật thay vì chỉ thay thế đường link mua hàng. Xem thêm tại [các bo mạch và biến thể](./supported-boards.md) để kiểm tra mức độ hỗ trợ.
