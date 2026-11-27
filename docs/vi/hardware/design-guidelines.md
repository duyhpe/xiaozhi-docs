---
id: hardware-design-guidelines
title: Những lưu ý khi thiết kế phần cứng
description: 'Đánh giá tổng thể về nguồn điện, âm học, cơ khí và khả năng kiểm thử bên cạnh việc chọn vi điều khiển.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-11
translation:
  status: review
  sourceHash: 396f8ff508ee315103b3e6c9639136ac81bd1cc46d339f1347e5f6144d42bc9a
  reviewedAt: '2026-11-15'
---
# Những lưu ý khi thiết kế phần cứng

Thiết kế phần cứng là sự kết hợp giữa tài nguyên chip, nguồn điện, âm thanh và cơ khí. Hãy xác định rõ các tính năng yêu cầu trước, sau đó đối chiếu thiết kế với tài liệu kỹ thuật của linh kiện và kết quả đo kiểm thực tế.

<a name="scope"></a>

## 1. Lựa chọn dựa trên tín hiệu và tải hoạt động {#scope}

Xác định rõ các yêu cầu về giọng nói, màn hình, camera, kết nối mạng, chế độ tiết kiệm năng lượng và cập nhật firmware trước khi chọn chip, Flash/PSRAM, chip Codec và các linh kiện ngoại vi. Đối chiếu mô hình, bộ xử lý âm thanh đầu vào (AFE) và khả năng đánh thức bằng giọng nói với danh mục [bo mạch được firmware hỗ trợ](./supported-boards.md).

<figure class="source-figure">

[![Biểu đồ lựa chọn dòng chip và năng lực xử lý giọng nói. Hãy cân nhắc đồng thời số lượng micro, nhận diện từ khóa đánh thức, xử lý âm thanh và màn hình; kiểm tra mức độ hỗ trợ theo phiên bản firmware sử dụng.](../../public/images/zh/doc-11-image-001.webp)](../../public/images/zh/doc-11-image-001.webp)

<figcaption>Biểu đồ lựa chọn dòng chip và năng lực xử lý giọng nói. Hãy cân nhắc đồng thời số lượng micro, nhận diện từ khóa đánh thức, xử lý âm thanh và màn hình; kiểm tra mức độ hỗ trợ theo phiên bản firmware sử dụng.</figcaption>
</figure>

<a name="power"></a>

## 2. Nguồn điện và nhiễu {#power}

Đánh giá dòng tải đỉnh khi truyền dữ liệu Wi-Fi/di động, phát âm thanh và bật đèn nền màn hình thay vì chỉ nhìn vào dòng tiêu thụ ở chế độ chờ. Kiểm tra mức dự phòng công suất của mạch ổn áp (regulator), đường hồi mass (return paths), tụ lọc nhiễu (decoupling), đầu nối và mạch chuyển nguồn. Phân biệt rõ nguyên nhân gây nhiễu âm thanh là do gợn sóng nguồn, nhiễu xuyên âm từ tín hiệu số, đi dây mass chưa tốt hay rung động cơ khí.

Bảo vệ pin, sạc pin, mạch tăng áp (boost) và khả năng vừa sạc vừa dùng là những chức năng tách biệt. Hãy xác định rõ đường cấp nguồn theo hướng dẫn [Nguồn cấp bằng pin](./battery-power.md); việc có sẵn cổng USB trên bo mạch không đồng nghĩa với việc hỗ trợ đầy đủ tất cả các tính năng này.

<a name="acoustics"></a>

## 3. Thu âm micro và phát âm thanh {#acoustics}

Ghi nhận đầy đủ thông số về độ nhạy micro, tỷ số tín hiệu trên nhiễu (SNR), nguồn cấp và chuẩn giao tiếp. Kiểm tra lỗ thu âm, buồng cộng hưởng âm và hướng đặt micro. Thiết kế loa đồng bộ với vỏ hộp, hạn chế tối đa âm thanh lọt trực tiếp từ loa sang micro và hiện tượng cộng hưởng rung từ vỏ thiết bị.

