---
id: astronaut-storyteller
title: Độ chế máy kể chuyện phi hành gia
description: 'Nhận diện bo mạch PCB, mạch nguồn và giới hạn firmware thông qua hình ảnh tháo máy và sơ đồ đấu dây.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Không phải tất cả các dự án và nguyên mẫu từ bên thứ ba đều đã được kiểm thử. Vui lòng kiểm tra chính xác phiên bản và yêu cầu phần cứng trước khi sử dụng.
sourceArticles:
  - DOC-44
translation:
  status: review
  sourceHash: 8122ddafa4a969eae48ef325e15847ec38c04735e67516214055951fd2307bd1
  reviewedAt: '2026-11-15'
---
# Độ chế máy kể chuyện phi hành gia

Ví dụ này kết hợp phần vỏ của một mẫu máy kể chuyện cụ thể, hệ thống nút bấm cùng một số linh kiện trên bo mạch PCB gốc với mô-đun giọng nói ESP32-S3. Các sản phẩm có cùng tên gọi thương mại vẫn có thể sử dụng bo mạch PCB khác nhau. Hãy xác định đúng phiên bản bo mạch (revision) và đường cấp nguồn trước khi tiến hành làm theo.

<figure class="source-figure">

[![Máy kể chuyện phi hành gia và mục tiêu độ chế.](../../../public/images/zh/doc-44-image-001.webp)](../../../public/images/zh/doc-44-image-001.webp)

<figcaption>Máy kể chuyện phi hành gia và mục tiêu độ chế.</figcaption>
</figure>

<a name="scope"></a>

## 1. Tháo rời và nhận diện linh kiện {#scope}

Ngắt hoàn toàn nguồn điện và pin, sau đó chụp ảnh rõ nét cả hai mặt bo mạch PCB, mọi giắc cắm và thông số ghi trên viên pin. Ghi chú lại vị trí loa, các nút bấm, công tắc nguồn, IC sạc và các bộ ổn áp, đồng thời xác định những phần mạch nào sẽ được giữ lại.

<figure class="source-figure">

[![Ví dụ tháo rời bo mạch PCB, chỉ áp dụng cho đúng phiên bản bo mạch này.](../../../public/images/zh/doc-44-image-003.jpg)](../../../public/images/zh/doc-44-image-003.jpg)

<figcaption>Ví dụ tháo rời bo mạch PCB, chỉ áp dụng cho đúng phiên bản bo mạch này.</figcaption>
</figure>

<figure class="source-figure">

[![Một góc nhìn khác của bo mạch PCB; hãy nhận diện chức năng mạch trước khi tháo bỏ linh kiện.](../../../public/images/zh/doc-44-image-004.webp)](../../../public/images/zh/doc-44-image-004.webp)

<figcaption>Một góc nhìn khác của bo mạch PCB; hãy nhận diện chức năng mạch trước khi tháo bỏ linh kiện.</figcaption>
</figure>

Ví dụ mẫu có tháo bỏ một số linh kiện khỏi bo mạch PCB gốc. Trước tiên, bạn cần xác định chức năng của từng linh kiện và kiểm tra phiên bản bo mạch của mình. Khung đánh dấu màu đỏ trong ảnh minh họa không phải là hướng dẫn tháo bỏ chung cho các lô sản xuất khác.

<a name="audio"></a>


## 2. Lắp ráp khối âm thanh {#audio}

Sơ đồ đấu nối âm thanh dưới đây khớp với bo mạch S3 cơ bản trong `xiaozhi-esp32 v2.6.0`. Các bo mạch PCB máy kể chuyện thuộc lô sản xuất khác vẫn cần được kiểm tra riêng.

| Mô-đun | Chân mô-đun | Chân GPIO ESP32-S3 |
| --- | --- | --- |
| INMP441 | WS | 4 |
| INMP441 | SCK | 5 |
| INMP441 | SD (ngõ ra về MCU) | 6 |
| MAX98357A | DIN (ngõ ra từ MCU) | 7 |
| MAX98357A | BCLK | 15 |
| MAX98357A | LRC | 16 |

Nguyên mẫu này nối chân VDD của INMP441 vào 3V3 và các chân GND, L/R vào GND. Chân VCC và SD của mạch khuếch đại nối vào 3V3, chân GND và GAIN nối vào GND, còn loa nối vào hai ngõ ra âm và dương của mạch khuếch đại.

