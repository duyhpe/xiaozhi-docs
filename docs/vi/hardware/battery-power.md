---
id: battery-power
title: Nguồn cấp bằng pin và sạc
description: 'Thử nghiệm với pin sạc dự phòng USB trước khi quyết định có cần thiết kế mạch quản lý pin riêng hay không.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các yêu cầu nguồn USB đã được so sánh với tài liệu của bo mạch; thời lượng hoạt động thực tế, khả năng duy trì nguồn khi tải thấp và các mạch pin tùy chỉnh vẫn cần kiểm thử trên phần cứng thực tế.
translation:
  status: review
  sourceHash: a77c7f081097951363efd623ef427bf81b6305eda37bbe1faa1deaede919c2a3
  reviewedAt: '2026-11-15'
---
# Nguồn cấp bằng pin và sạc

Một cục pin sạc dự phòng USB thương mại là cách đơn giản nhất để vận hành mạch breadboard XiaoZhi mà không cần cắm vào máy tính. Nếu bo mạch phát triển không có sẵn mạch quản lý pin, tuyệt đối không nối trực tiếp pin lithium vào các chân nguồn của mạch.

<a name="scope"></a>

## Chuẩn bị {#scope}

Hướng dẫn này sử dụng bo mạch ESP32-S3 cấp nguồn qua cổng USB. Hãy chuẩn bị một thiết bị đã hoàn tất [đấu nối dây](./breadboard-esp32-s3.md) và [cấu hình Wi-Fi](../getting-started/wifi-and-binding.md), một sợi cáp USB truyền dẫn tốt và một cục pin sạc dự phòng cung cấp ngõ ra USB 5V theo yêu cầu của bo mạch.

Trước tiên hãy xác nhận thiết bị trò chuyện bình thường khi dùng nguồn từ máy tính hoặc củ sạc USB phù hợp. Sau đó mới chuyển sang dùng pin, nhờ vậy bạn có thể phân biệt được lỗi do firmware với lỗi do nguồn điện.

<a name="usb-power"></a>

## 1. Sử dụng pin sạc dự phòng USB {#usb-power}

1. Ghi nhận lại trạng thái đấu dây đang hoạt động tốt, tắt thiết bị và rút cáp khỏi máy tính.
2. Giữ nguyên toàn bộ dây cắm trên breadboard. Cắm sợi cáp nguồn USB hiện tại vào pin sạc dự phòng.
3. Bật nguồn pin sạc dự phòng. Quan sát quá trình khởi động và chờ thiết bị kết nối vào mạng Wi-Fi đã lưu.
4. Bắt đầu một cuộc trò chuyện ở mức âm lượng nhỏ, sau đó thử tăng lên mức âm lượng thường dùng của bạn. Kiểm tra hoạt động duy trì kết nối mạng, phát âm thanh và trạng thái chờ (idle).
5. Tắt pin sạc dự phòng sau khi sử dụng xong. Sạc lại pin theo đúng hướng dẫn của nhà sản xuất.

Một số loại pin sạc dự phòng tự động ngắt nguồn khi tải tiêu thụ quá thấp. Nếu XiaoZhi bị sập nguồn trong lúc đang ở chế độ chờ, hãy kiểm tra xem pin dự phòng có chế độ dòng thấp (low-current mode) và giới hạn thời gian hoạt động hay không. Một lần khởi động thành công chưa đủ khẳng định thiết bị có thể vận hành ổn định lâu dài.

::: info Phạm vi vận hành
Tính năng vừa sạc vừa xả (pass-through charging) không phải là tính năng mặc định trên mọi pin sạc dự phòng. Nếu muốn vừa sạc pin vừa chạy thiết bị, hãy xác nhận nhà sản xuất có hỗ trợ rõ ràng tính năng này không và kiểm tra xem việc cắm/rút nguồn sạc có làm thiết bị bị khởi động lại hay không.
:::

<figure class="source-figure">

[![Pin sạc dự phòng USB thương mại cấp nguồn cho bản dựng S3 cơ bản.](../../public/images/en/usb-power-bank.svg)](../../public/images/en/usb-power-bank.svg)

<figcaption>Pin sạc dự phòng USB thương mại cấp nguồn cho bản dựng S3 cơ bản. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="battery-connector"></a>

## 2. Nếu thiết bị có sẵn cổng cắm pin {#battery-connector}

Chỉ sử dụng cổng cắm pin khi tài liệu của bo mạch quy định rõ loại pin, dải điện áp cho phép, cực tính đầu cắm và cổng sạc tương ứng.

| Hạng mục kiểm tra | Nội dung cần xác nhận |
| --- | --- |
| Loại pin | Số lượng cell, thành phần hóa học (chemistry) và điện áp sạc cho phép phải khớp với IC sạc |
| Đầu cắm (Connector) | Vị trí chân dương (+) và âm (−) thực tế; hai đầu cắm có vỏ nhựa giống hệt nhau vẫn có thể bị đảo ngược cực tính |
| Mạch bảo vệ | Vị trí bố trí mạch bảo vệ quá sạc, xả cạn, quá dòng và ngắn mạch |
| Cổng sạc | Cổng USB nào dùng để sạc pin, và cổng nào chỉ dùng để cấp nguồn hoặc truyền dữ liệu |
| Chuyển đổi nguồn | Cách thức chuyển đổi giữa nguồn USB và nguồn pin, và liệu có cho phép cắm đồng thời cả hai nguồn hay không |