Tính năng [khử tiếng vọng AEC](../development/audio-and-aec.md) đòi hỏi một tín hiệu tham chiếu thực tế và mức độ cách ly âm học phù hợp. Việc lắp thêm nhiều micro hay bật một tùy chọn trong phần mềm không tự đảm bảo chất lượng khử vọng. Thiết kế ngõ ra tai nghe / tín hiệu mức đường truyền (line output) tách biệt khỏi mạch khuếch đại công suất loa; xem chi tiết tại [Ngõ ra âm thanh](./audio-output.md).

### Tham số tham chiếu định lượng cho mảng 2 micro và vỏ hộp

Các thông số khởi điểm dưới đây được trích từ [tài liệu tham chiếu thiết kế âm học sản phẩm AI (tiếng Trung)](https://icnynnzcwou8.feishu.cn/docx/KCotdF4KgocDm0xqXcycBtGLnWe). Các chỉ số này áp dụng cho mảng hai micro, đường tín hiệu tham chiếu tiếng vọng và âm học vỏ hộp; chúng không mặc nhiên đạt được trên mọi mạch lắp thử breadboard. Hãy đối chiếu đồng thời bảng thông số linh kiện, điều kiện đo kiểm và yêu cầu thực tế của sản phẩm.

| Hạng mục | Điều kiện tham chiếu |
| --- | --- |
| Tỷ số tín hiệu trên nhiễu (SNR) của mảng 2 micro | Tối thiểu 62 dB; lý tưởng trên 64 dB |
| Độ đồng đều độ nhạy giữa các micro | Chênh lệch trong khoảng ±2 dB; lý tưởng ±1 dB đối với mảng micro |
| Khoảng cách giữa hai micro | 4–6.5 cm, với đường truyền cơ khí và âm học tương đồng |
| Đáp tuyến tần số | Trong khoảng ±3 dB trên dải tần 50 Hz–16 kHz |
| Hệ số nén nhiễu nguồn của micro MEMS (PSRR) | Trên 55 dB |
| Lỗ thu âm micro | Đường kính/chiều rộng lý tưởng trên 1 mm; giữ đường dẫn âm ngắn và tỷ lệ chiều sâu trên đường kính dưới 4:1 |
| Điện áp tín hiệu tham chiếu tiếng vọng (Echo-reference) | Nằm trong dải đầu vào của bộ ADC, không bị bão hòa hay xén ngọn (clipping) ở mức âm lượng phát tối đa dự kiến |

Bài kiểm tra tham chiếu thực hiện ghi âm tối thiểu 10 giây với nguồn âm cố định đặt cách khoảng 0.5 m ở mức âm lượng thử nghiệm 90 dB, mục tiêu chênh lệch biên độ giữa các kênh không quá 3 dB. Ghi lại vị trí đo mức âm, cài đặt thiết bị đo và mức khuếch đại ghi âm (recording gain) để tiện đối chiếu giữa các lần thử. So sánh phổ tần số trong dải 100 Hz–8 kHz trước và sau khi đóng kín vỏ hộp trong cùng điều kiện; mục tiêu suy giảm âm lọt tham chiếu là 25 dB, lý tưởng đạt 30 dB. Đây là các chỉ tiêu của tài liệu tham chiếu; tiêu chuẩn nghiệm thu cụ thể cần được xác định riêng cho từng sản phẩm thực tế.

Cách ly khoang chứa micro với khoang loa và sử dụng gioăng kín, mút tiêu âm hoặc vật liệu chống rung phù hợp để giảm lọt âm bên trong và truyền rung cơ khí. Xem trình tự đo kiểm ở bên dưới.

<a name="test"></a>

## 4. Thiết kế phục vụ sản xuất và bảo trì {#test}

Bố trí ký hiệu nhận diện phiên bản phần cứng rõ ràng, giao diện nạp/gỡ lỗi (programming/debug), nhật ký báo lỗi (fault logs) và phương án khôi phục hệ thống. Kiểm thử toàn diện các tác vụ trò chuyện, phát lại, camera, tải mạng đỉnh điểm và vận hành liên tục trong thời gian dài. Các trạng thái ngủ (sleep), tự kết nối lại và pin yếu cần được kiểm tra qua nhiều chu kỳ chứ không chỉ một lần khởi động.

Ghi lại môi trường thử nghiệm, mức âm lượng, khoảng cách, phiên bản vỏ hộp và tiêu chí đạt chuẩn vào tệp README của bo mạch. Sau mỗi lần thay đổi mạch điện, hãy chạy lại toàn bộ các bài kiểm tra đã đạt trước đó. Một bo mạch khác dùng chung dòng chip không thể dùng để thay thế kết quả kiểm thử.

### Duy trì quy trình kiểm thử âm học có thể lặp lại

Tham khảo [tài liệu thiết kế Espressif Korvo-2](https://docs.espressif.com/projects/esp-adf/en/latest/design-guide/dev-boards/user-guide-esp32-s3-korvo-2.html) và [ví dụ thuật toán âm thanh ESP-ADF](https://github.com/espressif/esp-adf/tree/master/examples/advanced_examples/algorithm) để kiểm tra linh kiện và đường tín hiệu tham chiếu. Xác định điều kiện đạt chuẩn cho phần cứng của bạn và lưu lại các số liệu đo:

1. **Độ đồng nhất của mảng micro:** cố định vị trí và mức âm lượng của nguồn phát, ví dụ đặt thẳng phía trên mảng micro một khoảng 0.5 m. Phát cùng một tín hiệu thử nghiệm và ghi âm đồng thời tất cả các micro trong ít nhất 10 giây. So sánh biên độ, tần số lấy mẫu, pha tín hiệu và hiện tượng rớt khung dữ liệu (dropped frames).
2. **Độ cách ly của vỏ hộp:** ghi âm một bản làm chuẩn nền, sau đó bịt kín tạm thời lỗ thu âm của micro và ghi âm lại với cùng nguồn phát và mức gain. So sánh phổ tần số và độ suy giảm âm bằng công cụ như Audacity. Lặp lại trong cùng điều kiện sau khi điều chỉnh gioăng kín hoặc vật liệu chống rung.
3. **Tín hiệu tham chiếu AEC:** lưu đồng bộ dữ liệu thu từ micro, tín hiệu tham chiếu phát lại và âm thanh sau khi xử lý. Kiểm tra hiện tượng xén ngọn (clipping), rớt khung dữ liệu và độ đồng bộ kênh/thời gian. Tăng dần từ mức âm lượng nhỏ lên mức tối đa dự kiến trong khi ghi nhận khả năng khử vọng và ngắt lời (interruption).

Các bước trên minh họa trình tự kiểm thử; các thông số của bo mạch tham chiếu không phải là tiêu chuẩn chung cho mọi sản phẩm. Hãy thiết lập thông số điện áp, áp suất âm thanh và micro dựa trên linh kiện bạn đã chọn và yêu cầu thực tế của sản phẩm.

<a name="verify"></a>

## Kiểm tra kết quả {#verify}

Một quy trình rà soát thiết kế cần đối chiếu được mọi tính năng cam kết với sơ đồ mạch, tài liệu kỹ thuật linh kiện và các bài kiểm thử cụ thể. Bảng lựa chọn linh kiện không thể thay thế cho việc kiểm tra mức độ tương thích firmware, thông số điện hay thử nghiệm thực tế.

<a name="next"></a>

## Các bước tiếp theo {#next}

Về cách chọn linh kiện, xem mục [Chọn phần cứng](./choosing-hardware.md). Để tích hợp vào firmware, xem tiếp mục [Tùy chỉnh bo mạch](../development/custom-board.md).