**Mô tả này áp dụng cho nhánh cấp nguồn 3V3 của mạch khuếch đại trên bản nguyên mẫu.** Dòng tải dự phòng của bộ ổn áp, phiên bản mạch khuếch đại cũng như thiết lập kênh/độ lợi (gain) vẫn cần được xác minh lại. Không sao chép nguyên xi cách đấu nối này nếu chưa kiểm tra nguồn điện. Để xây dựng một khối âm thanh độc lập mới, hãy ưu tiên sơ đồ cấp nguồn đầy đủ và nhất quán trong [hướng dẫn lắp trên bảng cắm thử cơ bản](../../hardware/breadboard-esp32-s3.md), đồng thời tuyệt đối không trộn lẫn dây cấp nguồn của hai thiết kế với nhau.

Hãy dùng hình ảnh để nhận diện mô-đun và điểm hàn, sau đó kiểm tra tách biệt từng phần tín hiệu, nguồn điện và firmware. Việc tái sử dụng mạch khuếch đại, loa hoặc micrô có sẵn của máy đòi hỏi phải có cơ sở xác minh mạch điện rõ ràng. Các ngõ ra loa của mạch khuếch đại không được phép cấp tín hiệu cho tai nghe dùng chung mass (common-ground).

<figure class="source-figure">

[![Mô-đun micrô INMP441.](../../../public/images/zh/doc-44-image-005.webp)](../../../public/images/zh/doc-44-image-005.webp)

<figcaption>Mô-đun micrô INMP441.</figcaption>
</figure>

<figure class="source-figure">

[![Mô-đun khuếch đại âm thanh MAX98357A.](../../../public/images/zh/doc-44-image-006.webp)](../../../public/images/zh/doc-44-image-006.webp)

<figcaption>Mô-đun khuếch đại âm thanh MAX98357A.</figcaption>
</figure>

<figure class="source-figure">

[![Đấu dây mạch khuếch đại trên bản nguyên mẫu.](../../../public/images/zh/doc-44-image-007.webp)](../../../public/images/zh/doc-44-image-007.webp)

<figcaption>Đấu dây mạch khuếch đại trên bản nguyên mẫu.</figcaption>
</figure>

<figure class="source-figure">

[![Khối âm thanh nguyên mẫu sau khi lắp ráp.](../../../public/images/zh/doc-44-image-008.webp)](../../../public/images/zh/doc-44-image-008.webp)

<figcaption>Khối âm thanh nguyên mẫu sau khi lắp ráp.</figcaption>
</figure>

<figure class="source-figure">

[![Một góc nhìn khác của khối âm thanh.](../../../public/images/zh/doc-44-image-009.webp)](../../../public/images/zh/doc-44-image-009.webp)

<figcaption>Một góc nhìn khác của khối âm thanh.</figcaption>
</figure>

<a name="power"></a>

## 3. Pin, cổng USB và bo mạch gốc {#power}

Hãy vẽ lại toàn bộ đường đi của mạch pin, mạch bảo vệ, mạch sạc, mạch tăng áp (boost), bo mạch chính và cổng USB. Phân biệt rõ ràng các chân `BAT`, `VIN`, `OUT` và `GND`. Các điểm hàn trong ảnh chỉ áp dụng cho đúng phiên bản PCB tương ứng; màu dây hoặc vỏ máy giống nhau không đồng nghĩa với việc sơ đồ mạch bên trong giống nhau.

Khi chưa xác minh được đường sạc gốc, trước tiên hãy vận hành độc lập khối âm thanh mới bằng nguồn USB ổn định. Tham khảo kỹ thuật đấu nối pin tùy chỉnh tại mục [Nguồn pin](../../hardware/battery-power.md). Việc thiết bị sáng đèn không chứng minh rằng có thể cắm đồng thời cả nguồn USB và pin.

Các mạch nguồn, mạch sạc và mạch nút bấm nguyên bản vẫn cần được kiểm tra trực tiếp trên từng bo mạch PCB cụ thể. Việc chỉ đọc bảng thông số và kiểm tra chân GPIO không đảm bảo rằng toàn bộ quá trình độ chế đã vượt qua các bài kiểm tra an toàn điện và phần cứng.

<figure class="source-figure">

[![Mô-đun nguồn trên nguyên mẫu có ghi nhãn OUT 5V, BAT, VIN và GND. Các chân đầu vào, pin và đầu ra không thể hoán đổi cho nhau; hãy kiểm tra sơ đồ nguyên lý trước khi đấu dây.](../../../public/images/zh/doc-44-image-012.webp)](../../../public/images/zh/doc-44-image-012.webp)