Nếu tài liệu không ghi nhận có cổng cắm pin, tuyệt đối không coi các chân cắm `3V3`, `5V` hay `GND` trên hàng rào chân là ngõ vào sạc pin.

<a name="custom-power"></a>

## 3. Cell pin trần và các module tăng áp {#custom-power}

Một thiết kế nguồn tùy chỉnh cần có đầy đủ chuỗi chức năng: mạch bảo vệ pin → quản lý sạc và đường nguồn (power-path) → mạch ổn áp/tăng áp (boost) → tải tiêu thụ. Các ký hiệu như `B+ / B−` chỉ đánh dấu vị trí hàn dây pin; chúng không chứng minh module đó có đầy đủ các chức năng bảo vệ cần thiết.

Trước khi lắp đặt, hãy xác định chính xác mã module và sơ đồ nguyên lý, đồng thời kiểm tra:

- Cực tính và điện áp đầu ra phải đạt yêu cầu trước khi nối vào bo mạch.
- Điện áp và nhiệt độ vẫn nằm trong giới hạn cho phép của linh kiện khi đang trò chuyện, truyền dữ liệu Wi-Fi và phát loa ở mức âm lượng tối đa dự kiến.
- Việc cắm/rút cáp USB, tình trạng pin yếu và quá trình sạc không gây hiện tượng dội ngược dòng điện (backfeeding) hoặc xung đột nguồn.
- Đầu nối và cách cố định cơ khí đảm bảo các cực mang điện không chạm vào nhau gây chập mạch.

Mạch nguồn được chọn cần được kiểm tra kỹ về mặt kỹ thuật. Không đoán cực tính dựa vào màu dây, không suy luận bị ngược cực chỉ vì đèn không sáng, và không cắt dây pin để thử nghiệm theo kiểu cắm thử khi đang có điện.

Đối với bo mạch ESP32-S3-DevKitC-1, nhà sản xuất liệt kê cổng USB, chân nguồn 5V và chân nguồn 3V3 là ba phương án cấp nguồn loại trừ lẫn nhau (chỉ dùng một trong ba). Điều này không có nghĩa là bo mạch có thể sạc cho pin lithium. Xem chi tiết tại [hướng dẫn cấp nguồn của bo mạch phát triển](https://documentation.espressif.com/esp-dev-kits/en/latest/esp32s3/esp32-s3-devkitc-1/user_guide_v1.1.html).

<figure class="source-figure">

[![Ví dụ cell pin có sẵn dây dẫn và đầu cắm. Kiểm tra thành phần hóa học, điện áp và cực tính đầu cắm theo tài liệu riêng của viên pin đó.](../../public/images/zh/doc-34-image-002.webp)](../../public/images/zh/doc-34-image-002.webp)

<figcaption>Ví dụ cell pin có sẵn dây dẫn và đầu cắm. Kiểm tra thành phần hóa học, điện áp và cực tính đầu cắm theo tài liệu riêng của viên pin đó.</figcaption>
</figure>

<figure class="source-figure">

[![Ví dụ các điểm hàn B+, B− và 5V trên một module nguồn. Kiểm tra tài liệu của module để biết vai trò ngõ vào/ra USB, chức năng sạc và khả năng bảo vệ.](../../public/images/zh/doc-34-image-003.webp)](../../public/images/zh/doc-34-image-003.webp)

<figcaption>Ví dụ các điểm hàn B+, B− và 5V trên một module nguồn. Kiểm tra tài liệu của module để biết vai trò ngõ vào/ra USB, chức năng sạc và khả năng bảo vệ.</figcaption>
</figure>

<a name="verify"></a>

## Kiểm tra kết quả {#verify}

::: tip Tiêu chí hoàn thành
Thiết bị đáp ứng được nhiều lượt trò chuyện liên tục ở mức âm lượng dự kiến và vẫn đánh thức được sau khi ở chế độ chờ. Việc sạc và sử dụng tuân thủ đúng hướng dẫn của thiết bị cấp nguồn. Hãy đo thời lượng sử dụng thực tế dưới mức tải thật; chỉ riêng dung lượng pin ghi trên nhãn không đảm bảo thời gian hoạt động cam kết.
:::

<a name="troubleshooting"></a>

## Khắc phục sự cố {#troubleshooting}

| Hiện tượng | Kiểm tra theo trình tự sau |
| --- | --- |
| Thiết bị không khởi động | Ngắt tải tiêu thụ; kiểm tra công tắc trên pin dự phòng, dây cáp và ngõ ra nguồn. Tuyệt đối không thử đảo ngược dây nguồn |
| Tự khởi động lại khi mở âm lượng lớn | Giảm âm lượng, sử dụng cáp và nguồn cấp chất lượng tốt, kiểm tra tải mạch khuếch đại và các điểm tiếp xúc |
| Tự tắt nguồn sau vài phút ở chế độ chờ | Kiểm tra cơ chế tự ngắt khi tải thấp của pin sạc dự phòng |
| Tự khởi động lại khi cắm bộ sạc | Kiểm tra mạch chuyển nguồn và tính năng vừa sạc vừa dùng (pass-through); việc khởi động lại liên tục không phải là cách thử mạch |

<a name="next"></a>

## Các bước tiếp theo {#next}

Đọc tiếp mục [Ngõ ra âm thanh](./audio-output.md). Nếu thiết bị cũng bị tự khởi động lại liên tục ngay cả khi dùng nguồn USB trực tiếp, hãy xem mục [Khắc phục sự cố khởi động và nguồn điện](../faq/index.md#boot).