<figcaption>Mô-đun nguồn trên nguyên mẫu có ghi nhãn OUT 5V, BAT, VIN và GND. Các chân đầu vào, pin và đầu ra không thể hoán đổi cho nhau; hãy kiểm tra sơ đồ nguyên lý trước khi đấu dây.</figcaption>
</figure>

<a name="build"></a>

## 4. Nút bấm, firmware và đóng vỏ {#build}

1. Trước tiên, hãy xác minh màn hình/âm thanh thông báo, micrô, kết nối mạng và tính năng hội thoại trên phần cứng chạy độc lập.
2. Đo đạc mạch nút bấm nguyên bản, xác định mức điện áp tín hiệu và cực tính kích hoạt (active polarity), sau đó tích hợp vào cấu hình [bo mạch tùy chỉnh](../../development/custom-board.md).
3. Tích hợp lần lượt từng khối nguồn, nút bấm và âm thanh, đồng thời ghi chép lại kết quả của mỗi bước. Không mặc định áp dụng trực tiếp hành vi của các phiên bản v0.3/v0.5 cũ.
4. Cố định chắc chắn hệ thống dây dẫn và kiểm tra lỗ thoát âm micrô, loa, hành trình nút bấm cũng như khe cắm USB trước khi đóng kín vỏ máy.

<figure class="source-figure">

[![Nguyên mẫu độ chế đã hoàn thiện.](../../../public/images/zh/doc-44-image-015.webp)](../../../public/images/zh/doc-44-image-015.webp)

<figcaption>Nguyên mẫu độ chế đã hoàn thiện.</figcaption>
</figure>

<figure class="source-figure">

[![Vỏ máy sau khi lắp ráp hoàn chỉnh.](../../../public/images/zh/doc-44-image-016.webp)](../../../public/images/zh/doc-44-image-016.webp)

<figcaption>Vỏ máy sau khi lắp ráp hoàn chỉnh.</figcaption>
</figure>

<figure class="source-figure">

[![Các điểm trích xuất tín hiệu trên bo mạch nút bấm nguyên mẫu. Hãy đo thông mạch, mức logic kích hoạt và nguồn bo mạch gốc trước khi nối vào MCU.](../../../public/images/zh/doc-44-image-013.webp)](../../../public/images/zh/doc-44-image-013.webp)

<figcaption>Các điểm trích xuất tín hiệu trên bo mạch nút bấm nguyên mẫu. Hãy đo thông mạch, mức logic kích hoạt và nguồn bo mạch gốc trước khi nối vào MCU.</figcaption>
</figure>

<figure class="source-figure">

[![Dây tín hiệu nút bấm nguyên mẫu được đi gần các giao tiếp S3 và chân BOOT. Hãy nhận diện điểm hàn từ bức ảnh này, nhưng không sao chép sang phiên bản PCB khác.](../../../public/images/zh/doc-44-image-014.webp)](../../../public/images/zh/doc-44-image-014.webp)

<figcaption>Dây tín hiệu nút bấm nguyên mẫu được đi gần các giao tiếp S3 và chân BOOT. Hãy nhận diện điểm hàn từ bức ảnh này, nhưng không sao chép sang phiên bản PCB khác.</figcaption>
</figure>

<a name="verify"></a>

## Kiểm tra kết quả {#verify}

Xác minh lại hệ thống nguồn và sạc trên đúng phiên bản bo mạch PCB, sau đó biên dịch lại firmware từ cấu hình sạch. Tính năng trò chuyện cần hoạt động ổn định cả trước và sau khi lắp vào vỏ. Các trạng thái sạc pin, ngủ sâu (sleep) và đánh thức (recovery) không được gây ra mức điện áp bất thường hay tự khởi động lại (reset). Ảnh chụp nguyên mẫu chỉ mang tính minh họa cho ví dụ này và không đảm bảo áp dụng chính xác cho mọi lô sản xuất.

<a name="sources"></a>

## Các bước tiếp theo {#sources}

Việc tháo bỏ linh kiện và tái sử dụng bo mạch PCB chỉ áp dụng cho phiên bản bo mạch đã được kiểm tra kỹ lưỡng. Để bắt đầu lắp ráp từ đầu, hãy tham khảo [hướng dẫn lắp mạch S3 cơ bản](../../hardware/breadboard-esp32-s3.md). Xem mục [Phần cứng mã nguồn mở](../open-hardware.md) để khám phá các dự án khác từ cộng đồng.
